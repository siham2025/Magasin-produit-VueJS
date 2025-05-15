<template>
  <main class="container mt-5">
    <div v-if="isLoading" class="text-center">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Chargement...</span>
      </div>
    </div>

    <div v-else class="row justify-content-center">
      <div class="col-md-8">
        <!-- Bootstrap Card -->
        <div class="card h-100 bg-dark text-light">
          <img :src="product.thumbnail" class="card-img-top" :alt="product.title">
          <div class="card-body">
            <h5 class="card-title">{{ product.title }}</h5>
            <h6 class="card-subtitle mb-2 text-muted">SKU: {{ product.id }}</h6>
            <p class="card-text">{{ product.description }}</p>
            <p class="fw-bold">{{ product.price }} €</p>
            <p class="text-light">Quantité en stock : <strong>{{ product.stock }}</strong></p>

            <!-- Champ quantité -->
            <div class="d-flex align-items-center gap-2 mt-3">
              <label for="quantity" class="form-label m-0">Quantité :</label>
              <input
                id="quantity"
                type="number"
                class="form-control"
                style="width: 80px"
                min="1"
                :max="product.stock"
                v-model.number="quantity"
              />
            </div>

            <!-- Bouton Ajouter au panier -->
            <button class="btn btn-success mt-3" @click="addToCart">
              Ajouter au panier ({{ quantity }})
            </button>

            <!-- Bouton Retour -->
            <RouterLink to="/" class="btn btn-outline-success mt-3 ms-2">Retour aux produits</RouterLink>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const quantity = ref(1)

const route = useRoute()
const product = ref(null)
const isLoading = ref(true)

onMounted(async () => {
  const id = route.params.id
  const res = await fetch(`https://dummyjson.com/products/${id}`)
  const data = await res.json()
  product.value = data
  isLoading.value = false
})
</script>

<style scoped>
.card-img-top {
  max-height: 400px;
  object-fit: contain;
}
</style>
