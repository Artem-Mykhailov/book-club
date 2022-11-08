import FirebaseAPI from "./javascript/firebaseAPI.js";
import "./styles/index.css";
import {
  onWindowScroll,
  renderCardList,
  createMembersSwiper,
  createRatingSwiper,
  createBooksSwiper,
  sortCardsByPlace,
  getRatingDetails,
} from "./javascript/functions.js";
import {
  generateAboutCardHTML,
  generateRulesCardHTML,
  generateMembersCardHTML,
  generateRatingCardHTML,
  generateBooksCardHTML,
  generateContactCardHTML,
} from "./javascript/htmlTemplates.js";
import {
  DB_NAMES,
  firebaseDOM,
  animationDOM,
} from "./javascript/variables.js";

export let ratingCardsData = [];

window.addEventListener("scroll", onWindowScroll);

FirebaseAPI.getCardsData(DB_NAMES.ABOUT).then((cards) => {
  renderCardList(cards, generateAboutCardHTML, firebaseDOM.aboutCardList);
});

FirebaseAPI.getCardsData(DB_NAMES.RULES).then((cards) => {
  renderCardList(cards, generateRulesCardHTML, firebaseDOM.rulesCardList);
});

FirebaseAPI.getCardsData(DB_NAMES.MEMBERS).then((cards) => {
  renderCardList(cards, generateMembersCardHTML, firebaseDOM.membersCardList);
  createMembersSwiper();
});

FirebaseAPI.getCardsData(DB_NAMES.RATING)
  .then((cards) => sortCardsByPlace(cards))
  .then((cards) => {
    ratingCardsData = cards;
    renderCardList(cards, generateRatingCardHTML, firebaseDOM.ratingCardList);
    createRatingSwiper();
    getRatingDetails();
  });

FirebaseAPI.getCardsData(DB_NAMES.BOOKS).then((cards) => {
  renderCardList(cards, generateBooksCardHTML, firebaseDOM.booksCardList);
  createBooksSwiper();
});

FirebaseAPI.getCardsData(DB_NAMES.CONTACTS).then((cards) => {
  renderCardList(cards, generateContactCardHTML, firebaseDOM.contactsCardList);
});

animationDOM.textWrapper.innerHTML =
  animationDOM.textWrapper.textContent.replace(
    /\S/g,
    "<span class='letter'>$&</span>"
  );
animationDOM.authorWrapper.innerHTML =
  animationDOM.authorWrapper.textContent.replace(
    /\S/g,
    "<span class='letter'>$&</span>"
  );

anime.timeline({ loop: false }).add({
  targets: ".quote-block .letter",
  opacity: [0, 1],
  easing: "easeInOutQuad",
  duration: 2250,
  delay: (_, i) => 150 * (i + 1),
});
