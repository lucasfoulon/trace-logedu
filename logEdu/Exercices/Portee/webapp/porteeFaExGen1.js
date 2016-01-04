text = "Peux-tu me donner le nom de la note que tu viens de placer ?";
reponse = "";

//Variable globales utiles 
blockClick = false;
suiteNote = new Array();
faute = false;
nbFaute = 0;
tempsAffichage = 3000;
//Infos sur l'utilisateur a remplir en récupérant de la base !
//L'indice auquel l'utilisateur en est
indiceProgression = 0;
niveauJoueur = $('#niveauEtu').html();
niveauJoueur = parseInt(niveauJoueur);
//Les variables pour l'exercice niveau 2
//Ici on a deux notes, on ajoute donc les variables necessaire
noteC1 = -1;
noteC2 = -1;
noteID1E2 = -1;
noteID2E2 = -1;
nbClickE2 = 0;
nbLigneClick = -1;

//Les variables pour l'exercice niveau 3
noteC1E3 = -1;
noteC2E3 = -1;
noteC3E3 = -1;
noteID1E3 = -1;
noteID2E3 = -1;
noteID3E3 = -1;
nbClickE3 = 0;
nbLigneClickE31 = -1;
nbLigneClickE32 = -1;

// LEs var pour l'alea

poidNote = new Array();
var notep = $('#fauxDo').html();
notep = parseInt(notep);
dof = notep;
poidNote.push(notep);

notep = $('#fauxRe').html();
notep = parseInt(notep);
ref = notep;
poidNote.push(notep);

notep = $('#fauxMi').html();
notep = parseInt(notep);
mif = notep;
poidNote.push(notep);

notep = $('#fauxFa').html();
notep = parseInt(notep);
faf = notep;
poidNote.push(notep);

notep = $('#fauxSol').html();
notep = parseInt(notep);
solf = notep;
poidNote.push(notep);

notep = $('#fauxLa').html();
notep = parseInt(notep);
laf = notep;
poidNote.push(notep);

notep = $('#fauxSi').html();
notep = parseInt(notep);
sif = notep;
poidNote.push(notep);
function levelUp()
{
	
	var exo ="exo="+ 23;
	 $.ajax({
        type: 'GET',
          url: "/logEdu/Exercices/Portee/webapp/levelup.php",
           data: exo,
            success: function (data) {
                  alert("Félicitaion, tu as augmenté d'un niveau !");          
            }
        });
}
function misAjourFaute()
{
	
	var noteFausse ="do="+ dof + "&re=" + ref +"&mi="+mif+"&fa="+faf+"&sol="+solf+"&la="+laf+"&si="+sif;
	 $.ajax({
        type: 'GET',
          url: "/logEdu/Exercices/Portee/webapp/addNoteFausseFa.php",
           data: noteFausse,
            success: function (data) {
                            
            }
        });
}
function recupInfoBase(){
	//Ici la requete sql pour récupérer les infos de la base. A faire avant toute chose !
}

function reprendreExercice(){
	//Si un exercice etait en cours, on le recupere !
	ajoutMouseOverLeave();
}

function choixNiveau(){
	
	switch(niveauJoueur)
	{
	case 1:
		genereExerciceNiveau1();
		break;
	case 2:
		genereExerciceNiveau2();
		break;
	case 3:
		genereExerciceNiveau3();
		break;
	}
	if(niveauJoueur > 3)
		genereExerciceNiveau3();
}


function genererPortee(nbLigne, nbColonne)
{
	nbLigne = 20;
	nbColonne = 20;
	/* Pour une portée de 20 lignes
	 * 0 _________________________ mi
	 * 1                           ré
	 * 2 ________________________  do
	 * 3                           si
	 * 4 -------ligne pleine------ la
	 * 5                           sol
	 * 6 ------------------------- fa
	 * 7                           mi
	 * 8 ------------------------- ré
	 * 9						   do
	 * 10 ------------------------ si
	 * 11						   la	
	 * 12 ------------------------ sol
	 * 13						   fa
	 * 14 ________________________ mi
	 * 15                          ré
	 * 16 ________________________ do
	 * 17                          si
	 * 18 ________________________ la
	 * 19                          sol
	 * 20 ________________________ fa
	 */
	var tableau = "";
	
	for(i=0; i<nbLigne; i++)
	{
		
		tableau += "<tr id='l"+i+"'>";
		var note = "";
		var pos = i %  7;
		// Pour assigner les notes à chaque case
		switch(pos)
		{
		case 0:
			note = "Mi";
			break;
		case 1:
			note ="Ré";
			break;
		case 2:
			note ="Do";
			break;
		case 3:
			note ="Si";
			break;
		case 4:
			note ="La";
			break;
		case 5:
			note ="Sol";
			break;
		case 6:
			note ="Fa";
			break;
		}
		
			for(j=0; j<nbColonne; j++)
			{
				if(i >= 4 && i <13)
					{
						if(i % 2 == 0)
							tableau += "<td class = 'casePL' ligne = '"+i+"' checkN = 'no'  note = '"+note+"' id='l"+i+"c"+j+"'></td>";
						else
							tableau += "<td class = 'caseP' ligne = '"+i+"' checkN = 'no' note = '"+note+"' id='l"+i+"c"+j+"'></td>";
					
					}
					
				else
				{
					if(i % 2 == 0)
						tableau += "<td class = 'case' ligne = '"+i+"' checkN = 'no' note = '"+note+"'  id='l"+i+"c"+j+"'></td>";	
					else
						tableau += "<td class = 'caseP' ligne = '"+i+"' checkN = 'no' note = '"+note+"'  id='l"+i+"c"+j+"'></td>";
				}
			}
			tableau += "</tr>";
	}
	
	
	
	
	$("#porteeContainer").append(tableau);

}

function reInitPortee(){
	$("#porteeContainer").empty();
	genererPortee(20, 20);
	noteC1 = -1;
	noteC2 = -1;
	nbClickE2 = 0;
	nbLigneClick = -1;
	noteC1E3 = -1;
	noteC2E3 = -1;
	nbClickE3 = 0;
	nbLigneClickE31 = -1;
	nbLigneClickE32 = -1;
	noteID1E3 = -1;
	noteID2E3 = -1;
	noteID3E3 = -1;
}

//Les fonctions du bonhomme

function poseQuestionNiv1(){
	console.log("faute :"+faute);
	if(faute == false)
	{
		var message = "<font color = 'blue' size='3'> Continue, peux tu placer un <h1>"+suiteNote[indiceProgression]+" ? </h1> </font>";
	}
	else
	{
		var message = "<font color = 'blue' size='3'> Essaie encore, peux tu placer un <h1>"+suiteNote[indiceProgression]+" ? </h1> </font>";
	}
	changerMessage(message);
	blockClick = false;
}

function DonneReponsePosNiv1(notePlace)
{
	faute = false;
	var rep = "<font color = 'green' size='4'> Ta réponse est juste bravo ! La note que tu viens de placer est bien un<h1>"+notePlace+"</h1></font>";
	changerMessage(rep);
}

function DonneReponseNegNiv1(notePlace)
{
	faute = true;
	nbFaute++;
	var rep = "  <font color = 'red' size='3'> Ta réponse est fausse hélas, la note que tu viens de placer est un <h1>"+notePlace+"</h1></font>";
	changerMessage(rep);
}
function poseQuestionNiv2(){
	console.log("faute :"+faute);
	if(faute == false)
	{
		var message = "<font color = 'blue' size='3'> Continue, peux tu placer deux <h1>"+suiteNote[indiceProgression]+" </h1> différents sur la portée ?  </font>";
	}
	else
	{
		var message = "<font color = 'blue' size='3'> Essaie encore, peux tu placer deux <h1>"+suiteNote[indiceProgression]+" </h1> différents sur la portée?  </font>";
	}
	changerMessage(message);
	blockClick = false;
}
function DonneReponsePosNiv2(notePlace)
{
	faute = false;
	var rep = "<font color = 'green' size='4'> Ta réponse est juste bravo ! Les deux notes que tu viens de placer sont bien des<h1>"+notePlace+"</h1></font>";
	changerMessage(rep);
}
function poseQuestionNiv3(){
	console.log("faute :"+faute);
	if(faute == false)
	{
		var message = "<font color = 'blue' size='3'> Continue, peux tu placer trois <h1>"+suiteNote[indiceProgression]+" </h1> différents sur la portée ?  </font>";
	}
	else
	{
		var message = "<font color = 'blue' size='3'> Essaie encore, peux tu placer trois <h1>"+suiteNote[indiceProgression]+" </h1> différents sur la portée?  </font>";
	}
	changerMessage(message);
	blockClick = false;
}
function DonneReponsePosNiv3(notePlace)
{
	faute = false;
	var rep = "<font color = 'green' size='4'> Ta réponse est juste bravo ! Les trois notes que tu viens de placer sont bien des<h1>"+notePlace+"</h1></font>";
	changerMessage(rep);
}
function DonneReponseNegNiv2O1(notePlace1,notePlace2)
{
	//La première est la bonne, la seconde est la mauvaise
	faute = true;
	nbFaute++;
	var rep = "  <font color = 'red' size='2'> Ta réponse est fausse hélas,</font><font color = 'green' size='2'> tu as bien placé un <h2>"+notePlace1+"</h2></font><font color='red' size='2'> mais ta deuxième note est un <h2>"+notePlace2+"</h2></font>";
	changerMessage(rep);
}
function DonneReponseNegNiv2O2(notePlace1,notePlace2)
{
	//La première est la bonne, la seconde est la mauvaise
	faute = true;
	nbFaute++;
	var rep = "  <font color = 'red' size='2'> Ta réponse est fausse hélas, ta première note est un <h2>"+notePlace1+"</h2></font><font COLOR='green' size='2'> par conte, ta deuxième note est bien un <h2>"+notePlace2+"</h2></font>";
	changerMessage(rep);
}
function DonneReponseNeg2notesNiv2(notePlace1, notePlace2)
{
	faute = true;
	nbFaute++;
	var rep = "  <font color = 'red' size='3'> Ta réponse est fausse hélas, tu as placé un <h2>"+notePlace1+"</h2> puis un <h2>"+notePlace2+"</h2></font>";
	changerMessage(rep);
}
function DonneReponseNegNiv3O1(notePlace1,notePlace2,notePlace3)
{
	console.log("o1");
	var id1 = noteID1E3;
	var id2 = noteID2E3;
	var id3 = noteID3E3;
	noteID1E3 = -1;
	noteID2E3 = -1;
	noteID3E3 = -1;
	faute = true;
	nbFaute++;
	var rep = "  <font color = 'red' size='3'> Ta réponse est fausse hélas</font>";
	rep+= "<font color = 'green' size='3'> première note : "+notePlace1+" </font><br/>";
	rep+= "<font color = 'green' size='3'> deuxième note : "+notePlace2+" </font><br/>";
	rep+= "<font color = 'red' size='3'> troisième note : "+notePlace3+" </font><br/>";
	changerMessage(rep);
}
function DonneReponseNegNiv3O2(notePlace1,notePlace2,notePlace3)
{
	console.log("o2");
	var id1 = noteID1E3;
	var id2 = noteID2E3;
	var id3 = noteID3E3;
	noteID1E3 = -1;
	noteID2E3 = -1;
	noteID3E3 = -1;
	faute = true;
	nbFaute++;
	var rep = "  <font color = 'red' size='3'> Ta réponse est fausse hélas</font>";
	rep+= "<font color = 'green' size='3'> première note : "+notePlace1+" </font><br/>";
	rep+= "<font color = 'red' size='3'> deuxième note : "+notePlace2+" </font><br/>";
	rep+= "<font color = 'green' size='3'> troisième note : "+notePlace3+" </font><br/>";
	changerMessage(rep);
}
function DonneReponseNegNiv3O3(notePlace1,notePlace2,notePlace3)
{
	console.log("o3");
	var id1 = noteID1E3;
	var id2 = noteID2E3;
	var id3 = noteID3E3;
	noteID1E3 = -1;
	noteID2E3 = -1;
	noteID3E3 = -1;
	faute = true;
	nbFaute++;
	var rep = "  <font color = 'red' size='3'> Ta réponse est fausse hélas</font>";
	rep+= "<font color = 'green' size='3'> première note : "+notePlace1+" </font><br/>";
	rep+= "<font color = 'red' size='3'> deuxième note : "+notePlace2+" </font><br/>";
	rep+= "<font color = 'red' size='3'> troisième note : "+notePlace3+" </font><br/>";
	changerMessage(rep);
}
function DonneReponseNegNiv3O4(notePlace1,notePlace2,notePlace3)
{
	console.log("o4");
	var id1 = noteID1E3;
	var id2 = noteID2E3;
	var id3 = noteID3E3;
	noteID1E3 = -1;
	noteID2E3 = -1;
	noteID3E3 = -1;
	faute = true;
	nbFaute++;
	var rep = "  <font color = 'red' size='3'> Ta réponse est fausse hélas</font>";
	rep+= "<font color = 'red' size='3'> première note : "+notePlace1+" </font><br/>";
	rep+= "<font color = 'green' size='3'> deuxième note : "+notePlace2+" </font><br/>";
	rep+= "<font color = 'green' size='3'> troisième note : "+notePlace3+" </font><br/>";
	changerMessage(rep);
}
function DonneReponseNegNiv3O5(notePlace1,notePlace2,notePlace3)
{
	console.log("o5");
	var id1 = noteID1E3;
	var id2 = noteID2E3;
	var id3 = noteID3E3;
	noteID1E3 = -1;
	noteID2E3 = -1;
	noteID3E3 = -1;
	faute = true;
	nbFaute++;
	var rep = "  <font color = 'red' size='3'> Ta réponse est fausse hélas</font>";
	rep+= "<font color = 'red' size='3'> première note : "+notePlace1+" </font><br/>";
	rep+= "<font color = 'green' size='3'> deuxième note : "+notePlace2+" </font><br/>";
	rep+= "<font color = 'red' size='3'> troisième note : "+notePlace3+" </font><br/>";
	changerMessage(rep);
}
function DonneReponseNegNiv3O6(notePlace1,notePlace2,notePlace3)
{
	console.log("o6");
	var id1 = noteID1E3;
	var id2 = noteID2E3;
	var id3 = noteID3E3;
	noteID1E3 = -1;
	noteID2E3 = -1;
	noteID3E3 = -1;
	faute = true;
	nbFaute++;
	var rep = "  <font color = 'red' size='3'> Ta réponse est fausse hélas</font>";
	rep+= "<font color = 'red' size='3'> première note : "+notePlace1+" </font><br/>";
	rep+= "<font color = 'red' size='3'> deuxième note : "+notePlace2+" </font><br/>";
	rep+= "<font color = 'green' size='3'> troisième note : "+notePlace3+" </font><br/>";
	changerMessage(rep);
}
function DonneReponseNegNiv3O7(notePlace1,notePlace2,notePlace3)
{
	console.log("o7");
	var id1 = noteID1E3;
	var id2 = noteID2E3;
	var id3 = noteID3E3;
	noteID1E3 = -1;
	noteID2E3 = -1;
	noteID3E3 = -1;
	faute = true;
	nbFaute++;
	var rep = "  <font color = 'red' size='3'> Ta réponse est fausse hélas</font>";
	rep+= "<font color = 'red' size='3'> première note : "+notePlace1+" </font><br/>";
	rep+= "<font color = 'red' size='3'> deuxième note : "+notePlace2+" </font><br/>";
	rep+= "<font color = 'red' size='3'> troisième note : "+notePlace3+" </font><br/>";
	changerMessage(rep);
}

function DonneInstruction()
{
	var message = "Le but de cet exercice est de replacer sur la portée la note dont je vais te donner le nom ! ";
	changerMessage(message);
}

function genereExerciceNiveau1()
{	
	//On ajoute le niveau au titre
	$("#titreNiveau").append(" <br/> niveau 1");
	// ON genere l'exercice de niveau 1
	// L exercice comporte une serie de cinq note a replacer sur la portee
	// La suite de ces notes seront placee dans l objet suite note
	// AJOUTER UN FACTEUR SUR L ALEATOIRE POUR GENERER LES NOTE ------------------------
	
	var note1 = -1;
	var note2 = -1;
	var textNote  = "suite note : ";
	for(var i = 0; i<5; i++)
	{
			var note ="";
			var intNote = aleatoire(1, 7);
			while(intNote == note1 || intNote == note2)
			{
				var intNote = aleatoire(1, 7);
			}
			note2 = note1;
			note1 = intNote;
			
			switch(intNote)
			{
			case 0:
				note = "Do";
				break;
			case 1:
				note ="Si";
				break;
			case 2:
				note ="La";
				break;
			case 3:
				note ="Sol";
				break;
			case 4:
				note ="Fa";
				break;
			case 5:
				note ="Mi";
				break;
			case 6:
				note ="Ré";
				break;
			}
		suiteNote.push(note);
		textNote += note+" ";
	}
	
	
	//On remet l'indice de prog à 0
	indiceProgression = 0;
	nbFaute = 0;
	var message = " <font color = 'blue' size='3'>Ok, commençons ! <br/> Peut tu placer un <h1> "+suiteNote[indiceProgression]+" ? </h1></font>";
	changerMessage(message);
	
	
	
	
	
	
	
	
	
	
	
	
	//On ajoute les mouseOver et Leave sur la portee
	ajoutMouseOverLeave();
	//On surcharge le comportement quand on click sur la portee
	//LES CLICKS SUR LA PORTEE -------------------------------------------------------------------------------------------------------
	$('body').on("click","td.case", function(event){
		var note = $(this).attr("note");
		
		var check = $(this).attr('checkN');

		if(check == 'no')
		{
		
			if(blockClick == false)
			{
				// Ici le comportement du bonhome
				verifierNoteClickNiveau1(note);
				
				$(this).css("background-image","url('ligneNote2.png')");
				$(this).attr("checkN","yes");
			}
		}
		else
		{	
			
		
			
			$(this).css("background-image","url('caseVide.png')");
			$(this).attr("checkN","no");
		}
			
		
	});
	$('body').on("click","td.casePL",function(event){
		//alert("y");
		var note = $(this).attr("note");
		var check = $(this).attr('checkN');

		if(check == 'no')
		{
			
			if(blockClick == false)
			{
				// COMPORTEMENT
				verifierNoteClickNiveau1(note);
				$(this).css("background-image","url('ligneNote.png')");
				$(this).attr('checkN',"yes");
			}
		}
		else
		{
		
	
			
			
			$(this).css("background-image","url('ligne1.png')");
			$(this).attr('checkN',"no");
		}
		//$(this).css("background-image","url('ligneNote.png')");
		
	});
	$('body').on("click","td.caseP", function(event){
		//alert("yo");
		var note = $(this).attr("note");
		
		var check = $(this).attr('checkN');

		if(check == 'no')
		{
			
			if(blockClick == false)
			{
				//COMPORTEMENT
				verifierNoteClickNiveau1(note);
				$(this).css("background-image","url('note.png')");
				$(this).attr('checkN',"yes");
			}
		}
		else
		{
			

			
			$(this).css("background-image","url('caseVide.png')");
			$(this).attr('checkN',"no");
		}
		//$(this).css("background-image","url('note.png')");
		
	});
		//FIN CLICK SUR PORTEE -----------------------------------------------------------------------------------------------
	
	console.log(textNote);
	

}

function finJeu()
{
	var text = "Tu as fais "+nbFaute+" fautes";
	$("#nbFaute").append(text);
	affichePopuVictoireNiv1();

	if(nbFaute == 0)
	{
		levelUp();
	}
	afficheNoteFausse();
	misAjourFaute();
}

function verifierNoteClickNiveau1(note)
{
	console.log(blockClick);
	incrementFaute(suiteNote[indiceProgression]);
	if(blockClick == false)
	{
		console.log(blockClick);
		//On block le comportement losrqu'on est entrain de donner la reponse. 
		//On le reactivera lors que la prochaine question est posee
		blockClick = true;
		//Ici le comportement du monsieur
		//alert("je vérifie ma note");
		if(note == suiteNote[indiceProgression])
		{
			DonneReponsePosNiv1(note);
			decrementeFaute(suiteNote[indiceProgression]);
			if(indiceProgression == 4)
			{
					finJeu();
			}
			else
			{
				indiceProgression++;
				myVar = setTimeout(function(){poseQuestionNiv1()}, tempsAffichage);
			}
		}
		else
		{
			DonneReponseNegNiv1(note);
			myVar = setTimeout(function(){poseQuestionNiv1()}, tempsAffichage);
		}
	}
}


















function ajoutMouseOverLeave()
{
	//MOUSE OVER
	$('body').on("mouseover","td.case", function(event){

		var check = $(this).attr('checkN');
		//$(this).css("border","1px solid black");
		if(check == 'no')
		{
			
			$(this).css("background-image","url('ligneNote2.png')");
			
		}
		
	});
	$('body').on("mouseover","td.casePL",function(event){
		//$(this).css("border","1px solid black");
		var check = $(this).attr('checkN');
		if(check == 'no')
		{
			$(this).css("background-image","url('ligneNote.png')");
		
		}
		
	});
	$('body').on("mouseover","td.caseP", function(event){
		//$(this).css("border","1px solid black");
		var check = $(this).attr('checkN');
		if(check == 'no')
		{
			$(this).css("background-image","url('note.png')");

		}
		
	});

	//MOUSE LEAVE
	$('body').on("mouseleave","td.case", function(event){
		var check = $(this).attr('checkN');
		if(check == 'no')
		{
			$(this).css("background-image","url('caseVide.png')");
		
		}
		
	});
	$('body').on("mouseleave","td.casePL",function(event){
		var check = $(this).attr('checkN');
		if(check == 'no')
		{
			$(this).css("background-image","url('ligne1.png')");

		}
		
	});
	$('body').on("mouseleave","td.caseP", function(event){
		var check = $(this).attr('checkN');
		//$(this).css("border","none");
		if(check == 'no')
		{
			$(this).css("background-image","url('caseVide.png')");

		}
		
	});
}

function aleatoire(min, max) {

	var nbtotal = 0;
	for(var i=0; i<poidNote.length; i++)
	{
		nbtotal+=poidNote[i];
	}
	var dof = poidNote[0];
	var ref = poidNote[1] + dof;
	var mif = poidNote[2] + ref;
	var faf = poidNote[3]+ mif;
	var solf = poidNote[4]+ faf;
	var laf = poidNote[5]+ solf;
	var sif = poidNote[6]+ laf;
	//On genere l'alea entre 0 et nbTotal
	var alea1 = Math.floor((nbtotal-0)*Math.random())+1;
	console.log("alea ="+alea1);
	if(alea1 <= dof)
	{
		return 0;
	}
	else if(alea1 <= ref)
	{
		return 1;
	}
	else if(alea1 <= mif)
	{
		return 2;
	}
	else if(alea1 <= faf)
	{
		return 3;
	}
	else if(alea1 <= solf)
	{
		return 4;
	}
	else if(alea1 <= laf)
	{
		return 5;
	}
	else 
	{
		return 6;
	}
	return 6;
   //	 return (Math.floor((max-min)*Math.random())+min);
};

function genereExerciceNiveau2()
{
	//Fonction pour générer l'exercice de niveau 2
	//On ajoute le niveau au titre
	$("#titreNiveau").append(" <br/> niveau 2");
	var note1 = -1;
	var note2 = -1;
	var textNote  = "suite note : ";
	for(var i = 0; i<5; i++)
	{
			var note ="";
			var intNote = aleatoire(1, 7);
			while(intNote == note1 || intNote == note2)
			{
				var intNote = aleatoire(1, 7);
			}
			note2 = note1;
			note1 = intNote;
			
			switch(intNote)
			{
			case 0:
				note = "Do";
				break;
			case 1:
				note ="Si";
				break;
			case 2:
				note ="La";
				break;
			case 3:
				note ="Sol";
				break;
			case 4:
				note ="Fa";
				break;
			case 5:
				note ="Mi";
				break;
			case 6:
				note ="Ré";
				break;
			}
		suiteNote.push(note);
		textNote += note+" ";
	}
	
	
	//On remet l'indice de prog à 0
	indiceProgression = 0;
	nbFaute = 0;
	
	//La première question
	var message = " <font color = 'blue' size='3'>Ok, commençons ! <br/> Peut tu placer deux <h1> "+suiteNote[indiceProgression]+"  </h1> différents sur la portée ?</font>";
	changerMessage(message);
	
	//On ajoute les mouseOver et Leave sur la portee
	ajoutMouseOverLeave();
	//On surcharge le comportement quand on click sur la portee
	// Les variables noteC1, noteC2 et nbClickE2 sont en globale en haut du code
	
	//LES CLICKS SUR LA PORTEE N2 -------------------------------------------------------------------------------------------------------
	$('body').on("click","td.case", function(event){
		var note = $(this).attr("note");
		
		var check = $(this).attr('checkN');
		var nbligne = $(this).attr('ligne');
		if(check == 'no')
		{
		
			if(blockClick == false)
			{
				// Ici le comportement du bonhome
				
				if(nbClickE2 == 0)
				{
					noteC1 = note;
					nbClickE2++;
					nbLigneClick = nbligne;
					$(this).css("background-image","url('ligneNote2.png')");
					$(this).attr("checkN","yes");
				}
				else
				{
					if(nbLigneClick != nbligne)
					{
						noteC2 = note;
						nbClickE2++;
						verifierNoteClickNiveau2(noteC1, noteC2);
						$(this).css("background-image","url('ligneNote2.png')");
						$(this).attr("checkN","yes");
					}
					else
					{
						//alert("non");
						var mess = "<font color = 'blue' size = '3' >Tu as déjà placé une note sur cette ligne, trouve en une autre ! </font>";
						changerMessage(mess);
					}
				}
				
				
			}
		}
		else
		{	
			
			//On decremente le nombre de notes ajoutees
			nbClickE2--;
			if(nbClickE2 < 0)
				nbClickE2 = 0;
			
			$(this).css("background-image","url('caseVide.png')");
			$(this).attr("checkN","no");
		}
			
		
	});
	$('body').on("click","td.casePL",function(event){
		//alert("y");
		var note = $(this).attr("note");
		var check = $(this).attr('checkN');
		var nbligne = $(this).attr('ligne');
		if(check == 'no')
		{
			
			if(blockClick == false)
			{
				// COMPORTEMENT
				// Ici le comportement du bonhome
				
				if(nbClickE2 == 0)
				{
					noteC1 = note;
					nbClickE2++;
					nbLigneClick = nbligne;
					$(this).css("background-image","url('ligneNote.png')");
					$(this).attr('checkN',"yes");
				}
				else
				{
					if(nbLigneClick != nbligne)
					{
						noteC2 = note;
						nbClickE2++;
						verifierNoteClickNiveau2(noteC1, noteC2);
						$(this).css("background-image","url('ligneNote.png')");
						$(this).attr('checkN',"yes");
					}
					else
					{
						//alert("non");
						var mess = "<font color = 'blue' size = '3' >Tu as déjà placé une note sur cette ligne, trouve en une autre ! </font>";
						changerMessage(mess);
					}
					
				}
		
			}
		}
		else
		{
		
			//On decremente le nombre de notes ajoutees
			nbClickE2--;
			if(nbClickE2 < 0)
				nbClickE2 = 0;
			
			
			$(this).css("background-image","url('ligne1.png')");
			$(this).attr('checkN',"no");
		}
		//$(this).css("background-image","url('ligneNote.png')");
		
	});
	$('body').on("click","td.caseP", function(event){
		//alert("yo");
		var note = $(this).attr("note");
		var check = $(this).attr('checkN');
		var nbligne = $(this).attr('ligne');
		if(check == 'no')
		{
			
			if(blockClick == false)
			{
				//COMPORTEMENT
				// Ici le comportement du bonhome
			
				if(nbClickE2 == 0)
				{
					noteC1 = note;
					nbClickE2++;
					nbLigneClick = nbligne;
					$(this).css("background-image","url('note.png')");
					$(this).attr('checkN',"yes");
				}
				else
				{
					if(nbLigneClick != nbligne)
					{
						noteC2 = note;
						nbClickE2++;
						verifierNoteClickNiveau2(noteC1, noteC2);
						$(this).css("background-image","url('note.png')");
						$(this).attr('checkN',"yes");
					}
					else
					{
						//alert("non");
						var mess = "<font color = 'blue' size = '3' >Tu as déjà placé une note sur cette ligne, trouve en une autre ! </font>";
						changerMessage(mess);
					}
					
				}
	
			}
		}
		else
		{
			
			//On decremente le nombre de notes ajoutees
			nbClickE2--;
			if(nbClickE2 < 0)
				nbClickE2 = 0;
			
			$(this).css("background-image","url('caseVide.png')");
			$(this).attr('checkN',"no");
		}
		//$(this).css("background-image","url('note.png')");
		
	});
		//FIN CLICK SUR PORTEE -----------------------------------------------------------------------------------------------
	
	console.log(textNote);
	
}

function verifierNoteClickNiveau2(note1,note2)
{
	console.log(nbClickE2)
	nbClickE2 = 0;
	nbLigneClick = -1;
	var noteC1v = noteC1;
	var noteC2v = noteC2;
	noteC1 = -1;
	noteC2 = -1;
	console.log(blockClick);
	incrementFaute(suiteNote[indiceProgression]);
	if(blockClick == false)
	{
		console.log(blockClick);
		//On block le comportement losrqu'on est entrain de donner la reponse. 
		//On le reactivera lors que la prochaine question est posee
		blockClick = true;
		//Ici le comportement du monsieur
		//alert("je vérifie ma note");
		if(noteC1v == suiteNote[indiceProgression])
		{	
			if(noteC2v == suiteNote[indiceProgression])
			{
						DonneReponsePosNiv2(noteC1v);
						decrementeFaute(suiteNote[indiceProgression]);
						if(indiceProgression == 4)
						{
								finJeu();
						}
						else
						{
							indiceProgression++;
							myVar = setTimeout(function(){poseQuestionNiv2()}, tempsAffichage);
						}
			}
			else
			{
				DonneReponseNegNiv2O1(noteC1v,noteC2v);
				myVar = setTimeout(function(){poseQuestionNiv2()}, tempsAffichage);
			}
		}
		else
		{

			if(noteC2v == suiteNote[indiceProgression])
			{
				DonneReponseNegNiv2O2(noteC1v,noteC2v);
				myVar = setTimeout(function(){poseQuestionNiv2()}, tempsAffichage);
			}
			else
			{
				DonneReponseNeg2notesNiv2(noteC1v,noteC2v);
				myVar = setTimeout(function(){poseQuestionNiv2()}, tempsAffichage);
			}
		}
	}
}


function genereExerciceNiveau3(){
	//Fonction pour générer l'exercice de niveau 3
	//On ajoute le niveau au titre
	$("#titreNiveau").append(" <br/> niveau 3");
	//Generateur
	var note1 = -1;
	var note2 = -1;
	var textNote  = "suite note : ";
	for(var i = 0; i<5; i++)
	{
			var note ="";
			var intNote = aleatoire(1, 7);
			while(intNote == note1 || intNote == note2)
			{
				var intNote = aleatoire(1, 7);
			}
			note2 = note1;
			note1 = intNote;
			
			switch(intNote)
			{
			case 0:
				note = "Do";
				break;
			case 1:
				note ="Si";
				break;
			case 2:
				note ="La";
				break;
			case 3:
				note ="Sol";
				break;
			case 4:
				note ="Fa";
				break;
			case 5:
				note ="Mi";
				break;
			case 6:
				note ="Ré";
				break;
			}
		suiteNote.push(note);
		textNote += note+" ";
	}
	
	
	//On remet l'indice de prog à 0
	indiceProgression = 0;
	nbFaute = 0;
	
	//La première question
	var message = " <font color = 'blue' size='3'>Ok, commençons ! <br/> Peut tu placer trois <h1> "+suiteNote[indiceProgression]+"  </h1> différents sur la portée ?</font>";
	changerMessage(message);
	
	//On ajoute les mouseOver et Leave sur la portee
	ajoutMouseOverLeave();
	//On surcharge le comportement quand on click sur la portee
	// Les variables noteC1, noteC2 et nbClickE2 sont en globale en haut du code
	
	//LES CLICKS SUR LA PORTEE N3 -------------------------------------------------------------------------------------------------------
	$('body').on("click","td.case", function(event){
		var note = $(this).attr("note");
		var id= $(this).attr("id");
		var check = $(this).attr('checkN');
		var nbligne = $(this).attr('ligne');
		if(check == 'no')
		{
		
			if(blockClick == false)
			{
				// Ici le comportement du bonhome
				
				if(nbClickE3 == 0)
				{
					noteC1E3 = note;
					nbClickE3++;
					nbLigneClickE31 = nbligne;
					noteID1E3 = id;
					$(this).css("background-image","url('ligneNote2.png')");
					$(this).attr("checkN","yes");
				}
				else if(nbClickE3 == 1)
				{
					if(nbLigneClickE31 != nbligne)
					{
						noteC2E3 = note;
						nbClickE3++;
						nbLigneClickE32 = nbligne;
						noteID2E3 = id;
						$(this).css("background-image","url('ligneNote2.png')");
						$(this).attr("checkN","yes");
					}
					else
					{
						//alert("non");
						var mess = "<font color = 'blue' size = '3' >Tu as déjà placé une note sur cette ligne, trouve en une autre ! </font>";
						changerMessage(mess);
					}
				}
				
				else
				{
					if(nbLigneClickE31 != nbligne && nbLigneClickE32 != nbligne)
					{
						noteC3E3 = note;
						nbClickE3++;
						noteID3E3 = id;
						verifierNoteClickNiveau3(noteC1E3, noteC2E3, noteC3E3);
						$(this).css("background-image","url('ligneNote2.png')");
						$(this).attr("checkN","yes");
					}
					else
					{
						//alert("non");
						var mess = "<font color = 'blue' size = '3' >Tu as déjà placé une note sur cette ligne, trouve en une autre ! </font>";
						changerMessage(mess);
					}
				}
				
				
			}
		}
		else
		{	
			
			//On decremente le nombre de notes ajoutees
			nbClickE3--;
			if(nbClickE3 < 0)
				nbClickE3 = 0;
			
			$(this).css("background-image","url('caseVide.png')");
			$(this).attr("checkN","no");
		}
			
		
	});
	$('body').on("click","td.casePL",function(event){
		//alert("y");
		var note = $(this).attr("note");
		var check = $(this).attr('checkN');
		var nbligne = $(this).attr('ligne');
		var id= $(this).attr("id");
		if(check == 'no')
		{
			
			if(blockClick == false)
			{
// Ici le comportement du bonhome
				
				if(nbClickE3 == 0)
				{
					noteC1E3 = note;
					nbClickE3++;
					nbLigneClickE31 = nbligne;
					noteID1E3 = id;
					$(this).css("background-image","url('ligneNote.png')");
					$(this).attr('checkN',"yes");
				}
				else if(nbClickE3 == 1)
				{
					if(nbLigneClickE31 != nbligne)
					{
						noteC2E3 = note;
						nbClickE3++;
						nbLigneClickE32 = nbligne;
						noteID2E3 = id;
						$(this).css("background-image","url('ligneNote.png')");
						$(this).attr('checkN',"yes");
					}
					else
					{
						//alert("non");
						var mess = "<font color = 'blue' size = '3' >Tu as déjà placé une note sur cette ligne, trouve en une autre ! </font>";
						changerMessage(mess);
					}
				}
				
				else
				{
					if(nbLigneClickE31 != nbligne && nbLigneClickE32 != nbligne)
					{
						noteC3E3 = note;
						nbClickE3++;
						noteID3E3 = id;
						verifierNoteClickNiveau3(noteC1E3, noteC2E3, noteC3E3);
						$(this).css("background-image","url('ligneNote.png')");
						$(this).attr('checkN',"yes");
					}
					else
					{
						//alert("non");
						var mess = "<font color = 'blue' size = '3' >Tu as déjà placé une note sur cette ligne, trouve en une autre ! </font>";
						changerMessage(mess);
					}
				}
				
				
		
			}
		}
		else
		{
		
			//On decremente le nombre de notes ajoutees
			nbClickE3--;
			if(nbClickE3 < 0)
				nbClickE3 = 0;
			
			
			$(this).css("background-image","url('ligne1.png')");
			$(this).attr('checkN',"no");
		}
		//$(this).css("background-image","url('ligneNote.png')");
		
	});
	$('body').on("click","td.caseP", function(event){
		//alert("yo");
		var note = $(this).attr("note");
		var check = $(this).attr('checkN');
		var nbligne = $(this).attr('ligne');
		var id= $(this).attr("id");
		if(check == 'no')
		{
			
			if(blockClick == false)
			{
				//COMPORTEMENT
				// Ici le comportement du bonhome
// Ici le comportement du bonhome
				
				if(nbClickE3 == 0)
				{
					noteC1E3 = note;
					nbClickE3++;
					nbLigneClickE31 = nbligne;
					noteID1E3 = id;
					$(this).css("background-image","url('note.png')");
					$(this).attr('checkN',"yes");
				}
				else if(nbClickE3 == 1)
				{
					if(nbLigneClickE31 != nbligne && nbLigneClickE32 != nbligne)
					{
						noteC2E3 = note;
						nbClickE3++;
						nbLigneClickE32 = nbligne;
						noteID2E3 = id;
						$(this).css("background-image","url('note.png')");
						$(this).attr('checkN',"yes");
					}
					else
					{
						//alert("non");
						var mess = "<font color = 'blue' size = '3' >Tu as déjà placé une note sur cette ligne, trouve en une autre ! </font>";
						changerMessage(mess);
					}
				}
				
				else
				{
					if(nbLigneClickE31 != nbligne && nbLigneClickE32 != nbligne)
					{
						noteC3E3 = note;
						nbClickE3++;
						noteID3E3 = id;
						verifierNoteClickNiveau3(noteC1E3, noteC2E3, noteC3E3);
						$(this).css("background-image","url('note.png')");
						$(this).attr('checkN',"yes");
					}
					else
					{
						//alert("non");
						var mess = "<font color = 'blue' size = '3' >Tu as déjà placé une note sur cette ligne, trouve en une autre ! </font>";
						changerMessage(mess);
					}
				}
				
				
			}
		}
		else
		{
			
			//On decremente le nombre de notes ajoutees
			nbClickE3--;
			if(nbClickE3 < 0)
				nbClickE3 = 0;
			
			$(this).css("background-image","url('caseVide.png')");
			$(this).attr('checkN',"no");
		}
		//$(this).css("background-image","url('note.png')");
		
	});
		//FIN CLICK SUR PORTEE -----------------------------------------------------------------------------------------------
	
	console.log(textNote);
	
}
function verifierNoteClickNiveau3(note1,note2,note3)
{
	console.log(nbClickE3);
	nbClickE3 = 0;
	nbLigneClickE31 = -1;
	nbLigneClickE32 = -1;
	var noteC1v = noteC1E3;
	var noteC2v = noteC2E3;
	var noteC3v = noteC3E3;
	noteC1E3 = -1;
	noteC2E3 = -1;
	noteC3E3 = -1;
	console.log(blockClick);
	incrementFaute(suiteNote[indiceProgression]);
	if(blockClick == false)
	{
		console.log(blockClick);
		//On block le comportement losrqu'on est entrain de donner la reponse. 
		//On le reactivera lors que la prochaine question est posee
		blockClick = true;
		//Ici le comportement du monsieur
		//alert("je vérifie ma note");
		if(noteC1v == suiteNote[indiceProgression])
		{	
			if(noteC2v == suiteNote[indiceProgression])
			{
				if(noteC3v == suiteNote[indiceProgression])
				{
						DonneReponsePosNiv3(noteC1v);
						decrementeFaute(suiteNote[indiceProgression]);	
						if(indiceProgression == 4)
						{
								finJeu();
						}
						else
						{
							indiceProgression++;
							myVar = setTimeout(function(){poseQuestionNiv3()}, tempsAffichage);
						}
				}
				else
				{
					//c1juste, c2juste, c3faux 01
					DonneReponseNegNiv3O1(noteC1v,noteC2v,noteC3v);
					myVar = setTimeout(function(){poseQuestionNiv3()}, tempsAffichage);
				}
			}
			else
			{
				//c1 juste, c2 faux
				if(noteC3v == suiteNote[indiceProgression])
				{
					//c1 juste c2 faux c3 juste 02
					DonneReponseNegNiv3O2(noteC1v,noteC2v,noteC3v);
					myVar = setTimeout(function(){poseQuestionNiv3()}, tempsAffichage);
				}
				else
				{
					//c1 juste, c2 faux c3 faux 03
					DonneReponseNegNiv3O3(noteC1v,noteC2v,noteC3v);
					myVar = setTimeout(function(){poseQuestionNiv3()}, tempsAffichage);
				}
			
			}
		}
		else
		{
			//c1 faux
			if(noteC2v == suiteNote[indiceProgression])
			{
				
				//c1 faux, c2 juste
				if(noteC3v == suiteNote[indiceProgression])
				{
					//c1 faux, c2 juste, c3 juste O4
					DonneReponseNegNiv3O4(noteC1v,noteC2v,noteC3v);
					myVar = setTimeout(function(){poseQuestionNiv3()}, tempsAffichage);
				}
				else
				{
					//c1 faux, c2 juste, c3 faux 05
					DonneReponseNegNiv3O5(noteC1v,noteC2v,noteC3v);
					myVar = setTimeout(function(){poseQuestionNiv3()}, tempsAffichage);
				}
			
			}
			else
			{
				//c1 faux, c2 faux
				if(noteC3v == suiteNote[indiceProgression])
				{
					//c1 faux, c2 faux, c3 juste O6
					DonneReponseNegNiv3O6(noteC1v,noteC2v,noteC3v);
					myVar = setTimeout(function(){poseQuestionNiv2()}, tempsAffichage);
				}
				else
				{
					//c1 faux, c2 faux, c3 faux 07
					DonneReponseNegNiv3O7(noteC1v,noteC2v,noteC3v);
					myVar = setTimeout(function(){poseQuestionNiv2()}, tempsAffichage);
				}
			}
		}
	}
}
function decrementeFaute(note)
{
	
	if(note == "Do")
	{
		dof--;
	}
	if(note == "Re")
	{
		ref--;
	}
	if(note == "Mi")
	{
		mif--;
	}
	if(note == "Fa")
	{
		faf--;
	}
	if(note == "Sol")
	{
		solf--;
	}
	if(note == "La")
	{
		laf--;
	}
	if(note == "Si")
	{
		sif--;
	}
}
function incrementFaute(note)
{
	
	if(note == "Do")
	{
		dof++;
	}
	if(note == "Re")
	{
		ref++;
	}
	if(note == "Mi")
	{
		mif++;
	}
	if(note == "Fa")
	{
		faf++;
	}
	if(note == "Sol")
	{
		solf++;
	}
	if(note == "La")
	{
		laf++;
	}
	if(note == "Si")
	{
		sif++;
	}
}

function afficheNoteFausse()
{
	console.log("note fausses :");
	console.log(dof);
	console.log(ref);
	console.log(mif);
	console.log(faf);
	console.log(solf);
	console.log(laf);
	console.log(sif);
}