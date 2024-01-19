// Create the map centered at the US L48 and zoom 5
let myMap = L.map("map", {
    center: [20.5335298, -99.9407924],
    zoom: 5,
});

// Insert the base layer to the map
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

d3.json("../Datasets/project_3.museums_mx.json").then(function (data){
    console.log(data)
    
    let estados = [];

    estados[0] = data[0].nom_ent;
    for (let j = 0; j < data.length; j++) {
      if(estados.includes(data[j].nom_ent)){
        ; 
      } else {
        estados.push(data[j].nom_ent);
      }
    }
    console.log(estados);
    

let dropdownMenu = d3.select("#selDataset");
    ///console.log(data[3].nom_ent)
    estados.forEach(function(nombre){
        ///console.log(data.nom_ent)
        dropdownMenu.append("option").text(nombre).property("value", nombre);
    });
    
    function optionChanged(selectedValue){
    console.log(selectedValue);
    
    
    //    for(let i=0; i<estados.length; i++){
    //        let 
    //    }
    }
    optionChanged();
});



//create a function to set the marker
//console.log(data[0].gmaps_latitud, data[0].gmaps_longitud)

/*
let markers = []
for (let i = 0; i < 30; i++) {
    let museo = data[i];
    let marker = L.marker([museo.gmaps_latitud, museo.gmaps_longitud])
      .bindPopup(`<h1>${museo.museo_nombre}</h1> <hr> <h3>Population ${museo.nom_ent.toLocaleString()}</h3>`)
      .addTo(myMap);
    markers.push(marker)
  }

  console.log(markers)




/*     let dropdownMenu = d3.select("#selDataset");
    console.log(data[3].nom_ent)
    data.forEach(function(nom_ent){
        console.log(data.nom_ent)
        dropdownMenu.append("option").text(nom_ent).property("value", nom_ent);
    }); */

    //function findUniqueValues(markers) { return markers.filter((nom_ent, museo, self) => { return self.indexOf(nom_ent) === museo; }); }



