function PlantOrganism(x,y,r,chlor){
  this.id=plants.length;
  this.x=x;
  this.y=y;
  this.r=r;
  this.xVel=0;
  this.yVel=0;
  this.chloroplasts=chlor
  plants.push(this);
}

var adultSizePlant = 8
var catabolismPlant = adultSizePlant/10;
var anabolismPlant = adultSizePlant/10;
var reproductiveSizePlant = adultSizePlant*1.5;
var deathSizePlant = adultSizePlant/2
var movementPlant = adultSizePlant/2

PlantOrganism.prototype.update = function () {
  this.environmentInteraction();
  this.move();
  this.addVelocity()
};

var timer = 0;
PlantOrganism.prototype.move = function () {
  timer++;
  if(timer == 2){
    timer=0;
    if(randomChoose(0,1) == 0){
      this.xVel = randomChoose(this.r,-this.r)
    } else this.yVel = randomChoose(this.r,-this.r)
  }
};

PlantOrganism.prototype.divide = function () {
  if(this.r>reproductiveSizePlant){
    this.die()
    this.inheritance();
  }
};

PlantOrganism.prototype.inheritance = function () {
  var child = {x:0,y:0,r:1,chlor:0.5}
  child.r=this.r/2
  child.x=this.x+child.r
  child.y=this.y
  child.chlor=this.chloroplasts+randomChoose(0.1,-0.1);
  var offspring1 = new PlantOrganism(child.x,child.y,child.r,child.chlor);
  child.x=this.x-child.r
  var offspring2 = new PlantOrganism(child.x,child.y,child.r,child.chlor);
}

PlantOrganism.prototype.die = function () {
  for (var i = 0; i < animals.length; i++) {
    if(animals[i].prey == this) animals[i].prey = null;
  }
  plants.splice(this.id,1);
  for(var i =0; i < plants.length; i++){
    plants[i].id = i;
  }
};

PlantOrganism.prototype.environmentInteraction = function () {
  var inAnEnvironment=false;
  for(var i = 0; i < environments.length; i++){
    if(collisionBetweenTwoCircles(this,environments[i])){
      environments[i].effect(this);
      inAnEnvironment=true;
    }
  }
  if(!inAnEnvironment) this.atrophy(anabolismPlant);
  // for(var i = 0; i < environments.length; i++){
  //   if(collisionBetweenTwoCircles(this,environments[i])){
  //     environments[i].effect(this);
  //   }
  // }
  // this.atrophy(anabolismPlant/2)
}

PlantOrganism.prototype.atrophy = function (energyExpended) {
  this.r-=energyExpended;
  if(this.r < deathSizePlant) this.die();
};

PlantOrganism.prototype.hypertrophy = function (size) {
  var coliding = false;
  for(var i = 0; i < plants.length; i++){
    if(futureCollisioNewRadius(this,this.r+size,plants[i]) && plants[i]!=this){
      coliding = true;
      break;
    }
  }
  if(!coliding){
    this.r+=size;
    this.divide();
  }
};

PlantOrganism.prototype.addVelocity = function () {
  var coliding = false;
  var colidingE = false;
  for(var i = 0; i < plants.length; i++){
    if(plants[i]!=this && futureCollisionBetweenTwoCircles(this,plants[i])){
      coliding = true;
      break;
    }
  }
  // for(var i = 0; i < environments.length; i++){
  //   if(futureCollisionBetweenTwoCircles(this,environments[i])){
  //     colidingE = true;
  //     break;
  //   }
  // }
  if(!coliding){
    this.atrophy((Math.abs(this.xVel+this.yVel))/(adultSizePlant*2));
    this.x+=this.xVel;
    this.y+=this.yVel;
    this.xVel=0;
    this.yVel=0;
  }
};

PlantOrganism.prototype.wind = function (a) {
  var distance=this.r*20;
  if(a==1){
    this.xVel+=distance;
  }else if(a==2){
    this.yVel+=distance;
  }else if(a==3){
    this.xVel-=distance;
  }else if(a==4){
    this.yVel-=distance;
  }
};

PlantOrganism.prototype.render = function () {
  c.beginPath();
  if(this.r<1) this.r = 1;
  c.arc(this.x,this.y,this.r, 0, 2 * Math.PI, false);
  c.fillStyle = "rgb("+((1-this.chloroplasts)*256)+",255,"+((1-this.chloroplasts)*251)+5+")";
  c.fill();
};
