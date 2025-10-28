function setup() {
  createCanvas(1000, 1000);
}

function draw() {
  background('red');
  fill('tan');
  circle(250, 100, 175);

  // Eyes
  fill('white');
  circle(200, 75, 25);
  circle(300, 75, 25);

// Pupils
  fill('black');
  circle(200, 75, 10);
  circle(300, 75, 10);

  //hair
    fill('brown');
    line(175, 50, 325, 50);
    // Mouth
  fill('black');
  ellipse(250, 150, 100, 50);

  //nose
  fill('black');
  triangle(240, 100, 260, 100, 250, 125);

  //body
  fill('green');
  rect(175, 200, 150, 300, 20);

  //right arm
    fill('tan');
    rect(125, 200, 50, 200, 20);

  //left arm
    fill('tan');
    rect(325, 200, 50, 200, 20);

//right leg 
    fill('blue');
    rect(200, 500, 50, 200, 20);
//left leg
    fill('blue');
    rect(275, 500, 50, 200, 20);

    fill('black');
    textSize(22);
    text("Mike Rhiney",270,500 );

}