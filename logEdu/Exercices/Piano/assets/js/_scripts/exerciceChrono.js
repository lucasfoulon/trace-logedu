/**
 * Created by luk on 06/06/15.
 */

var arrayNotes = [];
var nivEtu = 1;

function generateExercicePianoChrono(level) {

    apparaitrePiano(level);
    nivEtu = level;

    var toucheBlanche = jsonTableauNoteBlanche1;
    var toucheNoire = jsonTableauNoteNoire1;

    if(level == 3) {
        toucheBlanche = jsonTableauNoteBlanche2;
        toucheNoire = jsonTableauNoteNoire2;
    }

    var lengthWhite = Object.keys(toucheBlanche.data).length;
    var lengthBlack = Object.keys(toucheNoire.data).length;


    if(level == 1) {
        for (var i = 0; i < 10; i++) {

            var alea = aleatoire(0, lengthWhite);

            var idTouch = toucheBlanche.data[alea].tId;
            var nomTouch = toucheBlanche.data[alea].nom;

            arrayNotes[i] = {id: idTouch, name: nomTouch};
        }
    }
    else {
        for (var i = 0; i < 10; i++) {
            if (aleatoire(0, 3) < 2) {
                var alea = aleatoire(0, lengthWhite);

                var idTouch = toucheBlanche.data[alea].tId;
                var nomTouch = toucheBlanche.data[alea].nom;
            }
            else {
                var alea = aleatoire(0, lengthBlack);

                var idTouch = toucheNoire.data[alea].tId;
                var nomTouch = toucheNoire.data[alea].nom;
            }
            arrayNotes[i] = {id: idTouch, name: nomTouch};
        }
    }

    modifierEnonce("ATTENTION! Il faut répondre avant la fin du compte à rebours... VOUS ETES PRET?? <button onclick=\"startExerciceChrono()\">START<\/button>");
}

function startExerciceChrono() {

    modifierEnonce("C'est parti! <br\/><div id=\"chrono\">Temps restant : <div id=\"temps\"><\/div><\/div>");

    chronoStart(nivEtu);

    var idTouch = arrayNotes[0].id;
    var nomTouch = arrayNotes[0].name;

    var $container = $('#sujetExercice');
    $container.empty();
    var baliseExercice = "<div class=\"col-xs-6\" note=\"chrono\" id=\""+idTouch+"\">"+nomTouch+"<\/div>";
    baliseExercice += "<br\/><div class=\"bonusTemps\" style=\"display: none\" id=\"bonus\">+2<\/div>";
    $container.append(baliseExercice);
}

function verifNoteChrono(note,level) {

    var $noteActuelle = $('div[note=chrono]');
    var dataActuelle = $noteActuelle.attr('id');

    if(note == dataActuelle) {

        var idTouch = arrayNotes[1].id;
        var nomTouch = arrayNotes[1].name;

        $noteActuelle.replaceWith("<div class=\"col-xs-6\" note=\"chrono\" id=\""+idTouch+"\">"+nomTouch+"<\/div>");

        deadLine.setSeconds(deadLine.getSeconds()+2);
        score ++;

        arrayNotes.shift();

        //$noteActuelle.show('slow');

        $bonus = $('#bonus');
        //$bonus.fadeIn(1200,'linear');
        $bonus.animate({top: '-=100', opacity: "toggle"}, 400);
        $bonus.animate({top: '-=50', opacity: "toggle"}, 600);
        //$bonus.fadeOut(1000,'swing');

        $bonus.animate({top: '+=150'}, 100);

        if(arrayNotes.length < 5) {

            var toucheBlanche = jsonTableauNoteBlanche1;
            var toucheNoire = jsonTableauNoteNoire1;

            if(level == 3) {
                toucheBlanche = jsonTableauNoteBlanche2;
                toucheNoire = jsonTableauNoteNoire2;
            }

            var lengthWhite = Object.keys(toucheBlanche.data).length;
            var lengthBlack = Object.keys(toucheNoire.data).length;

            if(level == 1) {
                for (var i = 0; i < 10; i++) {

                    var alea = aleatoire(0, lengthWhite);

                    var idTouch = toucheBlanche.data[alea].tId;
                    var nomTouch = toucheBlanche.data[alea].nom;

                    arrayNotes.push({id:idTouch, name:nomTouch});
                }
            }
            else {
                for (var i = 0; i < 10; i++) {
                    if (aleatoire(0, 3) < 2) {
                        var alea = aleatoire(0, lengthWhite);

                        var idTouch = toucheBlanche.data[alea].tId;
                        var nomTouch = toucheBlanche.data[alea].nom;
                    }
                    else {
                        var alea = aleatoire(0, lengthBlack);

                        var idTouch = toucheNoire.data[alea].tId;
                        var nomTouch = toucheNoire.data[alea].nom;
                    }
                    arrayNotes.push({id:idTouch, name:nomTouch});
                }
            }
        }

    }

}