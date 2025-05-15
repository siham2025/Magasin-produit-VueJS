<template>
 <div class="container mt-5">
    <h1 class="mb-4 text-center">Nos Produits</h1>

    <div v-if="isLoading" class="text-center">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Chargement...</span>
      </div>
    </div>

    <div v-else class="row row-cols-1 row-cols-md-3 g-4">
      <div class="col" v-for="product in products" :key="product.id">
        <div class="card h-100 bg-dark text-light">
          <img :src="product.thumbnail" class="card-img-top" :alt="product.title" />
          <div class="card-body">
            <h5 class="card-title">{{ product.title }}</h5>
            <p class="card-text">{{ product.description }}</p>
            <p class="card-text fw-bold">{{ product.price }} €</p>
            <router-link :to="`/product/${product.id}`" class="btn btn-success">Voir le produit</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const products = ref([])
const isLoading = ref(true)

onMounted(async () => {
  const response = await fetch('https://dummyjson.com/products')
  const data = await response.json()
  products.value = data.products
  isLoading.value = false
})
</script>