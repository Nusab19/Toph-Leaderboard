const currentUrl = window.location.href.split('/')

const PAGE404=`<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><meta http-equiv="X-UA-Compatible" content="IE=edge"><meta name="viewport" content="width=device-width,initial-scale=1"><title>404 HTML Template by Colorlib</title><style>*{-webkit-box-sizing:border-box;box-sizing:border-box}body{padding:0;margin:0}#notfound{position:relative;height:100vh}#notfound .notfound{position:absolute;left:50%;top:50%;-webkit-transform:translate(-50%,-50%);-ms-transform:translate(-50%,-50%);transform:translate(-50%,-50%)}.notfound{max-width:520px;width:100%;line-height:1.4;text-align:center}.notfound .notfound-404{position:relative;height:240px}.notfound .notfound-404 h1{font-family:montserrat,sans-serif;position:absolute;left:50%;top:50%;-webkit-transform:translate(-50%,-50%);-ms-transform:translate(-50%,-50%);transform:translate(-50%,-50%);font-size:252px;font-weight:900;margin:0;color:#262626;text-transform:uppercase;letter-spacing:-40px;margin-left:-20px}.notfound .notfound-404 h1>span{text-shadow:-8px 0 0 #fff}.notfound .notfound-404 h3{font-family:cabin,sans-serif;position:relative;font-size:16px;font-weight:700;text-transform:uppercase;color:#262626;margin:0;letter-spacing:3px;padding-left:6px}.notfound h2{font-family:cabin,sans-serif;font-size:20px;font-weight:400;text-transform:uppercase;color:#000;margin-top:0;margin-bottom:25px}@media only screen and (max-width:767px){.notfound .notfound-404{height:200px}.notfound .notfound-404 h1{font-size:200px}}@media only screen and (max-width:480px){.notfound .notfound-404{height:162px}.notfound .notfound-404 h1{font-size:162px;height:150px;line-height:162px}.notfound h2{font-size:16px}}</style></head><body><div id="notfound"><div class="notfound"><div class="notfound-404"><h3>Oops! Page not found</h3><h1><span>4</span><span>0</span><span>4</span></h1></div><h2>we are sorry, but the page you requested was not found</h2></div></div></body></html>`

const mainPage = `<div><div class="options"><p>Select an option:</p><ul><li class="option">Fastest</li><li class="option">Lightest</li><li class="option">Shortest</li></ul></div><h3 id="selected">Loading Data...</h3><ul class="stats"><li>Fastest: 0</li><li>Lightest: 0</li><li>Shortest: 0</li></ul><div class="table"><p style="margin-left:3%">URLs</p></div><div class="users"><div class="user"><span style="margin-right:33px">1</span><a class="username" href="https://toph.co/p/add-them-up">Add-Them-Up</a></div><div class="user"><span style="margin-right:33px">2</span><a class="username" href="https://toph.co/p/copycat">CopyCat</a></div></div>`;

if (currentUrl[3] != "u" || currentUrl.length < 5) {
  document.body.innerHTML = PAGE404;
}
else{
  document.body.innerHTML = mainPage;
}



let USERNAME = currentUrl[4]
document.title = `${USERNAME}`
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
  const ft=usersData["fastest"].length;
  const lt=usersData["lightest"].length;
  const st=usersData["shortest"].length;

  STATS.innerHTML = `
    <li>Fastest:  ${ft}</li>
    <li>Lightest: ${lt}</li>
    <li>Shortest: ${st}</li>
    `.trim();
  
  if(ft>0){
    updateUsers("fastest");
  }else if(lt > 0){
    updateUsers("lightest");
  }
  else{
    updateUsers("shortest");
  }
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
    Showing \`${option[0].toUpperCase() + option.slice(1)}\` Ones of <a class="username" href="https://toph.co/u/${USERNAME}">@${USERNAME}</a>`.trim();

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
          <a class="username" href="https://toph.co/p/${user}" target="_blank">${name}</a>
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
