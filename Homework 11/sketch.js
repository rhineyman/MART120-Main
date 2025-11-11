var x = 50;
var y = 50;
var diameter = 25;

var x2 = 100;
var y2 = 100;
var diameter2 = 50;

var x3 = 150;
var y3 = 330;
var diameter3 = 75;

var finishX = 700;
var finishY = 700;
var finishW = 100;
var finishH = 20;

var won = false;

function setup() {
  createCanvas(800, 800);
}


function circleRectCollision(cx, cy, r, rx, ry, rw, rh) {

  var closestX = constrain(cx, rx, rx + rw);
  var closestY = constrain(cy, ry, ry + rh);

  
  var dx = cx - closestX;
  var dy = cy - closestY;

  return (dx * dx + dy * dy) <= (r * r);
}
function draw() {
  background(220);
  fill(24, 200, 29);
  circle(x, y, diameter);
if (x2 > 800) {
    x2= 50;
  }
  else if (x2> 200) {
    x2+= 5;
  }
  else if (x2<= 300) {
    x2+= 10;
  } 
 
if (y2> 300) {
    y2= 50;
  }
  else if (y2> 200) {
    y2 += 1;
    console.log("second else if for y");
  } 
  else if (y2 <= 300) {
    y2 += 3;
  }

 
  if (x3 > 800) {
    x3= 50;
  }
  else if (x3> 200) {
    x3+= 5;
  }
  else if (x3<= 300) {
    x3+= 10;
  } 

if (y3> 300) {
    y3= 50;
  }
  else if (y3> 200) {
    y3 += 1;
    console.log("second else if for y");
  } 
  else if (y3 <= 300) {
    y3 += 3;
  }

  var playerR = diameter / 2;
  if (!won && circleRectCollision(x, y, playerR, finishX, finishY, finishW, finishH)) {
    won = true;
  }

  if (won) {
    fill(0);
    textSize(45);
    textAlign(CENTER, CENTER);
    text("You Win!", width / 2, height / 2);
  }

if (keyIsDown(83)) 
      {
        y += 10;
      } 
      else if (keyIsDown(87)) 
      {
        y -= 10;
      }
        if (keyIsDown(65)) 
        {
          x -= 10;
        }
        else if (keyIsDown(68)) 
        {
          x += 10;
        }
fill(200, 24, 29);
  circle(x2, y2, diameter2);

  fill(29, 24, 200);
  circle(x3, y3, diameter3);

fill(255);
rect(finishX, finishY, finishW, finishH);

fill(0);
textSize(12);
text("Finish", 730, 715);
}


