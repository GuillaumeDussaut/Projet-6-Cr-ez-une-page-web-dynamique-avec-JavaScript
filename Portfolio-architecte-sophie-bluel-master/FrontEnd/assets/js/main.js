

// let imgElt = document.createElement("img")
// imgElt.src = "http://localhost:5678/images/abajour-tahina1651286843956.png"
// imgElt.alt = "Abajour Tahina"
// // imgElt.width = "100"

// const introContainer = document.getElementById("introduction")
// introContainer.appendChild(imgElt)

// console.log(imgElt)

// fetch("http://localhost:5678/api/works")
// .then( data => data.json() )
// .then(data => {
//     console.log(data)
// })
// .catch(error => console.log("erreur"))



// const figureElt = document.createElement("figure");
// const imgElt = document.createElement("img");
// const figcaptElt = document.createElement("figcaption");
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

            galerie.appendChild(addElt);
            addElt.appendChild(addImg);
            addElt.appendChild(addFig);
        }
        
    });


