export class InputHandler{
    constructor(){
        this.keys = new Set();//so no repeats
        window.addEventListener('keydown', (event)=>{
            if(event.key === 'ArrowLeft' || event.key === 'ArrowRight'){      
            this.keys.add(event.key)}
        })
        window.addEventListener('keyup', (event)=>{
            this.keys.delete(event.key)
        })
    }
}