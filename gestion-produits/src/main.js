// ===== Importation des modules Vue de base =====
import { createApp } from 'vue'           // Fonction pour créer l'application Vue
import App from './App.vue'               // Composant racine de l'application

// ===== Importation du routeur (navigation entre pages) =====
import router from './router'             // Configuration des routes (src/router/index.js)

// ===== Importation de Bootstrap =====
import 'bootstrap/dist/css/bootstrap.min.css'         // Styles de Bootstrap 5
import 'bootstrap-icons/font/bootstrap-icons.css'     // Icônes Bootstrap (bi bi-cart, etc.)

// ===== Importation des styles personnalisés =====
import './style.css'                      // Fichier CSS global personnalisé (fond sombre, etc.)

// ===== Création et montage de l'application =====
createApp(App)        // On crée l'app à partir du composant racine
  .use(router)        // On active le système de navigation
  .mount('#app')      // On monte l'app dans l'élément <div id="app">