

document.addEventListener('DOMContentLoaded', () => {
      const dataList = document.getElementById('data-list');
    // Données à envoyer au backend Flask
      const requestData = {
        key: 'value' // Remplacez ceci par les données que vous voulez envoyer au serveur Flask
        };

      // Effectuer une requête POST au backend Flask
      fetch('/tu', {

          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify (requestData)
      })
      .then(response => response.json()) // Convertir la réponse en JSON
      .then(data => {
          // Mettre à jour l'interface utilisateur avec les données reçues
          data.forEach(item => {
              const listItem = document.createElement('li');
              listItem.textContent = `ID: ${item[0]}, Nom: ${item[1]}, Latitude: ${item[2]}, Longitude: ${item[3]}`;
              dataList.appendChild(listItem);
          });
      })
      .catch(error => {
          console.error('Erreur :', error);
      });
  });