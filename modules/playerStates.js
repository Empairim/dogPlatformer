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
        this.player.frameY = 5;

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
        this.player.frameY = 3;

    }
    handleInput(input){
        if (input.has ('ArrowDown')){
           this.player.setState(states.SITTING)
        }

    }
}