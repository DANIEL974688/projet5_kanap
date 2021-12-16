//**I**//Condition pour passer de la page panier à la page commande
if (document.URL.includes('cart.html')){

//**Panier**//
  // Déclaration de variable objet ajouté 
  let shoppingCartLocalStorage = JSON.parse(localStorage.getItem("shoppingCart"));
  //console.log(shoppingCartLocalStorage) 

  //Intégration des données de l'Api dans la page panier
  const shoppingItem = document.getElementById(`cart__items`)
      for (i=0; i < shoppingCartLocalStorage.length; i++  ){
          fetch("http://localhost:3000/api/products/"+shoppingCartLocalStorage[i]._id)
          
          .then(function (res) {
              return res.json() 
          })
          .then ((products) =>{
              const image = products.imageUrl;
              const alt = products.altTxt;
              console.log(products.imageUrl)
              console.log(products.altTxt)
              })
          .catch (function (error) {
              console.log(error)
          })
  //Intégration du  html dans la section "cart__items"
  let listItem = document.createElement(`cart__item`)
  //console.log(listItem)

  listItem.innerHTML = `
          <article class="cart__item" data-id=${shoppingCartLocalStorage[i]._id} data-color="${shoppingCartLocalStorage[i].option}">
              <div class="cart__item__img">
                  <img src=${shoppingCartLocalStorage[i].image} alt=${shoppingCartLocalStorage[i].alt}>
              </div>
              <div class="cart__item__content">
                  <div class="cart__item__content__titlePrice">
                      <h2>${shoppingCartLocalStorage[i].name}</h2>
                      <p>${shoppingCartLocalStorage[i].price} €</p>
                  </div>
                  <div class="cart__item__content__settings">
                      <p>Couleur : ${shoppingCartLocalStorage[i].option}</p>
                          <div class="cart__item__content__settings__quantity">
                          <p>Qté :  </p>
                          <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${shoppingCartLocalStorage[i].quantity}">
                          </div>
                  </div>
                  <div class="cart__item__content__settings__delete">
                      <p class="deleteItem">Supprimer</p>
                  </div>
              </div>
          </article>
              `
        shoppingItem.appendChild(listItem);  
        //console.log(listItem) 
          }

  // Stocke les éléments dans des tableaux
  let deleteItemContainer = [...document.getElementsByClassName('deleteItem')]
  let quantityContainer = [...document.getElementsByClassName('itemQuantity')]

  // Suppression d'un produit
  deleteItemContainer.forEach((item, index) => {
      item.addEventListener('click', () => {
        // Dans le DOM
        let pickArticle = deleteItemContainer[index].closest('.cart__item')
        pickArticle.remove()
        // Dans le local storage
        shoppingCartLocalStorage.splice(index, 1)
        localStorage.setItem('shoppingCart', JSON.stringify(shoppingCartLocalStorage))
        location.reload()
      })
  })

  // Modification de la quantité
  quantityContainer.forEach((shoppingItem, index) => {
      shoppingItem.addEventListener('change', () => { 
  // Au click, modifie l'objet sur le LocalStorage et le dom
          shoppingCartLocalStorage[index].quantity = quantityContainer[index].value
          localStorage.setItem('shoppingCart', JSON.stringify(shoppingCartLocalStorage))
          location.reload()
      })
  })

  // Totalisation des quantités d'articles et somme de ces articles
  let sumShoppingItem = 0
  let sumPrice = 0
  let totalQuantity = document.getElementById('totalQuantity')
  let totalPrice = document.getElementById('totalPrice')

  if (shoppingCartLocalStorage !== null) {
    for (let j = 0; j < shoppingCartLocalStorage.length; j++) {
      let quantityLoop = parseInt(shoppingCartLocalStorage[j].quantity)
      let priceLoop = parseInt(shoppingCartLocalStorage[j].price)
      sumShoppingItem += quantityLoop
      sumPrice += priceLoop * quantityLoop
    }
  }

  if (totalQuantity && totalPrice) {
    totalQuantity.innerHTML = sumShoppingItem
    totalPrice.innerHTML = sumPrice
  }

//**Formulaire**//
  // Variables  du formulaire Contact
  let color1 = '#7cdc16';
  let color2 = '#f03c0c';
  // Mise en place RegEx les plus larges possibles pour éviter les erreurs de caratéres 
  let RegEx1 = /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u;
  let RegEx2 = /^[a-zA-Z\-1-9]+$/;
  // Formulaire Contact
  addEventListener('change', () => {
    //Vérification FirstName(prénom)
    function validFirstName() {
      let firstName = document.getElementById('firstName').value
      let text = document.getElementById('firstNameErrorMsg')
    // Prise en compte les Regex
      let pattern = RegEx1;
      let number = RegEx2;

      if (firstName.match(pattern)) {
        text.innerHTML = 'Prénom valide'
        text.style.color = color1;
        return firstName
      } else  if (firstName.match(number)) {
                text.innerHTML = 'Les chiffres ne sont pas tolérés'
                text.style.color = color2;
        } else {
                text.innerHTML = 'Merci de rentrer un prénom valide'
                text.style.color = color2;
        }
      }
          
    // Vérification LastName(Nom)
    function validLastName() {
      let lastName = document.getElementById('lastName').value
      let text = document.getElementById('lastNameErrorMsg')
      let pattern = RegEx1;
      let number = RegEx2;

      if (lastName.match(pattern)) {
        text.innerHTML = 'Nom valide'
        text.style.color = color1;
        return lastName
      } else if (lastName.match(number)) {
          text.innerHTML = 'Les chiffres ne sont pas tolérés'
          text.style.color = color2;
        } else {
          text.innerHTML = 'Merci de rentrer un nom valide'
          text.style.color = color2;
        }
      }
          
    //Vérification address(adresse)
    function validAddress() {
      let address = document.getElementById('address').value
      let text = document.getElementById('addressErrorMsg')
      let pattern = '([0-9a-zA-Z,. ]*) ?([0-9]{5}) ?([a-zA-Z]*)'

      if (address.match(pattern)) {
        text.innerHTML = 'Adresse postale valide'
        text.style.color = color1;
        return address
      } else {
        text.innerHTML =
          'Merci de rentrer une adresse valide : numéro voie code postal'
        text.style.color = color2;
      }
    }
    // Vérification City(ville)
    function validCity() {
      let city = document.getElementById('city').value
      let text = document.getElementById('cityErrorMsg')
      let pattern = /^[a-z ,.'-]+$/i

      if (city.match(pattern)) {
        text.innerHTML = 'Ville valide'
        text.style.color = color1;
        return city
      } else {
        text.innerHTML = 'Merci de rentrer une ville valide'
        text.style.color = color2;
      }
   }
    //Vérification Email(adresse mail)
    function validEmail() {
      let mail = document.getElementById('email').value
      let text = document.getElementById('emailErrorMsg')
      let pattern = new RegExp(
        '^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$',
        'g'
      )

      if (mail.match(pattern)) {
        text.innerHTML = 'Adresse email valide'
        text.style.color = color1;
        return mail
      } else {
        text.innerHTML = 'Merci de rentrer une adresse valide'
        text.style.color = color2;
      }
    }

    // Appels pour alertes sur DOM
    validFirstName()
    validLastName()
    validAddress()
    validCity()
    validEmail()

    // Objet vers localStorage
    let products = []
    let saveContactLocalStorage = JSON.parse(localStorage.getItem('contact'))
    let sendContact = document.getElementById('order')
    sendContact.addEventListener('click', (e) => {
      e.preventDefault()

      // Création de l'objet contact | Les valeurs sont vérifiés par les fonctions
      let contact = {
        firstName: validFirstName(),
        lastName: validLastName(),
        address: validAddress(),
        city: validCity(),
        email: validEmail(),
      }

      // Ajoute le nouveau contact dans le localStorage
      let addContactLocalStorage = () => {
        saveContactLocalStorage = []
        saveContactLocalStorage.push(contact)
        localStorage.setItem(
          'contact',
          JSON.stringify(saveContactLocalStorage)
        )
      }
      // Modifie le contact si besoin
      let modifyContactLocalStorage = () => {
          saveContactLocalStorage = contact
          localStorage.setItem(
          'contact',
          JSON.stringify(saveContactLocalStorage)
          )
      }

      // Si l'objet a une key non défini, ne pas exécuter le code
      if (
        contact.firstName == undefined ||
        contact.lastName == undefined ||
        contact.address == undefined ||
        contact.city == undefined ||
        contact.email == undefined
      ) {
        return false
      } else {
      // Si pas de contact dans le localStorage, crée le tableau
        if (!saveContactLocalStorage) {
          addContactLocalStorage()
        }
      // Modifie le contact en temps réel
        else {
          modifyContactLocalStorage()
        }
      }
      //Constante pour lien API avec la commande
      const toSend = {
        contact,
        products,
      }
      //Mise en place lien avec API de la commande 
      const promiseOne = fetch('http://localhost:3000/api/products/order', {
        method: 'POST',
        body: JSON.stringify(toSend),
        headers: {
          'Content-type': 'application/json',
        },
      })

  // Pour voir le résultat du serveur dans la console
      promiseOne.then(async (response) => {
        try {
          const content = await response.json()
    
        if (response.ok &&shoppingCartLocalStorage) {
  // Aller vers la page confirmation
          window.location = `../html/confirmation.html?id=${content.orderId}`
      
        } else {
          console.log(`Réponse du serveur : `, response.status)
        }
      } catch (error) {
        console.log('Erreur qui vient du catch : ', error)
      }
    })
  })
})


    //Rajouter la quantité totale à côté du panier (nav bar) pour contrôle
    let cart = () => {
    let panier = document
    .getElementsByTagName('nav')[0]
    .getElementsByTagName('li')[1]

    letshoppingCartLocalStorage = JSON.parse(localStorage.getItem('products'))

    let sum = 0
    for (let q  in shoppingCartLocalStorage) {
    let loop = parseInt(shoppingCartLocalStorage[q].quantity)
    sum += loop
    }

    panier.innerHTML = `Panier <span id="test" style='color:purple'>${'('}${sum}${')'}</span>`
    } 
    cart()

//**II**// Basculement vers la page de confirmation
} else if (document.URL.includes('confirmation.html')){
    // Confirmation du numéro de commande
    const orderId = new URL(window.location.href).searchParams.get('id')
    let showCommand = () => {
        const idSelector = document.getElementById('orderId')

        idSelector.innerHTML = orderId

    }
    showCommand()
    localStorage.clear();
}

 