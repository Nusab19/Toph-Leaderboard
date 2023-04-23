const TABLE_HEAD = document.querySelector(".table");
const USERS = document.querySelector(".users");

const API_URL = "https://toph-api.onrender.com/";

let easyProblems = [];

function loadUnsolvedFromApi() {
  fetch(API_URL + "easyProblems")
    .then((response) => response.json())
    .then((jsonData) => {
      easyProblems = jsonData["data"];
      //   console.log(easyProblems);
      updateUsers();
    })
    .catch((error) => {
      console.error("Failed to load data:", error);
      loadUnsolved();
      updateUsers();
    });
}

function loadUnsolved() {
  fetch("assets/easyProblems.json")
    .then((response) => response.json())
    .then((data) => {
      easyProblems = data;
      updateUsers("shortest");
    })
    .catch((error) => console.error(error));
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
  TABLE_HEAD.innerHTML = `<p style="margin-right: 5%;">Position</p>
    &#149;
    <span style="margin-left: 5%;">Problem Name</span>`;
  easyProblems.forEach((item) => {
    const ratio = item[0];
    const name = item[1];
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
        <a class="username" href="https://toph.co/p/${name}">${capName}</a>
        <span style="margin-right: 2%;margin-left: auto">${ratio}%</span>
        </div>`
    );
  });
}

loadUnsolvedFromApi();
