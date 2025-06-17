 const urlParams = new URLSearchParams(window.location.search);
    const mode = urlParams.get('mode');
    const player1 = urlParams.get('player1') || "Player 1";
    const player2 = mode === 'ai' ? "AI" : urlParams.get('player2') || "Player 2";

    let board = ["", "", "", "", "", "", "", "", ""];
    let currentPlayer = "X";
    let gameOver = false;
    let scores = { X: 0, O: 0 };
    let boardElement = document.getElementById("board");
    let messageElement = document.getElementById("message");
    let scoreboardElement = document.getElementById("scoreboard");

    function drawBoard() {
      boardElement.innerHTML = "";
      board.forEach((cell, index) => {
        let div = document.createElement("div");
        div.className = "cell";
        div.textContent = cell;
        div.onclick = () => makeMove(index);
        boardElement.appendChild(div);
      });
      updateScoreboard();
    }

    function makeMove(index) {
      if (board[index] !== "" || gameOver) return;
      board[index] = currentPlayer;
      drawBoard();
      if (checkWinner()) {
        messageElement.textContent = `${getPlayerName(currentPlayer)} Wins!`;
        scores[currentPlayer]++;
        gameOver = true;
      } else if (board.every(cell => cell !== "")) {
        messageElement.textContent = "It's a Draw!";
        gameOver = true;
      } else {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        if (mode === 'ai' && currentPlayer === "O") {
          aiMove();
        }
      }
      updateScoreboard();
    }

    function aiMove() {
      setTimeout(() => {
        let emptyIndexes = board.map((v, i) => v === "" ? i : -1).filter(i => i !== -1);
        let randomIndex = emptyIndexes[Math.floor(Math.random() * emptyIndexes.length)];
        makeMove(randomIndex);
      }, 500);
    }

    function checkWinner() {
      const winPatterns = [
        [0,1,2],[3,4,5],[6,7,8],
        [0,3,6],[1,4,7],[2,5,8],
        [0,4,8],[2,4,6]
      ];
      return winPatterns.some(p => board[p[0]] !== "" && board[p[0]] === board[p[1]] && board[p[1]] === board[p[2]]);
    }

    function resetGame() {
      board = ["", "", "", "", "", "", "", "", ""];
      currentPlayer = "X";
      gameOver = false;
      messageElement.textContent = "";
      drawBoard();
    }

    function playAgain() {
      resetGame();
    }

    function updateScoreboard() {
      scoreboardElement.textContent = `${player1} (X): ${scores.X} | ${player2} (O): ${scores.O}`;
    }

    function getPlayerName(symbol) {
      return symbol === "X" ? player1 : player2;
    }

    drawBoard();