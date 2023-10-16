################# FONCTIONS DE VERIFICATION AVANT INSERTION################

# fonction qui de vérification avant insertion dans Types
# retourne vrai si un tuple(t1,t2) n'existe pas encore dans la table
#nb d'occurence =0
def NotIn_types(t1,t2,connexion):
    curseur=connexion.cursor()
    query = "SELECT COUNT(*) FROM Types WHERE nom_type = %s AND nom_type_1 = %s"  
    curseur.execute(query, (t1, t2))   
    res = curseur.fetchone()  
    curseur.close()   
    return res[0] == 0 

# fonction qui de vérification avant insertion dans POI
# retourne vrai si un tuple(t1,t2,t3) n'existe pas encore dans la table
#le meme point d'interet mais pas le méme emplacement "
def NotIn_poi(nom,latitude,longitude,connexion):
    curseur=connexion.cursor()
    query = "SELECT COUNT(*) FROM POI WHERE nom_poi = %s AND latitude = %s AND longitude = %s"   
    curseur.execute(query, (nom,latitude,longitude))   
    res = curseur.fetchone()  
    curseur.close()  
    return res[0] == 0

# fonction qui de vérification avant insertion dans appartenir
# retourne vrai si un tuple(t1,t2) n'existe pas encore dans la table
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
    result=curseur.fetchone()
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
    result=curseur.fetchone()
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
    result=curseur.fetchone()
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