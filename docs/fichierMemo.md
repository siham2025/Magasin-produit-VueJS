
            1/  Démarrage du projet

Création du projet avec Vite: => npm create vite@latest gestion-produits
ctrl+C
Installation des outils:
Installation de Vue Router => npm install vue-router
et  => npm install Bootstrap
npm run dev

        2/Organiser le projet – Structure propre

créer une structure claire dans src/ :

    views/ : les pages principales
    components/ : les composants réutilisables (s’il y en a)
    router/ : pour les routes (navigation)
    assets/ : les images, icônes, etc.

       3/ : Mettre en place le GPS – Vue Router
pour que l'appli sache où aller quand l’utilisateur change d’URL.
on configures donc Vue Router.
* Dans src/router/index.js :
import { createRouter, createWebHistory } from 'vue-router'
import ProductListView from '../views/ProductListView.vue'
import ProductDetailView from '../views/ProductDetailView.vue'
import NotFoundView from '../views/NotFoundView.vue'

const routes = [
  { path: '/', component: ProductListView },
  { path: '/product/:id', component: ProductDetailView },
  { path: '/:pathMatch(.*)*', component: NotFoundView }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router

* Puis, dans main.js :
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'bootstrap/dist/css/bootstrap.min.css'
import './style.css'

createApp(App).use(router).mount('#app')

Maintenant, l'app peut naviguer entre les pages avec les bonnes URL !

     4/Se connecter à l’API – Aller chercher les produits

* Dans ProductListView.vue, on cherche les produits quand la page est chargée :

import { onMounted, ref } from 'vue'

const products = ref([])
const isLoading = ref(true)

onMounted(async () => {
  const res = await fetch('https://dummyjson.com/products')
  const data = await res.json()
  products.value = data.products
  isLoading.value = false
})

🧠 ref = pour créer une donnée réactive (elle change, et la vue se met à jour)

🕓 onMounted() = quand le composant est prêt, on lance une fonction

       5/ Afficher les produits – HTML + Bootstrap
construire une grille Bootstrap 
Chaque produit a une image, un nom, une description, et un bouton pour aller voir les détails.

      6 / Détails du produit – Affichage dynamique
Dans ProductDetailView.vue, on veux afficher le produit cliqué.
on récupères l’id dans l’URL avec useRoute() :

import { useRoute } from 'vue-router'
const route = useRoute()
const productId = route.params.id

on fais un fetch pour aller chercher le produit avec cet id :

onMounted(async () => {
  const res = await fetch(`https://dummyjson.com/products/${productId}`)
  product.value = await res.json()
  isLoading.value = false
})

Bonus:

Ajouter une page 404
changer le style light-mode vers dark-mode
