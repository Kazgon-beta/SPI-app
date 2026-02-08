const questionInput = document.querySelector('#questionInput');
const answerInput = document.querySelector('#answerInput');
const addBotton = document.querySelector('#addButton');
const questionList = document.querySelector('#questionList');

const questionText = document.querySelector('#questionText');
const answerText = document.querySelector('#answerText');

const deleteButton = document.querySelector('#deleteButton');
const nextCardButton = document.querySelector('#nextCardButton');

let setCount = 0;

let cards = [];

// const tmp = {
//   question: '物事が、この先どのようになっていくかという様子',
//   answer: '趨勢（すうせい)',
// };
// cards.push(tmp);

// console.log(questionInput);
// console.log(answerInput);
// console.log(addBotton);

addBotton.addEventListener('click', () => {
  const question = questionInput.value;
  const answer = answerInput.value;

  const card = {
    question: question,
    answer: answer,
  };

  cards.push(card);
  renderCard(setCount);
  saveCards();

  questionInput.value = '';
  answerInput.value = '';

  alert('カードを追加しました。');
});

function renderCard(num) {
  const card = cards[num];
  if (!card) {
    renderInit();
    return;
  }
  const question = card.question;
  const answer = card.answer;
  questionText.textContent = question;
  answerText.textContent = answer;
}

function renderInit() {
  questionText.textContent = '-';
  answerText.textContent = '-';
}

nextCardButton.addEventListener('click', () => {
  if (cards.length === 0) return;
  setCount++;
  if (setCount >= cards.length) setCount = 0;
  renderCard(setCount);
});

function saveCards() {
  localStorage.setItem('cards', JSON.stringify(cards));
}

deleteButton.addEventListener('click', () => {
  if (confirm('このカードを削除しますか？')) {
    deleteCard();
  }
});

function deleteCard() {
  cards.splice(setCount, 1);
  console.log(setCount);
  saveCards();
  if (cards.length === 0) {
    renderInit();
  } else if (setCount >= cards.length) {
    setCount = 0;
    renderCard(setCount);
  } else {
    renderCard(setCount);
  }
}

function loadCards() {
  const saveCards = localStorage.getItem('cards');
  if (!saveCards) return;
  try {
    const data = JSON.parse(saveCards);
    if (!Array.isArray(data) || data.length === 0) return;
    cards = data;
    setCount = 0;
    renderCard(setCount);
  } catch (e) {
    console.error('[loadCards] JSONの読み込みに失敗しました', e);
    return;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  loadCards();
});
