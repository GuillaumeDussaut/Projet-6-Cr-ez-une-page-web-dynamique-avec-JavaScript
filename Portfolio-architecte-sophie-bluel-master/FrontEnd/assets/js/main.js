async function getWorks(){
    try {
        const response = await fetch("http://localhost:5678/api/works")
        if(!response.ok){
            throw new Error('500')
        }
        const data = await response.json()
        // console.log(data)
        return data
    } catch (error) {
        console.error("Erreur : ", error)
    }
}

async function getCategories(){
    try {
        const response = await fetch("http://localhost:5678/api/categories")
        if(!response.ok){
            throw new Error('500')
        }
        const data = await response.json()
        // console.log(data)
        return data
    } catch (error) {
        console.error("Erreur : ", error)
    }
}

async function home(){
    const works = await getWorks()
    const categories = await getCategories()

    createWorksItem(works)

    btnsCategories(categories, works)
    console.log(categories);
}

home();

//  création des boutons et ajout de leurs noms

function btnsCategories(categories, works){
    const btnsContainer = document.getElementById("categ");

    for (const categorie of categories) {
        const addBtn = document.createElement("BUTTON");
        addBtn.innerHTML = categorie.name;      
        addBtn.classList.add("inactif");
        
        // filtre catégories avec fonction au click
        addBtn.addEventListener('click', function(){
            const categorieId = categorie.id;
            const filteredWorks = works.filter(work => work.category.id === categorieId);
            createWorksItem(filteredWorks);
            setActiveButton(this);
        });

        btnsContainer.appendChild(addBtn);
    }

    // for (let i = 0; i < categories.length; i++){
    //     const addBtn = document.createElement("BUTTON");
    //     addBtn.innerHTML = categories[i].name;      
    //     addBtn.classList.add("inactif");
        
    //     // filtre catégories avec fonction au click
        
    //     addBtn.addEventListener('click', function(){
    //         const categorieId = categories[i].id;
    //         const filteredWorks = works.filter(work => work.category.id === categorieId);
    //         createWorksItem(filteredWorks);
    //         setActiveButton(this);
    //     });

        const btnT = document.getElementById("btnT");
        btnT.addEventListener('click', function(){
            createWorksItem(works);
            setActiveButton(this);
        });

        // btnsContainer.appendChild(addBtn);
    // }
}

// changement de classe pour les boutons 

function setActiveButton(button) {
    const buttons = document.querySelectorAll("#categ button");
    buttons.forEach(btn => {
        btn.classList.remove("actif");
        btn.classList.add("inactif");
    });

    button.classList.remove("inactif");
    button.classList.add("actif");
}

//  partie pour afficher les images

function createWorksItem(works){
    const galerie = document.getElementById("IDgallery")
    galerie.innerHTML = "";
    for (const work of works) {
        const addElt = document.createElement("figure");
        const addImg = document.createElement("img");
        const addFigc = document.createElement("figcaption");
        const idImg = work.category.id;

        addImg.src = work.imageUrl;
        addImg.alt = work.title;
        addFigc.innerHTML = work.title;
        
        
        galerie.appendChild(addElt);
        addElt.appendChild(addImg);
        addElt.appendChild(addFigc);
    }
    // for (let i = 0; i < data.length; i++){
    //     const addElt = document.createElement("figure");
    //     const addImg = document.createElement("img");
    //     const addFigc = document.createElement("figcaption");
    //     const idImg = data[i].category.id;

    //     addImg.src = data[i].imageUrl;
    //     addImg.alt = data[i].title;
    //     addFigc.innerHTML = data[i].title;
        
        
    //     galerie.appendChild(addElt);
    //     addElt.appendChild(addImg);
    //     addElt.appendChild(addFigc);
    // }    
}
