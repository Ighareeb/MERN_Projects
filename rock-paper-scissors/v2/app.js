const userChoiceDisplay = document.createElement('h1');
const computerChoiceDisplay = document.createElement('h1');
const resultDisplay = document.createElement('h1');
const gameContainer = document.getElementById('game');

gameContainer.append(userChoiceDisplay, computerChoiceDisplay, resultDisplay);

const choices = ['rock', 'paper', 'scissors'];

let userChoice, computerChoice;

const handleClick = (e) => {
	userChoice = e.target.id;
	userChoiceDisplay.innerHTML = `User choice: ${userChoice}`;
	generateComputerChoice();
	getResult();
};

const generateComputerChoice = () => {
	const randomChoice = choices[Math.floor(Math.random() * choices.length)];
	computerChoice = randomChoice;
	computerChoiceDisplay.innerHTML = `Computer choice: ${computerChoice}`;
};

//create button for each choice
for (let i = 0; i < choices.length; i++) {
	const button = document.createElement('button');
	button.id = choices[i];
	button.innerHTML = choices[i];
	button.addEventListener('click', handleClick);
	gameContainer.appendChild(button);
}

const getResult = () => {
	switch (userChoice + computerChoice) {
		case 'scissorspaper':
		case 'rockscissors':
		case 'paperrock':
			resultDisplay.innerHTML = 'YOU WIN!';
			break;
		case 'paperscissors':
		case 'scissorsrock':
		case 'rockpaper':
			resultDisplay.innerHTML = 'YOU LOSE!';
			break;
		case 'paperpaper':
		case 'scissorsscissors':
		case 'rockrock':
			resultDisplay.innerHTML = 'ITS A DRAW!';
			break;
	}
};
