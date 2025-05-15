<template>
  <div class="container text-center mt-5">
    <!-- ===== Code 404 géant ===== -->
    <h1 class="display-4 text-danger">404</h1>

    <!-- ===== Message d'erreur ===== -->
    <p class="lead">Oups ! Cette page n'existe pas.</p>

    <!-- ===== Lien retour vers l'accueil ===== -->
    <router-link to="/" class="btn btn-primary mt-3">
      Retour à l'accueil
    </router-link>
  </div>
</template>

<script setup>
// Pas de script nécessaire pour une page statique
</script>

<style scoped>
/* ===== Style du titre principal ===== */
h1 {
  font-size: 6rem;
}
</style>
