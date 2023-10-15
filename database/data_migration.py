import csv
import db_operations 

####### fonctions qui importent les données vers les tables de la base de données ######
####### depuis des fichiers csv dans #########

def import_type(file_path,connexion): #'..\\data\\csv_files\\cleaned_csv\\types.csv'
    with open(file_path,newline='', encoding='utf-8') as csvfile:
        type = csv.DictReader(csvfile)  
        for row in type:
            label= row['Label'].strip()
            parentLabel=row['ParentLabel'].strip()
            if(db_operations.NotIn_types(label,parentLabel,connexion)):
                db_operations.insert_type(label,parentLabel,connexion)
                
                
def import_poi(file_path,connexion):
    with open(file_path,newline='', encoding='utf-8') as csvfile: #Ouvrir le fichier CSV
        csvreader = csv.DictReader(csvfile)  # Utiliser DictReader pour traiter les lignes comme des dictionnaires
        for row in csvreader: # Itérer sur les lignes du fichier CSV
            nom_poi = row['Nom_du_POI']
            latitude = row['Latitude']
            longitude = row['Longitude']
            adresse = row['Adresse_postale']
            mail = row['Mail']
            code = row['Code_postal']
            commune = row['Commune']
            site = row['Site_web']
            tel = row['Telephone']
            description = row['Description']
            categories = row['Categories_de_POI']
            if (db_operations.NotIn_poi(nom_poi,latitude,longitude,connexion)):
                db_operations.insert_poi(nom_poi,latitude,longitude,adresse,mail,code,commune,site,tel,description,connexion)
            
            #insertion dans poi implique insertion dans appartenir
            if (not(db_operations.NotIn_poi(nom_poi,latitude,longitude,connexion))):
                id = db_operations.get_id_poi(nom_poi,latitude,longitude,connexion)
                with open('..\\data\\csv_files\\cleaned_csv\\types.csv',newline='', encoding='utf-8') as csvtype:
                    ctgr=csv.DictReader(csvtype)
                    for type in ctgr:
                        if (type['URI'] in categories):
                            nom_type=type['Label']
                            if(db_operations.NotIn_appartenir(id,nom_type,connexion)):
                                db_operations.insert_appartenir(id,nom_type,connexion)