<template>
  <!-- ===== Barre de navigation principale (header global) ===== -->
  <header class="navbar navbar-dark bg-dark px-3">
    
    <!-- ===== Logo ou nom de la boutique (clique pour revenir à l'accueil) ===== -->
    <router-link to="/" class="navbar-brand">MyStore</router-link>

    <!-- ===== Icône du panier en haut à droite ===== -->
    <div class="ms-auto">
      <router-link to="/cart" class="btn btn-dark position-relative">
        <i class="bi bi-cart3 fs-4"></i> <!-- Icône de panier (Bootstrap Icons) -->
      </router-link>
    </div>
  </header>
</template>

<script setup>
// Pas de logique JS ici pour le moment.
// Le composant sert uniquement d'en-tête visuel.
</script>