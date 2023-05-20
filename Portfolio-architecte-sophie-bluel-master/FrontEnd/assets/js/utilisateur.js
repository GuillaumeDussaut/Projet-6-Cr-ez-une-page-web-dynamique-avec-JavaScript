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
  
});

closeButtons.forEach(function(button) {
  button.addEventListener('click', function(){
    modale.style.display = "none";
    modalePrincipale.style.display ='flex';
    modaleAjoutPhoto.style.display = "none";
  });
});

btnPrevious.addEventListener('click', function(){
  modaleAjoutPhoto.style.display ='none';
  modalePrincipale.style.display='flex';
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
