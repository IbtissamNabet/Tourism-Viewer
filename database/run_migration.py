import mysql.connector
import os
import data_migration

connexion=mysql.connector.connect(
    host="lif.sci-web.net",
    user="lazeurone",
    password="12062003",
    database="carte_db"
)

# migration des types
#importer des données à partir du fichier CSV types.csv dans la base de données, en utilisant la connexion MySQL fournie comme argument.
data_migration.import_type(f'..//data//csv_files//cleaned_csv//types.csv',connexion)

#récupération des fichiers de poi du dossiers csv_files/cleaned_csv dans une liste de string 
#une liste de fichiers propres a POI ( les fichiers qui se terminent par ...)
#pcq y'a beaucoup de regions donc on a besoin dune liste de *$=fichier propre a chaque region 
dir = "..//data//csv_files//cleaned_csv//"
files = os.listdir(dir)
poi_files = [file for file in files if file.endswith("20231014.csv")]

# pour chaque fichier effectuer la migration
for file in poi_files:
    #on crée un chemin (composé de dir qui est le dossier cleaned csv et le fichier actuels )
    file_path = dir+file
    #on utilise le fichier avec la fonction de datamigration pour importer les données dans la base de données 
    data_migration.import_poi(file_path,connexion)
    
connexion.close()