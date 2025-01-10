(function() {
    // Game Configuration
    const CONFIG = {
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
                // Create button container with unique ID
                const buttonContainer = document.createElement('div');
                buttonContainer.id = 'game-button-container-' + Date.now();
                
                // Create and inject button
                const button = document.createElement('button');
                button.innerHTML = 'Play Word Game';
                button.className = 'game-button';
                button.id = 'game-start-button-' + Date.now();
                
                // Add event listener using addEventListener instead of inline
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
                    }
                    .option-button {
                        width: 100%;
                        padding: 15px;
                        margin: 10px 0;
                        border: none;
                        border-radius: 8px;
                        background: #f0f4ff;
                        cursor: pointer;
                        transition: all 0.3s;
                    }
                    .option-button:hover {
                        background: #e0e7ff;
                    }
                `;

                // Append elements
                document.head.appendChild(styles);
                buttonContainer.appendChild(button);
                this.target.appendChild(buttonContainer);

                // Store instance in window object without using onclick
                window.gameInstance = this;
            } catch (error) {
                console.error('Game initialization error:', error);
            }
        }

        handleGameStart() {
            try {
                this.createGameModal();
                this.showQuestion();
            } catch (error) {
                console.error('Game start error:', error);
            }
        }

        createGameModal() {
            // Remove existing modal if any
            if (this.modalElement) {
                this.modalElement.remove();
            }

            // Create new modal with unique ID
            this.modalElement = document.createElement('div');
            this.modalElement.className = 'game-modal';
            this.modalElement.id = 'game-modal-' + Date.now();

            const modalContent = document.createElement('div');
            modalContent.className = 'modal-content';
            
            const closeButton = document.createElement('button');
            closeButton.textContent = '×';
            closeButton.addEventListener('click', () => this.closeModal());

            const gameContent = document.createElement('div');
            gameContent.id = 'game-content';

            modalContent.appendChild(closeButton);
            modalContent.appendChild(gameContent);
            this.modalElement.appendChild(modalContent);
            document.body.appendChild(this.modalElement);
        }

        showQuestion() {
            if (!this.modalElement) return;

            const gameContent = this.modalElement.querySelector('#game-content');
            if (!gameContent) return;

            const questionData = {
                text: "What is 2 + 2?",
                options: ["3", "4", "5", "6"],
                correct: 1
            };

            // Clear existing content
            gameContent.innerHTML = '';

            // Create question elements
            const questionText = document.createElement('h2');
            questionText.textContent = questionData.text;

            const optionsContainer = document.createElement('div');
            
            // Add options using DOM methods instead of innerHTML
            questionData.options.forEach((option, index) => {
                const button = document.createElement('button');
                button.className = 'option-button';
                button.textContent = option;
                button.addEventListener('click', () => this.checkAnswer(index, questionData.correct));
                optionsContainer.appendChild(button);
            });

            gameContent.appendChild(questionText);
            gameContent.appendChild(optionsContainer);
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
            const gameContent = this.modalElement.querySelector('#game-content');
            
            // Clear existing content
            gameContent.innerHTML = '';

            // Create success message elements
            const heading = document.createElement('h2');
            heading.textContent = 'Correct!';

            const scoreText = document.createElement('p');
            scoreText.textContent = `Score: ${CONFIG.score}`;

            const nextButton = document.createElement('button');
            nextButton.className = 'option-button';
            nextButton.textContent = 'Next Question';
            nextButton.addEventListener('click', () => this.showQuestion());

            gameContent.appendChild(heading);
            gameContent.appendChild(scoreText);
            gameContent.appendChild(nextButton);
        }

        showGameOver() {
            const gameContent = this.modalElement.querySelector('#game-content');
            
            // Clear existing content
            gameContent.innerHTML = '';

            // Create game over elements
            const heading = document.createElement('h2');
            heading.textContent = 'Game Over!';

            const scoreText = document.createElement('p');
            scoreText.textContent = `Final Score: ${CONFIG.score}`;

            const playAgainButton = document.createElement('button');
            playAgainButton.className = 'option-button';
            playAgainButton.textContent = 'Play Again';
            playAgainButton.addEventListener('click', () => {
                CONFIG.score = 0;
                this.showQuestion();
            });

            gameContent.appendChild(heading);
            gameContent.appendChild(scoreText);
            gameContent.appendChild(playAgainButton);
        }

        closeModal() {
            if (this.modalElement) {
                this.modalElement.remove();
                this.modalElement = null;
            }
        }
    }

    // Initialize game when DOM is ready
    function initializeGame() {
        try {
            const scripts = document.getElementsByTagName('script');
            for (let script of scripts) {
                if (script.src.includes('play-button.js')) {
                    const targetForm = script.parentElement;
                    const playButtonId = script.getAttribute('data-play_button_id');
                    
                    if (playButtonId) {
                        new WordGame(targetForm, {
                            play_button_id: playButtonId
                        });
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
