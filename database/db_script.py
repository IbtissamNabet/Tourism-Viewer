################################################################################################################
########## Ce fichier contient le script de la création de la base de donées ###################################
################################################################################################################




import mysql.connector

mydb=mysql.connector.connect(
    host="lif.sci-web.net",
    user="lazeurone",
    password="12062003",
)


cursor=mydb.cursor()

#création de la base de données
query="DROP SCHEMA IF EXISTS carte_db"
cursor.execute(query)
query="CREATE SCHEMA carte_db"
cursor.execute(query)
query="USE carte_db"
cursor.execute(query)

#création des tables de la base de données
query="CREATE TABLE POI(id_poi INT NOT NULL AUTO_INCREMENT,nom_poi VARCHAR(250) NOT NULL,latitude DOUBLE,longitude DOUBLE,adresse_postale VARCHAR(250),adresse_mail VARCHAR(250),code_postal VARCHAR(250),commune VARCHAR(250),site_web VARCHAR(1000),tel VARCHAR(250),description text,PRIMARY KEY(id_poi))"
cursor.execute(query)

query="ALTER TABLE POI MODIFY COLUMN description TEXT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"
cursor.execute(query)

query="ALTER TABLE POI MODIFY COLUMN adresse_postale TEXT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"
cursor.execute(query)
query="ALTER TABLE POI MODIFY COLUMN nom_poi TEXT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"
cursor.execute(query)

query="CREATE TABLE Types(nom_type VARCHAR(255),nom_type_1 VARCHAR(255) NOT NULL,PRIMARY KEY(nom_type),FOREIGN KEY(nom_type_1) REFERENCES Types(nom_type))"
cursor.execute(query)

query="CREATE TABLE appartenir(id_poi INT,nom_type VARCHAR(255),PRIMARY KEY(id_poi, nom_type),FOREIGN KEY(id_poi) REFERENCES POI(id_poi),FOREIGN KEY(nom_type) REFERENCES Types(nom_type))"
cursor.execute(query)


#fermeture du curseur et de la connexion
cursor.close()
mydb.close()


