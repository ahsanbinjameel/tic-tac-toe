 const playerForm = document.getElementById('playerForm');
        const gameBoard = document.getElementById('gameBoard');
        const status = document.getElementById('status');
        const resetButton = document.getElementById('resetButton');

        let players = ['', ''];
        let currentPlayer = 0;
        let board = ['', '', '', '', '', '', '', '', ''];
        let gameActive = false;

        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6] // Diagonals
        ];

        playerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            players[0] = document.getElementById('player1').value.trim();
            players[1] = document.getElementById('player2').value.trim();

            if (players[0] && players[1]) {
                startGame();
            }
        });

        function startGame() {
            gameActive = true;
            playerForm.style.display = 'none';
            gameBoard.style.display = 'grid';
            resetButton.style.display = 'block';
            createBoard();
            updateStatus();
        }

        function createBoard() {
            gameBoard.innerHTML = '';
            for (let i = 0; i < 9; i++) {
                const cell = document.createElement('div');
                cell.classList.add('cell');
                cell.dataset.index = i;
                cell.addEventListener('click', handleCellClick);
                gameBoard.appendChild(cell);
            }
        }

        function handleCellClick(e) {
            const index = e.target.dataset.index;
            if (board[index] === '' && gameActive) {
                board[index] = currentPlayer === 0 ? 'X' : 'O';
                e.target.textContent = board[index];
                e.target.classList.add(board[index].toLowerCase());
                e.target.classList.add('fade-in');
                if (checkWin()) {
                    gameActive = false;
                    updateStatus(`${players[currentPlayer]} wins!`);
                } else if (board.every(cell => cell !== '')) {
                    gameActive = false;
                    updateStatus("It's a draw!");
                } else {
                    currentPlayer = 1 - currentPlayer;
                    updateStatus();
                }
            }
        }

        function checkWin() {
            return winPatterns.some(pattern => {
                const [a, b, c] = pattern;
                return board[a] && board[a] === board[b] && board[a] === board[c];
            });
        }

        function updateStatus(message) {
            status.textContent = message || `${players[currentPlayer]}'s turn (${currentPlayer === 0 ? 'X' : 'O'})`;
        }

        resetButton.addEventListener('click', () => {
            board = ['', '', '', '', '', '', '', '', ''];
            currentPlayer = 0;
            gameActive = true;
            createBoard();
            updateStatus();
        });