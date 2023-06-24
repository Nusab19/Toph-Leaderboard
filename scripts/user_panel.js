const currentUrl = window.location.href.split('/')

let USERNAME = currentUrl[4]

const USERS = document.querySelector(".users");
const OPTIONS = document.querySelectorAll(".option");
const FOOTER = document.querySelector(".footer");
const SHOWING = document.getElementById("selected");
const STATS = document.querySelector(".stats");
const API_URL = "https://toph-api.onrender.com";
const PROFILE_NAME = document.getElementById("profilename")
// USERNAME = "Nusab19";

let usersData = [];

async function loadDataFromApi() {
    try {
        const response = await fetch(`${API_URL}/user?name=${USERNAME}`);
        const jsonData = await response.json();
        usersData = jsonData["data"];
    updateStats();
    updateUsers("shortest");
  } catch (error) {
    console.error("Failed to load Data. Error:\n", error);
    //   loadData();
  }
}

async function loadData() {
    try {
        const response = await fetch(`${API_URL}/user?name=${USERNAME}`);
        const jsonData = await response.json();
        usersData = jsonData["data"];
    updateStats();
    updateUsers("shortest");
  } catch (error) {
    console.error("Failed to load Data. Error:\n", error);
    //   loadData();
  }
}


loadDataFromApi();

function updateStats() {
  STATS.innerHTML = `
    <li>Fastest:  ${usersData["fastest"].length}</li>
    <li>Lightest: ${usersData["lightest"].length}</li>
    <li>Shortest: ${usersData["shortest"].length}</li>
    `.trim();
}

function capitalizeWords(str) {
  let wordsArray = str.split("-");
  let capitalizedWordsArray = wordsArray.map(function (word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  });
  return capitalizedWordsArray.join("-");
}

function updateUsers(option) {
  SHOWING.innerHTML = `
    Showing \`${option[0].toUpperCase() + option.slice(1)}\` Ones of @${USERNAME}`.trim();

  USERS.innerHTML = "";
  const users = usersData[option];

  if (users.length == 0) {
    USERS.innerHTML = `<div class="user">No data dound for ${capitalizeWords(
      option
    )}.</div>`;
    return;
  }

  users.forEach((user) => {
    const position = users.indexOf(user) + 1;
    let index = position;
    let margin = 33;
    const name = capitalizeWords(user);
    while (index / 10 >= 1) {
      margin -= 8;
      index /= 10;
    }
    const userHTML = `
      <div class="user">
          <span style="margin-right: ${margin}px">${position}</span>
          <a class="username" href="https://toph.co/p/add-them-up">${name}</a>
        </div>
      `;
    USERS.insertAdjacentHTML("beforeend", userHTML);
  });
}

OPTIONS.forEach((option) => {
  option.addEventListener("click", (event) => {
    const selectedOption = event.target.textContent.toLowerCase();
    updateUsers(selectedOption);
  });
});
