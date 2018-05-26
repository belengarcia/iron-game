function Game(canvasElement) {
  this.ctx = canvasElement.getContext("2d");

  this.bg = new Background(this.ctx);
  this.player = new Player(this.ctx);
  this.obstacleCollection = new ObstacleCollection(this.ctx);
  this.score = new Score(this.ctx);

  this.intervalId = null;

  this.setKeyboardListeners();
}

Game.prototype.start = function() {
  this.intervalId = setInterval(function() {
    this.clear();

    this.drawAll();

    this.checkBulletCollision();
    this.checkGameOver();

    this.moveAll();
  }.bind(this), 16);
};

Game.prototype.drawAll = function() {
  this.bg.draw();
  this.player.draw();
  this.obstacleCollection.draw();
  this.score.draw();
};

Game.prototype.moveAll = function() {
  this.bg.move();
  this.player.move();
  this.obstacleCollection.move();
};

Game.prototype.checkGameOver = function() {
  if (this.obstacleCollection.isCollisions(this.player)) {
    this.gameOver();
  }
};

Game.prototype.checkBulletCollision = function() {
  this.player.bullets = this.player.bullets.filter(function(bullet, i) {
    var targetObstacle = this.obstacleCollection.isBulletCollision(bullet);

    if (targetObstacle) {
      this.obstacleCollection.deleteObstacle(targetObstacle);
      return false;
    } else {
      return true;
    }
  }.bind(this));
}

Game.prototype.gameOver = function() {
  clearInterval(this.intervalId);

  if (confirm("GAME OVER! Play again?")) {
    location.reload();
  }

  this.score.score = 0;
};

Game.prototype.clear = function() {
  this.ctx.clearRect(
    0, 0, this.ctx.canvas.width, this.ctx.canvas.height
  );

  this.player.bullets.forEach((bullet ,i) => {
    if(bullet.x > this.ctx.canvas.width){
      this.player.bullets.splice(i,1);
    }
  });
};

Game.prototype.setKeyboardListeners = function() {
  document.onkeydown = function(event) {
    this.player.onKeyDown(event.keyCode);
  }.bind(this);

  document.onkeyup = function(event) {
    this.player.onKeyUp(event.keyCode);
  }.bind(this);
};
