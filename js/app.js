// Enemies our player must avoid
class Enemy {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    constructor(){
        this.sprite = 'images/enemy-bug.png';
        this.x = 0;
        this.y = 60;
        this.speed = 150;
        this.name='default';
    }

    // Update the enemy's position, required method for game
    // Parameter: dt, a time delta between ticks
    update(dt) {
        // You should multiply any movement by the dt parameter
        // which will ensure the game runs at the same speed for
        // all computers.
        const canvasWidth = Number(document.querySelector("canvas").width);
        if(this.x >= canvasWidth){
            this.x = 0;
        }
        this.x += this.speed*dt;

        //collision detection
        if((this.x <= player.x + 50 && this.x >= player.x - 50) && (this.y <= player.y + 50 && this.y >= player.y - 50)){
            player.x = 202;
            player.y = 390;
        }
    }

// Draw the enemy on the screen, required method for game
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

class Player{
    constructor(){
        this.x = 202;
        this.y = 390;
        this.sprite = 'images/char-horn-girl.png';
    }

    update(dt){
        // this.x *=dt;
        // this.y *=dt;
    // console.log(this.x,this.y);

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
    //   this.update();


    }
}


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
let en1 = new Enemy();
en1.name = 'en1';

let en2 = new Enemy();
en2.name = 'en2';

let en3 = new Enemy();
en3.name = 'en3';

let player = new Player();


//Set position and speeds for enemies
en2.y += 83;
en2.speed+=100;

en3.y += 166;
en3.speed += 150;

let allEnemies = [en1,en2,en3];

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

//note, collision doesnt happen bc bug moves like a flip book, so some x coordinates are
// not reached, just "appear so"
