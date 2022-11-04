import {
  RATING_CARD_ITEM_SELECTOR,
  SHOW_MODAL_CLASS,
  modalTemplate,
  modal,
  overlay,
  MEMBERS_DB_NAME,
  RATING_DB_NAME,
  BOOKS_DB_NAME,
  ratingCardList,
} from "../javascript/variables.js";

import {generateMarksHTML} from '../javascript/htmlTemplates.js'
import Swiper from "https://cdn.jsdelivr.net/npm/swiper@8/swiper-bundle.esm.browser.min.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-app.js";
import {
  getDatabase,
  ref,
  child,
  get,
} from "https://www.gstatic.com/firebasejs/9.12.1/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyBHGic0M2VslI4uXZW1vlHKaFnVe-9VMik",
  authDomain: "books-club-api.firebaseapp.com",
  databaseURL:
    "https://books-club-api-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "books-club-api",
  storageBucket: "books-club-api.appspot.com",
  messagingSenderId: "1060925473877",
  appId: "1:1060925473877:web:e23bb6ab3895725e5540dc",
  measurementId: "G-2BZ9FR37CL",
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
let ratingCardsData = [];

// ANIMATION FUNCTIONS

export function checkElement(list, classname) {
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

//   FIREBASE FUNCTIONS

export function getCardsData(dbName, generate, list) {
  const dbRef = ref(db);

  get(child(dbRef, dbName)).then((snapshot) => {
    const cards = [];

    snapshot.forEach((childSnapshot) => {
      cards.push(childSnapshot.val());
    });

    if (dbName === RATING_DB_NAME) {
      sortCardsByPlace(cards);
    }

    renderCardList(cards, generate, list);

    if (dbName === MEMBERS_DB_NAME) {
      createMembersSwiper();
    }

    if (dbName === RATING_DB_NAME) {
      ratingCardsData = cards;
      wait();
      getRatingDetails();
    }

    if (dbName === BOOKS_DB_NAME) {
      createBooksSwiper();
    }
  });
}

function sortCardsByPlace(cards) {
  cards.sort(function (a, b) {
    return a.place - b.place;
  });

  return cards;
}

function wait() {
  return new Promise((resolve, reject) => {
    createRatingSwiper();
    resolve();
  });
}

async function getRatingDetails() {
  await wait();
  ratingCardList.addEventListener("click", onRatingCardListClick);
}

function onRatingCardListClick(e) {
  const id = e.target.closest(RATING_CARD_ITEM_SELECTOR).dataset.id;
  const cardData = ratingCardsData.find((cardItem) => cardItem.place === id);

  if (e.target.classList.contains("rating-btn")) {
    showModalTemplate(cardData);
    const markList = document.querySelector(".modal-marks-list");
    const marks = sortMarks(cardData.marks);
    renderCardList(marks, generateMarksHTML, markList);

    modal.classList.add(SHOW_MODAL_CLASS);
    overlay.classList.add(SHOW_MODAL_CLASS);

    const closeModalBtn = document.querySelector(".btn-close");
    closeModalBtn.addEventListener("click", onCloseModalBtnClick);
    overlay.addEventListener("click", onOverlayClick);
  }
}

function showModalTemplate(cardData) {
  const html = fillModal(cardData);

  modal.insertAdjacentHTML("beforeend", html);
}

function sortMarks(data) {
  let byMark = data.slice(0);
  byMark.sort(function (a, b) {
    return b.mark - a.mark;
  });

  return byMark;
}

function fillModal(cardData) {
  return modalTemplate
    .replace("{author}", cardData.author)
    .replace("{description}", cardData.description);
}

function onCloseModalBtnClick(e) {
  modal.classList.remove(SHOW_MODAL_CLASS);
  overlay.classList.remove(SHOW_MODAL_CLASS);
  const modalTtem = e.target.closest(".modalItem");
  modalTtem.remove();
}

function onOverlayClick(e) {
  modal.classList.remove(SHOW_MODAL_CLASS);
  overlay.classList.remove(SHOW_MODAL_CLASS);
  const modalTtem = document.querySelector(".modalItem");
  modalTtem.remove();
}

function renderCardList(cardList, generate, list) {
  const html = cardList.map(generate).join("");
  list.insertAdjacentHTML("beforeend", html);
}

function createMembersSwiper() {
  const swiper = new Swiper(".members-swiper", {
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

  return swiper;
}

function createRatingSwiper() {
  const swiper2 = new Swiper(".rating-swiper", {
    slidesPerView: "3",
    spaceBetween: 30,
    slidesPerGroup: 3,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });

  return swiper2;
}

function createBooksSwiper() {
  const swiper3 = new Swiper(".books-swiper", {
    slidesPerView: "3",
    // spaceBetween: 150,
    slidesPerGroup: 3,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });

  return swiper3;
}
