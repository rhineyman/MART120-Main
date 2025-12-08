function setup() {  
  createCanvas(800, 800);
  spawnNPC(500, 500, 75);
  spawnNPC(200, 200, 50);
  
}

var x1 = 150;
var y1 = 150;
var diameter1 = 75;

var x2 = 300;
var y2 = 300;
var diameter2 = 75;
var m1 = 0;
var m2 = 0;

function draw() {
  background(220);
  updateNPCs();
  player1();
  playerMove();
  circle(m1, m2, 30);
  drawGoal();
  drawGreenBorder(4);
}


function player1() {
  fill(24, 200, 29);
  circle(x1, y1, diameter1);
}


function npc(n) {
  fill(200, 24, 29);
  circle(n.x, n.y, n.diameter);
}


var npcs = [];

function spawnNPC(x, y, diameter) {
  
  var n = {
    x: x,
    y: y,
    diameter: diameter,
    vx: random(-1, 1),
    vy: random(-1, 1)
  };
  npcs.push(n);
  return n;
}

function updateNPCs() { 
  

  for (var i = 0; i < npcs.length; i++) {
    var n = npcs[i];

         
    n.x += n.vx;
    n.y += n.vy;

     
    var r = n.diameter / 2;
    if (n.x - r < 0) {
      n.x = r;
      n.vx *= -1;
    } else if (n.x + r > width) {
      n.x = width - r;
      n.vx *= -1;
    }
    if (n.y - r < 0) {
      n.y = r;
      n.vy *= -1;
    } else if (n.y + r > height) {
      n.y = height - r;
      n.vy *= -1;
    }

    
    npc(n);
  }
}

function playerMove() {
  if (keyIsDown(LEFT_ARROW)) {
    x1 -= 5;
  }
  if (keyIsDown(RIGHT_ARROW)) {
    x1 += 5;
  }
  if (keyIsDown(UP_ARROW)) {
    y1 -= 5;
  }
  if (keyIsDown(DOWN_ARROW)) {
    y1 += 5;
  }
}

function mousePressed() {
  m1 = mouseX;
  m2 = mouseY;
}


var goalW = 120;
var goalH = 60;
var goalX, goalY;


function drawGoal() {
  
  var margin = 20;
  goalX = width - goalW - margin;
  goalY = height - goalH - margin;

  
  fill(255);
  rect(goalX, goalY, goalW, goalH);
  fill(0);
  textSize(14);
  textAlign(CENTER, CENTER);
  text("Goal", goalX + goalW / 2, goalY + goalH / 2);

  
  var playerR = diameter1 / 2;
  if (circleRectCollision(x1, y1, playerR, goalX, goalY, goalW, goalH)) {
    
    fill(0);
    textSize(48);
    textAlign(CENTER, CENTER);
    text("You win", width / 2, height / 2);
  }
}

function circleRectCollision(cx, cy, r, rx, ry, rw, rh) {
 
  var closestX = constrain(cx, rx, rx + rw);
  var closestY = constrain(cy, ry, ry + rh);
  var dx = cx - closestX;
  var dy = cy - closestY;
  return (dx * dx + dy * dy) <= (r * r);
}


function drawGreenBorder(thickness) {
  if (typeof thickness === 'undefined') thickness = 4;
  push();
  noFill();
  stroke(0, 200, 0);
  strokeWeight(thickness);
 
  var half = thickness / 2;
  rect(half, half, width - thickness, height - thickness);
  pop();
}