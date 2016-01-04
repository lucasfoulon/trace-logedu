(function($) {

	// Lock event for play
	var lockEvent = {};


	// LEVEL
	// 1: une gamme, seulement les blanches
	// 2: une gamme, blanches et noirs
	// 3: deux gammes, blanches et noirs
    var LEVEL = 3;

    creerExercice();

	//
	// Events
	// --------------------------------------------------

	// Disable Select
	// --------------------------------------------------
	$('.piano').bind('selectstart dragstart', function(ev) {

        //console.log("selectstart dragstart");

        //Empeche la selection et le deplacement des objets du piano
	    ev.preventDefault();
	    return false;
	});

	// Piano Play Keyboard
    // --------------------------------------------------
	$(window).bind('keydown keyup', function(ev) {

        var keyNo = ev.which;

        //console.log("keydown keyup " + keyNo);

        var $key = $('[data-key="'+keyNo+'"]');
        var note = $key.attr('data-note');

        var $parent = $key.parent();

        if($parent.css('display') == 'none') {
            console.log("display none!");
        }
		else if(note) {
			if (ev.type == 'keydown') {
				if (!lockEvent[keyNo]) {
					notes[note].play();
					lockEvent[keyNo] = true;
					$key.addClass('active');
					$key.parent().addClass('active');
		 		}
			}
			else if (ev.type == 'keyup') {
				lockEvent[keyNo] = false;
				$key.removeClass('active');
				$key.parent().removeClass('active');
			}
		}
	});

	// Piano Play Click
    // --------------------------------------------------
	$('.key > span').mousedown(function(){
		// Save note
		var me = $(this);
		var noteClick = me.attr('data-note');
		// Play sound
        //console.log("mousedown(function()");
        //console.log(noteClick);

        notes[noteClick].play();
	});


    $('.note').mousedown(function(){
        // Save note
        var me = $(this);
        var noteClick = me.attr('id');
        // Play sound
        //console.log("mousedown(function()");
        //console.log(noteClick);

        notes[noteClick].play();
    });


})(jQuery);

