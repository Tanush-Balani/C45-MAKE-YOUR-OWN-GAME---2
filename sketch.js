let ground;
let lander;
var lander_img;
var bg_img;
var astroidImg;
var astroidGroup;
var astroid;
var bullet;
var bulletGroup;
var line ;
var score = 0;


var vx = 0;
var g = 0.01;
var vy = 0;

function preload()
{
  lander_img = loadImage("normal.png");
  bg_img = loadImage("bg.png");
  astroidImg = loadImage("astroid1.png.png")
  BulletImg = loadImage("Bullet.png")
  GoldAstImg = loadImage("GoldAst.png")

}

function setup() {
  createCanvas(1500,690);
  frameRate(80);

  lander = createSprite(100,50,30,30);
  lander.addImage(lander_img);
  lander.scale = 0.1;
  line = createSprite(750,690,1500,5)

  astroidGroup = createGroup()
  bulletGroup = createGroup()

  rectMode(CENTER);
  textSize(15);
}

function draw() 
{
  background(51);
  image(bg_img,0,0, width, height);
  push()
  fill(255);
  text("Score: "+round(score),800,75);
  pop();

  if (keyDown("left")){
    lander.x = lander.x - 10;
    }

    if (keyDown("right")){
      lander.x = lander.x + 10;
      }

      if (keyDown("up")) {
        lander.y = lander.y - 6;
      }

      if (keyDown("down")) {
        lander.y = lander.y + 6;
      }

      if(keyWentDown("space")) {
        shootBullet();
      }

      if(keyWentUp("space")) {
        setTimeout(() => {  console.log('World!'); }, 2000);
      }
      


  //fall down
 // vy +=g;
  //lander.y+=vy;
  
  spawnObstacle();
  score1()
  gameOver()
  drawSprites();
}

function spawnObstacle(){
  if (frameCount % 125 === 0) {
    astroid = createSprite(Math.round(random(100, 1300)) ,20,20,20);
    astroid.velocityY = 4;
    astroid.addImage(astroidImg);
    astroidGroup.add(astroid)
    astroid.lifetime = 180;
    astroid.scale = 0.3;
    lander.depth = astroid.depth + 1;

    
}
}

function shootBullet(){
  bullet= createSprite( lander.x , lander.y , 50,20)
  bullet.addImage(BulletImg) 
  bullet.scale=0.12
  bullet.velocityY= -7
  bulletGroup.add(bullet)
  bullet.lifetime = 180;
  lander.depth = bullet.depth + 1;
}

function gameOver(){
if (astroidGroup.isTouching(line)) {
  textSize(50)
  fill("red")
  text("Game Over",700,245)
  bulletGroup.destroyEach()
  astroidGroup.destroyEach()
  lander.destroy()
  bulletGroup.setlifetimeEach(-1)
  astroidGroup.setlifetimeEach(-1)
}
}

function score1(){
    for (i=0; i<astroidGroup.length; i++){
      for (i=0; i<bulletGroup.length; i++) {
      if (bulletGroup[i].isTouching(astroidGroup[i])){
        score = score+1;
        astroidGroup[i].destroy()
        bulletGroup[i].destroy()
      }
    }
  }
}



