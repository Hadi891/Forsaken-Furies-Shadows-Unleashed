import { Player } from "./player.js";
import { InputHandler } from "./input.js";
import { Background } from "./background.js";
import { FlyingEnemy, ClimbingEnemy, GroundEnemy } from "./enemies.js";
import { UI } from "./UI.js";

window.addEventListener('load', function(){
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = 1000;
    canvas.height = 500;

    const soundtrack = new Audio('peritune-spook4.mp3');

    // Play the soundtrack
    soundtrack.play();

    class Game{
        constructor(width, height){
            this.width = width;
            this.height = height;
            this.groundMargin = 80;
            this.speed = 0;
            this.maxSpeed = 5;
            this.background = new Background(this);
            this.player = new Player(this);
            this.input = new InputHandler(this);
            this.ui = new UI(this);
            this.enemies = [];
            this.particals = [];
            this.collisions = [];
            this.floatingMessages = [];
            this.maxParticals = 50;
            this.enemyTimer = 0;
            this.enemyInterval = 1000;
            this.debug = false;
            this.score = 0;
            this.fontColor = 'black';
            this.time = 0;
            this.maxTime = 60000;
            this.energy = 100;
            this.gameOver = false;
            this.lives = 3;
            this.player.currentState = this.player.states[0];
            this.player.currentState.enter();
        }
        update(deltatime){
            this.time += deltatime;
            if(this.time > this.maxTime) this.gameOver = true;
            this.background.update();
            this.player.update(this.input.keys, deltatime);
            //handleEnemies
            if(this.enemyTimer > this.enemyInterval){
                this.addEnemy();
                this.enemyTimer = 0;
            } else {
                this.enemyTimer += deltatime;
            }
            this.enemies.forEach(enemy => {
                enemy.update(deltatime);
                if(enemy.markedForDeletion) this.enemies.splice(this.enemies.indexOf(enemy), 1);
            });
            //handle messages
            this.floatingMessages.forEach(message => {
                message.update();
            });
            // handle particles
            this.particals.forEach((particals, index) => {
                particals.update();
                if(particals.markedForDeletion) this.particals.splice(index, 1);
            });
            if(this.particals.length > this.maxParticals){
                this.particals = this.particals.slice(0, this.maxParticals);
            }
            //handle collision sprites
            this.collisions.forEach((collision, index) => {
                collision.update(deltatime);
                if(collision.markedForDeletion) this.collisions.splice(index, 1);
            })
            this.floatingMessages = this.floatingMessages.filter(message => !message.markedForDeletion);

            if (isRolling && this.energy > 0) {
                this.energy -= deltatime / 100;
              }
              if (!isRolling && this.energy <= 0) {
                isRolling = false;
              }
              if (!isRolling && this.energy < 100) {
                this.energy += deltatime / 100;
              }
              this.energy = Math.min(this.energy, 100);
              if (this.gameOver) {
                // Call the gameOver function to stop the soundtrack
                gameOver();
            }
        }
        draw(context){
            this.background.draw(context);
            this.player.draw(context);
            this.enemies.forEach(enemy => {
                enemy.draw(context);
            });
            this.floatingMessages.forEach(message => {
                message.draw(context);
            });
            this.particals.forEach(partical => {
                partical.draw(context);
            });
            this.collisions.forEach(collision => {
                collision.draw(context);
            });
            this.ui.draw(context);
        }
        addEnemy(){
            if(this.speed > 0 && Math.random() < 0.5) this.enemies.push(new GroundEnemy(this));
            else if(this.speed > 0) this.enemies.push(new ClimbingEnemy(this));
            this.enemies.push(new FlyingEnemy(this));
        }
    }

    function toggleFullscreen(){
        if(!document.fullscreenElement){
            canvas.requestFullscreen().catch(err => {
                alert('Error, can`t enable full-screen mode: ${err.message}');
            });
        } else {
            document.exitFullscreen();
        }
    }
    fullScreenButton.addEventListener('click', toggleFullscreen);

    const game = new Game(canvas.width, canvas.height);

    let isRolling = false;

    document.addEventListener("keydown", function (event) {
        const key = event.key;
        if (key === "Enter") {
          isRolling = true;
        }
    });
      
    document.addEventListener("keyup", function (event) {
        const key = event.key;
        if (key === "Enter") {
          isRolling = false;
        }
    });

    let isPaused = false;

    function pauseGame() {
        isPaused = true;
    }
    
    function resumeGame() {
        isPaused = false;
        requestAnimationFrame(animate);
    }

    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
          if (isPaused) {
            resumeGame(); 
          } else {
            pauseGame(); 
          }
        }
    });

    function updateGame(deltatime) {
        if (!isPaused) {
          game.update(deltatime);
        }
    }
      
    let lastTime = 0;
    let animationId;
    function animate(timestamp){
        const deltatime = timestamp - lastTime;
        lastTime = timestamp;

        if (game.gameOver) {
            // Call the gameOver function to stop the soundtrack
            gameOver();
        }
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        updateGame(deltatime);
        game.draw(ctx);

        if (!game.gameOver && !isPaused) {
            animationId = requestAnimationFrame(animate);
        }
    }

    function gameOver() {
        // Pause the soundtrack and reset the playback position
        soundtrack.pause();
        soundtrack.currentTime = 0;
    }

    animate(0);

    function updateLeaderboard(score) {
        // Store the score in local storage
        localStorage.setItem('gameScore', score);
      }

    function resetGame() {
        game.gameOver = false;
        game.lives = 3;
        game.speed = 0;
        game.energy = 100;
        game.background = new Background(game);
        game.player.resetPosition(); 
        game.enemies = [];
        game.particals = [];
        game.collisions = [];
        game.floatingMessages = [];
        game.time = 0;
        const score = game.score;
        updateLeaderboard(game.score);
        window.location.href = `leaderboard.html?score=${score}`;
        game.score = 0;
      }
      document.addEventListener("keydown", function(event) {
        if (event.key === " ") { 
          if (game.gameOver) { 
            resetGame(); 
            cancelAnimationFrame(animationId);
            requestAnimationFrame(animate);
          }
        }
      });
});