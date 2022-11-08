import {
  ANIMATION_CLASSES,
  animationDOM,
  SWIPER,
  MODAL,
  firebaseDOM,
} from "../javascript/variables.js";

import { ratingCardsData } from "../index.js";
import { generateMarksHTML } from "../javascript/htmlTemplates.js";
import Swiper, { Navigation, Pagination, EffectCoverflow } from "swiper";
import "swiper/css/bundle";

// ANIMATION FUNCTIONS

let lastScrollY = window.scrollY;

export function onWindowScroll() {
  checkElement(
    ANIMATION_CLASSES.FADE_ANIMATION_SELECTOR,
    ANIMATION_CLASSES.SHOW_CLASS
  );

  checkElement(
    ANIMATION_CLASSES.ABOUT_CARD_SELECTOR,
    ANIMATION_CLASSES.SHOW_CARD_CLASS
  );

  checkElement(
    ANIMATION_CLASSES.RULES_CARD_SELECTOR,
    ANIMATION_CLASSES.SHOW_CARD_CLASS
  );

  if (lastScrollY < window.scrollY) {
    animationDOM.header.classList.add(ANIMATION_CLASSES.HEADER);
    animationDOM.toTopIcon.classList.remove(ANIMATION_CLASSES.ICON);
  } else {
    animationDOM.header.classList.remove(ANIMATION_CLASSES.HEADER);
    animationDOM.toTopIcon.classList.add(ANIMATION_CLASSES.ICON);
  }

  if (window.scrollY > 60) {
    animationDOM.background.classList.add(ANIMATION_CLASSES.HEADER_BACKGROUND);
  } else {
    animationDOM.background.classList.remove(
      ANIMATION_CLASSES.HEADER_BACKGROUND
    );
  }

  lastScrollY = window.scrollY;
}

export function checkElement(list, classname) {
  let elements = document.querySelectorAll(list);

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

//   FIREBASE FUNCTIONS

export function renderCardList(cardList, generate, list) {
  const html = cardList.map(generate).join("");
  list.insertAdjacentHTML("beforeend", html);
}

export function createMembersSwiper() {
  new Swiper(".members-swiper", {
    modules: [Pagination, EffectCoverflow],
    grabCursor: true,
    effect: "coverflow",
    centeredSlides: true,
    slidesPerView: "auto",
    coverflowEffect: {
      rotate: 50,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: true,
    },
    pagination: {
      el: ".swiper-pagination",
      dynamicBullets: true,
      clickable: true,
    },
  });
}

export function createRatingSwiper() {
  return new Swiper(SWIPER.RATING, {
    modules: [Navigation],
    slidesPerView: "3",
    spaceBetween: 30,
    slidesPerGroup: 3,
    navigation: {
      nextEl: SWIPER.BTN_NEXT,
      prevEl: SWIPER.BTN_PREV,
    },
  });
}

export function createBooksSwiper() {
  return new Swiper(SWIPER.BOOKS, {
    modules: [Navigation],
    slidesPerView: "3",
    slidesPerGroup: 3,
    navigation: {
      nextEl: SWIPER.BTN_NEXT,
      prevEl: SWIPER.BTN_PREV,
    },
  });
}

export const sortCardsByPlace = (cards) =>
  cards.sort((a, b) => a.place - b.place);

export function getRatingDetails() {
  firebaseDOM.ratingCardList.addEventListener("click", onRatingCardListClick);
}

function onRatingCardListClick(e) {
  const id = getCardId(e.target);
  const cardData = getCardData(id);

  if (e.target.classList.contains(MODAL.BTN_RATING)) {
    showModalTemplate(cardData);

    const markList = document.querySelector(MODAL.MARK_LIST);
    const marks = sortMarks(cardData.marks);

    renderCardList(marks, generateMarksHTML, markList);

    MODAL.modal.classList.add(ANIMATION_CLASSES.SHOW_MODAL_CLASS);
    MODAL.overlay.classList.add(ANIMATION_CLASSES.SHOW_MODAL_CLASS);

    const closeModalBtn = document.querySelector(MODAL.BTN_CLOSE);
    closeModalBtn.addEventListener("click", onCloseModalBtnClick);
    MODAL.overlay.addEventListener("click", onOverlayClick);
  }
}

function getCardId(el) {
  return el.closest(ANIMATION_CLASSES.RATING_CARD_ITEM_SELECTOR).dataset.id;
}

function getCardData(id) {
  return ratingCardsData.find((cardItem) => cardItem.place === id);
}

function showModalTemplate(cardData) {
  const html = fillModal(cardData);

  MODAL.modal.insertAdjacentHTML("beforeend", html);
}

function sortMarks(data) {
  let byMark = data.slice(0);
  return byMark.sort((a, b) => b.mark - a.mark);
}

function fillModal(cardData) {
  return MODAL.modalTemplate
    .replace("{author}", cardData.author)
    .replace("{description}", cardData.description);
}

function onCloseModalBtnClick(e) {
  MODAL.modal.classList.remove(ANIMATION_CLASSES.SHOW_MODAL_CLASS);
  MODAL.overlay.classList.remove(ANIMATION_CLASSES.SHOW_MODAL_CLASS);
  const modalTtem = e.target.closest(MODAL.ITEM);
  modalTtem.remove();
}

function onOverlayClick(e) {
  MODAL.modal.classList.remove(ANIMATION_CLASSES.SHOW_MODAL_CLASS);
  MODAL.overlay.classList.remove(ANIMATION_CLASSES.SHOW_MODAL_CLASS);
  const modalTtem = document.querySelector(MODAL.ITEM);
  modalTtem.remove();
}
