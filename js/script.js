function toggleMenu() {
    let menu = document.getElementById('nav-links');
    let burger = document.querySelector('.burger-menu');

    if (menu.classList.contains('open')) {
        menu.classList.remove('open');
        burger.classList.remove('open'); // Вернуть бургер
    } else {
        menu.classList.add('open');
        burger.classList.add('open'); // Показать "X"
    }
}
function showPage(pageId) {
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });

    document.getElementById(pageId).classList.add('active');
}
function toggleRatingForm() {
    let form = document.getElementById('rating-form');
    form.style.display = (form.style.display === 'block') ? 'none' : 'block';
}
let ratingList = {};

function submitRating() {
    let name = document.getElementById('student-name').value.trim();
    let surname = document.getElementById('student-surname').value.trim();
    let score = parseInt(document.getElementById('student-score').value.trim(), 10);

    if (!name || !surname || isNaN(score)) {
        alert("Пожалуйста, заполните все поля корректно!");
        return;
    }

    let fullName = `${name} ${surname}`;

    // Если человек уже есть в списке, добавляем баллы
    ratingList[fullName] = (ratingList[fullName] || 0) + score;

    // Обновляем таблицу
    updateRatingTable();

    // Очищаем форму
    document.getElementById('student-name').value = '';
    document.getElementById('student-surname').value = '';
    document.getElementById('student-score').value = '';
}

function updateRatingTable() {
    let ratingTable = "<h2>Rating students</h2><table><tr><th>Name</th><th>Surname</th><th>Score</th></tr>";

    for (let fullName in ratingList) {
        let [name, surname] = fullName.split(" ");
        ratingTable += `<tr><td>${name}</td><td>${surname}</td><td>${ratingList[fullName]}</td></tr>`;
    }

    ratingTable += "</table>";
    document.getElementById('rating-list').innerHTML = ratingTable;
}

function clearRating() {
    ratingList = {}; // Просто очищаем объект
    updateRatingTable();
}

// Обновляем рейтинг при загрузке страницы
document.addEventListener("DOMContentLoaded", updateRatingTable);

