
const galerie = document.getElementById("IDgallery")
fetch("http://localhost:5678/api/works")
    .then( data => data.json() )
    .then(data => {       
        for (let i = 0; i < data.length; i++){
            const addElt = document.createElement("figure");
            const addImg = document.createElement("img");
            const addFig = document.createElement("figcaption");
            
            addImg.src = data[i].imageUrl;
            addImg.alt = data[i].title;
            addFig.innerHTML = data[i].title;

            galerie.appendChild(addElt);
            addElt.appendChild(addImg);
            addElt.appendChild(addFig);
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
        console.log(data);
      }
      btnTous.addEventListener('click', Tous);

 // Objets

      const btnObj = document.querySelector('.Objets');
      function Objets() {  

          const figObj = document.querySelectorAll('.gallery figure');
          figObj.forEach(figObj => figObj.classList.remove('block'));
          figObj.forEach(figObj => figObj.classList.add('none'));
      }
      btnObj.addEventListener('click', Objets);

    //   appartements

    const btnAppart = document.querySelector('.Appartements');
    function appart() {
      const figures = document.querySelectorAll('.gallery figure');
      figures.forEach(figure => figure.classList.remove('none'));
      figures.forEach(figure => figure.classList.add('block'));
      console.log(data);
    }
    btnAppart.addEventListener('click', appart);

    // hotel restaurants 

    const btnHotel = document.querySelector('.hotelResto');
    function hotel() {  
        const figObj = document.querySelectorAll('.gallery figure');
        figObj.forEach(figObj => figObj.classList.remove('block'));
        figObj.forEach(figObj => figObj.classList.add('none'));
    }
    btnHotel.addEventListener('click', hotel);
    
});
   


