
// Create the map, originally centered at TX
let myMap = L.map("map", {
  center: [18.5335298, -99.9407924],
  zoom: 5.4,
});

// Insert the base layer to the map
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  /* link: 'Powered by <a href="https://www.geoapify.com/">Geoapify</a>', */
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors', 
}).addTo(myMap);

// Create empty initial bar chart
let bar_a = [{
  type: "bar",
  x: [],
  y: [],
  orientation: "h",
}];

let layout1 = {
  title: 'Quantity of museums in selected state, per topic',
  width: '100%',  // Adjust the width to make it smaller
  height: 500, // Adjust the height to make it smaller
  yaxis: { automargin: true },
};

Plotly.newPlot("bar", bar_a, layout1);

d3.json("../Datasets/project_3.museums_mx_csv.json").then(function (data) {
  let estados = [];
  estados[0] = data[0].nom_ent; 
  let cantidades = [];
  let suma = 1;
  for (let j = 1; j < data.length; j++) {
    if (estados.includes(data[j].nom_ent)) {
      suma ++;
    } else {
      cantidades.push(suma);
      estados.push(data[j].nom_ent);
      suma = 1;
    }
  };
  cantidades.push(suma);

  plotBubble(estados, cantidades);

  let dropdownMenu = d3.select("#selDataset");
  dropdownMenu.append("option").text("Select a state...");
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

  d3.json("../Datasets/project_3.museums_mx_csv.json").then(function (records) {
    let name_a = records.filter(rec => rec.nom_ent === name_value);

    let temas = {};
    for (r of name_a) {
      if (temas[r.museo_tematica_n1]) {
        temas[r.museo_tematica_n1] += 1;
      } else {
        temas[r.museo_tematica_n1] =  1;
      }
    };

    let bar_y = Object.keys(temas).sort();
    let bar_x = Object.values(temas);

    // Update the first bar chart
    Plotly.update("bar", { x: [bar_x], y: [bar_y] });

    // Add markers to the map
    let markers = [];
    for (let i = 0; i < name_a.length; i++) {
      let marker = L.marker([name_a[i].gmaps_latitud, name_a[i].gmaps_longitud])
        .bindPopup(`<h1>${name_a[i].museo_nombre}</h1> <hr> 
         <h3>Municipio: ${name_a[i].nom_mun}</h3> <hr> 
         <h3>Temática: ${name_a[i].museo_tematica_n1}</h3>
         <h3>Adscripción: ${name_a[i].museo_adscripcion}</h3>
         <h3>Teléfono: ${name_a[i].museo_telefono1}</h3>
         <h3>Web: ${name_a[i].pagina_web}</h3>`)
        .addTo(myMap);
      markers.push(marker);
    }
  });
}

function optionChanged(selectedValue) {
  plots(selectedValue);
}

function plotBubble(estados, cantidades){
  console.log(estados);
  console.log(cantidades);
  
/*   let chart = c3.generate({
    bindto : "#bar2",
    data : {
      x : "x", 
      columns : [["x"].concat(estados), ["y"].concat(cantidades),],
      type : "scatter",
    },
    type : bubble, 
  }); */

    let bubble_a = [{
    x: estados,
    y: cantidades,
    mode: "markers",
    marker: {
      size: cantidades.map(c => Math.sqrt(20 * c)), 
      color: cantidades,
      colorscale: "Jet",
    },
  }];

  let layout2 = {
    title: 'Quantity of museums per state',
    width: '100%',  // Adjust the width to make it smaller
    height: 500, // Adjust the height to make it smaller
    xaxis: { automargin: true },
  };

  Plotly.newPlot("bar2", bubble_a, layout2); 
  /* Plotly.newPlot("bar2", chart);  */
};