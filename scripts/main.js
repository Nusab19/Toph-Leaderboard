const USERS = document.querySelector(".users");
const OPTIONS = document.querySelectorAll(".option");
const FOOTER = document.querySelector(".footer");
const SELECTED = document.getElementById("selected");

const API_URL = "https://toph-api.onrender.com";

let usersData = [];
let unsolved = [];
async function loadDataFromApi() {
  try {
    const response = await fetch(`${API_URL}/getData`);
    const jsonData = await response.json();
    usersData = jsonData["data"];
    updateUsers("shortest");
    await loadUnsolvedFromApi();
  } catch (error) {
    console.error("Failed to load Data. Error:\n", error);
    loadData();
  }
}

async function loadData() {
  try {
    const response = await fetch("assets/Data/allProblems.json");
    const data = await response.json();
    usersData = data;
    updateUsers("shortest"); // default option to show
  } catch (error) {
    console.error(error);
  }
}

async function loadUnsolvedFromApi() {
  try {
    const response = await fetch(`${API_URL}/unsolved`);
    const jsonData = await response.json();
    unsolved = jsonData["data"];
  } catch (error) {
    console.error("Failed to load unsolved problems data. Error:\n", error);
    loadUnsolved();
  }
}

async function loadUnsolved() {
  try {
    const response = await fetch("assets/Data/unsolved.json");
    const data = await response.json();
    unsolved = data;

  } catch (error) {
    console.error(error);
  }
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
  Selected: ${option[0].toUpperCase() + option.slice(1)}`.trim();

  if (option == "unsolved") {
    TABLE_HEAD.innerHTML = `<p style="margin-right: 3%;">Position</p>
    &#149;
    <span style="margin-left: 3%;">Problem Name</span>`;
    USERS.innerHTML = "";
    unsolved.forEach((url) => {
      const name = capitalizeWords(url);
      let margin = 33;
      console.log(url)
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
        <a class="username" href="https://toph.co/p/${url}">${name}</a></div>`
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
    <a class="${cls}" target=_blank href="/u/${user[0]}">${user[0]}</a>
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
}

OPTIONS.forEach((option) => {
  option.addEventListener("click", (event) => {
    const selectedOption = event.target.textContent.toLowerCase();
    updateUsers(selectedOption);
  });
});

loadDataFromApi();