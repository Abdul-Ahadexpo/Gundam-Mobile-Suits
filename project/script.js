document.addEventListener("DOMContentLoaded", function () {
  fetch("suits.json")
    .then((response) => response.json())
    .then((data) => {
      const suitsContainer = document.getElementById("suitsContainer");

      // Store suits data globally
      window.suits = data.suits;

      // Render suits
      suitsContainer.innerHTML = data.suits
        .map(
          (suit, index) => `
          <div class="bg-gray-700 p-6 rounded-lg suit-card card">
            <h1 class="mb-3 font-bold text-emerald-400">Top ${suit.id}</h1>
            <img src="${suit.image}" alt="${suit.name}" class="w-full h-fit object-cover rounded-lg" />
            <h3 class="text-2xl font-semibold mt-4">${suit.name}</h3>

            <p class="mt-2 text-lg text-gray-400">${suit.description}</p>

            <button class="btn btn-primary mt-4 see-details-btn" data-index="${index}">See Details</button>
          </div>
        `
        )
        .join("");

      // Add event listeners to buttons
      const detailButtons = document.querySelectorAll(".see-details-btn");
      detailButtons.forEach((button) => {
        button.addEventListener("click", function () {
          const index = this.getAttribute("data-index");
          openPopup(index);
        });
      });
    })
    .catch((error) => console.error("Error fetching the suit data:", error));
});

// Open popup
const popup = document.getElementById("popup-modal");
const popupTitle = document.getElementById("popup-title");
const popupDescription = document.getElementById("popup-description");
const popupImages = document.getElementById("popup-images");
const closePopup = document.getElementById("close-popup");

// Add to Favorites button
const addToFavoritesBtn = document.querySelector(".btn-primary");

function openPopup(index) {
  const suit = window.suits[index];
  popupTitle.textContent = suit.name;
  popupDescription.textContent = suit.description;

  // Show up to 4 images
  popupImages.innerHTML = suit.gallery
    .slice(0, 4)
    .map(
      (img) =>
        `<img src="${img}" alt="${suit.name}" class="rounded-lg w-fit h-fit object-cover">`
    )
    .join("");

  // Add event listener to Add to Favorites button
  addToFavoritesBtn.onclick = () => saveToFavorites(suit);

  popup.classList.remove("hidden");
}

// Save to Favorites
function saveToFavorites(suit) {
  // Retrieve existing favorites from local storage
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  // Check if the item already exists
  if (!favorites.some((item) => item.name === suit.name)) {
    favorites.push(suit);
    localStorage.setItem("favorites", JSON.stringify(favorites));
    alert(`${suit.name} has been added to your favorites!`);
  } else {
    alert(`${suit.name} is already in your favorites!`);
  }
}

// Close popup
closePopup.addEventListener("click", () => {
  popup.classList.add("hidden");
});

// JavaScript for Mobile Menu Toggle
document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.getElementById("menu-toggle");
  const navLinks = document.getElementById("nav-links");

  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("hidden");
  });
});
