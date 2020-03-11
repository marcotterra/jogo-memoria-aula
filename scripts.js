
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

let cardsArray = [
  {
    cards: ['card1-A.png', 'card1-B.png'],
    content: 'logica',
  },
  {
    cards: ['card1-A.png', 'card1-B.png'],
    content: 'conhecimento',
  },
  {
    cards: ['card1-A.png', 'card1-B.png'],
    content: 'organizacao',
  },
  {
    cards: ['card1-A.png', 'card1-B.png'],
    content: 'dados',
  }
]

function flipCard() {  
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add('flip');

  if (!hasFlippedCard) {
    // first click
    hasFlippedCard = true;
    firstCard = this;

    return;
  }

  // second click
  secondCard = this;

  checkForMatch();
}

function checkForMatch() {
  let isMatch = firstCard.dataset.content === secondCard.dataset.content;

  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);

  resetBoard();
}

function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

    resetBoard();
  }, 500);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

function shuffleBoard(board) {
  for (let i = board.children.length; i >= 0; i--) {
    board.appendChild(board.children[Math.random() * i | 0]);
  }
}

function createCard(item) {  
  return `
    <div class="memory-card" data-content="${item.content}">
      <img class="front-face" src="img/cards/${item.cards[0]}" alt="Card" />
      <img class="back-face" src="img/back.png" alt="Card" />
    </div>

    <div class="memory-card" data-content="${item.content}">
      <img class="front-face" src="img/cards/${item.cards[1]}" alt="Card" />
      <img class="back-face" src="img/back.png" alt="Card" />
    </div>
  `;
}

function mountBoard(board) {
  cardsArray
    .forEach((card) => {
      board.innerHTML += createCard(card);
    });
}

function listenCards(cards) {
  cards.forEach((card) => {
    card.addEventListener('click', flipCard);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const board = document.querySelector('.memory-game');
  mountBoard(board);

  const cards = document.querySelectorAll('.memory-card');
  shuffleBoard(board);
  listenCards(cards);
})