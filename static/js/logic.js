
// Create the map
let myMap = L.map("map", {
  center: [21.5335298, -99.9407924],
  zoom: 5,
});

// Insert the base layer to the map
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors', 
}).addTo(myMap);

// Create empty initial bar chart
function init(){
  let bar_a = [{
    type: "bar",
    x: [],
    y: [],
    orientation: "h",
  }];

  let layout1 = {
    title: 'Quantity of museums in selected state, per topic',
    width: "100%",  // Adjust the width to make it smaller
    height: 400, // Adjust the height to make it smaller
    yaxis: { automargin: true },
  };

  Plotly.newPlot("bar", bar_a, layout1);
};

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

  plotApex(estados, cantidades);
  
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

    // Update bar chart
    Plotly.update("bar", { x: [bar_x], y: [bar_y] });

    // Add markers to the map
    let markers = [];
    for (let i = 0; i < name_a.length; i++) {
      let marker = L.marker([name_a[i].gmaps_latitud, name_a[i].gmaps_longitud])
        .bindPopup(`<h3>${name_a[i].museo_nombre}</h3> 
         <h4>Municipio: ${name_a[i].nom_mun}</h4> 
         <h4>Temática: ${name_a[i].museo_tematica_n1}</h4>
         <h4>Adscripción: ${name_a[i].museo_adscripcion}</h4>
         <h4>Teléfono: ${name_a[i].museo_telefono1}</h4>
         <h4>Web: ${name_a[i].pagina_web}</h4>`)
        .addTo(myMap);
      markers.push(marker);
    }
  });
}

function optionChanged(selectedValue) {
  plots(selectedValue);
}

function plotApex(estados, cantidades){
  let c = cantidades.map((e, i) => [i+1, cantidades[i], cantidades[i]]);
  let options = {
    series: [{
      name: "museums",
      data: c,
    }],
    chart: {
      animations: {
        enabled: true,
        speed: 5000,
      },
      height: 400,
      width: 950,
      type: "bubble",
    },
    fill: {
      opacity: 0.6,
    },
    title: {
      text: 'Quantity of museums per state',
      align: "center",
      style: {
        fontSize: "20px",
        fontWeight: "light",
      }
    },
    xaxis: {
      type: 'category',
      categories: estados,
      tickAmount: 31,
    },
    plotOptions: {
      bubble: {
        zScaling: false,
        minBubbleRadius: undefined,
        maxBubbleRadius: undefined,
      }
    },
    theme: {
      palette: 'palette10' // upto palette10
    },
    tooltip: {
      theme : "dark",
    }
  }
  
  let chart = new ApexCharts(document.querySelector("#bar2"), options);
  
  chart.render();
}

init();
