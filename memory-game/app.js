document.addEventListener('DOMContentLoaded', () => {
	const cardArray = [
		{
			name: 'fries',
			img: 'images/fries.png',
		},
		{
			name: 'cheeseburger',
			img: 'images/cheeseburger.png',
		},
		{
			name: 'ice-cream',
			img: 'images/ice-cream.png',
		},
		{
			name: 'pizza',
			img: 'images/pizza.png',
		},
		{
			name: 'milkshake',
			img: 'images/milkshake.png',
		},
		{
			name: 'hotdog',
			img: 'images/hotdog.png',
		},
		{
			name: 'fries',
			img: 'images/fries.png',
		},
		{
			name: 'cheeseburger',
			img: 'images/cheeseburger.png',
		},
		{
			name: 'ice-cream',
			img: 'images/ice-cream.png',
		},
		{
			name: 'pizza',
			img: 'images/pizza.png',
		},
		{
			name: 'milkshake',
			img: 'images/milkshake.png',
		},
		{
			name: 'hotdog',
			img: 'images/hotdog.png',
		},
	];
	//iterate over each card and sort randomly (before or after) depending on the result of the random number generator
	cardArray.sort(() => 0.5 - Math.random());

	const grid = document.querySelector('.grid');
	const resultDisplay = document.querySelector('#result');
	let cardsChosen = [],
		cardsChosenId = [],
		cardsWon = [];

	//flip card utility function
	function flipCard() {
		let cardId = this.getAttribute('data-id');
		cardsChosen.push(cardArray[cardId].name);
		cardsChosenId.push(cardId);
		this.setAttribute('src', cardArray[cardId].img);
		if (cardsChosen.length === 2) {
			setTimeout(checkForMatch, 500);
		}
	}

	//check for matches utility function
	function checkForMatch() {
		const cards = document.querySelectorAll('img');
		const card1Id = cardsChosenId[0];
		const card2Id = cardsChosenId[1];

		if (card1Id == card2Id) {
			cards[card1Id].setAttribute('src', 'images/blank.png');
			cards[card2Id].setAttribute('src', 'images/blank.png');
			alert('You have clicked the same image!');
		} else if (cardsChosen[0] == cardsChosen[1]) {
			alert('You found a match');
			cards[card1Id].setAttribute('src', 'images/white.png');
			cards[card2Id].setAttribute('src', 'images/white.png');
			cards[card1Id].removeEventListener('click', flipCard);
			cards[card2Id].removeEventListener('click', flipCard);
			cardsWon.push(cardsChosen);
		} else {
			cards[card1Id].setAttribute('src', 'images/blank.png');
			cards[card2Id].setAttribute('src', 'images/blank.png');
			alert('Sorry, try again');
		}
		cardsChosen = [];
		cardsChosenId = [];
		resultDisplay.textContent = cardsWon.length;
		if (cardsWon.length === cardArray.length / 2) {
			resultDisplay.textContent = 'You matched all cards';
		}
	}

	//create board
	function createBoard() {
		for (let i = 0; i < cardArray.length; i++) {
			const card = document.createElement('img');
			card.setAttribute('src', 'images/blank.png');
			card.setAttribute('data-id', i);
			card.addEventListener('click', flipCard);
			grid.appendChild(card);
		}
	}
	createBoard();
});
