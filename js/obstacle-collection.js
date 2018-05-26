function ObstacleCollection(ctx) {
  this.ctx = ctx;

  this.obstacles = [];

  this.drawCounter = 0;
}

ObstacleCollection.prototype.draw = function() {
  this.drawCounter++;

  this.generateObstacle();

  this.obstacles.forEach(function(o) {
    o.draw();
  });

  this.cleanObstacles();
};

ObstacleCollection.prototype.move = function() {
  this.obstacles.forEach(function(o) {
    o.move();
  });
};

ObstacleCollection.prototype.isCollisions = function(mario) {
  return this.obstacles.some(function(obstacle){
    var cx = obstacle.x < mario.x + mario.w && obstacle.x + obstacle.w > mario.x; 
    var cy = obstacle.y < mario.y + mario.h;
    return cx && cy;
  });
};

ObstacleCollection.prototype.deleteObstacle = function(obstacleToDelete) {
  this.obstacles = this.obstacles.filter(function(o) {
    return o !== obstacleToDelete; 
  });
}

ObstacleCollection.prototype.isBulletCollision = function(bullet) {
  return this.obstacles.find(function(obstacle){
    var cx = obstacle.x < bullet.x + bullet.w && obstacle.x + obstacle.w > bullet.x; 
    var cy = obstacle.y < bullet.y + bullet.h;

    return cx && cy ? obstacle : null;
  });
};

ObstacleCollection.prototype.generateObstacle = function() {
  var max = 100,
      min = 50;

  var random = Math.floor(Math.random() * (max - min + 1) + min);

  if (this.drawCounter % random === 0) {
    this.drawCounter = 0;

    this.obstacles.push(
      new Obstacle(this.ctx)
    );
  }
};

ObstacleCollection.prototype.cleanObstacles = function() {
  this.obstacles.forEach((o ,i) => {
    if(o.x + o.w < 0){
      this.obstacles.splice(i,1);
      console.log(this.obstacles);
    }
  })
};
