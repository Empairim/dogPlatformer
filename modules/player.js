export class Player{
    constructor(game){
        this.game = game;
        this.width = 190;//width of sheet / frames horizontally
        this.height = 180;// height of sheet / frames vertically
        this.x = 0;
        this.y = this.game.height - this.height;// bottom of canvas
        this.vy = 0 //velocity y axis
        this.weight = 1;
        this.image = document.getElementById('player');//can also just use id alone weirdly
        this.speed = 0;
        this.maxSpeed = 10;
    }
    update(input){
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
        else if(input.has('ArrowDown')){
            this.vy = this.maxSpeed;
            
        }
        else(
            this.vy = 0)

    }
    draw(context){
        
        context.drawImage(this.image, 0, 0, this.width, this.height, this.x, this.y, this.width, this.height)//draw image takes 9 arguments image source, x,y,width,height, x,y,width,height
    }
    onGround(){
        return this.y >= this.game.height - this.height;
    }
}

