//Dimenção da bolinha
let xball = 300;
let yball = 200;
let diameter = 18;
let raio = diameter / 2;
//velocidade da bolinha
let speedxball = 6;
let speedyball = 6;
//Dimenção da raquete
let xraquete = 5;
let yraquete = 150;
let wraquete = 10;
let hraquete = 90;
//Raquete Oponente
let xenemy = 585;
let yenemy = 150;
let yspeedenemy;

let chanceError = 0;

let hit = false;

//Point
let meuponto = 0;
let pontoenemy = 0;

//Sound
let soundRaquete;
let soundPoint;
let soundBackgraund;

function preload(){
  soundRaquete = loadSound("../sound/raquetada.mp3");
  soundPoint = loadSound("../sound/ponto.mp3");
  soundBackgraund = loadSound("../sound/trilha.mp3");
}
function setup() {
  createCanvas(600, 400);
  soundBackgraund.loop();
}
function draw() {
  background(0);
  makeball();
  moveball();
  hitboxball();
  makeraquete(xraquete,yraquete);
  moveraquete();
  hitboxraquete(xraquete,yraquete);
  makeraquete(xenemy,yenemy);
  moveenemy();
  hitboxraquete(xenemy,yenemy);
  placar();
  marcaplacar()
}
function makeball() {
  circle(xball, yball, 20);
}
function moveball() {
  xball += speedxball;
  yball += speedyball;
}
function hitboxball() {
  if (xball + raio > width || xball - raio < 0) {
    speedxball *= -1;
  }
  if (yball + raio > height || yball - raio < 0) {
    speedyball *= -1;
  }
}
function makeraquete(x,y) {
  rect(x, y, wraquete, hraquete);
}
function moveraquete() {
  if (keyIsDown(UP_ARROW)) {
      yraquete -= 10;
  }
  if (keyIsDown(DOWN_ARROW)) {
    yraquete += 10;
  }
}
function hitboxraquete(x,y) {
  hit = collideRectCircle(x,y,wraquete,yraquete,xball,yball,raio);
  if (hit) {
    speedxball *= -1;
    soundRaquete.play();
  }
}
function moveenemy(){
  yspeedenemy = yball - yenemy - hraquete / 2 -30
  yenemy += yspeedenemy + chanceError
  calChanceError()
  
}
function calChanceError(){
  if(pontoenemy >= meuponto){
    chanceError +=1
}
  if(chanceError >= 39){
  chanceError = 40
}else{
  chanceError -= 1
}
  if(chanceError <= 35){
    chanceError =35
  }
}
function placar(){
  stroke(255)
  textSize(18);
  textAlign(CENTER);
  fill(color('#EBB51F'));
  rect(150,10,40,20);
  fill(255);
  text(meuponto,170,26);
  fill(color('#EBB51F'))
  rect(450,10,40,20);
  fill(255);
  text(pontoenemy,470,26);
}
function marcaplacar(){
  if(xball > 590){
    meuponto += 1;
    soundPoint.play();
}
  if(xball < 10){
    pontoenemy += 1;
    soundPoint.play();
  }
}