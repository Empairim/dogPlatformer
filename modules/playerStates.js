const states = {
    SITTING: 0,
    RUNNING: 1,
    JUMPING: 2,
    FALLING: 3,

}

class State{
    constructor(state){
        this.state = state
    }

}

export class Sitting extends State{
    constructor(player){
        super('SITTING')
        this.player = player;
    }
    enter(){
        this.player.frameX = 0;//reset frameX prevents blinking
        this.player.maxFrame = 4;
        this.player.frameY = 5;
        this.player.fpsInterval = 1000 / this.player.fps; // Reset fpsInterval to normal

    }
    handleInput(input){
        if (input.has ('ArrowLeft') || input.has('ArrowRight')){
           this.player.setState(states.RUNNING)
        }

    }
}
export class Running extends State{
    constructor(player){
        super('RUNNING')
        this.player = player;
    }
    enter(){
        this.player.frameX = 0;
        this.player.maxFrame = 8;
        this.player.frameY = 3;
        this.player.fpsInterval = 0.5 //speed up animation for running state

    }
    handleInput(input){
        if (input.has ('ArrowDown')){
           this.player.setState(states.SITTING)
        }else if (input.has('ArrowUp')){
            this.player.setState(states.JUMPING)}

    }
}
export class Jumping extends State{
    constructor(player){
        super('JUMPING')
        this.player = player;
    }
    enter(){
        if(this.player.onGround()){
            this.player.vy -= 30;//jump
        }
        this.player.frameX = 0;
        this.player.maxFrame = 6;
        this.player.frameY = 1;
        this.player.fpsInterval = 1000 / this.player.fps; // Reset fpsInterval to normal

    }
    handleInput(input){
        if (this.player.vy > this.player.weight){
           this.player.setState(states.FALLING)
        }

    }
}
export class Falling extends State{
    constructor(player){
        super('FALLING')
        this.player = player;
    }
    enter(){
        this.player.frameX = 0;
        this.player.maxFrame = 6;
        this.player.frameY = 2;
        this.player.fpsInterval = 1000 / this.player.fps; // Reset fpsInterval to normal

    }
    handleInput(input){
        if (this.player.onGround()){
           this.player.setState(states.RUNNING)
        }

    }
}