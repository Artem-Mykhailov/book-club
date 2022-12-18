import FirebaseAPI from "./javascript/firebaseAPI.js";
import "./styles/index.css";
import {
  onWindowScroll,
  renderCardList,
  renderRulesContainer,
  createMembersSwiper,
  createMembersSwiperMobile,
  createRatingSwiper,
  createRatingSwiperMobile,
  createBooksSwiper,
  createBooksSwiperMobile,
  createRulesSwiper,
  sortCardsByPlace,
  getRatingDetails,
} from "./javascript/functions.js";
import {
  generateAboutCardHTML,
  generateRulesCardDesktopHTML,
  generateRulesContainerMobileHTML,
  generateRulesCardMobileHTML,
  generateMembersCardHTML,
  generateRatingCardHTML,
  generateReadingCardHTML,
  generateBooksCardHTML,
  generateContactCardHTML,
} from "./javascript/htmlTemplates.js";
import {
  DB_NAMES,
  firebaseDOM,
  animationDOM,
  ANIMATION_CLASSES,
} from "./javascript/variables.js";

export let ratingCardsData = [];

animationDOM.icnMenu.addEventListener("click", () => {
  animationDOM.icnMenu.classList.toggle(ANIMATION_CLASSES.ACTIVE_CLASS);
  animationDOM.menu.classList.toggle(ANIMATION_CLASSES.SHOW_CLASS);
});

animationDOM.menu.addEventListener("click", (e) => {
  if (e.target.classList.contains(ANIMATION_CLASSES.MENU_BUTTON)) {
    animationDOM.menu.classList.remove(ANIMATION_CLASSES.SHOW_CLASS);
    animationDOM.icnMenu.classList.remove(ANIMATION_CLASSES.ACTIVE_CLASS);
  }
});

window.addEventListener("scroll", onWindowScroll);

FirebaseAPI.getCardsData(DB_NAMES.ABOUT).then((cards) => {
  renderCardList(cards, generateAboutCardHTML, firebaseDOM.aboutCardList);
});

FirebaseAPI.getCardsData(DB_NAMES.RULES).then((cards) => {
  if (window.screen.width <= 768) {
    renderRulesContainer(
      generateRulesContainerMobileHTML,
      firebaseDOM.rulesCardContainer
    );

    const rulesCardList = document.querySelector(".rules-cards");

    renderCardList(cards, generateRulesCardMobileHTML, rulesCardList);
    createRulesSwiper();
  } else {
    firebaseDOM.rulesCardContainer.classList.add("rules-desktop");
    renderCardList(
      cards,
      generateRulesCardDesktopHTML,
      firebaseDOM.rulesCardContainer
    );
  }
});

FirebaseAPI.getCardsData(DB_NAMES.MEMBERS).then((cards) => {
  renderCardList(cards, generateMembersCardHTML, firebaseDOM.membersCardList);

  if (window.screen.width <= 768) {
    createMembersSwiperMobile();
  } else {
    createMembersSwiper();
  }
});

FirebaseAPI.getCardsData(DB_NAMES.RATING)
  .then((cards) => sortCardsByPlace(cards))
  .then((cards) => {
    ratingCardsData = cards;
    renderCardList(cards, generateRatingCardHTML, firebaseDOM.ratingCardList);

    if (window.screen.width <= 768) {
      createRatingSwiperMobile();
    } else {
      createRatingSwiper();
    }

    getRatingDetails();
  });

FirebaseAPI.getCardsData(DB_NAMES.READING).then((cards) => {
  renderCardList(cards, generateReadingCardHTML, firebaseDOM.readingCard);
});

FirebaseAPI.getCardsData(DB_NAMES.BOOKS).then((cards) => {
  renderCardList(cards, generateBooksCardHTML, firebaseDOM.booksCardList);

  if (window.screen.width <= 768) {
    createBooksSwiperMobile();

    firebaseDOM.booksCardList.addEventListener("click", (e) => {
      if (e.target.classList.contains("flip-card-front")) {
        const card = e.target.closest(".flip-card-inner");
        card.classList.add(ANIMATION_CLASSES.ACTIVE_CLASS);
      }
      if (e.target.classList.contains("book-close-button")) {
        const card = e.target.closest(".flip-card-inner");
        card.classList.remove(ANIMATION_CLASSES.ACTIVE_CLASS);
      }
    });
  } else {
    createBooksSwiper();
  }
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
