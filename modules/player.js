export class Player{
    constructor(game){
        this.game = game;
        this.width = 190;//width of sheet / frames horizontally
        this.height = 180;// height of sheet / frames vertically
        this.x = 0;
        this.y = this.game.height - this.height;// bottom of canvas
        this.image = document.getElementById('player');//can also just use id alone weirdly
        this.speed = 0;
    }
    update(input){
        if(input.has('ArrowLeft')){
            this.x--;
        }
        if(input.has('ArrowRight')){
            this.x++;
        }
        if(input.has('ArrowUp')){
            this.y--;
        }
        if(input.has('ArrowDown')){
            this.y++;
        }
        if(input.has('x')){
            console.log('x')
        }
    }
    draw(context){
        
        context.drawImage(this.image, 0, 0, this.width, this.height, this.x, this.y, this.width, this.height)//draw image takes 9 arguments image source, x,y,width,height, x,y,width,height
    }
}