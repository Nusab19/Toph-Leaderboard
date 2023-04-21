const usersContainer = document.querySelector('.users');
const options = document.querySelectorAll('.option');
const footerContainer = document.querySelector('.footer');
const selected = document.getElementById("clicked")

let usersData = [];

function loadData() {
  fetch('final.json')
  .then(response => response.json())
  .then(data => {
    usersData = data;
    updateUsers("shortest")
    appendFooter()
  })
  .catch(error => console.error(error));
}

function updateUsers(option) {
  const users = Object.entries(usersData[option]).sort((a, b) => b[1] - a[1]).slice(0, 13);
  // Clear previous usersContainer
  selected.innerHTML = `Selected: ${option[0].toUpperCase() + option.slice(1, 13)}`
  usersContainer.innerHTML = '';

  // Loop through users and create HTML
  users.forEach(user => {
    cls = "username"
    if (user[0] == "Nusab19")
      cls = "username me"
    const userHTML = `
    <div class="user">
    <a class="${cls}" href="https://toph.co/u/${user[0]}">${user[0]}</a>
    <p class="user-value">${user[1]}</p>
    </div>
    `;
    usersContainer.insertAdjacentHTML('beforeend', userHTML);

  });
}

function appendFooter() {
  const footerHTML = `
  <div class="footer">
  <p>All rights reserved</p>
  </div>
  `;
  //footerContainer.insertAdjacentHTML('beforeend', footerHTML);
  // footerContainer.innerHTML = footerHTML;
}


function selectOption(event) {
  // Remove selected class from all options

  // Add selected class to clicked option
  const selectedOption = event.target;
  selectedOption.classList.add('selected');
  // Get value of selected option
  const selectedValue = selectedOption.dataset.value;
  console.log(selectedValue)
}



options.forEach(option => {
  //  option.addEventListener('click', selectOption);
  option.addEventListener('click', event => {
    const selectedOption = event.target.textContent.toLowerCase();
    updateUsers(selectedOption);
  });
});

loadData()
//appendFooter()