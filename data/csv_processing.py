##################################################################################################################################
###### ce fichier contient les fonctions qui servent a nettoyer les fichiers CSV recupérées depuis le site DataTourise ###########
###### le dossier raw.csv contient les fichiers recupéres non traités , et le fichier cleaned.csv contient les fichiers###########
########################    recupérées traités par ce script  ####################################################################
##################################################################################################################################





import pandas as pd
from pathlib import Path
import re
import os

###### TRAITEMENT DU FICHIER types.csv ######

new_filepath_types = Path('./csv_files/cleaned_csv/types.csv')
new_filepath_types.parent.mkdir(parents=True, exist_ok=True)

# listes des types de POI à garder
values_to_include_ParentLabel = ["Hébergement", "Prestataire d'activité", "Restauration",
                             "Service d'information touristique", "Site culturel", "Site naturel",
                             "Site sportif, récréatif et de loisirs"]

values_to_include_Label = ["Agence de guides", "Bar, bar à thème", "Bateau promenade", "Bistrot - Bar à vin",
                             "Boulangerie", "Bâtiment civil remarquable", "Café ou salon de thé", "Canal",
                             "Canyon", "Cascade", "Cascade de glace", "Cave ou caveau", "Centre d'interprétation",
                             "Cirque", "Cirque naturel", "Comité départemental du tourisme", "Comité régional du tourisme",
                             "Complexe de loisirs (loisirs regroupés)", "Curiosité naturelle", "Dune", "Glacier",
                             "Glacier de montagne", "Gorge", "Grotte, gouffre, aven, caverne, carrière", "Guide professionnel",
                             "Hébergement collectif", "Hébergement locatif", "Hôte bénévole, greeter", "Hôtellerie",
                             "Hôtellerie de plein air", "Ile - presqu'île", "Lac", "Lieu de mémoire",
                             "Maison du tourisme", "Musée", "Office de tourisme", "Organisme réceptif",
                             "Parc de loisirs, parc à thème", "Parc et jardin", "Parc naturel",
                             "Patrimoine industriel, artisanal, rural, agricole et technique", "Plage", "Point de vue",
                             "Prestataire d'activité culturelle", "Prestataire d'activité sportive et de loisir",
                             "Restaurant", "Restauration ambulante, Food truck", "Restauration Rapide",
                             "Sentier de découverte et d'interprétation", "Site archéologique", "Site de défense",
                             "Site religieux", "Vivarium - Aquarium", "Volcan", "Voyagiste", "Zoo - parc animalier"]

data_type = pd.read_csv('./csv_files/raw_csv/types.csv')

# Filtrer les lignes où la colonne 'ParentLabel' 
# est l'une des valeurs spécifiées dans la liste values_to_include_ParentLabel
filtered_ParentLabel = data_type[data_type['ParentLabel'].isin(values_to_include_ParentLabel)] 

# Filtrer les lignes où la colonne 'Label' 
# est l'une des valeurs spécifiées dans la liste values_to_include_Label en plus de la condition précédente
data_type = filtered_ParentLabel[filtered_ParentLabel['Label'].isin(values_to_include_Label)]

# Ajouter des lignes en tete du data frame data2
# de sorte que les types parents aient comme type parent eux meme

for label in values_to_include_ParentLabel:
    for _, row in data_type.iterrows():
        label2 = row['ParentLabel']
        url = row['ParentURI']
        if label in label2:
            nouvelle_ligne = {'URI': url, 'Label': label, 'ParentURI': url, 'ParentLabel': label}
            data_type = pd.concat([pd.DataFrame(nouvelle_ligne, index=[0]), data_type], ignore_index=True)
            break
        
# Supprimer < et > de la colenne URI et ParentURI de data2
data_type['URI'] = data_type['URI'].str.replace("<","")
data_type['URI'] = data_type['URI'].str.replace(">","")
data_type['ParentURI'] = data_type['ParentURI'].str.replace("<","")
data_type['ParentURI'] = data_type['ParentURI'].str.replace(">","")  

# exportation du jeu de données transformé en fichier csv
file_csv = data_type.to_csv(new_filepath_types)


###### TRANSFORMATION DES FICHIERS datatourisme.csv ######

#récupération des fichiers du dossiers csv_files/raw_csv dans une liste de string
dir_raw = "./csv_files/raw_csv/"
files = os.listdir(dir_raw)
poi_files = [file for file in files if file.endswith("20231014.csv")]

for file in poi_files:
    dir_cleaned="./csv_files/cleaned_csv/"
    new_file=dir_cleaned+file
    new_filepath_poi = Path(new_file)
    new_filepath_poi.parent.mkdir(parents=True, exist_ok=True)
    raw_file=dir_raw+file
    data_lieu = pd.read_csv(raw_file)

    # crée 2 nouvelles colonnes pour  séparer code postal et ville
    data_lieu['Code_postal_et_commune'] = data_lieu['Code_postal_et_commune'].str.replace("#","")
    data_lieu['Code_postal'] = data_lieu['Code_postal_et_commune'].str[:5]
    data_lieu['Commune'] = data_lieu['Code_postal_et_commune'].str[5:]
    # crée 3 nouvelles colonnes pour séparer les éléments de la colonne contacts_du_POI
    data_lieu['Telephone']=data_lieu['Contacts_du_POI'].str.extract(r'(\+33 [0-9 ]+)')
    data_lieu['Mail']=data_lieu['Contacts_du_POI'].str.extract(r'([a-zA-Z\-\.]+@[a-zA-Z\-\.0-9]+\.[a-zA-Z]{2,6})')
    data_lieu['Site_web']=data_lieu['Contacts_du_POI'].str.extract(r'(https?://[a-zA-Z0-9\.-]+\.[a-zA-Z]{2,4}(/\S*)?)')[0]

    # choix des colonnes que je veux
    data_lieu = data_lieu[['Nom_du_POI','Categories_de_POI','Latitude','Longitude',
                    'Adresse_postale','Code_postal','Telephone','Mail',
                    'Site_web','Commune','Description']] 

    # je filtre data_lieu pour ne garder que les lignes 
    # dont la colonne catégorie contient un/des type(s) de la liste values_to_include_Label
    types_to_keep=data_type[data_type['Label'].isin(values_to_include_Label)]
    URI_to_keep=types_to_keep['URI'].tolist()

    lieu = data_lieu[data_lieu['Categories_de_POI'].str.contains('|'.join(URI_to_keep))]
    # exportation du jeu de données transformé en fichier csv
    file_csv = lieu.to_csv(new_filepath_poi)