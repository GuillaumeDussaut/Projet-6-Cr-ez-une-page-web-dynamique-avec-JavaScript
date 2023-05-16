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