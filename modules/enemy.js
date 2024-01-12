class Enemy{
    constructor(game) {
        this.game = game;
        this.frameX = 0;
        this.frameY = 0;
        this.fps = 30;
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
        //remove if off screen
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
        this.y = Math.random() * (game.height * 0.6)
        this.speedX = Math.random() * 5 + 5;
        this.speedY = 0;
        this.maxFrame = 14;
        this.image = document.getElementById('enemy2');
    }
    update(deltaTime) {
        super.update(deltaTime);
        
    }
}

export class GroundEnemy extends Enemy {
    constructor(game) {
        super()
        this.game = game;
     }
}

export class ClimbingEnemy extends Enemy {
    constructor(game) {
        super()
        this.game = game;
     }
}