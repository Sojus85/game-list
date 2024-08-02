import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyB4e5O87qFqXO7-0W7V3qfXO7-0W7V3qfX",
  authDomain: "gamelist-sojus85.firebaseapp.com",
  databaseURL: "https://gamelist-sojus85.firebaseio.com",
  projectId: "gamelist-sojus85",
  storageBucket: "gamelist-sojus85.appspot.com",
  messagingSenderId: "891056867322",
  appId: "1:891056867322:web:abcdefghijklmnopqrstuvwxyz"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Функция для отображения игр
function fetchGames() {
  const gamesList = document.getElementById('games-list');
  gamesList.innerHTML = '';

  onValue(ref(db, 'games'), (snapshot) => {
    snapshot.forEach((childSnapshot) => {
      const game = childSnapshot.val();
      const li = document.createElement('li');
      li.textContent = `${game.gameName} - ${game.gameType} - ${game.gameLink} - ${game.gameDescription}`;
      gamesList.appendChild(li);
    });
  });
}

// Проверка, на какой странице мы находимся, и выполнение соответствующих функций
if (window.location.pathname.endsWith('/index.html')) {
  fetchGames();
}

// Добавление кнопки "Вернуться к списку игр" на всех страницах, кроме главной страницы
if (!window.location.pathname.endsWith('/index.html')) {
  const backButton = document.createElement('a');
  backButton.href = '/index.html';
  backButton.textContent = 'Вернуться к списку игр';
  backButton.classList.add('back-button');
  document.body.appendChild(backButton);
}
