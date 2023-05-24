const token = localStorage.getItem('token');
const bandeauConnecte = document.getElementById('bandeau');
const divModifier = document.querySelectorAll('.modifier');
const btns = document.getElementById('categ');

if (token) {
  // Utilisateur connecté
  bandeauConnecte.classList.remove('deconnecte');
  btns.classList.add('deconnecte');
  divModifier.forEach((div) => {
    div.classList.remove('deconnecte');
  });
} else {
  // Utilisateur déconnecté
  bandeauConnecte.classList.add('deconnecte');
  divModifier.forEach((div) => {
    div.classList.add('deconnecte');
    div.classList.remove('modifier');
  });
}

// modale principale

const modifGalerie = document.getElementById("modifGalerie");
const modale = document.getElementById("contMiniat");
const closeButtons = document.querySelectorAll("#close, #close2");
const btnPrevious = document.getElementById('previous');
const modaleAjoutPhoto = document.getElementsByClassName('ajoutPhoto')[0];
const modalePrincipale = document.getElementsByClassName('modaleGalerie')[0];
const btnAjout = document.getElementById('btnAjout');

modifGalerie.addEventListener('click', function() {
  modale.style.display = "flex";
  modaleAjoutPhoto.style.display = "none";
  
});

closeButtons.forEach(function(button) {
  button.addEventListener('click', function(){
    modale.style.display = "none";
    modalePrincipale.style.display ='flex';
    modaleAjoutPhoto.style.display = "none"; 
    document.getElementById("imgContainer").innerHTML = "";
    document.getElementById("befImg").style.display = "flex";
    document.getElementById('errorMsg').innerHTML = ""; 
    document.getElementById("valider").style.background = "#A7A7A7";
    document.getElementById("titreInput").value = "";
    document.getElementById("categorieSelect").value = "";
  });
});

btnPrevious.addEventListener('click', function(){
  modaleAjoutPhoto.style.display ='none';
  modalePrincipale.style.display='flex';
  document.getElementById("imgContainer").innerHTML = "";
  document.getElementById("befImg").style.display = "flex";
  document.getElementById('errorMsg').innerHTML = "";
  document.getElementById("valider").style.background = "#A7A7A7";
  document.getElementById("titreInput").value = "";
  document.getElementById("categorieSelect").value = "";
});

btnAjout.addEventListener('click', function(){
  modaleAjoutPhoto.style.display ='flex';
  modalePrincipale.style.display='none';
});

// galerie miniatures 

const miniaturesContainer = document.getElementById('miniaturesContainer');

fetch('http://localhost:5678/api/works')
  .then(response => response.json()) 
  .then(data => {
    data.forEach(image => {
      const addElt = document.createElement("figure");
      const imgElement = document.createElement('img');
      const iconElt = document.createElement('i');
      iconElt.classList.add('far', 'fa-trash-alt');

      imgElement.src = image.imageUrl;
      
      miniaturesContainer.appendChild(addElt);
      addElt.appendChild(imgElement);
      addElt.appendChild(iconElt);
    });
  })
  .catch(error => {
    console.error('Une erreur s\'est produite lors de la récupération des images:', error);
  });

// ajout et suppression d'images 
// ajout 

function afficherImage(input) {
  const file = input.files[0];

  // Vérifier si un fichier est sélectionné
  if (file) {
    // Vérifier le type de fichier
    if (file.type.startsWith("image/")) {
      // Vérifier la taille du fichier (4Mo maximum)
      if (file.size <= 4 * 1024 * 1024) {
        const reader = new FileReader();

        reader.onload = function (e) {
          const imageElement = document.createElement("img");
          imageElement.setAttribute("src", e.target.result);
          imageElement.setAttribute("alt", "Image sélectionnée");
          document.getElementById("imgContainer").appendChild(imageElement);
        };

        reader.readAsDataURL(file);
      } else {
        alert("La taille du fichier est supérieure à 4 Mo.");
      }
    } else {
      alert("Le fichier sélectionné n'est pas une image.");
    }
  }
}
// fonction écriture, inscription de l'image dans la bdd
function enregistrerImg(){

  console.log('ok');
}
// Fonction pour vérifier si tous les champs sont remplis
function verifierChamps() {
  const titre = document.getElementById("titreInput").value;
  const categorie = document.getElementById("categorieSelect").value;
  const fichierImage = document.getElementById("ajouterPhoto").files[0];
  const errorMsg = document.getElementById('errorMsg');
  const validerBtn = document.getElementById("valider");

  

  if (titre !== "" && categorie !== "" && fichierImage) {
    validerBtn.style.background = "#1D6154";
    errorMsg.innerHTML = "";
    const imgContainer = document.getElementById('imgContainer');
    const img = imgContainer.querySelector("img");
    img.alt = titre;
    
    validerBtn.addEventListener('click', enregistrerImg);
    
  } else {
    validerBtn.style.background = "#A7A7A7";
    errorMsg.innerHTML = "Veuillez remplir tous les champs et sélectionner une image.";
  }
}

// Écouteur d'événement pour le changement de fichier dans l'input de type file
document.getElementById("ajouterPhoto").addEventListener("change", function () {
  const input = this;
  document.getElementById("imgContainer").style.display = "flex";
  document.getElementById("befImg").style.display = "none";
  afficherImage(input);
  verifierChamps(); // Vérifier les champs après le changement de fichier
});

// Écouteur d'événement pour le changement dans le champ image
document.getElementById("ajouterPhoto").addEventListener("input", verifierChamps);
// Écouteur d'événement pour le changement dans le champ titre
document.getElementById("titreInput").addEventListener("input", verifierChamps);
// Écouteur d'événement pour le changement dans le champ catégorie
document.getElementById("categorieSelect").addEventListener("change", verifierChamps);

