const TABLE_HEAD = document.querySelector(".table");
const USERS = document.querySelector(".users");

const API_URL = "https://toph-api.onrender.com/";

let easyProblems = [];

function loadUnsolvedFromApi() {
  fetch(API_URL + "easyProblems")
    .then((response) => response.json())
    .then((jsonData) => {
      easyProblems = jsonData["data"];
      easyProblems.reverse();
      updateUsers();

    })
    .catch((error) => {
      console.error("Failed to load data:", error);
    });
}

function capitalizeWords(str) {
  let wordsArray = str.split("-");
  let capitalizedWordsArray = wordsArray.map(function (word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  });
  return capitalizedWordsArray.join("-");
}

function updateUsers() {
  USERS.innerHTML = "";
  easyProblems.forEach((item) => {
    // const ratio = item[0];
    const name = item
    const capName = capitalizeWords(name);
    let margin = 33;
    const position = easyProblems.indexOf(item) + 1;
    let index = position;
    while (index / 10 >= 1) {
      margin -= 8;
      index /= 10;
    }
    USERS.insertAdjacentHTML(
      "beforeend",
      `<div class="user">
        <span style="margin-right:${margin}px">${position}</span>
        <a class="username" target=_blank href="https://toph.co/p/${name}">${capName}</a>
        </div>`
    );
  });
}

loadUnsolvedFromApi();
