/*$(document).ready(function(){
      //appel a lAPI
      const apiUrl="https://geo.api.gouv.fr/communes?=codePostal'";
      const format='&format=json';
      let depart=$('#depart');
       let ville = $('#villeDepart');
       let erreur=$('#messageDerreur');
       $(depart).on('blur',function(){
            let code = $(this).val();//on  stock le code postale saisie 
            console.log(code);
            let url=apiUrl+code+format;
            //toute les infos par rapport au code postale
            console.log(url);
            fetch(url,{method: 'get'}).then(response => response.json()).then(results => {

                  console.log(results);
                  if(results.length){
                        //si ya des resultats renvoyés pa rl'API on boucle dessus 
                        $.each(results,function(key,value){
                              //console.log(value);
                              //le nom  des commune 
                              console.warn(value.nom);
                              $(ville).append('<option value="'+value.nom+'">'+value.nom+'</option>');
                        });
                  }
                  else {
                        if($(depart).val()){
                              console.log("erreur code postale");
                              $(MessageDerreur).text('Aucune commune avec ce code postale ').show();
                        }
                        else {
                           //message vide 
                           $(MessageDerreur).text('').hide();
                    
                  }
            }
            }).catch(err => {
                  console.log(err);
            })

       });
});
*/

