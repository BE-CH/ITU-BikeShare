
function loadAllBikes(){
    Object.keys(bikeTypes).forEach(key => {
        console.log(bikeTypes[key]);
        let container = document.createElement("div");
        container.setAttribute("class", "bikeCard");

        let titleCon = document.createElement("h3");
        let titleTxt = document.createTextNode(bikeTypes[key].title);
        titleCon.appendChild(titleTxt);

        let image = document.createElement("img");
        image.setAttribute("src", "../images/"+bikeTypes[key].img);
        
        let descriptionCon = document.createElement("p");
        let descriptionTxt = document.createTextNode(bikeTypes[key].description);
        descriptionCon.appendChild(descriptionTxt);

    let descriptionCon = document.createElement('p');
    let descriptionTxt = document.createTextNode(allbikes[key].description);
    descriptionCon.appendChild(descriptionTxt);

    container.append(titleCon, image, descriptionCon);
    document.getElementById('bikeOverview').appendChild(container);
  });
}
