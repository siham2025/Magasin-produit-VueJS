<template>
  <div class="container mt-5">
    <!-- ===== Titre principal ===== -->
    <h1 class="mb-4 text-center">Nos Produits</h1>

    <!-- ===== Affichage du spinner de chargement ===== -->
    <div v-if="isLoading" class="text-center">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Chargement...</span>
      </div>
    </div>

    <!-- ===== Affichage de la liste des produits une fois chargés ===== -->
    <div v-else class="row row-cols-1 row-cols-md-3 g-4">
      <div class="col" v-for="product in products" :key="product.id">
        <div class="card h-100 bg-dark text-light">
          <!-- Image du produit -->
          <img :src="product.thumbnail" class="card-img-top" :alt="product.title" />

          <!-- Détails du produit -->
          <div class="card-body">
            <h5 class="card-title">{{ product.title }}</h5>
            <p class="card-text">{{ product.description }}</p>
            <p class="card-text fw-bold">{{ product.price }} €</p>

            <!-- Lien vers la page de détail du produit -->
            <router-link
              :to="`/product/${product.id}`"
              class="btn btn-success"
            >
              Voir le produit
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// ===== Importation des outils Vue pour données réactives et cycle de vie =====
import { ref, onMounted } from 'vue'

// ===== Déclaration des variables réactives =====
const products = ref([])       // Liste des produits
const isLoading = ref(true)    // Indique si les données sont en cours de chargement

// ===== Récupération des produits depuis l'API lors du montage du composant =====
onMounted(async () => {
  const response = await fetch('https://dummyjson.com/products')
  const data = await response.json()
  products.value = data.products
  isLoading.value = false
})
</script>
