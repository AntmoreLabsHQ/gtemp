(() => {
    let gameBox;
    let gameButton;
  
    const addGameBox = () => {
      gameBox = document.createElement("div");
      gameBox.id = "game-box";
      gameBox.innerHTML = `
        <div class="game-container">
          <iframe id="game-frame" src=" https://chromedino.com/" frameborder="0"></iframe>
          <div class="game-container-close">CLOSE</div>
        </div>
      `;
  
      document.body.appendChild(gameBox);
      document.querySelector(".game-container-close").addEventListener("click", closeGame);
    };
  
    const addGameButton = () => {
      gameButton = document.createElement("button");
      gameButton.id = "game-button";
      gameButton.innerText = "Play Game";
      document.body.appendChild(gameButton);
  
      gameButton.addEventListener("click", showGame);
    };
  
    const showGame = () => {
      if (!gameBox) {
        addGameBox();
      }
      gameBox.style.display = "block";
    };
  
    const closeGame = () => {
      if (gameBox) {
        gameBox.style.display = "none";
      }
    };
  
    const addStyling = () => {
      const styling = document.createElement("style");
      styling.innerHTML = `
        #game-box {
          display: none;
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 800px;
          height: 600px;
          background: white;
          z-index: 100;
          border-radius: 16px;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
          overflow: hidden;
        }
        .game-container {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }
        #game-frame {
          width: 100%;
          height: 100%;
        }
        .game-container-close {
          position: absolute;
          top: 10px;
          right: 20px;
          cursor: pointer;
          color: red;
          font-weight: bold;
        }
        #game-button {
          position: fixed;
          bottom: 40px;
          right: 60px;
          z-index: 100;
          background: black;
          color: white;
          border: none;
          border-radius: 12px;
          width: 170px;
          height: 60px;
          font-size: 24px;
          font-weight: 550;
          cursor: pointer;
          box-shadow: 4px 4px 12px black;
          transition: all 0.5s;
        }
        #game-button:hover {
          transform: translateY(-3px);
        }
      `;
      document.head.appendChild(styling);
    };
  
    addStyling();
    addGameButton();
  })();
