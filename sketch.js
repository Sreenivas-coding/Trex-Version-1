var PLAY;
var END;
var gameState;
var trex, trexRunning
var ground, groundimg, invisibleGround
var cloudimg, ob1, ob2,ob3,ob4,ob5,ob6, gameoverimg, restartimg, trexcollided
var count, CloudsGroup, ObstaclesGroup
var jump,die,check
function preload(){
trexRunning=loadAnimation('trex1.png','trex3.png','trex4.png');
groundimg=loadImage('ground2.png');
cloudimg=loadImage('cloud.png');
ob1=loadImage('obstacle1.png');
ob2=loadImage('obstacle2.png');
ob3=loadImage('obstacle3.png');
ob4=loadImage('obstacle4.png');
ob5=loadImage('obstacle5.png');
ob6=loadImage('obstacle6.png');
gameoverimg=loadImage('gameOver.png');
restartimg=loadImage('restart.png');
trexcollided=loadImage('collided.png');
jump=loadSound('jump.mp3');
die=loadSound('die.mp3');
check=loadSound('checkPoint.mp3');
}

function setup() {
  createCanvas(600,200);
  trex= createSprite(50,175,10,40);
  trex.addAnimation("t1", trexRunning);
  trex.scale=0.5
  ground= createSprite(300,180,600,20);
  ground.addImage(groundimg);
  invisibleGround= createSprite(300,187,600,5);
  invisibleGround.visible=false;
  gameover=createSprite(300,80,10,10);
  gameover.addImage(gameoverimg);
  gameover.scale=0.6
  gameover.visible=false
  restart=createSprite(300,110,10,10);
  restart.addImage(restartimg);
  restart.visible=false
  restart.scale=0.5
  PLAY=1
  END=0
  gameState=PLAY
  count=0;
  CloudsGroup= createGroup();
  ObstaclesGroup= createGroup();
  trex.setCollider("circle",0,0,40);
}
  
function draw() {
  background(255,255,255);
  if(gameState===PLAY){
if(keyDown("space")&&trex.y>161){
  trex.velocityY=-12;   
  jump.play();
 } 
    spawnClouds();
    spawnObstacles();
    trex.velocityY=trex.velocityY+0.8;
    ground.velocityX = -6;
    //scoring
    count = count+Math.round(getFrameRate()/60);
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }

  if(ObstaclesGroup.isTouching(trex)){
     gameState=END
     die.play();
     trex.addImage(trexcollided);
     }
    if(count%100===0){
    check.play();
    }
  }
  
  
  else if(gameState===END){
  restart.visible=true
  gameover.visible=true
  ground.velocityX=0
  ObstaclesGroup.setVelocityXEach(0);
  CloudsGroup.setVelocityXEach(0);
  ObstaclesGroup.setLifetimeEach(-1);
  CloudsGroup.setLifetimeEach(-1);

  }
  if(mousePressedOver(restart)){
    reset();
  }
  console.log(trex.y);

  text("score: "+count, 480, 80);
 
 
  trex.collide(invisibleGround);
  drawSprites();
}
function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(600,120,40,10);
    cloud.y = Math.round(random(80,120))
    cloud.addImage(cloudimg);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 200;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //add each cloud to the group
    CloudsGroup.add(cloud);
  }
  
}
function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,165,10,40);
    obstacle.velocityX = -6;
    
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand){
      case 1: obstacle.addImage(ob1); break;
      case 2: obstacle.addImage(ob2); break;
      case 3: obstacle.addImage(ob3); break;
      case 4: obstacle.addImage(ob4); break;
      case 5: obstacle.addImage(ob5); break;
      case 6: obstacle.addImage(ob6); break; 
      default: break;
    }
  
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 200;
    //add each obstacle to the group
    ObstaclesGroup.add(obstacle);
  }
}
function reset(){
trex.addAnimation("t1", trexRunning);
gameState=PLAY
count=0
gameover.visible=false
restart.visible=false
ObstaclesGroup.destroyEach();
CloudsGroup.destroyEach();
}