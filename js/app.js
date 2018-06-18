// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = 0;
    this.y = 230;
    this.speed = 70;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    const canvasWidth = Number(document.querySelector("canvas").width);
    if(this.x >= canvasWidth){
        this.x = -25;
    }
    this.x += this.speed*dt;
    // this.y += this.speed*sdt;


};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

class Player{
    constructor(){
        this.x = 200;
        this.y = 390;
        this.speed = 25;
        this.sprite = 'images/char-horn-girl.png';
    }

    update(dt){
        // this.x *=dt;
        // this.y *=dt;
    }

    render(){
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    handleInput(keyCode){
      switch (keyCode){
          case 'left':
          if(this.x)
          this.x = this.x - 101;
          break;

          case 'right':
          this.x = this.x + 101;
          break;

          case 'up':
          this.y = this.y - 83;
          break;

          case 'down':
          this.y = this.y + 83;
          break;

      } 
    //   this.update();

    }
}


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var en1 = new Enemy();
var en2 = new Enemy();
en2.y-= 90;
en2.speed+=100;
var allEnemies = [en1,en2];

var player = new Player();

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
