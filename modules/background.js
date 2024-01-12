class Layer{
    constructor(game, width, height, speedModifier,image, initialY = 0, opacity = 1){
        this.game = game;
        this.width = width;
        this.height = height;
        this.speedModifier = speedModifier;
        this.image = image;
        this.x = 0;
        this.y = initialY || 0;// allows me to set y of each layer individually
        this.opacity = opacity;
        
        
    }
    update(){
        if(this.x < -this.width) this.x = 0;//resets x if off screen
        else this.x -= this.game.speed * this.speedModifier;
    }
    draw(context){
        
        context.globalAlpha = this.opacity;
        context.drawImage(this.image, this.x, this.y, this.width, this.height)
        context.drawImage(this.image, this.x + this.width, this.y, this.width, this.height); // Draw second instance of image immediately after first to fill in gap
        context.globalAlpha = 1;
        
    }
}

export class Background{
    constructor(game){
        this.game = game;
        this.width = 1920;
        this.height = 1080;
        this.bgLayers = [
        new Layer(this.game, 1920, 1080, 0, document.getElementById('bg1')),
        new Layer(this.game, 1920, 1080, 0.4, document.getElementById('bg2')),
        new Layer(this.game, 1920, 1080, 0.6, document.getElementById('bg3')),
        new Layer(this.game, 1920, 1080, 0.8, document.getElementById('bg4')),
        new Layer(this.game, 1920, 1080, 1, document.getElementById('bg5'),48,0.7)
    
    ]
    }
    update(){
        this.bgLayers.forEach(layer => layer.update());
    }
    draw(context){
        this.bgLayers.forEach(layer => layer.draw(context));
    }
}

