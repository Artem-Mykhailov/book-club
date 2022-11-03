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

const ABOUT_DB_NAME = "about-cards";
const RULES_DB_NAME = "rules";
const MEMBERS_DB_NAME = "members";
const RATING_DB_NAME = "rating";
const BOOKS_DB_NAME = "books";

const RATING_CARD_ITEM_SELECTOR = ".rating-slide";
const SHOW_MODAL_CLASS = "show-modal";
let ratingCardsData = [];

const aboutCardList = document.querySelector(".about-cards");
const rulesCardList = document.querySelector(".rules-cards");
const membersCardList = document.querySelector(".swiper-wrapper");
const ratingCardList = document.querySelector(".rating-list");
const booksCardList = document.querySelector(".books-list");
const modalTemplate = document.querySelector("#modalRating").innerHTML;

const modal = document.querySelector("#modal");
const overlay = document.querySelector(".overlay");

getCardsData(ABOUT_DB_NAME, generateAboutCardHTML, aboutCardList);
getCardsData(RULES_DB_NAME, generateRulesCardHTML, rulesCardList);
getCardsData(MEMBERS_DB_NAME, generateMembersCardHTML, membersCardList);
getCardsData(RATING_DB_NAME, generateRatingCardHTML, ratingCardList);
getCardsData(BOOKS_DB_NAME, generateBooksCardHTML, booksCardList);

function getCardsData(dbName, generate, list) {
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

function generateAboutCardHTML(card) {
  return `<li class='about-cards-item'>
      <h3 class='about-card-title'>${card.question}</h3>
      <p class="about-card-description">${card.description}</p>
    </li>
    `;
}

function generateRulesCardHTML(card) {
  return `<li class='rules-cards-item'>
      <p class="rules-card-description">${card.rule}</p>
    </li>
    `;
}

function generateMembersCardHTML(card) {
  return `<div class='swiper-slide members-slide'>
      <div class="members-card-image">
        <img class="card-image" src="${card.src}" />
      </div>
      <div class="members-card-text">
        <p class="card-name">${card.name}</p>
        <div class="card-achievements">${card.achievements}</div>
        <p class="card-status">${card.status}</p>
      </div>
    </div>
    `;
}

function generateRatingCardHTML(card) {
  return `
    <div class='swiper-slide rating-slide' data-id=${card.place}>
      <div class="rating-card-item" style="background-image: url('${card.src}')">
        <div class="rating-hover-block">
          <p class="rating-bookname">${card.bookName}</p>
          <div class="rating-mark">${card.mark}</div>
          <button class="rating-btn">Деталі</button>
        </div>
      </div>
      <div class="rating-card-place">${card.place}</div>
    </div>
  `;
}

function generateMarksHTML(marks) {
  const GOOD_MARK_CLASS = "good-mark";
  const MEDIOCRE_MARK_CLASS = "mediocre-mark";
  const BAD_MARK_CLASS = "bad-mark";
  let mark;

  if (marks.mark > 7) {
    mark = GOOD_MARK_CLASS;
  } else if (marks.mark > 4) {
    mark = MEDIOCRE_MARK_CLASS;
  } else {
    mark = BAD_MARK_CLASS;
  }

  return `<li class='mark-item'>
      <p class="mark-item-name">${marks.name}</p>
      <p class="mark-item-value ${mark}">${marks.mark}</p>
    </li>
    `;
}

function generateBooksCardHTML(card) {
  return `
    <div class='swiper-slide flip-card'>
    <div class='card-container'>
      <div class="flip-card-inner">
          <div class="flip-card-front" style="background-image: url('${card.src}')"></div>
          <div class="flip-card-back">
            <h2 class='books-card-name'>${card.name}</h2>
            <p class='books-card-title'>Автор: ${card.author}</p>
            <p class='books-card-title'>${card.suggested}</p>
            <p class='books-card-description'>${card.description}</p>
          </div>
      </div>
      </div>
    </div>
  `;
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
