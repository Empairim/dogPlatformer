export class InputHandler{
    constructor(){
        this.keys = new Set();//so no repeats
        window.addEventListener('keydown', (event)=>{
            if(event.key === 'ArrowLeft' || event.key === 'ArrowRight' || event.key === 'ArrowUp' || event.key === 'ArrowDown' || event.key === 'x'){      
            this.keys.add(event.key)
         } //console.log(this.keys)
        })
        window.addEventListener('keyup', (event)=>{
            this.keys.delete(event.key)
        })
    }
}