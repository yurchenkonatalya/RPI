var delay = 3000;
var active = 0;
var isInterval = true;
if (localStorage.getItem('active') != null) {
  active = localStorage.getItem('active');
}
isInterval = localStorage.getItem('isInterval') == 'true';

let tipBox = {
    cardInfo: document.getElementById('card-info'),
    cardsInfo: [
        "images/1.jpg",
        "images/2.jpg",
        "images/3.jpg",
        "images/4.jpg"],
    currentCard: active,
    prevCardButton: document.getElementById('prev-card-button'),
    nextCardButton: document.getElementById('next-card-button'),
}

tipBox.generateCardDots = function () {
    let tipBoxDotsContainer = document.getElementById('tip-box-dots');
    for (let i = 0; i < tipBox.cardsInfo.length; i++) {
        tipBoxDotsContainer.innerHTML += "<p class=\"fas fa-circle dot\"></p>";
    }
    tipBox.tipBoxDots = document.querySelectorAll('p.dot');
    for (let i = 0; i < tipBox.tipBoxDots.length; i++) {
        tipBox.tipBoxDots[i].addEventListener('click', () => {
            tipBox.currentCard = i;
            tipBox.updateTipBox();
        });
    }
}

tipBox.updateTipBox = function () {
    tipBox.cardInfo.src = tipBox.cardsInfo[tipBox.currentCard];
    tipBox.disableAllDots();
    tipBox.tipBoxDots[tipBox.currentCard].setAttribute('class', 'far fa-circle dot');
    localStorage.setItem('active', tipBox.currentCard);
}

tipBox.disableAllDots = function () {
    for (let i = 0; i < tipBox.tipBoxDots.length; i++) {
        tipBox.tipBoxDots[i].setAttribute('class', 'fas fa-circle dot');
    }
}

function prevCard() {
    if (tipBox.currentCard === 0) {
        tipBox.currentCard = tipBox.cardsInfo.length;
    }
    tipBox.currentCard--;
    tipBox.updateTipBox();
}

tipBox.prevCardButton.addEventListener('click', prevCard);

document.addEventListener('keydown', e => {
    if (e.key === "ArrowLeft") {
        prevCard();
    }
});

function nextCard() {
    if (tipBox.currentCard === tipBox.cardsInfo.length - 1) {
        tipBox.currentCard = -1;
    }
    tipBox.currentCard++;
    tipBox.updateTipBox();
}

tipBox.nextCardButton.addEventListener('click', nextCard);

document.addEventListener('keydown', e => {
    if (e.key === "ArrowRight") {
        nextCard();
    }
});

tipBox.generateCardDots();
tipBox.updateTipBox();

if (isInterval) {
  document.getElementById("buttonStart").innerHTML="stop";
  var interval = setInterval(function(){
    nextCard();
  }, delay);
}
else {
  document.getElementById("buttonStart").innerHTML="start";
}

function run(){
  isInterval = !isInterval;
  if (isInterval) {
    document.getElementById("buttonStart").innerHTML="stop";
    clearInterval(interval);
    interval = setInterval(function(){
      nextCard();
    }, delay);
  }
  else {
    clearInterval(interval);
    document.getElementById("buttonStart").innerHTML="start";
  }
  localStorage.setItem('isInterval', isInterval);
}
