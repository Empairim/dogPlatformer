export class InputHandler{
    constructor(game) {
        this.game = game;
        this.keys = new Set();//so no repeats
        window.addEventListener('keydown', (event)=>{
            if(event.key === 'ArrowLeft' || event.key === 'ArrowRight' || event.key === 'ArrowUp' || event.key === 'ArrowDown' || event.key === 'x' || event.key === 'd'){      
                this.keys.add(event.key);
            }
            console.log(this.keys);
            if(this.keys.has('d')) {
                this.game.debug = !this.game.debug;
                console.log('Debug mode toggled: ' + this.game.debug);
            }
        });

        window.addEventListener('keyup', (event)=>{
            this.keys.delete(event.key);
        });
    }
}