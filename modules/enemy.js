class Enemy{
    constructor(game) {
        this.game = game;
        this.frameX = 0;
        this.frameY = 0;
        this.fps = 15;
        this.frameInterval = 1000 / this.fps;
        this.frameTimer = 0;
        this.markedForDeletion = false;
        
    }
    update(deltaTime) {
        //movement
        this.x -= this.speedX;
        this.y += this.speedY;
        if(this.frameTimer > this.frameInterval){
            this.frameTimer = 0;
            this.frameX++;
            if(this.frameX > this.maxFrame) this.frameX = 0;
        
        } else {
            this.frameTimer += deltaTime;
        }
        if (this.x < -this.width) { this.markedForDeletion = true; }
        if (this.markedForDeletion == true) {
             this.game.enemies = this.game.enemies.filter(enemy => !enemy.markedForDeletion);
        }
    }
    draw(context) {
        context.drawImage(this.image, this.frameX * this.width,0,this.width, this.height, this.x, this.y, this.width, this.height)
    }
}

export class FlyingEnemy extends Enemy {
    constructor(game) {
        super(game)
        this.game = game;
        this.width = 253;
        this.height = 206;
        this.x = this.game.width + Math.random() * this.game.width * 0.5;
        this.y = Math.random() * (game.height * 0.5)
        this.speedX = Math.random() * 10 + 2;
        this.speedY = 0;
        this.maxFrame = 14;
        this.image = document.getElementById('enemy2');
        this.angle = 0
        this.va = Math.random() * 0.1 - 0.1;
    }
    update(deltaTime) {
        super.update(deltaTime);
        this.angle += this.va;
        this.y += Math.sin(this.angle) * 2;//makes it move up and down sine wave
        
        
    }
}

export class GroundEnemy extends Enemy {
    constructor(game) {
        super()
        this.game = game;
        this.width = 528; // width of a single frame
        this.height = 529; // height of a single frame
        this.x = this.game.width - Math.random() * this.game.width * 0.5;
        this.y = this.game.height - this.height + game.groundMargin + 200 
        this.image = document.getElementById('enemy1');
        this.speedX = 0;
        this.speedY = 0;
        this.maxFrame = 38
       
      
    }
    draw(context) {
        context.save(); // Save the current state
        context.globalAlpha = .75; // Set the alpha value
    
        context.drawImage(
            this.image,
            this.width * this.frameX, 0, 
            this.width, this.height, 
            this.x, this.y, 
            this.width /4, this.height/4 
        );
    
        context.restore(); //
    }
    
    
   
}

export class ClimbingEnemy extends Enemy {
    constructor(game) {
        super()
        this.game = game;
        this.width = 120
        this.height = 144
        this.x = this.game.width - Math.random() * this.game.width * 0.5;
        this.y = Math.random() * (game.height * 0.5) 
        this.image = document.getElementById('enemy3');
        this.speedX = 0;
        this.speedY = Math.random() > 0.5 ? 1 : -1;
        this.maxFrame = 5
    }
    update(deltaTime) {
        super.update(deltaTime);
        if (this.y > this.game.height - this.height - this.game.groundMargin) this.speedY = -1;
        if (this.y < -this.height) this.markedForDeletion = true;
    }
    draw(context) { 
        super.draw(context);
        context.beginPath();
        context.moveTo(this.x + this.width/2,0);
        context.lineTo(this.x + this.width/2, this.y + 50);
        context.stroke();
        context.strokeStyle = 'red';
    }
}