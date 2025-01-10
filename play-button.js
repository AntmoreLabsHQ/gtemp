(function() {
    // Game Configuration
    const CONFIG = {
        baseUrl: "https://console.thegoodgametheory.com/v1",
        currentLevel: 0,
        score: 0,
        timePerLevel: 30, // seconds
        timeRemaining: 30,
        timer: null
    };

    // Game levels - each level has a theme word and related words to find
    const GAME_LEVELS = [
        {
            theme: "OCEAN",
            grid: [
                "WAVE", "SAND", "FISH", "BOAT",
                "MAIL", "REEF", "SALT", "ROCK",
                "TIDE", "BIRD", "SHIP", "SHELL",
                "SURF", "DESK", "SHOE", "SWIM"
            ],
            validWords: ["WAVE", "FISH", "BOAT", "REEF", "SALT", "TIDE", "SHIP", "SHELL", "SURF", "SWIM"],
            foundWords: []
        },
        {
            theme: "FOREST",
            grid: [
                "TREE", "LEAF", "DEER", "MOSS",
                "BIRD", "WOLF", "FERN", "PINE",
                "DESK", "BEAR", "SOIL", "RAIN",
                "LAMP", "WOOD", "PATH", "BUSH"
            ],
            validWords: ["TREE", "LEAF", "DEER", "MOSS", "BIRD", "WOLF", "FERN", "PINE", "BEAR", "WOOD"],
            foundWords: []
        },
        {
            theme: "SPACE",
            grid: [
                "STAR", "MOON", "MARS", "BELT",
                "SHIP", "VOID", "DUST", "NOVA",
                "ROCK", "ATOM", "SOFA", "COAT",
                "TIME", "LAMP", "WARP", "RING"
            ],
            validWords: ["STAR", "MOON", "MARS", "SHIP", "VOID", "DUST", "NOVA", "TIME", "WARP", "RING"],
            foundWords: []
        }
    ];

    class WordGame {
        constructor(targetElement, options) {
            this.target = targetElement;
            this.options = options;
            this.init();
        }

        init() {
            // Create and inject button
            const button = document.createElement('button');
            button.innerHTML = 'Play Word Association Game';
            button.className = 'game-button';
            button.addEventListener('click', () => this.startGame());
            
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
                    transition: transform 0.2s, box-shadow 0.2s;
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
                    box-shadow: 0 10px 30px rgba(0,0,0,0.2);
                }
                .game-grid {
                    display: grid;
                    grid-template-columns: repeat(4, 1fr);
                    gap: 10px;
                    margin: 20px 0;
                }
                .grid-item {
                    background: #f0f4ff;
                    border: none;
                    border-radius: 8px;
                    padding: 15px;
                    font-size: 18px;
                    font-weight: bold;
                    cursor: pointer;
                    transition: all 0.3s;
                }
                .grid-item:hover {
                    background: #e0e7ff;
                    transform: scale(1.05);
                }
                .grid-item.found {
                    background: #4CAF50;
                    color: white;
                }
                .game-info {
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: 20px;
                    font-size: 18px;
                }
                .theme-word {
                    font-size: 24px;
                    font-weight: bold;
                    text-align: center;
                    margin-bottom: 20px;
                    color: #4a6cf7;
                }
                .found-words {
                    margin-top: 20px;
                    display: flex;
                    flex-wrap: wrap;
                    gap: 10px;
                }
                .found-word {
                    background: #4CAF50;
                    color: white;
                    padding: 5px 10px;
                    border-radius: 15px;
                    font-size: 14px;
                }
                .timer {
                    font-weight: bold;
                    color: #f44336;
                }
                .game-over {
                    text-align: center;
                }
                .score-display {
                    font-size: 36px;
                    font-weight: bold;
                    margin: 20px 0;
                    color: #4a6cf7;
                }
                .play-again-btn {
                    background: #4CAF50;
                    color: white;
                    padding: 10px 20px;
                    border: none;
                    border-radius: 20px;
                    cursor: pointer;
                    font-size: 16px;
                }
            `;
            document.head.appendChild(styles);
            
            this.target.appendChild(button);
        }

        startGame() {
            CONFIG.currentLevel = 0;
            CONFIG.score = 0;
            this.openGameModal();
            this.startTimer();
        }

        startTimer() {
            CONFIG.timeRemaining = CONFIG.timePerLevel;
            if (CONFIG.timer) clearInterval(CONFIG.timer);
            
            CONFIG.timer = setInterval(() => {
                CONFIG.timeRemaining--;
                this.updateTimer();
                if (CONFIG.timeRemaining <= 0) {
                    this.endLevel();
                }
            }, 1000);
        }

        updateTimer() {
            const timerEl = document.querySelector('.timer');
            if (timerEl) {
                timerEl.textContent = CONFIG.timeRemaining;
            }
        }

        endLevel() {
            clearInterval(CONFIG.timer);
            CONFIG.currentLevel++;
            
            if (CONFIG.currentLevel < GAME_LEVELS.length) {
                this.updateModalContent();
                this.startTimer();
            } else {
                this.showGameOver();
            }
        }

        createModalContent() {
            const level = GAME_LEVELS[CONFIG.currentLevel];
            
            return `
                <div class="theme-word">Theme: ${level.theme}</div>
                <div class="game-info">
                    <div>Score: ${CONFIG.score}</div>
                    <div>Time: <span class="timer">${CONFIG.timeRemaining}</span>s</div>
                    <div>Level: ${CONFIG.currentLevel + 1}/${GAME_LEVELS.length}</div>
                </div>
                <div class="game-grid">
                    ${level.grid.map((word, index) => `
                        <button 
                            class="grid-item ${level.foundWords.includes(word) ? 'found' : ''}"
                            onclick="window.gameInstance.checkWord('${word}')"
                        >${word}</button>
                    `).join('')}
                </div>
                <div class="found-words">
                    ${level.foundWords.map(word => `
                        <span class="found-word">${word}</span>
                    `).join('')}
                </div>
            `;
        }

        showGameOver() {
            const modalContent = document.querySelector('.modal-content');
            modalContent.innerHTML = `
                <div class="game-over">
                    <h2>Game Complete!</h2>
                    <div class="score-display">${CONFIG.score} points</div>
                    <p>You found ${CONFIG.score / 10} words across ${GAME_LEVELS.length} themes!</p>
                    <button 
                        class="play-again-btn"
                        onclick="window.gameInstance.startGame()"
                    >Play Again</button>
                </div>
            `;
        }

        openGameModal() {
            const modal = document.createElement('div');
            modal.className = 'game-modal';
            modal.innerHTML = `
                <div class="modal-content">
                    ${this.createModalContent()}
                </div>
            `;
            document.body.appendChild(modal);
        }

        updateModalContent() {
            const modalContent = document.querySelector('.modal-content');
            modalContent.innerHTML = this.createModalContent();
        }

        checkWord(word) {
            const level = GAME_LEVELS[CONFIG.currentLevel];
            
            if (level.validWords.includes(word) && !level.foundWords.includes(word)) {
                level.foundWords.push(word);
                CONFIG.score += 10;
                this.updateModalContent();
                
                // Check if all words are found
                if (level.foundWords.length === level.validWords.length) {
                    this.endLevel();
                }
            }
        }
    }

    // Initialize game when script loads
    function initializeGame() {
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
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeGame);
    } else {
        initializeGame();
    }
})();
