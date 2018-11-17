function renderUI(){
  c.fillStyle="white";
  c.fillRect(10,10,110,50);
  c.fillStyle="black";
  c.fontStyle="20px Ariel";
  c.fillText("Plant Population: "+plants.length+"",20,25);
  c.fillText("Animal Population: "+animals.length+"",20,40);
}
