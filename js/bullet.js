function Bullet(ctx, x, y) {
  this.ctx = ctx;

  var max = 200,
      min = 10;

  var random = Math.floor(Math.random() * (max - min + 1) + min);

  this.w = random;
  this.h = this.w / 2;

  this.x = x;
  this.y = y;

  this.img = new Image();
  this.img.src = "./img/bullet.png";

  this.g = 0.25;

  this.vx = 15;
  this.vy = -5;
}

Bullet.prototype.draw = function() {
  this.ctx.drawImage(
    this.img,
    this.x,
    this.y,
    this.w,
    this.h
  )
};

Bullet.prototype.move = function() {
  this.x += this.vx;
  this.vy += this.g;
  this.y += this.vy;

  if (this.y >= this.ctx.canvas.height * 0.9) {
    this.vy *= -1;
  }
};
