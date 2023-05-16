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
const close = document.getElementById("close");

// Vérifiez la valeur de token avant d'ajouter l'écouteur d'événements
if (token) {
  modifGalerie.addEventListener('click', function() {
    modale.style.display = "flex";
  });
  close.addEventListener('click', function(){
    modale.style.display = "none";
  })
}
