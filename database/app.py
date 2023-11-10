from flask import Flask, jsonify, render_template
import mysql.connector

app = Flask(__name__)

# Connexion à la base de données MySQL
mydb = mysql.connector.connect(
    host="lif.sci-web.net",
    user="lazeurone",
    password="12062003",
    database="carte_db"
    
)
@app.route('/tu', methods=['GET'])
def home():
    return render_template('/home/ibtissam/lifprojet/index.html')
# Endpoint pour récupérer les données
@app.route('/api/data', methods=['GET'])
def get_data():
    # Établir une connexion à la base de données MySQL
    connection = mydb
    cursor = connection.cursor()

    # Exécuter la requête SQL pour récupérer les données de la table
    cursor.execute('SELECT * FROM POI LIMIT 10')
    data = cursor.fetchall()

    # Fermer le curseur (pas nécessaire de fermer la connexion car nous utilisons la connexion globale)
    cursor.close()

    # Renvoyer les données au format JSON
    return jsonify(data)
if __name__ == '__main__':
    app.run(port=5000)