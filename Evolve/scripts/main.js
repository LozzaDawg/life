var canvas = document.getElementById("canvas");
var c = canvas.getContext("2d");

canvas.width = 1000;
canvas.height = 640;

var plants = [];
var animals = [];
var environments = [];
var paused = false;
var time = 0;
var gX = [];
var gY = [];

function update(){
  controls();
  if(paused == false){
    
    //Graph stuff
    time++;
    gY.push(animals.length);
    gX.push(time);

    c.clearRect(0,0,canvas.width,canvas.height);
    c.fillStyle = "rgb(213, 211, 218)";
    c.fillRect(0,0,canvas.width,canvas.height);
    for(var i=0; i < environments.length;i++){
      environments[i].render();
    }
    for(var i=0; i < plants.length;i++){
      plants[i].render();
      plants[i].update();
    }
    for(var i=0; i < animals.length;i++){
      animals[i].render();
      animals[i].update();
    }
    renderUI();
    if(randomInt(0,100)==1) windEvent();
  }
}

//Functions
function randomInt(min,max){
    return Math.floor(Math.random()*(max-min+1)+min);
}
function randomChoose(op1,op2){
  if(randomInt(-100,100)>0){
    return op1
  }else return op2
}
function pause(){
  paused=true;
  console.log('Paused')
}
function resume(){
  paused=false;
  console.log('Resumed')
}

//Environments
var sun = new Environment(450,500,150,'rgba(255, 209, 15, 0.59)');
var shade = new Environment(200,500,100,'rgba(15, 133, 255, 0.59)');
sun.effect = function(organism){
  organism.hypertrophy(anabolismPlant*(1+(organism.chloroplasts)));
}
shade.effect = function(organism){
  organism.hypertrophy(anabolismPlant*(1+(1-organism.chloroplasts)));
}

//Cells
var plantCell = new PlantOrganism(250,500,adultSizePlant,0.5);
var animalCell = new AnimalOrganism(350,300,adultSizeAnimal,0.4,0.5);

//Events
function windEvent(){
  for(var i = 0; i < plants.length; i+=3){
    plants[i].wind(randomInt(1,4));
  }
}

this.setInterval(update,20);
