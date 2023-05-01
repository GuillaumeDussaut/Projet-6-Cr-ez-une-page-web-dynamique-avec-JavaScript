
const galerie = document.getElementById("IDgallery")
fetch("http://localhost:5678/api/works")
    .then( data => data.json() )
    .then(data => {       
        for (let i = 0; i < data.length; i++){
            const addElt = document.createElement("figure");
            const addImg = document.createElement("img");
            const addFigc = document.createElement("figcaption");
            const idImg = data[i].category.id;

            addImg.src = data[i].imageUrl;
            addImg.alt = data[i].title;
            addFigc.innerHTML = data[i].title;
            addElt.setAttribute('id','figure'+idImg);
            
            galerie.appendChild(addElt);
            addElt.appendChild(addImg);
            addElt.appendChild(addFigc);
        }    
    });

    // partie btns
  
fetch("http://localhost:5678/api/works")
    .then(data => data.json())
    .then(data => {

// Tous
      const btnTous = document.querySelector('.Tous');

      function Tous() {
        const figures = document.querySelectorAll('.gallery figure');
        figures.forEach(figure => figure.classList.remove('none'));
        figures.forEach(figure => figure.classList.add('block'));    
      }

      btnTous.addEventListener('click', Tous);

 // Objets

      const btnObj = document.querySelector('.Objets');

      function Objets() { 
        const figures = document.querySelectorAll('.gallery figure');
        figures.forEach(figure => figure.classList.add('none'));
      
        const idObjet = document.querySelectorAll('#figure1');
        idObjet.forEach(idObjet => idObjet.classList.remove('none'));
        idObjet.forEach(idObjet => idObjet.classList.add('block'));
      }

      btnObj.addEventListener('click', Objets);

    //   appartements

    const btnAppart = document.querySelector('.Appartements');

    function appart() {
        const figures = document.querySelectorAll('.gallery figure');
        figures.forEach(figure => figure.classList.add('none'));
     
        const idObjet = document.querySelectorAll('#figure2');
        idObjet.forEach(idObjet => idObjet.classList.remove('none'));
        idObjet.forEach(idObjet => idObjet.classList.add('block'));  
    }

    btnAppart.addEventListener('click', appart);

    // hotels restaurants 

    const btnHotel = document.querySelector('.hotelResto');
    function hotel() {  
        const figures = document.querySelectorAll('.gallery figure');
        figures.forEach(figure => figure.classList.add('none'));

        const idObjet = document.querySelectorAll('#figure3');
        idObjet.forEach(idObjet => idObjet.classList.remove('none'));
        idObjet.forEach(idObjet => idObjet.classList.add('block'));  
        console.log(idObjet); 
        console.log(data); 
    }

    btnHotel.addEventListener('click', hotel); 
});
   


