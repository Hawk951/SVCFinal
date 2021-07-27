var bg1, bg2, bg3, bg4, prison, treasureFound; 
var key, keyImg, chest, chestImg, chestExplosionImg, map, button;
var boyRunning, boyJumping, boyAttack, boyDie, girlRunning, girlJumping, girlAttack, girlDie, zombie, blackGhost, ghost;   
var chooseGirl, chooseBoy, chooseGirl1, chooseBoy1, button1; 
var gameState = "choose"; 
var choose = null; 
var counter=1;
var score = "0"
var password, input, button, inputs, buttons, b;
function preload(){
    bg1 = loadImage("bg1.jpg");
    bg2 = loadImage("bg2.jpg");
    bg3 = loadImage("bg3.jpg");
    bg4 = loadImage("bg.png");
    map = loadImage("map.jpg");
    button = loadImage("button.png");
    button0 = loadImage("button0.png");
    gameOver = loadImage("gameOverBG.png")

    prison = loadImage("prison.jpg");
    treasureFound1 = loadImage("treasureFound.jpg");
    chooseBG = loadImage("chooseBG.png")
    directionsBG = loadImage("directionsBG.png")

    keyImg = loadAnimation("Key1.png", "Key2.png", "Key3.png", "Key4.png", "Key5.png", "Key6.png", "Key7.png", "Key8.png"); 
    chestImg = loadImage("chest.png"); 
    chestExplosionImg = loadAnimation("chestExplosion1.png", "chestExplosion2.png", "chestExplosion3.png"); 

    boyRunning = loadAnimation("ca/1.png","ca/2.png","ca/3.png","ca/4.png","ca/5.png","ca/6.png","ca/7.png","ca/8.png","ca/9.png","ca/10.png")
     boyJumping = loadAnimation("ca/1.png","ca/2.png","ca/3.png","ca/4.png","ca/5.png","ca/6.png","ca/7.png","ca/8.png","ca/9.png","ca/10.png");
    boyAttack = loadAnimation("ca/1.png","ca/2.png","ca/3.png","ca/4.png","ca/5.png","ca/6.png","ca/7.png","ca/8.png","ca/9.png","ca/10.png");
    boyDie = loadImage("ca/1.png");
    boy = loadImage("ca/1.png")

    girlRunning = loadAnimation("thor/1.png","thor/2.png","thor/3.png","thor/4.png","thor/5.png","thor/6.png","thor/7.png","thor/8.png")
    girlJumping = loadAnimation("thor/1.png","thor/2.png","thor/3.png","thor/4.png"); 
    girlAttack = loadAnimation("thor/1.png","thor/2.png","thor/3.png","thor/4.png");
    girlDie = loadImage("thor/4.png"); 
    girl = loadImage("thor/1.png");

    gem = loadImage("gem.png"); 
    coins = loadAnimation("coin1.png","coin2.png","coin3.png","coin4.png","coin5.png","coin6.png")
    ghost = loadImage("thanos2-0.png","thanos2-1.png","thanos2-2.png","thanos2-3.png","thanos2-4.png","thanos2-5.png","thanos2-6.png","thanos2-7.png","thanos2-8.png","thanos2-9.png","thanos2-10.png","thanos2-11.png","thanos2-12.png","thanos2-13.png");
    blackGhost = loadImage("pics/1.png"); 
    zombie = loadAnimation("pics/1.png","pics/2.png","pics/3.png","pics/4.png","pics/5.png","pics/6.png","pics/7.png","pics/8.png")
}
function setup(){
    createCanvas(800,400);
    
    chooseGirl1 = createSprite(100,320,50,50);
    chooseGirl1.addAnimation("0", girl);
    chooseGirl1.scale =.5; 

    chooseBoy1 = createSprite(250,330,50,50);
    chooseBoy1.addAnimation("1", boy);
    chooseBoy1.scale = .25; 

    chooseGirl1.visible=false;
    chooseBoy1.visible=false;

    button1 = createSprite(27,25,20,20);
    button1.addImage(button0);
    button1.scale = 2;
    button1.visible = false;
    button1.scale = 0.2;

    button2 = createSprite(710,380,20,20);
    button2.addImage(button);
    button2.scale = 2;
    button2.visible = false;
    button2.scale = 0.9;

    bg = createSprite (650,200,1700,400);
    bg.addImage("background", bg4);
    bg.x = bg.width /2;
    bg.scale = 2;
    bg.visible = false;

    player = createSprite(50,50,20,20);
    player.addAnimation("boyRunning", boyRunning);
    player.addAnimation("boyJumping", boyJumping);
    player.addAnimation("boyAttack", boyAttack);
    player.addAnimation("girlRunning", girlRunning);
    player.addAnimation("girlJumping", girlJumping);
    player.addAnimation("girlAttack", girlAttack);
    player.visible = false;
    player.scale=0.5

    //player.debug=true
    player.setCollider("circle",0,0,80)

    obstaclesGroup = new Group(); 
    advantagesGroup = new Group();
    coinsGroup = new Group();  
    keysGroup = new Group();  
    gemsGroup = new Group();  
    goodGhostsGroup = new Group(); 

     input = createInput("Password");
     input.position(500,150);
     password = input.value();
     button = createButton("Submit");
     button.position(560,175);
     button.hide();
     input.hide();
     inputs = createInput("Password");
     inputs.position(500,150);
     buttons = createButton("Submit");
     buttons.position(560,175);
     buttons.hide();
     inputs.hide();
     b = createButton("RESTART");
     b.position(380,355);
     b.hide();

}

function draw(){
    background(0);
    playerChoosing();
    map1(); 
    directions();
    play();
    end();
    drawSprites();
    almostThere(); 
    caught();
    textSize(35);
    fill(255);
    if(gameState === "play"){
        text("Score: $" + score, 600,50);
    }
    if(gameState === "almostThere"){
        fill(255);
        text(20);
        text("Type in the correct password to get the Treasure!", 5,50);
        textSize(15); 
        text("Hint: What is it that given one, you'll have either two or none?", 250, 100);
    }
    if(gameState === "treasureFound"){
        fill(255);
        text(20);
        text("You Won! Click the button to restart!", 100,50)
    }
}

function playerChoosing(){
    if(gameState === "choose"){
        background(chooseBG);
        fill(255);
        textSize(30);
        text("Choose your character:", 20,230); 
        chooseGirl1.visible=true;
        chooseBoy1.visible=true;
    }
    if(mousePressedOver(chooseGirl1)){
        gameState = "Map"
        player.changeAnimation("girlRunning",girlRunning);
        chooseGirl1.destroy();
        chooseBoy1.destroy();
        choose = "girl";
    }
    if(mousePressedOver(chooseBoy1)){
        gameState = "Map"
        player.changeAnimation("boyRunning",boyRunning);
        chooseGirl1.destroy();
        chooseBoy1.destroy();
        choose = "boy";
    }
}
function map1(){
    if(gameState === "Map"){
        background(map);
        button1.visible=true;
    }
    if(mousePressedOver(button1)){
        gameState = "directions"
        button1.destroy(); 
    }
}
function directions(){
    if(gameState === "directions"){
        background(directionsBG);
        button2.visible = true; 
    }
    if(mousePressedOver(button2)){
        gameState = "play"
        button2.destroy();  
    }
}
function play(){
    if(gameState === "play") {
        bg.visible = true;
        player.visible = true;
        player.scale = .5;
        player.x=70;
        player.y=315;
        bg.velocityX = -8
        if (bg.x < 0) {
            bg.x = bg.width/2;
        }
        if (keyDown("space")) {
            if(choose === "boy"){
            player.changeAnimation("boyJumping",boyJumping);
        } else  if(choose === "girl" ){
            player.changeAnimation("girlJumping",girlJumping);
        }
        player.y=player.y-150   
     } 
       player.y = player.y + 0.05
      if(keyDown("a")){
            if(choose === "boy"){
                player.changeAnimation("boyAttack",boyAttack);
            } else  
            if(choose === "girl"){
                player.changeAnimation("girlAttack", girlAttack);
            }
            obstaclesGroup.destroyEach(); 
            bg.velocityX = 0; 
        }  else{
            if(choose === "boy"){
                player.changeAnimation("boyRunning",boyRunning);
            } else  
            if(choose === "girl"){
                player.changeAnimation("girlRunning",girlRunning);
            }
        }
        spawnObstacles(); 
        spawnGems();
        spawnCoins();
        spawnKeys(); 
        if(obstaclesGroup.isTouching(player)){
            gameState = "caught";
            obstaclesGroup.destroyEach();
            coinsGroup.destroyEach();
            advantagesGroup.destroyEach();
            coinsGroup.destroyEach();
        }   
        if(keysGroup.isTouching(player)){
            gameState = "almostThere";
            obstaclesGroup.destroyEach();
            coinsGroup.destroyEach();
            advantagesGroup.destroyEach();
            coinsGroup.destroyEach();
        }  
        if(coinsGroup.isTouching(player)){
            coinsGroup.destroyEach();
            score++;
        }     
        if(gemsGroup.isTouching(player)){
            gemsGroup.destroyEach();
            score = score + 50;
        } 
    }  
}
function spawnObstacles() {
    if(frameCount % 160 === 0) {
      var obstacle = createSprite(width-20,height-80,10,40);
      obstacle.velocityX = -10;
      //obstacle.debug=true
      obstacle.setCollider("rectangle",0,0,40,70)
      //generate random obstacles
      var rand = Math.round(random(1,2));
      switch(rand) {
        case 1: obstacle.addAnimation("1", zombie);
                break;
        case 2: obstacle.addImage(blackGhost);
                break;
        default: break;
      }         
      obstacle.scale = 2;
      obstacle.lifetime = (width/obstacle.velocityX);
      obstaclesGroup.add(obstacle);
    }
  }
  function spawnGems(){
    if(frameCount % 500 === 0){
        var advantage = createSprite(width-20,height-80,10,40);
        advantage.velocityX = -10;
        advantage.addImage(gem);
        advantage.lifetime = (width/advantage.velocityX);
        gemsGroup.add(advantage);
    }
}

function spawnCoins(){
    if(frameCount % 150 === 0){
        var coin = createSprite(width-20,height-80,10,40);
        coin.addAnimation("0", coins);
        coin.velocityX = -10;
        coin.lifetime = (width/coin.velocityX);
        coinsGroup.add(coin);
    }
}
function caught(){
    if(gameState === "caught"){
     background(prison);
     fill(255);
     bg.visible = false;
     textSize(25);
     text("Type in the correct password in to escape!", 250,50);
     textSize(15);
     text("Hint: From my reflection, you will see your complexion.", 250, 100);
            input.show();
            button.show();
     /*var input = createInput("Password");
     input.position(500,150);*/
     password = input.value();
     /*var button = createButton("Submit");
     button.position(560,175);*/
     button.mousePressed(function(){
       if(input.value() === "mirror" || input.value() ==="MIRROR" ||input.value() === "Mirror" ){
       input.hide();
       button.hide();
       gameState = "play"; 
       } else {
       alert("Uh oh! That's the wrong password! You've been caught! GAME OVER!");
       gameState = "end";
       end(); 
    }
     }); 
    }
}
function almostThere(){
    if(gameState === "almostThere"){
     fill(255);
     textSize(25);
     bg.visible = false; 
     text("Type in the correct password in to get the Treasure!", 250,50);
     textSize(15); 
     text("Hint: What is it that given one, you'll have either two or none?", 250, 100);
   
     background(bg2);
     inputs.show();
     buttons.show();
     treasurePassword = inputs.value();
     buttons.mousePressed(function(){
       if(inputs.value() === "a choice" || inputs.value() ==="A CHOICE" ||inputs.value() === "A choice"){
       inputs.hide();
       buttons.hide();
       gameState = "treasureFound"; 
       } else {
        alert("Uh oh! That's the wrong password! You've been caught! GAME OVER!");
        gameState = "end";
        end();  
       }
     }); 
    }
    treasureFound();
}
function treasureFound(){
    if(gameState === "treasureFound"){
        counter = "end";
    background(treasureFound1); 
    b.show();
    b.mousePressed(function(){
        b.hide();
        gameState = "play";
        play(); 
    })
    }
}
function end(){
    if(gameState === "end"){
        bg.visible = false;
        player.visible = false;
        obstaclesGroup.destroyEach();
        advantagesGroup.destroyEach(); 
        background(gameOver);
        input.hide();
        button.hide();
        inputs.hide();
       buttons.hide();
    }
}
function spawnKeys(){
    var rand = Math.round(random(1000,10000))
    if(frameCount % rand === 0){
        var key = createSprite(width-20,height-80,10,40);
        key.addAnimation("0", keyImg);
        key.velocityX = -15;
        key.y = Math.round(random(150,350)); 
        key.lifetime = (width/key.velocityX);
        keysGroup.add(key)
    }
}