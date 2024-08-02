import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import { getDatabase, ref, onValue, remove, update } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDucoVbrpJnWu_pYMqcNqw5caCBwxoK45s",
    authDomain: "gamelist-sojus85.firebaseapp.com",
    databaseURL: "https://gamelist-sojus85-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "gamelist-sojus85",
    storageBucket: "gamelist-sojus85.appspot.com",
    messagingSenderId: "891056867322",
    appId: "1:891056867322:web:36d52855cc440a05648643"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Function to display games
function displayGames() {
    const gameListContainer = document.querySelector('#game-list tbody');

    // Get data from the database
    const gamesRef = ref(db, 'games');
    onValue(gamesRef, (snapshot) => {
        gameListContainer.innerHTML = ''; // Clear container before adding new data

        snapshot.forEach((childSnapshot) => {
            const gameId = childSnapshot.key;
            const gameData = childSnapshot.val();

            // Create elements for each game
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>
                    <button class="edit-button" data-id="${gameId}">✏️</button>
                    <button class="delete-button" data-id="${gameId}">🗑️</button>
                </td>
                <td>${gameData.gameName}</td>
                <td>${gameData.gameType === 'licensed' ? 'Лицензия' : 'Пиратка'}</td>
                <td><a href="${gameData.gameLink}" target="_blank">${gameData.gameLink}</a></td>
                <td>${gameData.gameDescription}</td>
            `;
            gameListContainer.appendChild(row);
        });

        // Add event listeners to buttons
        document.querySelectorAll('.edit-button').forEach(button => {
            button.addEventListener('click', openEditModal);
        });

        document.querySelectorAll('.delete-button').forEach(button => {
            button.addEventListener('click', openDeleteModal);
        });
    });
}

// Open the edit modal with pre-filled data
function openEditModal(event) {
    const gameId = event.target.dataset.id;
    const gameRef = ref(db, `games/${gameId}`);

    // Get game data from the database
    onValue(gameRef, (snapshot) => {
        const gameData = snapshot.val();

        document.getElementById('edit-game-id').value = gameId;
        document.getElementById('edit-game-name').value = gameData.gameName;
        document.getElementById('edit-game-type').value = gameData.gameType;
        document.getElementById('edit-game-link').value = gameData.gameLink;
        document.getElementById('edit-game-description').value = gameData.gameDescription;

        document.getElementById('edit-modal').style.display = 'block';
    });
}

// Save edited game data
document.getElementById('edit-form').addEventListener('submit', (event) => {
    event.preventDefault();

    const gameId = document.getElementById('edit-game-id').value;
    const updatedGameData = {
        gameName: document.getElementById('edit-game-name').value,
        gameType: document.getElementById('edit-game-type').value,
        gameLink: document.getElementById('edit-game-link').value,
        gameDescription: document.getElementById('edit-game-description').value
    };

    update(ref(db, `games/${gameId}`), updatedGameData)
        .then(() => {
            document.getElementById('edit-modal').style.display = 'none';
        })
        .catch((error) => {
            console.error('Error updating game:', error);
        });
});

// Open the delete modal
function openDeleteModal(event) {
    const gameId = event.target.dataset.id;
    const deleteButton = document.getElementById('confirm-delete');

    deleteButton.dataset.id = gameId;
    document.getElementById('delete-modal').style.display = 'block';
}

// Confirm and delete game
document.getElementById('confirm-delete').addEventListener('click', () => {
    const gameId = document.getElementById('confirm-delete').dataset.id;

    remove(ref(db, `games/${gameId}`))
        .then(() => {
            document.getElementById('delete-modal').style.display = 'none';
        })
        .catch((error) => {
            console.error('Error deleting game:', error);
        });
});

// Close the modals
document.getElementById('cancel-delete').addEventListener('click', () => {
    document.getElementById('delete-modal').style.display = 'none';
});

document.querySelectorAll('.close-button').forEach(button => {
    button.addEventListener('click', () => {
        document.querySelectorAll('.modal').forEach(modal => {
            modal.style.display = 'none';
        });
    });
});

// Initialize the display of games
window.onload = displayGames;
