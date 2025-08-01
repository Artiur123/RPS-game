const btn = document.querySelectorAll(".btn");
const rpsDisplayYou = document.querySelector(".RPS-display-you");
const rpsDisplayEnemy = document.querySelector(".RPS-display-enemy");

const check = document.querySelector(".check");
let playerChoice = null;

const playerHearts = document.querySelectorAll(".player-hearts .heart");
const computerHearts = document.querySelectorAll(".computer-hearts .heart");
let playerLives = 3;
let computerLives = 3;
const fullHeartSrc = "images/heart.png";
const emptyHeartSrc = "images/heart-dark.png";

if (btn.length > 0) {
    btn.forEach(buttonElement => {
        buttonElement.addEventListener("mousemove", (e) => {
            const react = buttonElement.getBoundingClientRect();
            const x = e.clientX - react.left;
            const y = e.clientY - react.top;
            buttonElement.style.setProperty("--mouse-x", `${x}px`);
            buttonElement.style.setProperty("--mouse-y", `${y}px`);
            buttonElement.style.backgroundImage = `radial-gradient(circle at var(--mouse-x) var(--mouse-y), white 0%, black 80%, transparent 40%)`;
        });
        buttonElement.addEventListener("mouseenter", () => {
            buttonElement.classList.add("btn-animation-gradient");
        });
        buttonElement.addEventListener("mouseleave", () => {
            buttonElement.classList.remove("btn-animation-gradient");
        });
        buttonElement.addEventListener("click", () => {
            const buttonImage = buttonElement.querySelector("img");
            if (buttonElement.classList.contains("btn-selected")) {
                rpsDisplayYou.innerHTML = "";
                buttonElement.classList.remove("btn-selected");
                playerChoice = null;
            } else {
                btn.forEach(otherButton => {
                    otherButton.classList.remove("btn-selected");
                });
                buttonElement.classList.add("btn-selected");
                if (buttonImage) {
                    rpsDisplayYou.innerHTML = "";
                    const clonedImage = buttonImage.cloneNode(true);
                    rpsDisplayYou.appendChild(clonedImage);
                    playerChoice = buttonImage.alt;
                }
            }
        });
    });
}

const gameOptions = ["rock", "paper", "scissors"];

function getComputerChoice() {
    const randomIndex = Math.floor(Math.random() * gameOptions.length);
    return gameOptions[randomIndex];
}

function determineWinner(playerSelection, computerSelection) {
    if (playerSelection === computerSelection) {
        return "tie";
    }
    if (
        (playerSelection === "rock" && computerSelection === "scissors") ||
        (playerSelection === "paper" && computerSelection === "rock") ||
        (playerSelection === "scissors" && computerSelection === "paper")
    ) {
        return "player";
    }
    return "computer";
}

function resetGame() {
    playerLives = 3;
    computerLives = 3;

    playerHearts.forEach(heart => {
        heart.src = fullHeartSrc;
        heart.alt = "Full Heart";
    });
    computerHearts.forEach(heart => {
        heart.src = fullHeartSrc;
        heart.alt = "Full Heart";
    });
    btn.forEach(buttonElement => {
        buttonElement.classList.remove("btn-disabled");
        buttonElement.classList.remove("btn-selected");
    });
    check.classList.remove("btn-disabled");
    rpsDisplayEnemy.innerHTML = "";
    rpsDisplayYou.innerHTML = "";
    playerChoice = null;
}

if (check) {
    check.addEventListener("click", () => {
        if (playerChoice === null) {
            alert("Najpierw wybierz kamien, papier lub nozyce!");
            return;
        }
        btn.forEach(btn => {
            btn.classList.add("btn-disabled");
        });
        check.classList.add("btn-disabled");
        rpsDisplayEnemy.innerHTML = "";
        setTimeout(() => {
            const computerChoice = getComputerChoice();
            const computerImageElement = document.createElement("img");
            computerImageElement.src = `images/${computerChoice}.png`;
            computerImageElement.alt = computerChoice;
            rpsDisplayEnemy.appendChild(computerImageElement);

            const roundWinner = determineWinner(playerChoice, computerChoice);

            let gameOver = false;

            if (roundWinner === "player") {
                console.log("Gracz wygral runde!");
                computerLives--;
                console.log("Zycia komputera:", computerLives);
                const activeComputerHearts = document.querySelectorAll(".computer-hearts .heart[src$='heart.png']");
                if (activeComputerHearts.length > 0) {
                    const heartToChange = activeComputerHearts[activeComputerHearts.length - 1];
                    heartToChange.src = emptyHeartSrc;
                    heartToChange.alt = "Empty Heart";
                    console.log("Zmieniono serce komputera na puste")
                }
                if (computerLives <= 0) {
                    gameOver = true;
                }
            } else if (roundWinner === "computer") {
                console.log("Komputer wygral runde!");
                playerLives--;
                console.log("Zycia gracza:", playerLives);
            
                const activePlayerHearts = document.querySelectorAll(".player-hearts .heart[src$='heart.png']");
                if (activePlayerHearts.length > 0) {
                    const heartToChange = activePlayerHearts[activePlayerHearts.length - 1];
                    heartToChange.src = emptyHeartSrc;
                    heartToChange.alt = "Empty Heart";
                    console.log("Zmieniono serce gracza na puste.");
                }

                if (playerLives <= 0) {
                    gameOver = true;
                }

            } else {
                console.log("Remis!");
            }

            if (gameOver) {
                setTimeout(() => {
                    if (playerLives <= 0) {
                        alert("Koniec gry! Przegrales!");
                    } else if (computerLives <= 0) {
                        alert("Gratulacje! Wygrales!");
                    }
                    resetGame()
                }, 2000);
            }

            setTimeout(() => {
                btn.forEach(btn => {
                    btn.classList.remove("btn-disabled");
                    btn.classList.remove("btn-selected");
                });
                check.classList.remove("btn-disabled");
                rpsDisplayYou.innerHTML = "";
                rpsDisplayEnemy.innerHTML = "";
                playerChoice = null;
            }, 2000);
        }, 1000);
    });
}

