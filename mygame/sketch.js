const Engine = Matter.Engine
const World = Matter.World
const Bodies = Matter.Bodies
const Constraint = Matter.Constraint;

var engine,world;

var character1,charcter1img,character2img,character2;
var gamestate = 0;
var playercount = 0;
var bot1,bot1img,bot2img,bot2;
var ray1,ray1img,ray2,ray2img;
var backgound1img,background2img;
var killcount10,killcountimg10,killcount20,killcountimg20;
var killcount = 0;
function preload(){

character1img = loadImage("character1.jpg");
character2img = loadImage("character2.jpg");
bot1img = loadImage("bot1.jpg");
bot2img = loadImage("bot2.jpg");
ray1img = loadImage("ray1.jpg");
ray2img = loadImage("ray2.jpg");
killcountimg10 = loadImage("kill10.png");
killcountimg20 = loadImage("kill20.png");
botsGroup = new Group();
raysGroup = new Group();
}

function setup() {
  var canvas = createCanvas(displayWidth, displayHeight);
  engine = Engine.create();
  world = engine.world;
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();
  character1 = createSprite(displayWidth/2-30,displayHeight/2+30);
  character1.addImage("character1",character1img);

}

function draw(){
background("white");

character1.display();

spawnBots();
spawnRays();
}

async function getBackgroundImg(){
  var response = await fetch("http://worldtimeapi.org/api/timezone/Asia/Kolkata");
  var responseJSON = await response.json();

  var datetime = responseJSON.datetime;
  var hour = datetime.slice(11,13);
  
  if(hour>=06 && hour<=19){
      bg = "sprites/backgroung1.jpg";
  }
  else{
      bg = "sprites/background2.jpg";
  }

  backgroundImg = loadImage(bg);
  console.log(backgroundImg);
}
function spawnBots(){
if (frameCount % 20 === 0) {
  bots = createSprite(random(100, 1000), 0, 100, 100);
  bots.velocityY = 6;
  var rand = Math.round(random(1,2));
  switch(rand){
      case 1: bots.addImage("bot1",bot1img);
      break;
      case 2: bots.addImage("bot2", bot2img);
      break;
    }
  botsGroup.add(bots);
  bots.lifetime = 98;
  
  }
}

function spawnRays(){
if (frameCount % 20 === 0) {
  rays = createSprite(random(100, 1000), 0, 100, 100);
  rays.velocityY = 6;
  var rand = Math.round(random(1,2));
  switch(rand){
      case 1: rays.addImage("ray1", ray1img);
      break;
      case 2: rays.addImage("ray2", ray2img);
      break;
    }
  raysGroup.add(rays);
  rays.lifetime = 98;
  
  }
}  