var PLAY = 1;
var END = 0;
gameState = PLAY; // initialize state to play
var score;
var monkey , monkey_running
var monkeyAnimaton;
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score

function preload() {
  
  
  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(600, 400);
  
  monkey = createSprite(80, 315, 20, 20  );
  monkeyAnimaton = monkey.addAnimation("running", monkey_running);
  //monkey.
  monkey.scale = 0.1;
  
  ground = createSprite(400, 350, 900, 10);
  ground.velocityX = -4;
  ground.x = ground.width/2;
  console.log(ground.x);
  
  obstacleGroup = new Group();
  FoodGroup = new Group();
  
  score = 0;
}


function draw() {
  background(250);
  
  //monkey.setCollider("rectangle", 0, 0, monkey.width, monkey.height);
  monkey.debug = true;
  obstacleGroup.debug = true;
  
  if (gameState === PLAY) {
    score=Math.ceil(frameCount/frameRate());
     
    if (keyDown("space") && monkey.y >= 240) {
      monkey.velocityY = -13;
    }
  
    monkey.velocityY = monkey.velocityY + 0.8;
  
    spawnObstacles();
    spawnfood();
    checkForCollision();
  }
  if (gameState === END) {
    //set lifetime of the game objects so that they are never destroyed
    obstacleGroup.setLifetimeEach(-1);
    FoodGroup.setLifetimeEach(-1);
     
    obstacleGroup.setVelocityXEach(0);
    FoodGroup.setVelocityXEach(0);
    monkeyAnimaton.stop();
    
    monkey.velocityY = 0;
  }
  
  stroke("black");
  textSize(14);
  text("Survival Time: " + score, 400, 50, 200, 20);
  fill("black");

  ground.x = ground.width/2;
  
  monkey.collide(ground);
  
  drawSprites();
}

function spawnObstacles() {
  if (frameCount % 300 === 0) {
   var obstacle = createSprite(600, 320, 10, 40);
   obstacle.velocityX = -6;
   obstacle.addImage(obstacleImage);
   
    //assign scale and lifetime to the obstacle           
    obstacle.scale = random(0.12, 0.20) ;
    obstacle.lifetime = 300;
   
    // add each obstacle to the group
    obstacleGroup.add(obstacle);
  }
}

function spawnfood() {
  //write code here to spawn the clouds
  if (frameCount % 80 === 0) {
    var food = createSprite(600, 200, 40, 10);
    food.y = Math.round(random(120, 200));
    food.addImage(bananaImage);
    food.scale = 0.1;
    food.velocityX = -6;
    
     //assign lifetime to the variable
    food.lifetime = 200;
    
    //adjust the depth
    
    //add each cloud to the group
    FoodGroup.add(food);
  }
}

function checkForCollision() {
  if (monkey.isTouching(obstacleGroup)) {
    obstacleGroup.destroyEach();
    FoodGroup.destroyEach();
    gameState = END;
  }
}



