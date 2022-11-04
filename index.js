import { getCardsData, checkElement } from "./javascript/functions.js";
import {
  generateAboutCardHTML,
  generateRulesCardHTML,
  generateMembersCardHTML,
  generateRatingCardHTML,
  generateBooksCardHTML,
  generateContactCardHTML,
} from "./javascript/htmlTemplates.js";
import {
  ABOUT_DB_NAME,
  aboutCardList,
  RULES_DB_NAME,
  rulesCardList,
  MEMBERS_DB_NAME,
  membersCardList,
  RATING_DB_NAME,
  ratingCardList,
  BOOKS_DB_NAME,
  booksCardList,
  CONTACTS_DB_NAME,
  contactsCardList,
  textWrapper,
  authorWrapper,
  header,
  background,
  toTopIcon,
  FADE_ANIMATION_SELECTOR,
  SHOW_CLASS,
  ABOUT_CARD_SELECTOR,
  RULES_CARD_SELECTOR,
  SHOW_ABOUT_CARD_CLASS,
} from "./javascript/variables.js";

getCardsData(ABOUT_DB_NAME, generateAboutCardHTML, aboutCardList);
getCardsData(RULES_DB_NAME, generateRulesCardHTML, rulesCardList);
getCardsData(MEMBERS_DB_NAME, generateMembersCardHTML, membersCardList);
getCardsData(RATING_DB_NAME, generateRatingCardHTML, ratingCardList);
getCardsData(BOOKS_DB_NAME, generateBooksCardHTML, booksCardList);
getCardsData(CONTACTS_DB_NAME, generateContactCardHTML, contactsCardList);

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
