var ground, player, playerimg, playerP, P1, P2, coin, coinimg, platformGroup, invisp1, coinGroup, collectSound, goSound, wrongpGroup;
var score = 0;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var check = 1;

function preload(){
playerimg = loadImage("man.png");
coinimg = loadImage("coin.png");
bgi = loadImage("bgi.jpg");
collectSound = loadSound("collect.mp3");
goSound = loadSound("go.mp3");
}

function setup(){
var canvas = createCanvas(1000, 700); 

bg = createSprite(900, 350, 10, 10);
bg.addImage(bgi);
bg.scale = 10;

ground = createSprite(500, 690, 1000, 20);
ground.shapeColor = "red";

playerP = createSprite(100, 250, 100, 20);
playerP.shapeColor = "yellow";

player = createSprite(100, 205, 20, 70);
player.shapeColor = "lime";
player.addImage("running", playerimg);
player.scale = 0.3;

invisplatformGroup = new Group();
coinGroup = new Group();
wrongpGroup = new Group();

}

function draw(){
background(bgi);
if (gameState === PLAY) {
 
    bg.velocityX = -(5 + 3* score/2);
    if (bg.x < 130){
        bg.x = 500;
    }

if(keyDown("SPACE")){
    player.velocityY = - 12;
    playerP.destroy();
}
player.velocityY = player.velocityY + 1;
player.collide(playerP);
player.depth = player.depth + 1;
if(keyDown("RIGHT_ARROW")){
    player.x = player.x + 3;
}

if (invisplatformGroup.isTouching(player)) {
    player.velocityY = 0;
}

if (player.x > 1000) {
    player.x = 100;
}

if(coinGroup.isTouching(player)){
    coinGroup.destroyEach();
    score = score + 1;
    collectSound.play();
}

platform();
scoin();

if (player.isTouching(ground) || wrongpGroup.isTouching(player)){
    gameState = END;
}

drawSprites();
}

if (gameState === END){
    fill("gold");
    textSize(50);
    text("GAME OVER", 350, 350);
    if (check === 1){
    goSound.play();
    check = 0;
    }
}
fill("white");
textSize(30);
text("Score: " + score, 800, 50);
}

function platform(){
if(frameCount % 100 === 0){
    P1 = createSprite(1200, 150, 150, 20);
    P1.shapeColor = "blue";
    P1.velocityX = -(5 + 3* score/2);

    P2 = createSprite(1200, 550, 150, 20);
    P2.shapeColor = "orange";
    P2.velocityX = -(5 + 3* score/2);

    invisp1 = createSprite(1200, 140, 150, 10);
    invisp1.visible = false;    
    invisp1.velocityX = -(5 + 3* score/2);
    //invisp1.debug = true;
    
    invisp2 = createSprite(1200, 540, 150, 10);
    invisp2.visible = false;
    invisp2.velocityX = -(5 + 3* score/2);
    //invisp2.debug = true;

    var rand = Math.round(random(1,2));
    if(rand === 1){
        P1.y = 150;
        P2.y = 550;
    }
    else if (rand === 2){
        P1.y = 550;
        P2.y = 150;
    }
    //invisp1.x = P1.x;
    //invisp1.y = P1.y - 10;
    invisplatformGroup.add(invisp1);
    invisplatformGroup.add(invisp2);
    wrongpGroup.add(P2);
    //wrongpGroup.add(invisp2);
}
}

function scoin(){
    if(frameCount % 100 === 0){
        coin = createSprite(1200, 150, 50, 50);
        coin.addImage("gold", coinimg);
        coin.scale = 0.1;
        coin.velocityX = -(5 + 3* score/2);
        coin.x = P1.x;
        coin.y = P1.y - 40;
       
        //var rand = Math.round(random(1,2));
        //if(rand === 1){
        //    coin.y = 110;
        //}
        //else if (rand === 2){
        //    coin.y = 310;
        //}

        coinGroup.add(coin);
    }
}