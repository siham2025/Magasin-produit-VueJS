✅ Résumé des Étapes — Fonctionnalité Panier
1. 🧱 Création du Header (TheHeader.vue)

    Création d’un composant TheHeader.vue

    Ajout d’une icône panier (Bootstrap Icons)

    Icône cliquable : redirection vers /cart

    Affichage d’un badge rouge avec le nombre total d’articles (quantités cumulées)

2. 📦 Création de la Vue Panier (CartView.vue)

    Nouveau composant CartView.vue dans /views

    Déclaration de la route /cart dans router/index.js

    Lecture du panier depuis localStorage :

    const cart = JSON.parse(localStorage.getItem('cart')) || []

3. ➕ Ajout de Produits au Panier (ProductDetailView.vue)

    Bouton "Ajouter au panier"

    Stockage dans localStorage

    Gestion du cas :

        Si le produit existe déjà → on ajoute à la quantité

        Sinon → on ajoute un nouveau produit

    Fonction utilisée :

    function addToCart() {
      let cart = JSON.parse(localStorage.getItem('cart')) || []
      let existing = cart.find(item => item.id === product.value.id)
      if (existing) {
        existing.quantity += quantity.value
      } else {
        cart.push({ ...product.value, quantity: quantity.value })
      }
      localStorage.setItem('cart', JSON.stringify(cart))
    }

4. 🧾 Affichage des Produits dans le Panier (CartView.vue)

    Utilisation de v-for pour afficher chaque produit

    Affichage :

        Image

        Titre

        Quantité

        Prix unitaire

        Prix total (prix * quantité)

    Stylisation avec Bootstrap (row, col, img-fluid, etc.)

5. ➕➖ Modification de la Quantité (dans le panier)

    Boutons + et – pour modifier la quantité

    Mise à jour automatique de localStorage

    Bloc utilisé :

    <button @click="decrementQuantity(index)">-</button>
    <input :value="item.quantity" readonly>
    <button @click="incrementQuantity(index)">+</button>

6. 🧮 Calculs Automatiques

    ✅ totalItems → total des articles (somme des quantités)

    ✅ totalPrice → prix HT

    ✅ tvaAmount → TVA à 20 %

    ✅ totalTTC → prix TTC

    Tout ça avec computed() dans CartView.vue

7. 🧪 Test final de l'application

    Lancer l’application (npm run dev)

    Ajouter des produits au panier depuis leur fiche

    Voir les produits et le total dans /cart

    Le panier reste sauvegardé même après fermeture du navigateur (grâce au localStorage)