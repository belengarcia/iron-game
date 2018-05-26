function Obstacle(ctx) {
  this.ctx = ctx;

  this.w = 100;
  this.h = 100;

  this.x = this.ctx.canvas.width;
  this.y = this.ctx.canvas.height * 0.8;

  this.img = new Image();
  var random = Math.floor(Math.random() * 2);
  this.img.src = './img/obstacle_' + random + '.png';

  this.vx = -5;
}

Obstacle.prototype.draw = function() {
  this.ctx.drawImage(
    this.img,
    this.x,
    this.y,
    this.w,
    this.h
  )
};

Obstacle.prototype.move = function() {
  this.x += this.vx;
};
