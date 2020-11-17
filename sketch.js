var PLAY=1
var END=0
var gameState=PLAY;

var ground;
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score

function preload(){
  monkey_running =  loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
}



function setup() {
  createCanvas(windowWidth,windowHeight);
  
  monkey = createSprite(100,height-70,20,20);
  monkey.addAnimation("run",monkey_running);
  monkey.scale=0.12;
  
  ground=createSprite(width/2,height-10,width,125);
  ground.x=ground.width/2;
  ground.velocityX=-4;
  
  obstacleGroup = createGroup();
  FoodGroup = createGroup();

  score=0;
  
  monkey.setCollider("circle",0,0,250);
  //monkey.debug = true
}


function draw() {
background("lightBlue");
  textSize(20);
  fill("BLACK");
text("score: "+score, 400,50);
  
if(gameState === PLAY){
    ground.velocityX = -4;
    score = score +1;
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
    if((touches.length>0||keyDown("space"))&& monkey.y >= 200) {
        monkey.velocityY = -12;
      touches=[];
    }
    
    monkey.velocityY = monkey.velocityY + 0.8
  
    Bananas();
    Obstacles();
  
  if(FoodGroup.isTouching(monkey)){
     monkey.scale=monkey.scale+0.01;
    FoodGroup.destroyEach();
  }
    
    if(obstacleGroup.isTouching(monkey)){
     monkey.scale=monkey.scale-0.02;
    }
  }
  
  monkey.collide(ground);
  
  if (ground.x < 600){
      ground.x = ground.width/2;
    }
  
drawSprites();
}

function Obstacles(){
 if (frameCount % 100 === 0){
   obstacle = createSprite(800,height-100,10,40);
   obstacle.velocityX =  -6;
   obstacle.addImage(obstacleImage);
   obstacle.scale=0.2;
   obstacleGroup.add(obstacle);
 }
 }
function Bananas(){
 if (frameCount % 100 === 0){
   banana = createSprite(800,490,10,40);
   banana.velocityX =  -8
   banana.y = Math.round(random(200,400));
   banana.addImage(bananaImage);
   banana.scale=0.15;
   FoodGroup.add(banana);
 }
 }