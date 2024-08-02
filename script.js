// Добавление кнопки "Вернуться к списку игр" на всех страницах, кроме главной страницы
if (!window.location.pathname.endsWith('/index.html')) {
  const backButton = document.createElement('a');
  backButton.href = './index.html';  // Или используйте '/index.html' если это подходит
  backButton.textContent = 'Вернуться к списку игр';
  backButton.classList.add('back-button');
  document.body.appendChild(backButton);
}
