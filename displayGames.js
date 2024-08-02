import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";

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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Функция для отображения списка игр
function displayGames() {
    const gameListContainer = document.getElementById('game-list');

    // Получаем ссылку на данные в базе данных
    const gamesRef = ref(db, 'games');

    // Получаем данные из базы данных
    onValue(gamesRef, (snapshot) => {
        gameListContainer.innerHTML = ''; // Очистить контейнер перед добавлением новых данных

        snapshot.forEach((childSnapshot) => {
            const gameData = childSnapshot.val();

            // Создаем элемент таблицы для каждой игры
            const gameElement = document.createElement('div');
            gameElement.classList.add('game-item');
            gameElement.innerHTML = `
                <table>
                    <tr>
                        <th>Название</th>
                        <td>${gameData.gameName}</td>
                    </tr>
                    <tr>
                        <th>Тип</th>
                        <td>${gameData.gameType}</td>
                    </tr>
                    <tr>
                        <th>Ссылка</th>
                        <td><a href="${gameData.gameLink}" target="_blank">${gameData.gameLink}</a></td>
                    </tr>
                    <tr>
                        <th>Описание</th>
                        <td>${gameData.gameDescription}</td>
                    </tr>
                </table>
            `;

            // Добавляем элемент в контейнер
            gameListContainer.appendChild(gameElement);
        });
    });
}

// Вызываем функцию для отображения игр при загрузке страницы
window.onload = displayGames;
