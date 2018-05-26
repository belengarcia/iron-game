function Bullet(ctx, x, y) {
  this.ctx = ctx;

  this.w = 200;
  this.h = 80;

  this.x = x;
  this.y = y;

  this.img = new Image();
  this.img.src = "./img/bullet.png";

  this.g = null;

  this.vx = 15;
  this.vy = 0;
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
};
