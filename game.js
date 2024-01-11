import { Player } from "./modules/player.js";
import { InputHandler } from "./modules/input.js";
import { Background } from "./modules/background.js";

window.addEventListener('load', function() {

    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = 1920;
    canvas.height = 1080;


    class Game{
        constructor(width, height){
            this.width = width;
            this.height = height;
            this.speed = 0
            this.maxSpeed = 5 //max speed of player and background in one property
            this.groundMargin = 95;//margin between bottom of canvas and ground
            this.background = new Background(this);
            this.player = new Player(this);
            this.input = new InputHandler();
    }
    update(deltaTime){
        this.background.update();
        this.player.update(this.input.keys, deltaTime);//passing in deltaTime to player update
    }
    draw(context){
        this.background.draw(context);
        this.player.draw(context)
        this.background.bgLayers[4].draw(context)
    }
}

const game = new Game(canvas.width, canvas.height);
console.log(game)
let lastTime = 0;//time stamp of previous loop


function animate(timestamp)//timestamp is time since page loaded
{   const deltaTime = timestamp - lastTime;
    lastTime = timestamp;//controls speed of animation for next loop
    ctx.clearRect(0,0,canvas.width, canvas.height);
    game.update(deltaTime);
    game.draw(ctx);
    requestAnimationFrame(animate);
}
animate(0)// passed in timestamp of 0 to start animation loop since its expecting a timestamp in animate function;









})