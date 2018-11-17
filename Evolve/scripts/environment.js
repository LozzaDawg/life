function Environment(x,y,r,color){
  this.x=x;
  this.y=y;
  this.r=r;
  this.xVel=0;
  this.yVel=0;
  this.color=color;
  environments.push(this);
}

Environment.prototype.render = function () {
  c.beginPath();
  c.arc(this.x,this.y,this.r, 0, 2 * Math.PI, false);
  c.fillStyle = this.color;
  c.fill();
};
