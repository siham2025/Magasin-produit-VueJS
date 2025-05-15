// ===== Importation des fonctions du routeur Vue 3 =====
import { createRouter, createWebHistory } from 'vue-router'

// ===== Importation des vues/pages principales =====
import ProductListView from '../views/ProductListView.vue'       // Page d’accueil avec tous les produits
import ProductDetailView from '../views/ProductDetailView.vue'   // Détails d’un produit spécifique
import CartView from '../views/CartView.vue'                     // Panier d’achat

// ===== Déclaration des routes =====
const routes = [
  {
    path: '/',
    name: 'home',
    component: ProductListView     // Page d'accueil → liste des produits
  },
  {
    path: '/product/:id',
    name: 'product-detail',
    component: ProductDetailView   // Page dynamique → détails d’un produit
  },
  {
    path: '/cart',
    name: 'cart',
    component: CartView            // Page panier
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('../views/NotFoundView.vue') // Page 404 si route inconnue
  }
]

// ===== Création du routeur avec historique HTML5 =====
const router = createRouter({
  history: createWebHistory(), // Utilisation des vraies URLs (sans #)
  routes                       // Liste des routes définies ci-dessus
})

// ===== Exportation du routeur pour l'utiliser dans main.js =====
export default router
