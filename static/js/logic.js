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
  width: '100%',  // Adjust the width to make it smaller
  height: 500, // Adjust the height to make it smaller
  yaxis: { automargin: true },
};

Plotly.newPlot("bar", bar_a, layout1);

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

// Create empty initial second bubble chart
let bubble_a = [{
  type: "scatter",
  mode: "markers",
  x: [],
  y: [],
  marker: {
    size: [],
    sizemode: "diameter",
    color: "blue",
    opacity: 0.8,
    line: {
      color: "white",
      width: 1
    }
  }
}];

let bubbleLayout = {
  title: 'Bubble Chart',
  width: '100%',
  height: 500,
};

Plotly.newPlot("bar2", bubble_a, bubbleLayout);

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


    let bubbleData = Object.values(museos);

    // Update the bubble chart
    Plotly.update("bar2", {
      x: bubbleData.map(data => data.lon),
      y: bubbleData.map(data => data.lat),
      marker: { size: bubbleData.map(data => data.size * 10) } // Adjust the factor for a suitable size
    });

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
}

function optionChanged(selectedValue) {
  plots(selectedValue);
}

