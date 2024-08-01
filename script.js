import firebase from 'firebase/app';
import  'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyB4e5O87qFqXO7-0W7V3qfXO7-0W7V3qfX",
  authDomain: "gamelist-sojus85.firebaseapp.com",
  databaseURL: "https://gamelist-sojus85.firebaseio.com",
  projectId: "gamelist-sojus85",
  storageBucket: "gamelist-sojus85.appspot.com",
  messagingSenderId: "891056867322",
  appId: "1:891056867322:web:abcdefghijklmnopqrstuvwxyz"
};

firebase.initializeApp(firebaseConfig);

// Добавление кнопки "Вернуться к списку игр" на всех страницах, кроме главной страницы
if (!window.location.pathname.endsWith('/index.html')) {
  const backButton = document.createElement('a');
  backButton.href = '/index.html';
  backButton.textContent = 'Вернуться к списку игр';
  backButton.classList.add('back-button');
  document.body.appendChild(backButton);
}

function submitForm(event) {
  event.preventDefault();

  // Получает данные формы
  const gameName = document.getElementById('game-name').value;
  const gameType = document.querySelector('input[name="game-type"]:checked').value;
  const gameLink = document.getElementById('game-link').value;
  const gameDescription = document.getElementById('game-description').value;

  // Создает объект с данными формы
  const formData = {
    gameName,
    gameType,
    gameLink,
    gameDescription
  };

  // Записывает данные формы в базу данных Firebase Realtime Database
  firebase.database().ref('games').push(formData);
}
