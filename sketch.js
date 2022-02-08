var balls = [];
var total = 100;
var paddle;
var score = 0;
var lives = 3;

var startCenterX;
var startCenterY;
var startButtonSize = 130;

/*
  0 = intro
  1 = play
  2 = end
*/
var state = 0;

function setup() {
  createCanvas(1000, 600);
  startCenterX = width/2 -5;
  startCenterY = 475;

  textFont ("Helvetica");
  textSize(50);
  textAlign(CENTER, CENTER);
}

function draw() {
  background(0);
  if (state == 0) {
    drawIntro();
  }  else if (state == 1) {  
    drawPlaying();
  } else if (state == 2) {
    drawEnd();
  }
}

function drawIntro() {
fill(255, 0, 0);
ellipse(startCenterX,startCenterY, startButtonSize, 130);

  fill(255);
  noStroke();
  text("WOULD YOU LIKE TO \nPLAY A GAME?", 0, 0, width, height -100);
  text("YES", 0, 450, width, 50);

}

function drawPlaying() {
  for (var i=0; i<balls.length; i++) {
    balls[i].update();
    balls[i].render();
}
paddle.update();
paddle.render();

if (lives == 0) {
  gameOver();
  }
  textSize(20);
  textAlign(LEFT);
  text("Score: " + score, 10, 10);
  text("Lives: " + lives, 10, 30);
}

function drawEnd() {
textSize(50);
textAlign(CENTER, CENTER);
fill(255, 0, 0);
ellipse(startCenterX, startCenterY, startButtonSize, startButtonSize);

fill(255);
noStroke();
text(score, 0, 300, width, 55);
text("WOULD YOU LIKE TO \nPLAY AGAIN?", 0, 50, width, 100);
text("YES", 0, 450, width, 50);
}

function gameOver() {
  state = 2;
}

function startGame() {
  lives = 3;
  score = 0;
  paddle = new Paddle();
  for (var i=0; i<total; i++) {
    balls[i] = new Ball(paddle);
  }
  state = 1;
}

function mousePressed() {
  if (state == 0 || state == 2) {
    var d = dist(mouseX, mouseY, startCenterX, startCenterY);
    if (d < startButtonSize/2) {
      startGame();
    }
  }
}

function keyPressed() {
  if (keyCode == LEFT_ARROW) {
    paddle.moveLeft();
  } else if (keyCode == RIGHT_ARROW) {
    paddle.moveRight();
  }
}
    
function Ball(paddle) {
  this.paddle = paddle;
  this.size = 20;
  this.speed = 5;
  
  this.init = function() {
   this.y = random(-height, -20);
   this.x = random(20, width-20);
   this.bad = (random(0, 100) < 5);
  }
  
  this.render = function() {
    if(this.bad) {
      fill(255, 0, 0);
    } else {
      fill(255);
    }
    noStroke();
    ellipse(this.x, this.y, this.size, this.size);
  }
  this.update=function () {
  this.y += this.speed;

  this.testPaddle();


  if (this.y - this.size > height) {
    this.init();
  }
}

this.testPaddle = function() { 
  var top = (this.y + this.size/2 > this.paddle.y);
  var bottom = (this.y - this.size/2 < this.paddle.y + this.paddle.height);
  var left = (this.x - this.size/2 > this.paddle.x);
  var right = (this.x + this.size/2 < this.paddle.x + this.paddle.width);

  if (top && bottom && left && right) {

    if (this.bad) {
      this.paddle.hit();
    } else {
       this.paddle.score();
    }
    this.init();
  }
}   
  
this.init();
}

function Paddle() {
   this.width = 50;
   this.height = 20;
   this.speed = 25;
   this.x = width/2 - this.width/2;
   this.y = height - 30;
   this.color = color(255);

   this.update = function() {

   }

   this.score = function() {
     this.color = color(0, 255, 0);
     score++;
     this.width += 5;
    }

  this.hit = function() {
    this.color = color(255, 0, 0);
    lives--;
    this.width -= 10;
   }
   
   this.render = function() {
     fill(this.color);
     rect(this.x, this.y, this.width, 20);
     this.color = (255); 
    
   }
   this.moveRight = function() {
     this.x += this.speed;
   }
   this.moveLeft = function() {
     this.x -= this.speed;
   }
  }
