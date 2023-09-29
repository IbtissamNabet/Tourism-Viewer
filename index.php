<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        
        <!-- Titre Onglet -->
        <title>Tourism Viewer</title>
        <meta name="description" content="">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        
        <!-- Import de Leaflet -->
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
        integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
        crossorigin=""/>
        <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
        integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo="
        crossorigin=""></script>
        
    </head>

    <body>
        
        <?php 
        /* Inclusion de la partie Entête (Header)*/
        include('static/header.php');
        ?>
      
        <!-- Def Bloc Principal -->

        <main>

        <?php
        /* Initialisation contrôleur et vue */
        include('controleur.php');
		include('vue.php');

        ?>

        </main>

        <?php
        /* Inclusion du pied de page*/ 
        include('static/footer.php'); 
        ?>
        
        
    </body>
</html>                         