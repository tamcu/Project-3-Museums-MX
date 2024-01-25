
// Create the map, originally centered at TX
let myMap = L.map("map", {
  center: [21.5335298, -99.9407924],
  /* zoom: 5.4, */
  zoom: 5,
});

// Insert the base layer to the map
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  /* link: 'Powered by <a href="https://www.geoapify.com/">Geoapify</a>', */
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

  /* plotBubble(estados, cantidades); */
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

    /* console.log(bar_y);
    console.log(bar_x); */

    // Update the first bar chart
    Plotly.update("bar", { x: [bar_x], y: [bar_y] });

/*     let chart = new ApexCharts(document.querySelector("#bar"), options);
    chart.render(); 

    chart.updateOptions = {
      series: [{
      data: bar_x,
      }],
      chart: {
      type: 'bar',
      },
      plotOptions: {
        bar: {
          borderRadius: 4,
          horizontal: true,
        }
      },
      dataLabels: {
        enabled: true,
      },
      xaxis: {
        categories: bar_y,
      }
    }; */
    
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

function plotBubble(estados, cantidades){
  /* console.log(estados);
  console.log(cantidades); */

  /* let options = {
    chart: {
      type: "bubble",
    },
    series: [{
      name: "cantidades",
      data: cantidades.map(c => Math.sqrt(20 * c)),
    }],
    xaxis: {
      categories: estados,
    }
  }
  
  let chart = new ApexCharts(document.querySelector("#bar2"), options);
  
  chart.render(); */

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
    width: "100%",  // Adjust the width to make it smaller
    height: 400, // Adjust the height to make it smaller
    xaxis: { automargin: true },
  };

  Plotly.newPlot("bar2", bubble_a, layout2); 
};

function plotApex(estados, cantidades){
  /* let options = {
    chart: {
      type: 'line'
    },
    series: [{
      name: 'museos',
      data: cantidades
    }],
    xaxis: {
      categories: estados
    },
    theme: {
      palette: 'palette10' // upto palette10
    }
  }; */

  let c = cantidades.map((e, i) => [i+1, cantidades[i], cantidades[i]]);
  /* console.log(cantidades, c, [c]); */

  /* let fin = c.map((e, i) => [e, c[i]]); 
  console.log(fin); */


  let options = {
     /* markers: {
      size: cantidades,
    },  */
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
    /* dataLabels: {
      enabled: false
    }, */
    /* colors: ['#2E93fA', '#66DA26', '#546E7A', '#E91E63', '#FF9800'], */
    /* colors: [function({ value, seriesIndex, w }) {
      if (value < 55) {
          return '#7E36AF'
      } else {
          return '#D9534F'
      }
    }, function({ value, seriesIndex, w }) {
      if (value < 111) {
          return '#7E36AF'
      } else {
          return '#D9534F'
      }
    }], */
    fill: {
      opacity: 0.6,
      /* type: "gradient", */
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
      /* labels : {
        style : {
          fontSize : "12px"
        }
      } */
      /* axisBorder: {
        show: true,
        color: '#78909C',
        height: 1,
        width: '100%',
        offsetX: 0,
        offsetY: 0
    }, */
    },
    /* yaxis: {
      max: 180
    },  */
    /* zaxis: {
      size: cantidades
    }, */
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

