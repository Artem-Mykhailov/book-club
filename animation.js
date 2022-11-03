const textWrapper = document.querySelector(".quote-text");
const authorWrapper = document.querySelector(".quote-author");
const blockWrapper = document.querySelector(".quote-block");
const header = document.querySelector("#header");
const background = document.querySelector(".background");
const toTopIcon = document.querySelector(".to-top-icon");

const ABOUT_CARD_SELECTOR = ".about-cards-item";
const ABOUT_TITLE_SELECTOR = ".about-title";
const SECTION_TITLE_SELECTOR = ".section-title";
const FADE_ANIMATION_SELECTOR = ".fade-animation";
const RULES_CARD_SELECTOR = ".rules-cards-item";
const SHOW_ABOUT_CARD_CLASS = "showCard";
const SHOW_CLASS = "show";

function wait() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, 200);
  });
}

async function getCards() {
  await wait();
  checkElement(ABOUT_CARD_SELECTOR, SHOW_ABOUT_CARD_CLASS);
  checkElement(RULES_CARD_SELECTOR, SHOW_ABOUT_CARD_CLASS);
}

function checkElement(list, classname) {
  let elements = document.querySelectorAll(list);
  elements = Array.from(elements);

  const triggerBottom = (window.innerHeight / 5) * 4;

  elements.forEach((item) => {
    const itemTop = item.getBoundingClientRect().top;

    if (itemTop < triggerBottom) {
      item.classList.add(classname);
    } else {
      item.classList.remove(classname);
    }
  });
}

textWrapper.innerHTML = textWrapper.textContent.replace(
  /\S/g,
  "<span class='letter'>$&</span>"
);
authorWrapper.innerHTML = authorWrapper.textContent.replace(
  /\S/g,
  "<span class='letter'>$&</span>"
);

anime.timeline({ loop: false }).add({
  targets: ".quote-block .letter",
  opacity: [0, 1],
  easing: "easeInOutQuad",
  duration: 2250,
  delay: (el, i) => 150 * (i + 1),
});

let lastScrollY = window.scrollY;

window.addEventListener("scroll", () => {
  checkElement(ABOUT_TITLE_SELECTOR, SHOW_CLASS);
  checkElement(SECTION_TITLE_SELECTOR, SHOW_CLASS);
  checkElement(FADE_ANIMATION_SELECTOR, SHOW_CLASS);
  getCards();
  if (lastScrollY < window.scrollY) {
    header.classList.add("header--hidden");
    toTopIcon.classList.remove("icon--hidden");
  } else {
    header.classList.remove("header--hidden");
    toTopIcon.classList.add("icon--hidden");
  }

  if (window.scrollY > 60) {
    background.classList.add("header--background");
  } else {
    background.classList.remove("header--background");
  }

  lastScrollY = window.scrollY;
});
