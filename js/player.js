function Player(ctx) {
  this.ctx = ctx;

  this.w = this.ctx.canvas.width / 20;
  this.h = this.w * 1.5;

  this.x = this.w * 2;
  this.y0 = this.ctx.canvas.height * 0.95 - this.h;
  this.y = this.y0;

  this.vx = 0;
  this.vy = 0;
  this.v = 20;
  this.g = 1;

  this.img = new Image();
  this.img.src = "img/mario.png";
  this.img.frames = 3;
  this.img.frameIndex = 0;
  this.img.animateEvery = 10;

  this.drawCount = 0;

  this.bend = false;

  this.bullets = [];
}

Player.prototype.draw = function() {
  this.ctx.drawImage(
    this.img,
    this.img.frameIndex * this.img.width / this.img.frames,
    0,
    this.img.width / this.img.frames,
    this.img.height,
    this.x,
    this.y,
    this.w,
    this.h
  );

  this.bullets.forEach(function(b) {
    b.draw();
    b.move();
  });

  this.drawCount++;
};

Player.prototype.move = function() {


  this.y -= this.vy;
  if(this.isJumping()){
    this.vy -= this.g;
  } else {
    this.vy = 0;
  }

  if (this.drawCount % this.img.animateEvery === 0) {
    this.animate();
    this.drawCount = 0;
  } 
  
  this.x += this.vx
 
  if (this.x <= 0) {
    this.x = 0;
  }
  if (this.x + this.w >= this.ctx.canvas.width){
    this.x = this.ctx.canvas.width - this.w;
  }

  //if (this.x === 0) {
    //this.allowRight = true;
  //}
};

Player.prototype.animate = function() {
  if (this.isJumping()) return;
  
  this.img.frameIndex++;
  
  if (this.img.frameIndex >= this.img.frames) {
    this.img.frameIndex = 0;
  }
};

Player.prototype.jump = function() {
  if (!this.isJumping()){
    this.vy += this.v;
  }
};

Player.prototype.shoot = function() {
  this.bullets.push(new Bullet(this.ctx, this.x + this.w, this.y + this.h / 4))
};

Player.prototype.startBend   = function() {
  if (!this.bend) {
    this.h = this.h /2;
    this.y += this.h;
    this.y0 += this.h;
    this.bend = true;
  } 
};

Player.prototype.stopBend = function() {
  this.y -= this.h;
  this.y0 -= this.h;

  this.h = this.h * 2;

  this.bend = false;
};

Player.prototype.isJumping = function() {
  return this.y < this.y0;
};

Player.prototype.TOP = 38;
Player.prototype.DOWN = 40;
Player.prototype.LEFT = 37;
Player.prototype.RIGHT = 39;
Player.prototype.SHOOT = 32;

Player.prototype.onKeyDown = function(code) {
  switch(code) {
    case this.TOP:
      this.jump();
      break;
    case this.RIGHT:
      this.vx = 10;
      break;
    case this.LEFT:
      this.vx = -10;
      break;
    case this.DOWN:
      this.startBend();
      break;
    case this.SHOOT:
      this.shoot();
      break;
  }
};

Player.prototype.onKeyUp = function(code) {
  switch(code) {
    case this.RIGHT:
    case this.LEFT:
      this.vx = 0;
      break;
    case this.DOWN:
      this.stopBend();
  }
};
