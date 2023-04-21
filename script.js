const usersContainer = document.querySelector(".users");
const options = document.querySelectorAll(".option");
const footerContainer = document.querySelector(".footer");
const selected = document.getElementById("selected");
let usersData = [];

const url = "https://toph-api.onrender.com/getData?limit=13";

function loadDataFromApi() {
  fetch(url, { method: "POST" })
    .then((response) => response.json())
    .then((jsonData) => {
      usersData = jsonData["data"];
      updateUsers("shortest");
    })
    .catch((error) => {
      console.error("Failed to load data:", error);
    });
}

function loadData() {
  fetch("final.json")
    .then((response) => response.json())
    .then((data) => {
      usersData = data;
      updateUsers("shortest");
      appendFooter();
    })
    .catch((error) => console.error(error));
}

function updateUsers(option) {
  const users = Object.entries(usersData[option])
    .sort((a, b) => b[1] - a[1])
    .slice(0, 13);
  selected.innerHTML = `
  Selected: ${option[0].toUpperCase() + option.slice(1)}
  <span>
  It shows which data is currently displayed
  </span>`.trim();
  usersContainer.innerHTML = "";

  users.forEach((user) => {
    let cls = "username";
    let pos_cls = "user-position";
    const position = users.indexOf(user) + 1;
    if (position >= 10) pos_cls += "-sub";
    if (user[0] == "Nusab19") cls += " me";
    const userHTML = `
    <div class="user">
    <span class="${pos_cls}">${position}</span>
    <a class="${cls}" href="https://toph.co/u/${user[0]}">${user[0]}</a>
    <p class="user-value">${user[1]}</p>
    </div>
    `;
    usersContainer.insertAdjacentHTML("beforeend", userHTML);
  });
}


function selectOption(event) {
  const selectedOption = event.target;
  selectedOption.classList.add("selected");
  const selectedValue = selectedOption.dataset.value;
  console.log(selectedValue);
}

options.forEach((option) => {
  option.addEventListener("click", (event) => {
    const selectedOption = event.target.textContent.toLowerCase();
    updateUsers(selectedOption);
  });
});

// loadData();
loadDataFromApi();
