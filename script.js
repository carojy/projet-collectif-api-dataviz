// fetch= initie une promesse : appelle l'api 
fetch("https://hubeau.eaufrance.fr/api/v1/niveaux_nappes/chroniques?code_bss=09405X0229/S3&date_debut_mesure=2014-01-20&date_fin_mesure=2024-01-20&size=20000")

// .then = quand reponse de fetch (dc de l'API): retourner l'argument en .json
.then(response => { 
    return response.json()
})


// aussi quand reponse fetch: executer la boucle for of (= pour chaque ligne de mesures.data, faire ces instructions)
.then((mesures)=>{
  console.log(mesures)
    const jaugeMax= mesures.data[0].profondeur_nappe +mesures.data[0].niveau_nappe_eau
    const firstYearLevel = mesures.data[0].niveau_nappe_eau
    const secondYearLevel = mesures.data[mesures.data.length-1].niveau_nappe_eau
      
    creerJauge(firstYearLevel,jaugeMax);
    creerJauge(secondYearLevel,jaugeMax);
        
});






function pourcentage(niveau, jaugeMax){  //recupere proportion de remplissage de l'eau sur la profondeur totale de la nappe
  
  return Math.floor((niveau/jaugeMax)*100) // calcule taux de remplissage en eau de la nappe MEETmm
  
}


function creerJauge(niveau,jaugeMax){ // parametre = taux de remplissage à appeler de la fonction pourcentage()
  
  const jauges = document.getElementById('jauges')    // pour se placer dans l'id "jauges" dans HTML
  const a = document.createElement("a")   // creer balise a
  const span= document.createElement("span"); // cree balise span
  const niveauxEau=pourcentage(niveau,jaugeMax) //resultat fonction pourcentage()
  
  a.setAttribute('class', 'jauge'); // ajoute attribut class avec valeur jauge ds balise a
  a.setAttribute('href', '#') // ajoute attribut href avec valeur # ds balise a

  span.setAttribute('class', 'jauge-remplissage'); //idem methode a
  span.setAttribute('style', 'height: '+niveauxEau+'%');
  
  a.appendChild(span) // ajoute balise span dans balise a
  jauges.appendChild(a) // ajoute balise a dans balise jauges
}