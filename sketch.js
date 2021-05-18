var towerImage,tower;
var doorImage,door,doorGroup;
var climberImage,climber,climberGroup;
var ghost,ghostImage;
var invisibleBlockGroup,invisibleBlock;
var gameState = "PLAY"

  function preload(){
    towerImage = loadImage("tower.png")
    doorImage = loadImage("door.png");
    climberImage = loadImage("climber.png");
    
    ghostImage = loadImage("ghost-standing.png");
  }

function setup(){
  createCanvas (600,600);
  tower  = createSprite(300,300);
  tower.addImage(towerImage);
  tower.velocityY = 1;
  doorGroup = new Group();
  climberGroup = new Group();
  invisibleBlockGroup =new Group();
  ghost = createSprite (200,200,50,50);
  ghost.scale = 0.3;
  ghost.addImage (ghostImage);
}


function draw(){
  background (0);
  if (gameState === "PLAY"){
    
  
  if(tower.y > 400){
    tower.y = 300;
  }
  if(keyDown(LEFT_ARROW)){
    ghost.x =ghost.x-3;
}
  if(keyDown(RIGHT_ARROW)){
    ghost.x = ghost.x+3;
  }
  if(keyDown("space")){
    ghost.velocityY = -5 ;
  }
  ghost.velocityY = ghost.velocityY+0.8;  
  if(climberGroup.isTouching(ghost)){
    ghost.velocityY = 0;
  }
  if(invisibleBlockGroup.isTouching(ghost)||ghost.y > 600){
    ghost.destroy();
    gameState = "END";
  }
  spawnDoor()
  drawSprites();
 }
  if (gameState === "END"){
    stroke ("yellow");
    fill ("yellow");
    textSize (30);
    text ("Game Over",230,250);
  }
}

function spawnDoor(){
  if(frameCount%240===0){
    var door = createSprite(200,-50)
    door.addImage (doorImage);
    var climber = createSprite (200,10);
    climber.addImage(climberImage);
    var invisibleBlock = createSprite(200,15);
    invisibleBlock.width = climber.width;
    invisibleBlock.height = 2;
    door.x = Math.round(random(120,400))
    door.velocityY = 1;
    climber.x = door.x;
    climber.velocityY = 1;
    invisibleBlock.x = door.x;
    invisibleBlock.velocityY = 1;
    ghost.depth = door.depth;
    ghost.depth+=1;
    door.liftime = 800;
    climber.lifetime = 800;
    climberGroup.add(climber);
    doorGroup.add(door);
    invisibleBlock.debug = true;
    invisibleBlockGroup.add(invisibleBlock);
  }
}
