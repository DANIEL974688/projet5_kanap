let ProduitsValide = JSON.parse(localStorage.getItem("Produits")) ;
console.log(ProduitsValide)
////////////////////////////// Affichage des elements dans le panier 

if (ProduitsValide ===null || ProduitsValide ==0) {
  document.getElementById("cart__items").innerHTML +=`
   <div class="cart__item__img">
    <p> Votre panier est vide </p>
    </div>`
}else {      
  for (i=0; i < ProduitsValide.length; i++  ){
  
   document.getElementById("cart__items").innerHTML +=`    
  
    
      <article class="cart__item" data-id=${ProduitsValide[i].idChoisie} data-color="${ProduitsValide[i].ColorChoisie}">
    <div class="cart__item__img">
      <img src=${ProduitsValide[i].imageChoisie} alt=${ProduitsValide[i].AltTxtChoisie}>
    </div>
    <div class="cart__item__content">
      <div class="cart__item__content__titlePrice">
        <h2>${ProduitsValide[i].NomChoisie}</h2>
        <p>${ProduitsValide[i].PrixChoisie} €</p>
      </div>
      <div class="cart__item__content__settings">
      <p>Couleur : ${ProduitsValide[i].ColorChoisie}</p>
        <div class="cart__item__content__settings__quantity">
          <p>Qté :  </p>
          <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${ProduitsValide[i].quantite}">
        </div>
        <div class="cart__item__content__settings__delete">
          <p class="deleteItem">Supprimer</p>
        </div>
      </div>
    </div>
  </article> 
    `
  }
    
                                         // QUANTITE TOTAL DANS LE PANIER 
       
   function quantiteArticleTotal(ProduitsValide){
  
  const arrayQuantity = [];
   for (let sofa of ProduitsValide){
    arrayQuantity.push(sofa.quantite)
     const reducer = (previousValue, currentValue) => previousValue + currentValue;
     const totalQuantity = arrayQuantity.reduce(reducer)
    document.getElementById("totalQuantity").innerHTML = totalQuantity;
    
}

if(arrayQuantity.length === 0){
    document.querySelector("h1").innerHTML = "Panier vide";
    totalQuantity = "";
    document.getElementById("totalQuantity").innerHTML = totalQuantity;
}
}
///////////////////////////////////// Prix total

 function prixToltal(ProduitsValide) {
  let totalPriceQuantity = "";
  let arrayPrice = [];

for (let sofa of ProduitsValide){ 
    totalPriceQuantity = sofa.PrixChoisie * sofa.quantite
     arrayPrice.push(totalPriceQuantity)
      const reducer = (previousValue, currentValue) => previousValue + currentValue;
      const totalPrice = arrayPrice.reduce(reducer);
       document.getElementById("totalPrice").innerHTML = totalPrice
}
if(arrayPrice.length === 0){
    totalPriceQuantity = "";
    document.getElementById("totalPrice").innerHTML = totalPriceQuantity;
}
}

//////////////////////////////////////// DELETE ARTICLE
 
  const Delete = document.querySelectorAll(".deleteItem"); 
  
  Delete.forEach(tag => {
      const tagClosest = tag.closest("article");
      console.log(tagClosest)
      const id = tagClosest.dataset.id; 
      console.log(id)
      const article = tagClosest;
      console.log(article)
      const color = tagClosest.dataset.color;
      console.log(color)
  
      tag.addEventListener('click', event => {
          event.preventDefault();
          ProduitsValide.forEach(sofa => {
            console.log(sofa)
            console.log(sofa.idChoisie)
            console.log(sofa.ColorChoisie)
            console.log(id)
            console.log(color)
              if (sofa.idChoisie == id && sofa.ColorChoisie == color){ 
                  let index = ProduitsValide.indexOf(sofa) // récupération index du canapé
                  if(confirm("Voulez vous supprimer cet article de votre panier?")){
                    console.log(index)
                      article.remove(); // supprime du DOM
                      ProduitsValide.splice(index, 1); // on retire ce canapé du panier
                  }
              }
          })


      localStorage.setItem("Produits", JSON.stringify(ProduitsValide)); 
      prixToltal(ProduitsValide)
      quantiteArticleTotal(ProduitsValide)
       
        })
  })




///////////////////////////////////////////////////////////////////////// MODIF QUANTITY 


const tagQuantity = document.querySelectorAll(".itemQuantity");

tagQuantity.forEach(tag => {
    const tagClosest = tag.closest("article");
    let newQuantity = "";
    const id = tagClosest.dataset.id; 
    const color = tagClosest.dataset.color;
console.log(tagClosest)
console.log(id)
    tag.addEventListener('change', event => {
        event.preventDefault();
        newQuantity = Number(tag.value); // la nouvelle quantité est la value de la balise quantité
        ProduitsValide.forEach(sofa => { // Pour chaque canapé mis ds le panier, si l'id est le même que celui récupéré -> on cible le canapé 
            
            if (sofa.idChoisie == id  && sofa.ColorChoisie == color){ 
                sofa.quantite = newQuantity // la quantité des produits du panier se met à jour et devient égale à la nouvelle quantité
                
            }
            console.log(id)
            console.log(sofa.idChoisie)
            console.log(color)
            console.log(sofa.ColorChoisie)
            console.log(newQuantity)
            console.log(sofa)
            
        })

    localStorage.setItem("Produits", JSON.stringify(ProduitsValide)); 
    prixToltal(ProduitsValide)
    quantiteArticleTotal(ProduitsValide)
    })
})
}



                                        //  CONDITIONS FORMULAIRE

const firstNameErrorMsg = document.getElementById("firstNameErrorMsg");
const lastNameErrorMsg = document.getElementById("lastNameErrorMsg");
const addressErrorMsg = document.getElementById("addressErrorMsg");
const cityErrorMsg = document.getElementById("cityErrorMsg");
const emailErrorMsg = document.getElementById("emailErrorMsg");                                     
const buttonValidation = document.getElementById("order");

                     // CONDITION PRENOM
let verifPrenom = 0
let form1 = document.querySelector('#firstName')
 console.log(form1)
  form1.addEventListener('change', function(){
  valideNom(this)
});
const valideNom = function(inputNom){
  let RegExpNomCity = new RegExp (
    /^[a-zA-ZÀ-ÿ_-]{2,60}$/
  );

let testNom = RegExpNomCity.test(inputNom.value);
console.log(testNom)
if (testNom){
 verifPrenom = 1
}
else{
  firstNameErrorMsg.innerHTML = 'Veuillez renseigner ce champ' ;
}
};
                                      // CONDITION NOM 
let verifNom = 0
let form2 = document.querySelector('#lastName')
console.log(form2)
form2.addEventListener('change', function(){
  valideNom1(this)
});
const valideNom1 = function(inputNom){
  let RegExpNomCity = new RegExp (
    /^[a-zA-ZÀ-ÿ_-]{2,60}$/
  );

let testNom1 = RegExpNomCity.test(inputNom.value);
console.log(testNom1)
if (testNom1){
  let verifNom = 1
}
else{
  lastNameErrorMsg.innerHTML = 'Veuillez renseigner ce champ' ;
}
};
                                               // CONDITION ADRESSE 
let verifAdresse = 0
let form3 = document.querySelector('#address')
console.log(form3)
form3.addEventListener('change', function(){
  valideAddress(this)
});
const valideAddress = function(inputAddress){
  let RegExpAddress = new RegExp (
    /^[#.0-9a-zA-ZÀ-ÿ\s,-]{2,60}$/
  );

let testAddress = RegExpAddress.test(inputAddress.value);
console.log(testAddress)
if (testAddress){
  verifAdresse = 1
}
else{
  addressErrorMsg.innerHTML = 'Addresse non valide' ;
}
};
                                 // CONDITION VILLE
let villeVerif = 0
let form4 = document.querySelector('#city')
console.log(form4)
form4.addEventListener('change', function(){
  validecity(this)
});
const validecity = function(inputcity){
  let RegExpAddress = new RegExp (
    /^[a-zA-ZÀ-ÿ_-]{2,60}$/
  );

let testcity = RegExpAddress.test(inputcity.value);
console.log(testcity)
if (testcity){
  villeVerif = 1
}
else{
  cityErrorMsg.innerHTML = 'Ville non valide' ;
}
};
                                                // CONDITION MAIL 
let emailVerif = 0
let form = document.querySelector('#email')
console.log(form)
form.addEventListener('change', function(){
  valideEmail(this)
});
const valideEmail = function(inputEmail){
  let RegExpEmailValide = new RegExp (
    '^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-zA-Z]{2,3}$', 'g'
    );  
  let testEmail = RegExpEmailValide.test(inputEmail.value);
console.log(testEmail)
if (testEmail){
  emailVerif = 1
}
else{  
  emailErrorMsg.innerHTML = 'Adresse non Valide' ;
}
};


                                                             //   Envoi du formulaire à l'api
  function sendForm(ProduitsValide, contact){
    let products = [];

   /*for (let sofa of ProduitsValide){
        let productId = ProduitsValide.idChoisie;
        products.push(productId)
    }*/
    for (let i=0; i<ProduitsValide; i++){
      let productId = ProduitsValide.idChoisie;
        products.push(productId)
    
    }
    console.log(ProduitsValide)
    console.log(contact)
    fetch("http://localhost:3000/api/products/order", {
        method : "POST",
        headers : {"Content-Type" : "application/json"},
        body : JSON.stringify({contact, products}), 
    })
    .then(response => response.json())
    .then(data => {
      console.log(data)
        window.location = `confirmation.html?orderId=${data.orderId}` // redirection vers page confirmation
    })
    .catch(e => console.log("il y a une erreur sur la page cart de type :" + e));   
   
    console.log(products)
}


//function validateForm(ProduitsValide){
  const buttonValidate = document.getElementById("order");

  buttonValidate.addEventListener('click', event => {
    event.preventDefault();
    prenom = document.querySelector('#firstName').value;
    nom = document.querySelector('#lastName').value;
    adresse = document.querySelector('#address').value;
    ville = document.querySelector('#city').value;
    mail = document.querySelector('#email').value;

    const contact = {
      firstName : prenom,
      lastName : nom,
      address : adresse,
      city : ville,
      email : mail,
  }
  console.log(contact)
  console.log(firstNameErrorMsg)
  console.log(lastNameErrorMsg)
  console.log(addressErrorMsg)
  console.log(cityErrorMsg)
  console.log(prenom)
if ( (prenom,nom,adresse,ville,mail<1)   ){
  alert('veuillez remplir le formulaire')
  console.log("commande ok")
}
else if ( (emailVerif = 1) && (villeVerif = 1) && (verifAdresse =1)&& (verifNom =1)&& (verifPrenom = 1)){
  sendForm(ProduitsValide, contact)
  console.log("commande ok")
}else{
  console.log("erreur sur le formulaire")
  alert('verifier le formulaire, il comporte une ou plusieurs erreurs')
}
  
}


  )//}





prixToltal(ProduitsValide)
quantiteArticleTotal(ProduitsValide)
//validateForm(ProduitsValide)

let tagOrderId = document.querySelector("#orderId");
console.log(tagOrderId)
console.log(orderId)
 const urlConfirmation = window.location.search; 
  const urlSearchParams = new URLSearchParams(urlConfirmation);
   tagOrderId.innerHTML = urlSearchParams.get('orderId'); //récupère la clé orderId et l'insère dans le span
    localStorage.clear(); // vide le localStorage   

