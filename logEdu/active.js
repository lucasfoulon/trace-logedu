if(document.all) {

    document.onfocusin = focusActive;

    document.onfocusout = focusDesactive;

} else {

    document.onfocus = focusActive;

    document.onblur = focusDesactive;

}


function focusActive() {

   // La page a le focus
   console.log("on rerentre");

}


function focusDesactive() {

   // La page perd le focus
   console.log("on est sorti");

}