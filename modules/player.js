import { Sitting, Running, Jumping, Falling } from "./playerStates.js";


export class Player{
    constructor(game){
        this.game = game;
        this.width = 100;//width of sheet / frames horizontally
        this.height = 93;// height of sheet / frames vertically
        this.x = 200;
        this.y = this.game.height - this.height - this.game.groundMargin;// bottom of canvas
        this.vy = 0 //velocity y axis
        this.weight = 1;
        this.image = document.getElementById('player');
        this.frameX = 0;
        this.frameY = 0;
        this.maxFrame = 5;
        this.fps = 20
        this.fpsInterval = 1000 / this.fps;
        this.frameTimer = 0
        this.speed = 0;
        this.maxSpeed = 5.5;
        this.states = [new Sitting(this), new Running(this) , new Jumping(this), new Falling(this)] //order matters
        this.currentState = this.states[0];
        this.currentState.enter();
    }
    update(input, deltaTime){
        this.currentState.handleInput(input);
        //horizontal movement
        this.x += this.speed;
        if(input.has('ArrowLeft')){
            this.speed = -this.maxSpeed;
        }
        else if(input.has('ArrowRight')){
            this.speed = this.maxSpeed;
        }
        else(
            this.speed = 0)
        if(this.x < 0){ //so it doesnt go off screen left
            this.x = 0;
        }
        if(this.x > this.game.width - this.width){//so it doesnt go off screen right
            this.x = this.game.width - this.width;
        }
        //vertical movement
        this.y += this.vy;
        if(!this.onGround()){
            this.vy += this.weight;//gravity
        }
        else this.vy = 0
        // sprite animation
        if (this.frameTimer > this.fpsInterval){
            this.frameTimer = 0;
        if (this.frameX < this.maxFrame) this.frameX++
        else this.frameX = 0;}
        else this.frameTimer += deltaTime;//used to control speed of animation it wont increment frameX until frameTimer is greater than fpsInterval


    }
    draw(context) {
        if(this.game.debug) context.strokeRect(this.x, this.y, this.width, this.height);
        context.drawImage(this.image, this.frameX * this.width, this.frameY * this.height, this.width, this.height, this.x, this.y, this.width, this.height)
    }
    onGround(){
        return this.y >= this.game.height - this.height - this.game.groundMargin;
    }
    setState(state, speed){
        this.currentState = this.states[state]
        this.game.speed = this.game.maxSpeed * speed;
        this.currentState.enter()
    }
}

