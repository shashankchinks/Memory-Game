/*
 * Create a list that holds all of your cards
 */


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

var openedCards = [];
let moves = 0;
let counter = document.querySelector(".moves");
// declaring variable of matchedCards
let matchedCard = document.getElementsByClassName("match");
/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

 let card = document.getElementsByClassName("card");
 let cards = [...card];


 var displayCard = function()
 {
 	this.classList.toggle('open');
 	this.classList.toggle('show');
 	this.classList.toggle('disabled');
 }

const deck = document.querySelector(".deck");
function startGame(){
   var shuffledCards = shuffle(cards);
   for (var i= 0; i < shuffledCards.length; i++){
      [].forEach.call(shuffledCards, function(item){
         deck.appendChild(item);
      });
   }
}

window.onload = startGame();

function cardOpen()
{
	openedCards.push(this);
	var len = openedCards.length;
	if(len === 2){
        moveCounter();
        if(openedCards[0].type === openedCards[1].type){
            matched();
        } else {
            unmatched();
        }
    }
}

function matched()
{
	openedCards[0].classList.add('match');
	openedCards[1].classList.add('match');
	openedCards[0].classList.remove('open', 'show');
	openedCards[1].classList.remove('open', 'show');
	openedCards = [];
}

function unmatched()
{
	openedCards[0].classList.add('unmatched');
	openedCards[1].classList.add('unmatched');
	disable();
	setTimeout(function()
	{
		openedCards[0].classList.remove('open', 'show', 'unmatched');
		openedCards[1].classList.remove('open', 'show', 'unmatched');
		enable();
	});
}

function disable(){
    Array.prototype.filter.call(cards, function(card){
        card.classList.add('disabled');
    });
}

//enable cards and disable matched cards
function enable(){
    Array.prototype.filter.call(cards, function(card){
        card.classList.remove('disabled');
        for(var i = 0; i < matchedCard.length; i++){
            matchedCard[i].classList.add("disabled");
        }
    });
}

function moveCounter(){    
    moves++;    
    counter.innerHTML = moves;
}

for (var i = 0; i < cards.length; i++){
    card = cards[i];
    card.addEventListener("click", displayCard);
    card.addEventListener("click", cardOpen);
    //card.addEventListener("click",congratulations);
};