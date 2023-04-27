let apiUrl = "https://randomuser.me/api/";
let requests = [];
let users = [];

function displayLoading() {
  //Fonction qui va créer une card loading
  const wrapper = document.getElementById("wrapper");

  const loading = document.createElement("div");
  loading.classList.add("loading");

  const card = document.createElement("div");
  card.classList.add("card_loading");

  const image = document.createElement("div");
  image.classList.add("card_image");

  const content = document.createElement("div");
  content.classList.add("card_content");

  const h2 = document.createElement("h2");
  const p = document.createElement("p");

  loading.appendChild(card);
  card.appendChild(image);
  card.appendChild(content);
  content.appendChild(h2);
  content.appendChild(p);

  wrapper.appendChild(loading);
}

function displayUser(user) {
  //Fonction qui va créer une card user
  const userCards = document.getElementById("user-cards");
  const card = document.createElement("div");
  card.classList.add("card");

  const main = document.createElement("div");
  main.classList.add("main");

  const avatar = document.createElement("img");
  avatar.classList.add("avatar");
  avatar.src = user.picture.large;
  avatar.alt = "Avatar";

  const firstname = document.createElement("p");
  firstname.classList.add("firstname");
  firstname.textContent = user.name.first;

  const description = document.createElement("p");
  description.classList.add("description");
  description.textContent = user.name.last;

  main.appendChild(avatar);
  main.appendChild(firstname);
  main.appendChild(description);

  card.appendChild(main);

  userCards.appendChild(card);
}

window.addEventListener("load", () => {
  for (let i = 0; i < 8; i++) {
    displayLoading();
  }
});

for (let i = 0; i < 8; i++) {
  //On va faire plusieurs requête
  let request = fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      users.push(data.results[0]);
    })
    .catch((error) => console.error(error));
  requests.push(request);
}

Promise.all(requests)
  .then(() => {
    for (let i = 0; i < users.length; i++) {
      displayUser(users[i]);
    }
    document.querySelector("#wrapper").style.display = "none";
  })
  .catch((error) => console.error(error));
