function setup() {
  createCanvas(1000, 1000);
  movement = floor(random(1,11));
  eyeMovement = 2; // separate movement speed for eyes
}

var size = 22;
var sizedirection = 2;
var c = 75;
var x = 250;
var y = 100;
var diameter = 175;
var movement = 10;
var eyeMovement = 2;
var count = 0;

var noseOffsetX = 0;
var noseOffsetY = 0;
var noseVX = 2; 
var noseVY = 1.5; 
var noseBound = 20;


function draw() {
  background('red');
  fill('tan');
  circle(x,y,diameter);
  if (x >= 600 || x <= 0) {
    movement*=-1;
  }
  x += movement;


  // Eyes
  fill('white');
  
  var leftEyeX = x - 50;
  var rightEyeX = x + 50;
  circle(leftEyeX, c, 25);
  circle(rightEyeX, c, 25);
  if (c >= 100 || c <= 50) {
    eyeMovement *= -1;
  }
  c += eyeMovement;

// Pupils
  fill('black');
  circle(leftEyeX, c, 10);
  circle(rightEyeX, c, 10);

  //hair
    fill('brown');
    line(x - 75, 50, x + 75, 50);
    // Mouth
  fill('black');
  ellipse(x, 150, 100, 50);

  //nose
  fill('black');
  
  noseOffsetX += noseVX;
  noseOffsetY += noseVY;
  if (noseOffsetX > noseBound || noseOffsetX < -noseBound) noseVX *= -1;
  if (noseOffsetY > noseBound || noseOffsetY < -noseBound) noseVY *= -1;
  
  triangle(x - 10 + noseOffsetX, y - 0 + noseOffsetY, x + 10 + noseOffsetX, y - 0 + noseOffsetY, x + noseOffsetX, y + 25 + noseOffsetY);

  //body
  fill('green');
  rect(x - 75, 200, 150, 300, 20);

  //right arm
    fill('tan');
    rect(x - 125, 200, 50, 200, 20);

  //left arm
    fill('tan');
    rect(x + 75, 200, 50, 200, 20);

//right leg 
    fill('blue');
  rect(x - 50, 500, 50, 200, 20);
//left leg
    fill('blue');
  rect(x + 25, 500, 50, 200, 20);

    fill('black');
    textSize(size);
    
    size += sizedirection;
    if (size > 50 || size < 10) {
      sizedirection *= -1;
    }
    text("Mike Rhiney", x - 30, 500 );

}