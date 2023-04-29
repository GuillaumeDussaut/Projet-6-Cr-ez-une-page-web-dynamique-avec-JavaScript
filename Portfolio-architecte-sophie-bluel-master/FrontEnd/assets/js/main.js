
const galerie = document.getElementById("IDgallery")
fetch("http://localhost:5678/api/works")
    .then( data => data.json() )
    .then(data => {       
        console.log(data);
        for (let i = 0; i < data.length; i++){
            const addElt = document.createElement("figure");
            const addImg = document.createElement("img");
            const addFig = document.createElement("figcaption");
            
            addImg.src = data[i].imageUrl;
            addImg.alt = data[i].title;
            addFig.innerHTML = data[i].title;
            addElt.classList.add(data[i].category.id);

            galerie.appendChild(addElt);
            addElt.appendChild(addImg);
            addElt.appendChild(addFig);
        }
        
    });



