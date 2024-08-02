import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js";

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

function submitForm(event) {
  event.preventDefault();

  // Получаем данные формы
  const gameName = document.getElementById('game-name').value;
  const gameType = document.querySelector('input[name="game-type"]:checked').value;
  const gameLink = document.getElementById('game-link').value;
  const gameDescription = document.getElementById('game-description').value;

  // Создаем объект с данными формы
  const formData = {
    gameName,
    gameType,
    gameLink,
    gameDescription
  };

  // Записываем данные формы в базу данных Firebase Realtime Database
  push(ref(db, 'games'), formData).then(() => {
    console.log('Игра добавлена!');
    document.getElementById('add-game-form').reset();
  }).catch((error) => {
    console.error('Ошибка добавления игры: ', error);
  });
}

document.getElementById('add-game-form').addEventListener('submit', submitForm);
