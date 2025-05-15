<template>
  <main class="container mt-5">
    <!-- ===== Spinner de chargement ===== -->
    <div v-if="isLoading" class="text-center">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Chargement...</span>
      </div>
    </div>

    <!-- ===== Contenu une fois les données chargées ===== -->
    <div v-else class="row justify-content-center">
      <div class="col-md-8">
        <!-- ===== Carte Bootstrap du produit ===== -->
        <div class="card h-100 bg-dark text-light">
          <!-- Image principale -->
          <img :src="product.thumbnail" class="card-img-top" :alt="product.title" />

          <div class="card-body">
            <!-- Informations du produit -->
            <h5 class="card-title">{{ product.title }}</h5>
            <h6 class="card-subtitle mb-2 text-muted">SKU: {{ product.id }}</h6>
            <p class="card-text">{{ product.description }}</p>
            <p class="fw-bold">{{ product.price }} €</p>
            <p class="text-light">
              Quantité en stock : <strong>{{ product.stock }}</strong>
            </p>

            <!-- ===== Sélection de quantité ===== -->
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

            <!-- ===== Bouton Ajouter au panier ===== -->
            <button class="btn btn-success mt-3" @click="addToCart">
              Ajouter au panier ({{ quantity }})
            </button>

            <!-- ===== Bouton Retour à la liste ===== -->
            <RouterLink
              to="/"
              class="btn btn-outline-success mt-3 ms-2"
            >
              Retour aux produits
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
// ===== Imports Vue et Vue Router =====
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

// ===== Données réactives =====
const quantity = ref(1)              // Quantité à ajouter
const route = useRoute()            // Accès à l'URL dynamique (id du produit)
const product = ref(null)           // Données du produit affiché
const isLoading = ref(true)         // Affiche le loader tant que le produit n’est pas chargé

// ===== Récupération des données produit à l'ouverture de la page =====
onMounted(async () => {
  const id = route.params.id
  const res = await fetch(`https://dummyjson.com/products/${id}`)
  const data = await res.json()
  product.value = data
  isLoading.value = false
})

// ===== Lecture du panier dans le localStorage =====
function getCart() {
  return JSON.parse(localStorage.getItem('cart')) || []
}

// ===== Sauvegarde du panier dans le localStorage =====
function saveCart(cart) {
  localStorage.setItem('cart', JSON.stringify(cart))
}

// ===== Fonction Ajouter au panier =====
function addToCart() {
  const cart = getCart()

  const existingItem = cart.find(item => item.id === product.value.id)

  if (existingItem) {
    // Si le produit est déjà dans le panier, on augmente la quantité
    existingItem.quantity += quantity.value
  } else {
    // Sinon, on l’ajoute avec les infos nécessaires
    cart.push({
      id: product.value.id,
      title: product.value.title,
      price: product.value.price,
      image: product.value.thumbnail,
      quantity: quantity.value
    })
  }

  saveCart(cart) // Met à jour le localStorage
  alert(`${quantity.value} "${product.value.title}" ajouté au panier !`)
}
</script>

<style scoped>
/* Limite la hauteur de l’image pour garder un affichage propre */
.card-img-top {
  max-height: 400px;
  object-fit: contain;
}
</style>
