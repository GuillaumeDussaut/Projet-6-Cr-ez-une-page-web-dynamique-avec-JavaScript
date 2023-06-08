async function getWorks() {
    try {
      const response = await fetch("http://localhost:5678/api/works");
      if (!response.ok) {
        throw new Error("500");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Erreur : ", error);
    }
}
  
async function getCategories() {
    try {
      const response = await fetch("http://localhost:5678/api/categories");
      if (!response.ok) {
        throw new Error("500");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Erreur : ", error);
    }
}
  
async function home() {
    const works = await getWorks();
    const categories = await getCategories();
  
    createWorksItem(works);
    createMiniature(works);
    fetchCategories(categories);
    btnsCategories(categories, works);
    console.log(categories);
}

home();
  
function btnsCategories(categories, works) {
    const btnsContainer = document.getElementById("categ");
  
    for (const category of categories) {
      const addBtn = document.createElement("button");
      addBtn.innerHTML = category.name;
      addBtn.classList.add("inactif");
  
      addBtn.addEventListener("click", function () {
        const categoryId = category.id;
        const filteredWorks = works.filter(work => work.category.id === categoryId);
        createWorksItem(filteredWorks);
        setActiveButton(this);
      });
  
      btnsContainer.appendChild(addBtn);
    }
  
    const btnT = document.getElementById("btnT");
    btnT.addEventListener("click", function () {
      createWorksItem(works);
      setActiveButton(this);
    });
}
function setActiveButton(button) {
    const buttons = document.querySelectorAll("#categ button");
    buttons.forEach(btn => {
      btn.classList.remove("actif");
      btn.classList.add("inactif");
    });
  
    button.classList.remove("inactif");
    button.classList.add("actif");
}
// création des works dans la galerie
function createWorksItem(works) {
    const galerie = document.getElementById("IDgallery");
    galerie.innerHTML = "";
    for (const work of works) {
      const addElt = document.createElement("figure");
      const addImg = document.createElement("img");
      const addFigc = document.createElement("figcaption");
  
      addImg.src = work.imageUrl;
      addImg.alt = work.title;
      addFigc.innerHTML = work.title;
  
      galerie.appendChild(addElt);
      addElt.appendChild(addImg);
      addElt.appendChild(addFigc);
    }
}
// création des miniatures
function createMiniature(works) {
    const miniaturesContainer = document.getElementById("miniaturesContainer");
    miniaturesContainer.innerHTML = ''; // Vide le conteneur des miniatures existantes
    for (const work of works) {
      const addElt = document.createElement("figure");
      const imgElement = document.createElement("img");
      const iconElt = document.createElement("i");
      iconElt.classList.add("far", "fa-trash-alt");
  
      imgElement.src = work.imageUrl;
  
      miniaturesContainer.appendChild(addElt);
      addElt.appendChild(imgElement);
      addElt.appendChild(iconElt);
    }
}
let categoriesCharged = false;
async function home() {
    const works = await getWorks();
  
    if (!categoriesCharged) {
      const categories = await getCategories();
      fetchCategories(categories);
      btnsCategories(categories, works);
      categoriesCharged = true;
    }
  
    createWorksItem(works);
    createMiniature(works);
} 
// catégories dans le formulaire
function fetchCategories(categories) {
    const selectElement = document.getElementById("categorieSelect");
    for (const category of categories) {
      const optionElement = document.createElement("option");
      optionElement.value = category.id;
      optionElement.textContent = category.name;
      selectElement.appendChild(optionElement);
    }
}



