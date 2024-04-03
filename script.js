// fetch= initialize a promise - API call 
fetch("https://hubeau.eaufrance.fr/api/v1/niveaux_nappes/chroniques?code_bss=09405X0229/S3&date_debut_mesure=2014-01-20&date_fin_mesure=2024-01-20&size=20000")

// .then = when fetch answers (so do the API): return argument in .json
.then(response => { 
    return response.json();
})

// .then : execute loop for of 
.then((mesures)=>{
    const gaugeMax= mesures.data[0].profondeur_nappe +mesures.data[0].niveau_nappe_eau;

    const firstYearLevel = mesures.data[0].niveau_nappe_eau;
    const firstYear = mesures.data[0].date_mesure;

    const secondYearLevel = mesures.data[mesures.data.length-1].niveau_nappe_eau;
    const secondYear = mesures.data[mesures.data.length-1].date_mesure;
      
    createGauge(firstYearLevel,gaugeMax, secondYear); // call createGauge()
    createGauge(secondYearLevel,gaugeMax,firstYear);     
    console.log(mesures)
});


function rate(level, max){  
  return Math.floor((level/max)*100); //  calculate filling rate of water table 
}


function createGauge(level,max,year){ 
  // for creating gauge text
  const waterLevel = rate(level,max); //  holds result of function rate()
  const gaugeString = (waterLevel).toString()+' %';

  const gauges = document.getElementById('gauges');
  const parentDiv = document.createElement('div');
  const childPara = document.createElement('p');

  const childText = document.createTextNode(gaugeString + ' ' + Math.round(level) + ' m'); //   needed string value to work with TextNode so created gaugeString
  const childSpan = document.createElement('span'); 

  
  parentDiv.setAttribute('class', 'gauge');
  childPara.setAttribute('class','gauge-text');
  childSpan.setAttribute('class', 'gauge-filling');
  childSpan.setAttribute('style', 'height: ' + waterLevel + '%');
  

  childPara.appendChild(childSpan);
  childPara.appendChild(childText);
  parentDiv.appendChild(childPara);
  gauges.appendChild(parentDiv);

 
 // same process for creating legends titles
  const legends = document.getElementById('legends');
  const legendsTitle =  document.createElement('h2');
  const legendYear= document.createTextNode(year)
  
  legendsTitle.appendChild(legendYear)
  legends.appendChild(legendsTitle)
}


async function initMap() {
  let map;
  const position = { lat: 43.9738383, lng: 4.6903765 }; // The location of Rochefort
  const { Map } = await google.maps.importLibrary("maps");  // Request needed libraries
  const { AdvancedMarkerView } = await google.maps.importLibrary("marker");

  map = new Map(document.getElementById("map"), { // The map, centered at Rochefort
    zoom: 10,
    center: position,
    mapId: "ROCHEFORT_MAP_ID",
  });

  const marker = new AdvancedMarkerView({ // The marker, positioned at Rochefort
    map: map,
    position: position,
    title: "Rochefort",
  });
}

initMap();




