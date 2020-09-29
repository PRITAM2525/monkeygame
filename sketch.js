var PLAY =1;
var END =0;
var gameState=PLAY;
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score=0;
var survivalDuration
var ground;
function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  ObstacleImage = loadImage("obstacle.png");
 
}


function setup() {
  createCanvas(600, 200);

  
  monkey = createSprite(50, 100, 20, 50);
  monkey.addAnimation("moving", monkey_running);
  monkey.scale = 0.1;

  ground = createSprite(300, 180, 1500, 10);
  ground.velocityX=-4;
  

  //create Obstacle and food Groups
  obstaclesGroup = createGroup();
  FoodGroup = createGroup();

  // monkey.setCollider("circle", 0, 0, 40);
  // monkey.debug = true

}

function draw() {
  background("black");
  //displaying score
  text(" score:"+ score, 500, 50);
  console.log(monkey.y);

  if(gameState===PLAY){
    //move the ground
    if (ground.x < 0) {
      ground.x = ground.width / 2;
    }

    //jump when the space key is pressed
    if (keyDown("space")&& monkey.y>=144 ) {
      monkey.velocityY = -14;
    }

    //add gravity
    monkey.velocityY = monkey.velocityY + 0.8
  
     spawnFood();

    //spawn obstacles on the ground
    spawnObstacles();
    
  if(monkey.isTouching(FoodGroup)){
        score=score+1;
    FoodGroup.destroyEach();
  }
      
    
   if(obstaclesGroup.isTouching(monkey)){
    
        
  gameState=END;
    
   }
    }
    
    else if(gameState===END){
      ground.velocityX = 0;
        monkey.velocityY = 0;
        obstaclesGroup.setVelocityXEach(0);
        FoodGroup.setVelocityXEach(0);
        obstaclesGroup.setLifetimeEach(-1);
        FoodGroup.setLifetimeEach(-1);
      
      
    
  } 
  
 monkey.collide(ground);
  drawSprites();
}

function spawnObstacles() {
  if (frameCount % 300 === 0) {
    var obstacle = createSprite(600, 165, 10, 40);
    obstacle.velocityX = -2;

    //generate random obstacles
      obstacle.addImage(ObstacleImage);
     
    

    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.1;
    obstacle.lifetime = 300;

    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }

}

function spawnFood() {
  //write code here to spawn the FOOD
  if (frameCount % 60 === 0) {
    banana = createSprite(600, 100, 40, 10);
    banana.y = Math.round(random(10, 60));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -6;

    //assign lifetime to the variable
    banana.lifetime = 300;

   

    //adding banana to the group
    FoodGroup.add(banana);
  }
}