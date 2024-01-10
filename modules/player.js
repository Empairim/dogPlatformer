import { Sitting, Running } from "./playerStates.js";


export class Player{
    constructor(game){
        this.game = game;
        this.width = 100;//width of sheet / frames horizontally
        this.height = 93;// height of sheet / frames vertically
        this.x = 200;
        this.y = this.game.height - this.height;// bottom of canvas
        this.vy = 0 //velocity y axis
        this.weight = 1;
        this.image = document.getElementById('player');
        this.frameX = 0;
        this.frameY = 0;
        this.speed = 0;
        this.maxSpeed = 10;
        this.states = [new Sitting(this), new Running(this)]
        this.currentState = this.states[0];
        this.currentState.enter();
    }
    update(input){
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
        if(input.has('ArrowUp') && this.onGround()){
            this.vy -= 30;//jump
            this.y += this.vy;
        }
        if(!this.onGround()){
            this.vy += this.weight;//gravity
        }
        else(
            this.vy = 0)

    }
    draw(context){
        context.drawImage(this.image, this.frameX * this.width, this.frameY * this.height, this.width, this.height, this.x, this.y, this.width, this.height)
    }
    onGround(){
        return this.y >= this.game.height - this.height;
    }
    setState(state){
        this.currentState = this.states[state]
        this.currentState.enter()
    }
}

