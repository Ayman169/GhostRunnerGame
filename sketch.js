var tower,towerImg;
var door,doorImg,doorGroup;
var climber,climberImg,climberGroup;
var block,blockGroup;
var ghost,ghostImg;
var gamestate="play";

function preload(){
  towerImg=loadImage("tower.png");
  doorImg=loadImage("door.png");
  climberImg=loadImage("climber.png");
  ghostImg=loadImage("ghost-standing.png");
  
  
}
function setup(){
 createCanvas(600,600);
  tower=createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY=+1;
  
  ghost=createSprite(200,200,50,50);
  ghost.addImage("ghost",ghostImg);
  ghost.scale=0.5;
  
  doorGroup=new Group();
  climberGroup=new Group();
  blockGroup= new Group();
}
function draw(){
  background("black");
  if(gamestate==="play"){
    if(tower.y>400){
    tower.y=300;
  }
  if(keyDown("space")){
    ghost.velocityY=-10;
  }
  ghost.velocityY=ghost.velocityY+0.8;
  
  if(keyDown("right_arrow")){
    ghost.x=ghost.x+3;
  }
   if(keyDown("left_arrow")){
    ghost.x=ghost.x-3;
  }
  obstacles();
  if(climberGroup.isTouching(ghost)){
    ghost.velocityY=0;
  }
    if(blockGroup.isTouching(ghost)){
      ghost.destroy();
      gamestate="end";
    }
  drawSprites();
  }
  
  if(gamestate==="end"){
    textSize(30);
    fill("yellow");
    text("Game Over",230,250);
  }
  
}
function obstacles(){
  if(frameCount%240===0){
  door=createSprite(200,-50);
  door.addImage("door",doorImg);
  door.lifetime=800;
  door.velocityY=+1;
  door.x=Math.round(random(120,400));
  doorGroup.add(door);
    
  climber=createSprite(200,10);
  climber.velocityY=+1;
  climber.addImage("climber",climberImg);
  climber.lifetime=800;
  climber.x=door.x;
  climberGroup.add(climber);
    
  block=createSprite(200,15);
  block.lifetime=800
  block.velocityY=+1;
  block.x=door.x;
  block.width=climber.width;
  block.height=2;
  block.debug=true;
  blockGroup.add(block);
    
  ghost.depth=door.depth;
  ghost.depth=ghost.depth+1;
  }
}
