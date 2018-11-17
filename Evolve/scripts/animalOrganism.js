function AnimalOrganism(x,y,r,asize,astart){
  this.id=animals.length;
  this.x=x;
  this.y=y;
  this.r=r;
  this.xVel=0;
  this.yVel=0;
  this.prey=null;
  this.acids={size:asize,start:astart};
  animals.push(this);
}

var adultSizeAnimal = 10
var catabolismAnimal = adultSizeAnimal/5;
var anabolismAnimal = adultSizeAnimal/5;
var reproductiveSizeAnimal = adultSizeAnimal*2;
var deathSizeAnimal = adultSizeAnimal/2
var movementAnimal = adultSizeAnimal/10

AnimalOrganism.prototype.update = function () {
  this.chase();
  this.addVelocity();
};

AnimalOrganism.prototype.move = function () {
  // this.maxSpeed();
  // this.xVel += randomInt(-movementAnimal,movementAnimal);
  // this.yVel += randomInt(-movementAnimal,movementAnimal);
  this.yVel -= 1;
};

AnimalOrganism.prototype.maxSpeed = function () {
  var maxMovement = movementAnimal*8;
  if(-maxMovement > this.xVel) this.xVel = -maxMovement
  if(-maxMovement > this.yVel) this.yVel = -maxMovement
  if(maxMovement < this.xVel) this.xVel = maxMovement
  if(maxMovement < this.yVel) this.yVel = maxMovement
};

AnimalOrganism.prototype.chase = function () {
  if(this.prey == null){
    for (var i = 0; i < plants.length; i++) {
      var alreadyPrey = false;
      for (var j = 0; j < animals.length; j++) {
        if(animals[j].prey == plants[i]) alreadyPrey=true;
      }
      if(alreadyPrey) continue;
      if((this.acids.start+(this.acids.size/2)) < plants[i].chloroplasts < (this.acids.start-(this.acids.size/2))){
        this.prey = plants[i];
        break;
      }
    }
    this.move()
    return
  }
  if(this.prey.x > this.x){
    this.xVel += movementAnimal;
  } else this.xVel += -movementAnimal;
  if(this.prey.y > this.y){
    this.yVel += movementAnimal;
  } else this.yVel += -movementAnimal;
  this.preyInteraction();
};

AnimalOrganism.prototype.divide = function () {
  if(this.r>reproductiveSizeAnimal){
    this.die();
    this.inheritance();
  }
};

AnimalOrganism.prototype.inheritance = function () {
  var child = {x:0,y:0,r:1,asize:1,astart:0}
  child.r=adultSizeAnimal;
  child.x=this.x+child.r;
  child.y=this.y;
  child.asize=this.acids.size+randomChoose(0.1,-0.1);
  child.astart=0.5//this.acids.start+randomChoose(0.05,-0.05);
  var offspring1 = new AnimalOrganism(child.x,child.y,child.r,child.astart,child.asize);
  child.x=this.x-child.r;
  var offspring2 = new AnimalOrganism(child.x,child.y,child.r,child.astart,child.asize);
}

AnimalOrganism.prototype.die = function () {
  animals.splice(this.id,1);
  for(var i =0; i < animals.length; i++){
    animals[i].id = i;
  }
};

AnimalOrganism.prototype.preyInteraction = function () {
  if(collisionBetweenTwoCircles(this,this.prey)){
    this.hypertrophy(this.prey.r/2)
    this.prey.die();
  }
}

AnimalOrganism.prototype.hypertrophy = function (energyConsumed) {
  this.r+=energyConsumed;
  this.divide();
};

AnimalOrganism.prototype.atrophy = function (energyExpended) {
  this.r-=energyExpended;
  if(this.r < deathSizeAnimal) this.die();
};

AnimalOrganism.prototype.addVelocity = function () {
  this.maxSpeed();
  this.atrophy((Math.abs(this.xVel+this.yVel))/(this.r*20));
  this.x+=this.xVel;
  this.y+=this.yVel;
};

AnimalOrganism.prototype.separate = function () {
  var distance=this.r*1.3;
  for(var i = 0; i < animals.length; i++){
    if(collisionBetweenTwoCircles(this,animals[i])){
      if(animals[i]==this) continue
      if(randomInt(-100,100)>0){
        if(randomInt(-100,100)>0){
          this.x+=distance;
        }else this.x-=distance;
      }else{
        if(randomInt(-100,100)>0){
          this.y+=distance;
        }else this.y-=distance;
      }
    }
  }
};

AnimalOrganism.prototype.render = function () {
  c.beginPath();
  // c.arc(this.x,this.y,this.r, 0, 2 * Math.PI, false);
  // c.fillStyle = "rgb("+(this.acids.start*256)+","+(this.acids.start*256)+","+(this.acids.size*251)+5+")";
  c.arc(this.x,this.y,this.r, 0, 2*Math.PI, false);
  c.fillStyle = "rgb(0,0,"+(this.acids.size*255)+")";
  c.fill();

  // c.beginPath();
  // c.arc(this.x,this.y,this.r, 0, Math.PI, false);
  // c.fillStyle = "rgb("+(this.acids.size*255)+",0,0)";
  // c.fill();
};
