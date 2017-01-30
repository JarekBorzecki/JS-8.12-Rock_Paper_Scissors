//Kamień, papier, nożyce


// Przycisk zaczynający grę

var newGameBtn = document.getElementById('js-newGameButton'),
		newGameElem = document.getElementById('js-newGameElement'),
		pickElem = document.getElementById('js-playerPickElement'),
		resultsElem = document.getElementById('js-resultsTableElement'),
		playerPointsElem = document.getElementById('js-playerPoints'),
		playerNameElem = document.getElementById('js-playerName'),
		computerPointsElem = document.getElementById('js-computerPoints'),
		playerPickElem = document.getElementById('js-playerPick'),
    computerPickElem = document.getElementById('js-computerPick'),
    playerResultElem = document.getElementById('js-playerResult'),
    computerResultElem = document.getElementById('js-computerResult'),
    winner = document.getElementById('js-winner');

newGameBtn.addEventListener('click', newGame);

// Przyciski wyboru gracza

var pickRock = document.getElementById('js-playerPick_rock'),
		pickPaper = document.getElementById('js-playerPick_paper'),
		pickScissors = document.getElementById('js-playerPick_scissors');

pickRock.addEventListener('click', function() {
	playerPick('rock');
});

pickPaper.addEventListener('click', function() {
	playerPick('paper');
});

pickScissors.addEventListener('click', function() {
	playerPick('scissors');
});

var gameState = 'notStarted',
		player = {
			name: '',
			score: 0
		},

		computer = {
			score: 0
		};

function setGameElements() {
  switch(gameState) {
    case 'started':
        newGameElem.style.display = 'none';
        pickElem.style.display = 'block';
        resultsElem.style.display = 'block';
      	break;

    case 'ended':
        newGameBtn.innerText = 'Jeszcze raz';

    case 'notStarted':

    default:
        newGameElem.style.display = 'block';
        pickElem.style.display = 'none';
        resultsElem.style.display = 'none';
  }
};

function newGame() {
  player.name = prompt('Graczu, wpisz swoje imię', 'imię gracza');
  if (player.name) {
    player.score = computer.score = 0;
    gameState = 'started';
    setGameElements();
    playerNameElem.innerHTML = player.name;

  }
};

// function playerPick(playerPick) {
//     console.log(playerPick);
// };

function getComputerPick() {
	var possiblePicks = ['rock', 'paper', 'scissors'];
	return possiblePicks[Math.floor(Math.random() * 3)];
};

function playerPick(playerPick) {
	var computerPick = getComputerPick();

	playerPickElem.innerHTML = playerPick;
	computerPickElem.innerHTML = computerPick;

	checkRoundWinner(playerPick, computerPick);
	setGamePoints();
};

function checkRoundWinner(playerPick, computerPick) {
  playerResultElem.innerHTML = computerResultElem.innerHTML = '';

  var winnerIs = 'player';

    if (playerPick == computerPick) {
        winnerIs = 'noone'; // remis
        playerResultElem.innerHTML = 'Remis';
        computerResultElem.innerHTML = 'Remis';

    } else if (
        (computerPick == 'rock' &&  playerPick == 'scissors') ||
        (computerPick == 'scissors' &&  playerPick == 'paper') ||
        (computerPick == 'paper' &&  playerPick == 'rock') ) {
        
        winnerIs = 'computer';
    }

    if (winnerIs == 'player') {
        playerResultElem.innerHTML = "Wygrana!";
        computerResultElem.innerHTML = "Przegrałeś";
        player.score++;
        // playerScore();

    } else if (winnerIs == 'computer') {
        computerResultElem.innerHTML = "Wygrana!";
        playerResultElem.innerHTML = "Przegrałeś";
        computer.score++;
    }

    if (player.score == 10) {
    	winner.innerText = 'Wygrał ' + player.name;
      backToDefault();

    } else if (computer.score == 10) {
    	winner.innerText = 'Wygrał Komputer';
      backToDefault();
    }
};

function setGamePoints() {
    playerPointsElem.innerHTML = player.score;
    computerPointsElem.innerHTML = computer.score;
};

function backToDefault() {
	newGameElem.style.display = 'block';
	pickElem.style.display = 'none';
  resultsElem.style.display = 'none';
  newGameBtn.innerHTML = 'Zagraj jeszcze raz';
  player.score = computer.score = 0;
  playerPickElem.innerHTML = 'Wybór gracza';
  playerResultElem.innerHTML = 'Wynik gracza'; 
  computerPickElem.innerHTML = 'Wybór komputera';
  computerResultElem.innerHTML = 'Wynik komputera';
}

// function playerScore() {
// 	playerPointsElem.style.transition = '0.2s';
// 	playerPointsElem.style.transform = 'scale(1.5)';
// }

setGameElements();