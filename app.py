from flask import Flask, jsonify, render_template, url_for, send_from_directory, request
from mysql.connector import Error
import mysql.connector
import json 

import database.db_operations

app = Flask(__name__)

#**************** Connexion à la base de données MySQL
connexion=mysql.connector.connect(
    host="lif.sci-web.net",
    user="lazeurone",
    password="lifprojet",
    database="carte_db"
)



#*************** CREATION DE ROUTE ET DES FONCTIONNALITES CORRESPONDANTES


# Chemin du fichier JSON à mettre à jour
json_file_path = 'static/json/data_got.json'
# La fonction propre a cette url (l'index)
@app.route("/")
def index():
    return render_template("index.html")
# Endpoint pour récupérer les données
#mme que action=..

#route pour tester l'intéraction entre backend et front end
@app.route("/api/checked/", methods=['POST'])
def traiter_nombre_selection():
    try:
        # Récupérer le JSON envoyé dans le corps de la requete depuis js
        data = request.get_json()
        # Accéder à la clé sousTypesSelectionnes 
        sous_types_selectionnes = data.get('sousTypesSelectionnes')
        # Afficher les données reçues dans le terminal
        print("Données reçues :", sous_types_selectionnes)
        # Calculer le nombre de sous_types_selectionnes
        nb = len(sous_types_selectionnes)
        msg = "le nombre de types selectionnes est "+str(nb)
        # Retourner le nombre de type selectionner avec un message
        with open(json_file_path, 'w') as json_file:
            json.dump(msg, json_file, indent=2)
        
        return jsonify({"message": msg}), 200

    except Exception as e:
        # En cas d'erreur, répondre avec un code d'erreur et un message
        return jsonify({"error": str(e)}), 400

# route pour l'envoie des données requetées   
@app.route("/api/data/", methods=['POST'])
def traiter_data():
    try:
        # Récupérer le JSON envoyé dans le corps de la requete depuis js
        data = request.get_json()
        # Accéder à la clé sousTypesSelectionnes 
        sous_types_selectionnes = data.get('sousTypesSelectionnes')
        # Afficher les données reçues dans le terminal
        print("Données reçues :", sous_types_selectionnes)
        # récupérer sous forme de dictionnaire dans la base de données les poi correspondant aux types de la liste
        dict_data=database.db_operations.getData_accTypes(sous_types_selectionnes,connexion) 
        print(f'la liste est : {dict_data}') #affiche les données à retourner dans le terminal 
        with open(json_file_path, 'w') as json_file:
            json.dump(dict_data, json_file, indent=2)
             # Ajout : Supprimer les informations d'un type du fichier data_got.json
        # Retourner le nombre de type selectionner avec un message
        return jsonify({"data":dict_data}), 200
       
    except Exception as e:
        # En cas d'erreur, répondre avec un code d'erreur et un message
        return jsonify({"error": str(e)}), 400



if __name__ == '__main__':
    app.run(port=5000)