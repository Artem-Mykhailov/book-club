export function generateAboutCardHTML(card) {
  return `
      <li class='about-cards-item'>
        <h3 class='about-card-title'>${card.question}</h3>
        <p class="about-card-description">${card.description}</p>
      </li>
      `;
}

export function generateRulesCardDesktopHTML(card) {
  return `
      <div class='rules-desktop-item'>
        <p class="rules-card-description">${card.rule}</p>
      </div>
      `;
}

export function generateRulesContainerMobileHTML() {
  return `
      <div class="swiper rules-swiper fade-animation">
        <div class="swiper-wrapper rules-cards"></div>
        <div class="swiper-pagination"></div>
      </div>
      `;
}

export function generateRulesCardMobileHTML(card) {
  return `
      <div class='swiper-slide rules-mobile-item'>
        <p class="rules-card-description">${card.rule}</p>
      </div>
      `;
}

export function generateMembersCardHTML(card) {
  return `
      <div class='swiper-slide members-slide'>
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

export function generateRatingCardHTML(card) {
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

export function generateMarksHTML(marks) {
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

  return `
      <li class='mark-item'>
        <p class="mark-item-name">${marks.name}</p>
        <p class="mark-item-value ${mark}">${marks.mark}</p>
      </li>
      `;
}

export function generateReadingCardHTML(card) {
  return `
      <div class='reading-text'>
        <h2 class='reading-text-name fade-animation'>${card.name}</h2>
        <p class='reading-text-title fade-animation'>Автор: ${card.author}</p>
        <p class='reading-text-title fade-animation'>${card.suggested}</p>
        <p class='reading-text-description fade-animation'>${card.description}</p>
      </div>

      <div class='reading-image fade-animation'>
        <img src='${card.src}' alt="book cover" class="reading-image-cover"/>
      </div>
      `;
}

export function generateBooksCardHTML(card) {
  return `
      <div class='swiper-slide flip-card'>
        <div class='card-container'>
            <div class="flip-card-inner">
                <div class="flip-card-front" style="background-image: url('${card.src}')"></div>
                <div class="flip-card-back">
                  <button class="book-close-button fa-solid fa-xmark"></button>
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

export function generateContactCardHTML(card) {
  return `
      <li class='contacts-cards-item'>
        <img src='${card.src}' alt="profile photo" class="contacts-photo"/>
        <h2 class="contacts-name">${card.name}</h2>
        <p class="contacts-role">${card.role}</p>
        <div class="contacts-apps">
          <a href="${card.telegram}" class="fa-brands fa-telegram contacts-link telegram"></a>
          <a href="${card.instagram}" class="fa-brands fa-instagram contacts-link instagram"></a>
        </div>
      </li>
      `;
}
