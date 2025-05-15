<template>
  <div id="app">
    <!-- ===== En-tête (Header global de l'app) ===== -->
    <TheHeader />

    <!-- ===== Affichage dynamique des vues via Vue Router ===== -->
    <router-view />
  </div>
</template>

<script setup>
// ===== Importation du composant d'en-tête =====
import TheHeader from './components/TheHeader.vue'
</script>
