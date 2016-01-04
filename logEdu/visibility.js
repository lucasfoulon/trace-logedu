/**
 * Created by luk on 04/01/16.
 */
// Détection préalable des préfixes pour chaque moteur
// et stockage de leur nom dans des variables
var hidden, visibilityChange;
if (typeof document.hidden !== "undefined") {
    hidden = "hidden";
    visibilityChange = "visibilitychange";
    visibilityState = "visibilityState";
} else if (typeof document.mozHidden !== "undefined") {
    hidden = "mozHidden";
    visibilityChange = "mozvisibilitychange";
    visibilityState = "mozVisibilityState";
} else if (typeof document.msHidden !== "undefined") {
    hidden = "msHidden";
    visibilityChange = "msvisibilitychange";
    visibilityState = "msVisibilityState";
} else if (typeof document.webkitHidden !== "undefined") {
    hidden = "webkitHidden";
    visibilityChange = "webkitvisibilitychange";
    visibilityState = "webkitVisibilityState";
}
// La variable hidden contient le nom de la propriété du document
// La variable visibilityChange contient le nom de l'événement
// La variable visibilityState contient la propriété d'état
document.addEventListener(visibilityChange, changementVisibilite, false);
// Elément qui va permettre un affichage informatif
//var log = document.getElementById('log');
// Fonction qui traite l'événement
function changementVisibilite() {
    console.log('Le document est caché ? '+document[hidden]);
    console.log('Etat : '+document[visibilityState]);
}