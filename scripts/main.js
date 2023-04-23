const USERS = document.querySelector(".users");
const OPTIONS = document.querySelectorAll(".option");
const FOOTER = document.querySelector(".footer");
const SELECTED = document.getElementById("selected");

const API_URL = "https://toph-api.onrender.com/";

let usersData = [];
let unsolved = [];

function loadDataFromApi() {
  fetch(API_URL + "getData?limit=13")
    .then((response) => response.json())
    .then((jsonData) => {
      usersData = jsonData["data"];
      updateUsers("shortest");
      loadUnsolvedFromApi();
    })
    .catch((error) => {
      console.error("Failed to load data:", error);
      loadData();
    });
}

function loadData() {
  fetch("assets/data.json")
    .then((response) => response.json())
    .then((data) => {
      usersData = data;
      updateUsers("shortest");
    })
    .catch((error) => console.error(error));
}

function loadUnsolvedFromApi() {
  fetch(API_URL + "unsolved")
    .then((response) => response.json())
    .then((jsonData) => {
      unsolved = jsonData["data"];
    })
    .catch((error) => {
      console.error("Failed to load data:", error);
      loadUnsolved();
    });
}

function loadUnsolved() {
  fetch("assets/unsolved.json")
    .then((response) => response.json())
    .then((data) => {
      unsolved = data;
      updateUsers("shortest");
    })
    .catch((error) => console.error(error));
}

const TABLE_HEAD = document.querySelector(".table");
const TABLE_HEAD_TEXT = `<p style="margin-right: 3%;">Position</p>
&#149;
<span style="margin-right: auto;margin-left: 3%;">Username</span>
&#149;
<p style="margin-right: 10px;margin-left: auto;">Submissions Count</p>`;

function capitalizeWords(str) {
  let wordsArray = str.split("-");
  let capitalizedWordsArray = wordsArray.map(function (word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  });
  return capitalizedWordsArray.join("-");
}

function updateUsers(option) {
  SELECTED.innerHTML = `
  Selected: ${option[0].toUpperCase() + option.slice(1)}
  <span>
  It shows which data is currently displayed
  </span>`.trim();

  if (option == "unsolved") {
    TABLE_HEAD.innerHTML = `<p style="margin-right: 3%;">Position</p>
    &#149;
    <span style="margin-left: 3%;">Problem Name</span>`;
    USERS.innerHTML = "";
    unsolved.forEach((url) => {
      const name = capitalizeWords(url.split("/")[4]);
      let margin = 33;
      const position = unsolved.indexOf(url) + 1;
      let index = position;
      while (index / 10 >= 1) {
        margin -= 8;
        index /= 10;
      }
      USERS.insertAdjacentHTML(
        "beforeend",
        `<div class="user">
        <span style="margin-right:${margin}px">${position}</span>
        <a class="username" href="${url}">${name}</a></div>`
      );
    });

    return;
  } else {
    TABLE_HEAD.innerHTML = TABLE_HEAD_TEXT;
  }

  const users = Object.entries(usersData[option])
    .sort((a, b) => b[1] - a[1])
    .slice(0, 13);

  USERS.innerHTML = "";
  users.forEach((user) => {
    let cls = "username";
    let margin = 33;
    const position = users.indexOf(user) + 1;
    let index = position;
    while (index / 10 >= 1) {
      margin -= 8;
      index /= 10;
    }
    if (user[0] == "Nusab19") cls += " me";
    const userHTML = `
    <div class="user">
    <span style="margin-right:${margin}px">${position}</span>
    <a class="${cls}" href="https://toph.co/u/${user[0]}">${user[0]}</a>
    <p class="user-value">${user[1]}</p>
    </div>
    `;
    USERS.insertAdjacentHTML("beforeend", userHTML);
  });
}

function selectOption(event) {
  const selectedOption = event.target;
  selectedOption.classList.add("selected");
  const selectedValue = selectedOption.dataset.value;
  console.log(selectedValue);
}

OPTIONS.forEach((option) => {
  option.addEventListener("click", (event) => {
    const selectedOption = event.target.textContent.toLowerCase();
    updateUsers(selectedOption);
  });
});

// loadData();
loadDataFromApi();
