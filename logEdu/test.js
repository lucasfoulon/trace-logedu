UrlKtbs = "http://dsi-liris-silex.univ-lyon1.fr/m2ia/ktbs/lucasbase/";

function testRequeteKtbs()
{
    
      var trace = {
    "@id": "testRequete2/",
    "@type": "StoredTrace",
    "hasModel": "http://liris.cnrs.fr/silex/2011/simple-trace-model/",
    "origin": "1970-01-01T00:00:00Z"
    };

      $.ajax({
           type: "POST",
           url: UrlKtbs,
           dataType: "json",
           contentType: "application/json",
           data : JSON.stringify(trace),
           success: function (msg) {
               if (msg) {
                  console.log("Trace envoyée");
                   
               } else {
                  console.log("Erreur dans l'envoi de la trace");

               }
           },

          
       });
}

function postObsel(obsel)
{
     $.ajax({
           type: "POST",
           url: UrlKtbs,
           dataType: "json",
           contentType: "application/json",
           data : JSON.stringify(obsel),
           success: function (msg) {
               if (msg) {
                  console.log("Trace envoyée");
                   
               } else {
                  console.log("Erreur dans l'envoi de la trace");

               }
           },

          
       });
}