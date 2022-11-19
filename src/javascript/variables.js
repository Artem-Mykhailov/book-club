// ANIMATION VARIABLES

export const animationDOM = {
  textWrapper: document.querySelector(".quote-text"),
  authorWrapper: document.querySelector(".quote-author"),
  header: document.querySelector("#header"),
  background: document.querySelector(".background"),
  toTopIcon: document.querySelector(".to-top-icon"),
  icnMenu: document.querySelector(".menu-bar"),
  menu: document.querySelector(".header-menu"),
};

export const ANIMATION_CLASSES = {
  FADE_ANIMATION_SELECTOR: ".fade-animation",
  SHOW_CLASS: "show",
  ACTIVE_CLASS: "active",
  ABOUT_CARD_SELECTOR: ".about-cards-item",
  RULES_CARD_SELECTOR: ".rules-desktop-item",
  SHOW_CARD_CLASS: "showCard",
  RATING_CARD_ITEM_SELECTOR: ".rating-slide",
  SHOW_MODAL_CLASS: "show-modal",
  HEADER: "header--hidden",
  ICON: "icon--hidden",
  HEADER_BACKGROUND: "header--background",
  MENU_BUTTON: "menu-button",
};

// FIREBASE VARIABLES

export const DB_NAMES = {
  ABOUT: "about-cards",
  RULES: "rules",
  MEMBERS: "members",
  RATING: "rating",
  BOOKS: "books",
  CONTACTS: "contacts",
};

export const firebaseDOM = {
  aboutCardList: document.querySelector(".about-cards"),
  rulesCardContainer: document.querySelector(".rules-cards-container"),
  membersCardList: document.querySelector(".members-list"),
  ratingCardList: document.querySelector(".rating-list"),
  booksCardList: document.querySelector(".books-list"),
  contactsCardList: document.querySelector(".contacts-list"),
};

// SWIPER VARIABLES

export const SWIPER = {
  MEMBERS: ".members-swiper",
  RATING: ".rating-swiper",
  BOOKS: ".books-swiper",
  RULES: ".rules-swiper",
  PAGINATION: ".swiper-pagination",
  BTN_NEXT: ".swiper-button-next",
  BTN_PREV: ".swiper-button-prev",
};

// MODAL VARIABLES

export const MODAL = {
  BTN_RATING: "rating-btn",
  MARK_LIST: ".modal-marks-list",
  BTN_CLOSE: ".btn-close",
  ITEM: ".modalItem",
  modalTemplate: document.querySelector("#modalRating").innerHTML,
  modal: document.querySelector(".modal"),
  overlay: document.querySelector(".overlay"),
};
