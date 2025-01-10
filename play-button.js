(function() {
    // Game Configuration
    const CONFIG = {
        baseUrl: "https://console.thegoodgametheory.com/v1",
        currentLevel: 0,
        score: 0,
        timePerLevel: 30,
        timeRemaining: 30,
        timer: null,
        isModalOpen: false
    };

    class WordGame {
        constructor(targetElement, options) {
            this.target = targetElement;
            this.options = options;
            this.modalElement = null;
            this.init();
        }

        init() {
            try {
                // Create and inject button
                const button = document.createElement('button');
                button.innerHTML = 'Play Word Game';
                button.className = 'game-button';
                button.addEventListener('click', () => this.handleGameStart());

                // Add styles
                const styles = document.createElement('style');
                styles.textContent = `
                    .game-button {
                        background: linear-gradient(135deg, #6e8efb, #4a6cf7);
                        color: white;
                        padding: 15px 30px;
                        border: none;
                        border-radius: 25px;
                        cursor: pointer;
                        font-size: 18px;
                        font-weight: bold;
                        transition: all 0.3s;
                        box-shadow: 0 4px 15px rgba(0,0,0,0.1);
                    }
                    .game-button:hover {
                        transform: translateY(-2px);
                        box-shadow: 0 6px 20px rgba(0,0,0,0.15);
                    }
                    .game-modal {
                        position: fixed;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        background: rgba(0, 0, 0, 0.8);
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        z-index: 1000;
                    }
                    .modal-content {
                        background: white;
                        padding: 30px;
                        border-radius: 15px;
                        max-width: 600px;
                        width: 90%;
                        position: relative;
                    }
                    .close-button {
                        position: absolute;
                        top: 10px;
                        right: 10px;
                        background: none;
                        border: none;
                        font-size: 24px;
                        cursor: pointer;
                        color: #666;
                    }
                    .game-content {
                        text-align: center;
                    }
                    .question {
                        font-size: 24px;
                        margin-bottom: 20px;
                        color: #333;
                    }
                    .options {
                        display: grid;
                        grid-template-columns: 1fr;
                        gap: 10px;
                    }
                    .option-button {
                        background: #f0f4ff;
                        border: 2px solid #e0e7ff;
                        border-radius: 8px;
                        padding: 15px;
                        font-size: 18px;
                        cursor: pointer;
                        transition: all 0.3s;
                    }
                    .option-button:hover {
                        background: #e0e7ff;
                        transform: translateY(-2px);
                    }
                    .score {
                        font-size: 20px;
                        margin-bottom: 20px;
                        color: #4a6cf7;
                    }
                    .game-over {
                        text-align: center;
                        padding: 20px;
                    }
                    .play-again {
                        background: #4CAF50;
                        color: white;
                        padding: 10px 20px;
                        border: none;
                        border-radius: 20px;
                        cursor: pointer;
                        font-size: 16px;
                        margin-top: 20px;
                    }
                `;
                document.head.appendChild(styles);
                this.target.appendChild(button);
            } catch (error) {
                console.error('Game initialization error:', error);
                this.showErrorMessage('Failed to initialize game. Please refresh the page.');
            }
        }

        handleGameStart() {
            try {
                this.startGame();
            } catch (error) {
                console.error('Game start error:', error);
                this.showErrorMessage('Failed to start game. Please try again.');
            }
        }

        startGame() {
            if (!this.modalElement) {
                this.createModal();
            }
            this.showQuestion();
        }

        createModal() {
            // Remove existing modal if any
            const existingModal = document.querySelector('.game-modal');
            if (existingModal) {
                existingModal.remove();
            }

            // Create new modal
            this.modalElement = document.createElement('div');
            this.modalElement.className = 'game-modal';
            this.modalElement.innerHTML = `
                <div class="modal-content">
                    <button class="close-button" onclick="window.gameInstance.closeModal()">&times;</button>
                    <div class="game-content">
                        <!-- Content will be injected here -->
                    </div>
                </div>
            `;
            document.body.appendChild(this.modalElement);
            CONFIG.isModalOpen = true;
        }

        showQuestion() {
            if (!this.modalElement) return;

            const gameContent = this.modalElement.querySelector('.game-content');
            if (!gameContent) return;

            const question = {
                text: "What is 2 + 2?",
                options: ["3", "4", "5", "6"],
                correct: 1
            };

            gameContent.innerHTML = `
                <div class="score">Score: ${CONFIG.score}</div>
                <div class="question">${question.text}</div>
                <div class="options">
                    ${question.options.map((option, index) => `
                        <button 
                            class="option-button"
                            onclick="window.gameInstance.checkAnswer(${index}, ${question.correct})"
                        >${option}</button>
                    `).join('')}
                </div>
            `;
        }

        checkAnswer(selected, correct) {
            if (selected === correct) {
                CONFIG.score += 10;
                this.showSuccess();
            } else {
                this.showGameOver();
            }
        }

        showSuccess() {
            const gameContent = this.modalElement.querySelector('.game-content');
            gameContent.innerHTML = `
                <div class="game-over">
                    <h2>Correct!</h2>
                    <p>Score: ${CONFIG.score}</p>
                    <button class="play-again" onclick="window.gameInstance.showQuestion()">Next Question</button>
                </div>
            `;
        }

        showGameOver() {
            const gameContent = this.modalElement.querySelector('.game-content');
            gameContent.innerHTML = `
                <div class="game-over">
                    <h2>Game Over!</h2>
                    <p>Final Score: ${CONFIG.score}</p>
                    <button class="play-again" onclick="window.gameInstance.resetGame()">Play Again</button>
                </div>
            `;
        }

        resetGame() {
            CONFIG.score = 0;
            this.showQuestion();
        }

        closeModal() {
            if (this.modalElement) {
                this.modalElement.remove();
                this.modalElement = null;
            }
            CONFIG.isModalOpen = false;
        }

        showErrorMessage(message) {
            alert(message);
        }
    }

    // Initialize game when script loads
    function initializeGame() {
        try {
            const scripts = document.getElementsByTagName('script');
            for (let script of scripts) {
                if (script.src.includes('play-button.js')) {
                    const targetForm = script.parentElement;
                    const playButtonId = script.getAttribute('data-play_button_id');
                    
                    if (playButtonId) {
                        window.gameInstance = new WordGame(targetForm, {
                            play_button_id: playButtonId
                        });
                    } else {
                        console.error('Missing play_button_id attribute');
                    }
                    break;
                }
            }
        } catch (error) {
            console.error('Game initialization error:', error);
        }
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeGame);
    } else {
        initializeGame();
    }
})();
