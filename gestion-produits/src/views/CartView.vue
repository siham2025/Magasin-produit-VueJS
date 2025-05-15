<template>
  <div class="container mt-5 text-light">
    <!-- ===== Titre de la page panier ===== -->
    <h1 class="mb-4">Votre Panier</h1>

    <!-- ===== Cas où le panier est vide ===== -->
    <div v-if="cartItems.length === 0">
      <div class="alert alert-warning text-center">
        Votre panier est vide.
      </div>
    </div>

    <!-- ===== Cas où des produits sont présents dans le panier ===== -->
    <div v-else>
      <!-- Affichage du nombre total d’articles -->
      <p class="mb-3">
        Total d'articles : <strong>{{ totalItems }}</strong>
      </p>

      <!-- Boucle sur les produits du panier -->
      <div
        v-for="(item, index) in cartItems"
        :key="item.id"
        class="row align-items-center border-bottom py-3"
      >
        <!-- Colonne image produit -->
        <div class="col-3 col-md-2">
          <img
            :src="item.image"
            class="img-fluid"
            alt="Produit"
            style="max-height: 80px; object-fit: contain"
          />
        </div>

        <!-- Colonne informations et quantité -->
        <div class="col-6 col-md-7">
          <h5 class="mb-1">{{ item.title }}</h5>

          <!-- Contrôle de la quantité avec boutons + / - -->
          <div class="input-group input-group-sm" style="max-width: 120px">
            <button
              class="btn btn-outline-light"
              @click="decrementQuantity(index)"
            >
              -
            </button>
            <input
              type="text"
              class="form-control text-center"
              :value="item.quantity"
              readonly
            />
            <button
              class="btn btn-outline-light"
              @click="incrementQuantity(index)"
            >
              +
            </button>
          </div>

          <!-- Prix unitaire -->
          <p class="mb-0">Prix unitaire : {{ item.price }} €</p>
        </div>

        <!-- Colonne prix total pour cet article -->
        <div class="col-3 col-md-3 text-end">
          <p class="fw-bold">
            {{ (item.price * item.quantity).toFixed(2) }} €
          </p>
        </div>
      </div>

      <!-- ===== Résumé du panier ===== -->
      <div class="mt-4 text-end">
        <p>
          Total HT : <strong>{{ totalPrice.toFixed(2) }} €</strong>
        </p>
        <p>
          TVA (20%) : <strong>{{ tvaAmount.toFixed(2) }} €</strong>
        </p>
        <h5>
          Total TTC : <strong>{{ totalTTC.toFixed(2) }} €</strong>
        </h5>
      </div>
    </div>
  </div>
</template>

<script setup>
// ===== Imports nécessaires =====
import { ref, onMounted, computed } from "vue"

// ===== Liste des produits dans le panier =====
const cartItems = ref([])

// ===== Récupération du panier depuis localStorage au chargement =====
onMounted(() => {
  const cart = JSON.parse(localStorage.getItem("cart")) || []
  cartItems.value = cart
})

// ===== Sauvegarde du panier dans localStorage =====
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cartItems.value))
}

// ===== Augmente la quantité d’un produit =====
function incrementQuantity(index) {
  cartItems.value[index].quantity++
  saveCart()
}

// ===== Diminue la quantité (minimum = 1) =====
function decrementQuantity(index) {
  if (cartItems.value[index].quantity > 1) {
    cartItems.value[index].quantity--
    saveCart()
  }
}

// ===== Total d’articles (toutes quantités confondues) =====
const totalItems = computed(() => {
  return cartItems.value.reduce((sum, item) => sum + item.quantity, 0)
})

// ===== Total hors taxes =====
const totalPrice = computed(() => {
  return cartItems.value.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )
})

// ===== Montant de la TVA (20%) =====
const tvaAmount = computed(() => {
  return totalPrice.value * 0.2
})

// ===== Total TTC (avec TVA) =====
const totalTTC = computed(() => {
  return totalPrice.value + tvaAmount.value
})
</script>
