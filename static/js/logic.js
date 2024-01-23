// Create the map centered at TX
let myMap = L.map("map", {
  center: [20.5335298, -99.9407924],
  zoom: 5,
});

// Insert the base layer to the map
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

// Create empty initial bar chart
let bar_a = [{
  type: "bar",
  x: [],
  y: [],
  orientation: "h",
}];

let layout1 = {
  title: 'Bar Chart 1',
  width: 900,  // Adjust the width to make it smaller
  height: 500, // Adjust the height to make it smaller
};

Plotly.newPlot("bar", bar_a, layout1);

// Create empty initial second bar chart
let bar_a2 = [{
  type: "bar",
  x: [],
  y: [],
  orientation: "h",
}];

let layout2 = {
  title: 'Bar Chart 2',
  width: 1000,  // Adjust the width to make it smaller
  height: 500, // Adjust the height to make it smaller
};

Plotly.newPlot("bar2", bar_a2, layout2);

d3.json("../Datasets/project_3.museums_mx.json").then(function (data) {
  let estados = [];
  estados[0] = data[0].nom_ent;
  for (let j = 0; j < data.length; j++) {
    if (estados.includes(data[j].nom_ent)) {
      ;
    } else {
      estados.push(data[j].nom_ent);
    }
  };

  let dropdownMenu = d3.select("#selDataset");
  estados.forEach(function (nombre) {
    dropdownMenu.append("option").text(nombre).property("value", nombre);
  });
});

function plots(name_value) {
  // Clear previous markers
  myMap.eachLayer(function (layer) {
    if (layer instanceof L.Marker) {
      layer.remove();
    }
  });

  d3.json("../Datasets/project_3.museums_mx.json").then(function (records) {
    let name_a = records.filter(rec => rec.nom_ent === name_value);

    let temas = {};
    for (r of name_a) {
      if (temas[r.museo_tematica_n1]) {
        temas[r.museo_tematica_n1] += 1;
      } else {
        temas[r.museo_tematica_n1] = 1;
      }
    };

    let bar_y = Object.keys(temas);
    let bar_x = Object.values(temas);

    // Update the first bar chart
    Plotly.update("bar", { x: [bar_x], y: [bar_y] });

    // Create a dictionary for the second bar chart
    let museos = {};
    records.forEach(function (record) {
      if (museos[record.nom_ent]) {
        museos[record.nom_ent] += 1;
      } else {
        museos[record.nom_ent] = 1;
      }
    });

    let bar_y2 = Object.keys(museos);
    let bar_x2 = Object.values(museos);

    // Update the second bar chart
    Plotly.update("bar2", { x: [bar_x2], y: [bar_y2] });

    // Add markers to the map
    let markers = [];
    for (let i = 0; i < name_a.length; i++) {
      let marker = L.marker([name_a[i].gmaps_latitud, name_a[i].gmaps_longitud])
        .bindPopup(`<h1>${name_a[i].museo_nombre}</h1> <hr> 
        <h3>Municipio: ${name_a[i].nom_mun}</h3> <hr> 
        <h3>Localidad: ${name_a[i].nom_loc}</h3>`)
        .addTo(myMap);
      markers.push(marker);
    }
  });
};

function optionChanged(selectedValue) {
  plots(selectedValue);
}
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
  } */







function optionChanged(selectedValue){
  /* console.log(selectedValue); */
  Plotly.purge("bar");
  plots(selectedValue);
}


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
  } */


