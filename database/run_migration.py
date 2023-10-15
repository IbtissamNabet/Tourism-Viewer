import mysql.connector
import os
import data_migration

connexion=mysql.connector.connect(
    host="localhost",
    user="root",
    password="Password.1",
    database="carte_db"
)

# migration des types
data_migration.import_type(f'..\\data\\csv_files\\cleaned_csv\\types.csv',connexion)

#récupération des fichiers de poi du dossiers csv_files/cleaned_csv dans une liste de string
dir = "../data/csv_files/cleaned_csv/"
files = os.listdir(dir)
poi_files = [file for file in files if file.endswith("20231014.csv")]

# pour chaque fichier effectuer la migration
for file in poi_files:
    file_path = dir+file
    data_migration.import_poi(file_path,connexion)
    
connexion.close()