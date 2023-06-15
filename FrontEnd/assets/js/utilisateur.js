const token = localStorage.getItem("token");
const bandeauConnecte = document.getElementById("bandeau");
const divModifier = document.querySelectorAll(".modifier");
const btns = document.getElementById("categ");
const login = document.getElementById("login");
const logout = document.getElementById("logout");

if (token) {
  // Utilisateur connecté
  bandeauConnecte.classList.remove("deconnecte");
  btns.classList.add("deconnecte");
  divModifier.forEach((btns) => {
    btns.classList.remove("deconnecte");
  login.style.display = "none";
  logout.style.display = "flex"
  });
} else {
  // Utilisateur déconnecté
  bandeauConnecte.classList.add("deconnecte");
  divModifier.forEach((div) => {
    div.classList.add("deconnecte");
    div.classList.remove("modifier");
  });
  login.style.display = "flex";
  logout.style.display = "none"
  
}
function logOut(){
  localStorage.removeItem("token");
  location.reload();
}
logout.addEventListener('click', logOut);
const modifGalerie = document.getElementById("modifGalerie");
const modale = document.getElementById("contMiniat");
const closeButtons = document.querySelectorAll("#close, #close2");
const btnPrevious = document.getElementById("previous");
const modaleAjoutPhoto = document.getElementsByClassName("ajoutPhoto")[0];
const modalePrincipale = document.getElementsByClassName("modaleGalerie")[0];
const btnAjout = document.getElementById("btnAjout");

modifGalerie.addEventListener("click", function () {
  modale.style.display = "flex";
  modaleAjoutPhoto.style.display = "none";
});

closeButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    modale.style.display = "none";
    modalePrincipale.style.display = "flex";
    modaleAjoutPhoto.style.display = "none";
    document.getElementById("imgContainer").innerHTML = "";
    document.getElementById("befImg").style.display = "flex";
    document.getElementById("errorMsg").innerHTML = "";
    document.getElementById("valider").style.background = "#A7A7A7";
    document.getElementById("titreInput").value = "";
    document.getElementById("categorieSelect").value = "";
  });
});

btnPrevious.addEventListener("click", function () {
  modaleAjoutPhoto.style.display = "none";
  modalePrincipale.style.display = "flex";
  document.getElementById("imgContainer").innerHTML = "";
  document.getElementById("befImg").style.display = "flex";
  document.getElementById("errorMsg").innerHTML = "";
  document.getElementById("valider").style.background = "#A7A7A7";
  document.getElementById("titreInput").value = "";
  document.getElementById("categorieSelect").value = "";
});

btnAjout.addEventListener("click", function () {
  modaleAjoutPhoto.style.display = "flex";
  modalePrincipale.style.display = "none";
});

function afficherImage(input) {
  const file = input.files[0];
  if (file) {
    if (file.type.startsWith("image/")) {
      if (file.size <= 4 * 1024 * 1024) {
        const reader = new FileReader();

        reader.onload = function (e) {
          const imgElement = document.createElement("img");
          imgElement.setAttribute("src", e.target.result);
          imgElement.setAttribute("alt", file.name);

          document.getElementById("imgContainer").appendChild(imgElement);
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

async function addWorks() {
  const url = "http://localhost:5678/api/works";
  const titre = document.getElementById("titreInput").value;
  const categorie = document.getElementById("categorieSelect").value;
  const fichierImage = document.getElementById("ajouterPhoto").files[0];

  console.log(titre, categorie, fichierImage);

  const formData = new FormData();
  formData.append("title", titre);
  formData.append("image", fichierImage);
  formData.append("category", parseInt(categorie));

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`
      },
      body: formData
    });

    if (response.ok) {
      console.log("Données envoyées avec succès !");
      modale.style.display = "none";
      modalePrincipale.style.display = "flex";
      modaleAjoutPhoto.style.display = "none";

      document.getElementById("imgContainer").innerHTML = "";
      document.getElementById("befImg").style.display = "flex";
      document.getElementById("errorMsg").innerHTML = "";
      document.getElementById("valider").style.background = "#A7A7A7";
      document.getElementById("titreInput").value = "";
      document.getElementById("categorieSelect").value = "";
      home();
    } else {
      console.error("Une erreur s'est produite lors de l'envoi des données.");
    }
  } catch (error) {
    console.error("Une erreur s'est produite lors de la requête :", error);
  }
}
const validerBtn = document.getElementById("valider");
validerBtn.addEventListener("click", addWorks);

function verifierChamps() {
  const titre = document.getElementById("titreInput").value;
  const categorie = document.getElementById("categorieSelect").value;
  const fichierImage = document.getElementById("ajouterPhoto").files[0];
  const errorMsg = document.getElementById("errorMsg");

  if (titre !== "" && categorie !== "" && fichierImage) {
    validerBtn.style.background = "#1D6154";
    errorMsg.innerHTML = "";
    const imgContainer = document.getElementById("imgContainer");
    const img = imgContainer.querySelector("img");
    img.alt = titre;

    validerBtn.removeEventListener("click", addWorks);
    validerBtn.addEventListener("click", addWorks);
  } else {
    validerBtn.style.background = "#A7A7A7";
    errorMsg.innerHTML = "Veuillez remplir tous les champs et sélectionner une image.";
    validerBtn.removeEventListener("click", addWorks);
  }
}

document.getElementById("ajouterPhoto").addEventListener("change", function () {
  const input = this;
  document.getElementById("imgContainer").style.display = "flex";
  document.getElementById("befImg").style.display = "none";
  afficherImage(input);
  verifierChamps();
});

document.getElementById("ajouterPhoto").addEventListener("input", verifierChamps);
document.getElementById("titreInput").addEventListener("input", verifierChamps);
document.getElementById("categorieSelect").addEventListener("change", verifierChamps);

// suppression de photos
const containerSuppr = document.getElementById("miniaturesContainer");
function supprWorks(event) {
  // Récupérer l'élément <figure> parent du bouton cliqué
  const figureElement = event.target.closest("figure");

  // Effectuer une requête GET à l'API pour récupérer les informations des images
  fetch("http://localhost:5678/api/works", {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`
    },
  })
  .then(response => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error("Une erreur s'est produite lors de la récupération des informations des images.");
    }
  })
  .then(data => {
    // Récupérer l'index de l'élément <figure> correspondant dans le tableau des images
    const index = Array.from(figureElement.parentNode.children).indexOf(figureElement);

    // Vérifier si l'index est valide
    if (index >= 0 && index < data.length) {
      // Récupérer l'ID de l'image à supprimer à partir des informations obtenues de l'API
      const imageId = data[index].id;
      // Effectuer une requête DELETE à l'API pour supprimer l'image
      fetch("http://localhost:5678/api/works/" + imageId, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`
        },
      })
      .then(response => {
        if (response.ok) {
          // Supprimer l'élément <figure> correspondant à l'image
          figureElement.remove();
          home();
        } else {
          throw new Error("Une erreur s'est produite lors de la suppression de l'image.");
        }
      })
      .catch(error => {
        console.error("Une erreur s'est produite lors de la suppression de l'image:", error);
      });
    } else {
      throw new Error("Index invalide pour l'élément <figure>.");
    }
  })
  .catch(error => {
    console.error("Une erreur s'est produite lors de la récupération des informations des images:", error);
  });
}

containerSuppr.addEventListener("click", supprWorks);


