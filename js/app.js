//return random element from array
function randomNumber(array){
    return array[Math.floor(Math.random() * Math.floor(array.length))];
    //helper code [2018 https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random ]
}

class Enemy {

    //Create enemy instances
    static spawnEnemy(){
        return [new Enemy(),new Enemy(), new Enemy()];
    }

    constructor(){
        this.sprite ='images/enemy-bug.png';
        this.x = 0;
        this.y = randomNumber([60,143,226]);
        this.speed = randomNumber([150,200,250,300,350,400]);
    }

    update(dt) {

        const canvasWidth = Number(document.querySelector("canvas").width);
        if(this.x >= canvasWidth){
            this.x = 0;
            //change enemy y position when reenter screen
            this.y = randomNumber([60,143,226]);
        }
        this.x += this.speed*dt;

        //collision detection
        if((this.x <= player.x + 50 && this.x >= player.x - 50) && (this.y <= player.y + 50 && this.y >= player.y - 50)){
            let hits = document.querySelector('#hits');
            hits.textContent = Number(hits.textContent) + 1;
            
            let score = document.querySelector('#score');
            score.textContent = Number(score.textContent) - 25;

            player.reset();
        }
    }

// Draw the enemy on the screen, required method for game
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}

class Gem {

    //Create gem instances
    static spawnGems(){
        Gem.usedCoordinates = [];
        return [new Gem(),new Gem(),new Gem(),new Gem(),new Gem()];
    }

    constructor(){
        this.sprite = this.getGemSprite();

        //no overlapping gems or rocks
        while(true){
            this.x = randomNumber([0,101,202,303,404]);
            this.y = randomNumber([60,143,226]);
            if(Gem.usedCoordinates.find(item => String(item) == [this.x,this.y])===undefined){
                Gem.usedCoordinates.push([this.x,this.y]);
                break;
            }
        }
    }  

    getGemSprite(){
        const gemSprites = ['images/Gem Blue.png',
        'images/Gem Green.png',
        'images/Gem Orange.png',
        'images/Star.png',
        'images/Rock.png',
        'images/Heart.png']

        return randomNumber(gemSprites);
    }

    render(){
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    update(dt){
    //collision detection
        if((this.x <= player.x + 50 && this.x >= player.x - 50) && (this.y <= player.y + 50 && this.y >= player.y - 50)){
            //treat rock as enemy
            if(this.sprite === 'images/Rock.png'){
                this.speed = 0;
                let hits = document.querySelector('#hits');
                hits.textContent = Number(hits.textContent) + 1;
                
                let score = document.querySelector('#score');
                score.textContent = Number(score.textContent) - 25;
    
                player.reset();
            }
            else {
                let gems = document.querySelector('#gems');
                gems.textContent = Number(gems.textContent) + 1;
                
                let score = document.querySelector('#score');
                score.textContent = Number(score.textContent) + 50;

                //Remove collected gems from screen
                allGems.splice(allGems.indexOf(this),1);
            }
        }
    }

}

class Player{
    constructor(){
        this.x = 202;
        this.y = 390;
        this.sprite = 'images/char-horn-girl.png';
    }

    update(){
        if(this.y <= 0){
            let wins = document.querySelector('#wins');
            wins.textContent = Number(wins.textContent) + 1;
            
            let score = document.querySelector('#score');
            score.textContent = Number(score.textContent) + 100;

            this.reset();
            allGems = Gem.spawnGems();
            allEnemies = Enemy.spawnEnemy();
        }
    }

    render(){
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    handleInput(keyCode){
        const canvasWidth = Number(document.querySelector("canvas").width);
        
        switch (keyCode){
            case 'left':
                if(this.x-101 >= 0){
                    this.x = this.x - 101;
                }
            break;

            case 'right':
                if(this.x + 101 < canvasWidth){
                    this.x = this.x + 101;
                }
            break;

            case 'up':
                if(this.y - 83 > -26){
                    this.y = this.y - 83;
                }
            break;

            case 'down':
                if(this.y + 83 <= 390){
                    this.y = this.y + 83;
                }
            break;
      } 
    }

    reset(){
        player.x = 202;
        player.y = 390;
    }
}

let player = new Player();
let allGems = Gem.spawnGems();
let allEnemies = Enemy.spawnEnemy();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});