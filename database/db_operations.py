#################################################################################################################################
################# Ce fichier sert de module qui contient toutes les requettes qui interrogent la base de données ################
#################################################################################################################################



# fonction  de vérification avant insertion dans Types

# retourne vrai si un tuple(t1,t2) n'existe pas encore dans la table

def NotIn_types(t1,t2,connexion):

    curseur=connexion.cursor()

    query = "SELECT COUNT(*) FROM Types WHERE nom_type = %s AND nom_type_1 = %s"  

    curseur.execute(query, (t1, t2))   

    res = curseur.fetchone()  

    curseur.close()   

    return res[0] == 0 



# fonction  de vérification avant insertion dans POI

# retourne vrai si un tuple(t1,t2,t3) n'existe pas encore dans la table

#le meme point d'interet mais pas le méme emplacement "

def NotIn_poi(nom,latitude,longitude,connexion):

    curseur=connexion.cursor()

    query = "SELECT COUNT(*) FROM POI WHERE nom_poi = %s AND latitude = %s AND longitude = %s"   

    curseur.execute(query, (nom,latitude,longitude))   

    res = curseur.fetchone()  

    curseur.close()  

    return res[0] == 0



# fonction  de vérification avant insertion dans appartenir

def NotIn_appartenir(idpoi,t,connexion):

    curseur=connexion.cursor()

    query = "SELECT COUNT(*) FROM appartenir WHERE id_poi = %s AND nom_type = %s"

    curseur.execute(query,(idpoi,t))

    res = curseur.fetchone()

    curseur.close()   

    return res[0] == 0  



################# FONCTIONS D'INSERTION D'UNE INSTANCE DANS LES TABLES################

def insert_type(type_,type_parent,connexion):

    curseur=connexion.cursor()

    query = "INSERT INTO Types (nom_type, nom_type_1) VALUES (%s, %s)"

    values = (type_,type_parent)

    curseur.execute(query, values)

    #vérifier l'insertion

    query = "SELECT * FROM Types WHERE nom_type = %s AND nom_type_1 = %s"

    curseur.execute(query,(type_,type_parent))

    result = curseur.fetchone()

    if result is not None and len(result) > 0:

        print(result[0])

    # Valider la transaction si tout s'est bien passé

    connexion.commit()

    curseur.close()

            

def insert_poi(nom_poi,latitude,longitude,adresse,mail,code,commune,site,tel,description,connexion):

    curseur=connexion.cursor()

    query = "INSERT INTO POI (nom_poi,latitude,longitude,adresse_postale,adresse_mail,code_postal,commune,site_web,tel,description) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)"

    values = (nom_poi,latitude,longitude,adresse,mail,code,commune,site,tel,description)

    curseur.execute(query, values)

    #vérifier l'insertion

    query = "SELECT * FROM POI WHERE nom_poi = %s AND latitude = %s AND longitude = %s"

    curseur.execute(query,(nom_poi,latitude,longitude))

    result = curseur.fetchone()

    if result is not None and len(result) > 1:

        print(result[1])

    # Valider la transaction si tout s'est bien passé

    connexion.commit()

    curseur.close()



def insert_appartenir(id,nom_type,connexion):

    curseur=connexion.cursor()

    query = "INSERT INTO appartenir (id_poi,nom_type) VALUES (%s,%s)"

    values=(id,nom_type)

    curseur.execute(query,values)

    #vérifier l'insertion

    query = "SELECT * FROM appartenir WHERE id_poi = %s AND nom_type = %s"

    curseur.execute(query,(id,nom_type))

    result = curseur.fetchone()

    result = curseur.fetchone()

    if result is not None and len(result) > 0:

        print(result[0])

    # Valider la transaction si tout s'est bien passé

    connexion.commit()

    curseur.close()

    

def get_id_poi(nom_poi,latitude,longitude,connexion):

    curseur=connexion.cursor()

    query = "SELECT id_poi FROM POI WHERE nom_poi = %s AND latitude = %s AND longitude = %s"

    curseur.execute(query,(nom_poi,latitude,longitude))

    result=curseur.fetchone()

    curseur.close()

    return result[0] 





################# FONCTIONS DE RECUPERATION DE DONNEES DE LA BASE DE DONNEES ################



# Fonction qui execute une requete et retourne le résultat sous forme de dictionnaire

def execute_query_and_return_dict(query, values, connexion):

    result_dict = {}    

    try:

        # Connexion à la base de données

        while not connexion.is_connected():

            connexion.reconnect()

        # Création d'un curseur

        cursor = connexion.cursor(dictionary=True)

        # Exécution de la requête

        cursor.execute(query,values)

        # Récupération des résultats sous forme de dictionnaire

        result_dict = cursor.fetchall()

    except mysql.connector.Error as err:

        print(f"Erreur MySQL: {err}")

    finally:

        # Fermeture du curseur

        if cursor:

            cursor.close()

    return result_dict



# Fonction qui retourne les POI d'un certain types

def getData_accTypes(liste_types,connexion):

    # le résultat est une liste de dictionnaire

    final=[]

    #query="SELECT * FROM poi INNER JOIN (SELECT * FROM appartenir WHERE nom_type = %s) ON poi.id_poi = appartenir.id_poi"    

    query="SELECT * FROM POI INNER JOIN appartenir ON POI.id_poi = appartenir.id_poi WHERE nom_type = %s LIMIT 400"

    for type in liste_types:

        print(type)        

        value=(type,)

        result=execute_query_and_return_dict(query,value,connexion)

        final=final+result 

    # Renvoyer les données au format JSON

    return final





#fonction qui retourne tout les  poi autour de la position actuelle (PAS UTILISE , pour le test)   :

def getPoiArround(latitude,longitude,radiusKm,connexion):

    radiusKm=2

    result_dict = {}  

    curseur=connexion.cursor(dictionary=True)

    query="""

       SELECT * FROM POI WHERE (6371 * ACOS(COS(RADIANS(%s)) * COS(RADIANS(latitude)) * COS(RADIANS(longitude) - RADIANS(%s)) + SIN(RADIANS(%s)) * SIN(RADIANS(latitude)))) <= %s; """

    curseur.execute(query,(latitude, longitude, latitude,radiusKm))

    result_dict = curseur.fetchall()

    if curseur:

        curseur.close()

    #print("Requête exécutée avec les valeurs :", latitude, longitude, radiusKm)

    #print("Les POI depuis la base de données :", result_dict)

    return result_dict


#fonction qui retourne  les  poi selon le type coché autour de la position actuelle   :


def getPoiArround_accTypes(liste_types,latitude,longitude,radiusKm,connexion):
    
    radiusKm=4

    final = []  

    query="""

       SELECT * 

       FROM POI INNER JOIN appartenir ON POI.id_poi = appartenir.id_poi 

       WHERE nom_type = %s AND (6371 * ACOS(COS(RADIANS(%s)) * COS(RADIANS(latitude)) * COS(RADIANS(longitude) - RADIANS(%s)) + SIN(RADIANS(%s)) * SIN(RADIANS(latitude)))) <= %s  LIMIT 400; """   

    for type in liste_types:

        print("le type dans la requete en cours est "+type)        

        value=(type,latitude,longitude,latitude,radiusKm)

        result=execute_query_and_return_dict(query,value,connexion)

        final=final+result 

    return final