
const bestSellerItems = [
  { label: "Best seller", name: "Butterscotch Latte", price: "30 K" },
  { label: "Best seller", name: "Nasi Goreng Kampung", price: "36 K" },
  { label: "Favorite", name: "Strawberry Mojito", price: "30 K" },
  { label: "Favorite", name: "Chicken Katsu Rice", price: "40 K" },
  { label: "Favorite", name: "Peach Americano", price: "30 K" },
  { label: "Favorite", name: "Beef Teriyaki", price: "45 K" },
  { label: "Favorite", name: "Matcha Cloud", price: "30 K" },
  { label: "Favorite", name: "French Fries", price: "25 K" },
];

const header = document.querySelector(".site-header");
const nav = document.querySelector(".navbar-nav");
const menuButton = document.querySelector("#hamburger-menu");
const searchPanel = document.querySelector("#search-panel");
const searchButton = document.querySelector("#search-button");
const searchInput = document.querySelector("#search-input");
const navLinks = [...document.querySelectorAll(".navbar-nav a")];

const navSections = navLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

document.querySelectorAll(".featured-card").forEach((card, index) => {
  const item = bestSellerItems[index];

  if (!item) return;

  card.querySelector("small").textContent = item.label;
  card.querySelector("strong").textContent = item.name;
  card.querySelector("span:not(.featured-star)").textContent = item.price;
});

function updateActiveNav() {
  const marker = window.scrollY + window.innerHeight * 0.55;
  let currentSection = navSections[0];

  navSections.forEach((section) => {
    const sectionTop =
      section.getBoundingClientRect().top + window.scrollY;

    if (sectionTop <= marker) {
      currentSection = section;
    }
  });

  navLinks.forEach((link) => {
    link.classList.toggle(
      "active",
      link.getAttribute("href") === `#${currentSection.id}`
    );
  });
}

function closeSearch() {
  searchPanel.classList.remove("open");
  searchButton.classList.remove("is-active");
  searchButton.setAttribute("aria-expanded", "false");
}

window.addEventListener("scroll", () => {
  header.classList.toggle("scrolled", window.scrollY > 30);
  updateActiveNav();
});

menuButton.addEventListener("click", () => {
  nav.classList.toggle("open");
});

searchButton.addEventListener("click", () => {
  searchPanel.classList.toggle("open");

  const isOpen = searchPanel.classList.contains("open");

  searchButton.classList.toggle("is-active", isOpen);
  searchButton.setAttribute("aria-expanded", String(isOpen));

  if (isOpen) {
    searchInput.focus();
  }
});

document.addEventListener("click", (event) => {
  if (
    searchPanel.classList.contains("open") &&
    !searchPanel.contains(event.target) &&
    !searchButton.contains(event.target)
  ) {
    closeSearch();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeSearch();
  }
});

navLinks.forEach((link) =>
  link.addEventListener("click", (event) => {
    const target = document.querySelector(link.getAttribute("href"));

    if (!target) return;

    event.preventDefault();
    nav.classList.remove("open");

    target.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  })
);

searchInput.addEventListener("input", (event) => {
  const query = event.target.value.toLowerCase();

  document.querySelectorAll(".menu-category").forEach((category) => {
    const items = [...category.querySelectorAll(".menu-item")];
    const heading = category.querySelector("h3");
    const matchesCategory = heading?.textContent
      .toLowerCase()
      .includes(query);

    items.forEach((item) => {
      item.style.display =
        matchesCategory ||
        item.textContent.toLowerCase().includes(query)
          ? ""
          : "none";
    });

    category.style.display =
      matchesCategory ||
      items.some((item) => item.style.display !== "none")
        ? ""
        : "none";
  });
});

updateActiveNav();
feather.replace();