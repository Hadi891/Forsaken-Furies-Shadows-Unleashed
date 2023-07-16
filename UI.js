export class UI{
    constructor(game){
        this.game = game;
        this.fontSize = 30;
        //this.fontFamily = 'MedievalSharp';
        this.fontFamily = 'Creepster';
        this.livesImage = document.getElementById('lives');
    }
    draw(context){
        context.save();
        context.shadowOffsetX = 2;
        context.shadowOffsetY = 2;
        context.shadowColor = 'white';
        context.shadowBlur = 0;
        context.font = this.fontSize * 1.3 + 'px ' + this.fontFamily;
        context.textAlign = 'left';
        context.fillStyle = this.game.fontColor;
        context.fillText('Score: ' + this.game.score, 20, 50);
        context.font = this.fontSize * 1 + 'px ' + this.fontFamily;
        context.fillText('Time: ' + (this.game.time * 0.001).toFixed(1), 20, 80);
        context.font = this.fontSize * 1 + 'px ' + this.fontFamily;
        context.fillText('Energy: ' + (this.game.energy).toFixed(0), 20, 110);
        for(let i=0; i < this.game.lives; i++){
            context.drawImage(this.livesImage, 30 * i + 20, 120, 25, 25)
        }

        const canvas = document.getElementById('canvas1');
        const reloadGame = (e) => {
            const rect = canvas.getBoundingClientRect();
            const clickX = e.clientX - rect.left;
            const clickY = e.clientY - rect.top;
      
            if (
              clickX >= this.game.width / 2 - 100 &&
              clickX <= this.game.width / 2 + 100 &&
              clickY >= this.game.height / 2 + 50 &&
              clickY <= this.game.height / 2 + 100
            ) {
              // Reload the page
              window.location.reload();
            }
          };
      
        
        if(this.game.gameOver){
            context.textAlign = 'center';
            context.font = this.fontSize * 3 + 'px ' + this.fontFamily
            context.fillText('Game Over', this.game.width * 0.5, this.game.height * 0.5 - 20);
            context.font = this.fontSize * 1.1 + 'px ' + this.fontFamily
            context.fillText('Your journey ends here, but your spirit will live on!', this.game.width * 0.5, this.game.height * 0.5 + 20);
            context.font = this.fontSize * 1.1 + 'px ' + this.fontFamily
            context.fillText('---Press Space to See the LeaderBoard---', this.game.width * 0.5, this.game.height * 0.5 + 90);
            // if(!document.fullscreenElement)
            // {
            //   context.fillStyle = 'black';
            //   context.fillRect(this.game.width * 0.5 - 100, this.game.height * 0.5 + 50, 200, 50);
            //   context.fillStyle = 'white';
            //   context.font = this.fontSize * 1.1 + 'px ' + this.fontFamily
            //   context.fillText('Reload', this.game.width * 0.5, this.game.height * 0.5 + 85);
            // }

            // // Add event listener for the reload button
            
            // canvas.addEventListener('click', reloadGame);

        }
        context.restore();
    }
}