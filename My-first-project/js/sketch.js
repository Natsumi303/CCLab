let circleX = 100;
let circleY = 200;
let speedX = 5;
let speedY = 3;
let lefteyeX, lefteyeY;
let righteyeX, righteyeY;
let mouthX, mouthY;

let circleColor = "#FFD75F";
let changeColorTime = 0;
let changeColorInterval = 10000;
let dragging = false;
let burgerX;
let burgerY;
let burgerIsVisible = false;

let isRotatedPillow = false;
let isRotatedMirror = false;
let isRotatedGrey = false;
let isRotatedYellow = false;
let isRotatedBlue = false;
let isRotatedClock = false;

let pillowIsClicked = false;
let mirrorIsClicked = false;
let greyIsClicked = false;
let yellowIsClicked = false;
let blueIsClicked = false;
let clockIsClicked = false;

let angleInDegree1 = -45;
let angleInDegree2 = -20;

function setup() {
    let cnv = createCanvas(800,500);
    cnv.parent("p5-canvas-container");
  burgerX = width / 2;
  burgerY = height - 50;

  eyesAndMouthPositions();
}

function draw() {
  background(209, 222, 230);

  if (millis() - changeColorTime > changeColorInterval) {
    changeColor();
  }

  //room wall
  fill(221, 232, 238);
  stroke(0);
  strokeWeight(1);
  rect(100, 100, 600, 300);
  line(0, 0, 100, 100);
  line(800, 0, 700, 100);
  line(0, 500, 100, 400);
  line(800, 500, 700, 400);

  //table
  beginShape();
  noStroke();
  fill(180, 149, 121);
  vertex(260, 300);
  vertex(140, 300);
  vertex(120, 360);
  vertex(280, 360);

  endShape(CLOSE);

  //table legs
  stroke(180, 149, 121);
  strokeWeight(6);
  line(125, 360, 125, 450);
  line(275, 360, 275, 450);
  line(140, 310, 140, 420);
  line(260, 310, 260, 420);

  //Blue rectangle on the wall
  drawBlueRectangle();

  //Mirror on the wall
  drawMirror();

  //Grey book on the table
  drawGreyRectangle();

  //Yellow book on the table
  drawYellowRectangle();

  //Bed and pillow
  drawBedPillow();

  //Clock on the wall
  drawClock();

  //Update fizzy speed
  fizzySpeed();

  fill(54, 70, 135);
  textSize(18);
  text("1) Click objects to straighten them up.", 90, 40);
  text("2) Press 'b' to feed Fizzy with a burger", 400, 70);

  //Fizzy body
  stroke(0);
  strokeWeight(1);
  fill(circleColor);
  circle(circleX, circleY, 100);

  //Fizzy eyes and mouth
  eyesAndMouth();

  if (burgerIsVisible) {
    drawBurger();
  }
}

//Color changing and speed changing
function changeColor() {
  if (circleColor === "#FFD75F") {
    circleColor = "rgb(224,90,90)";
    speedX = 6;
    speedY = 4;
  } else {
    circleColor = "#FFD75F";
    speedX = 5;
    speedY = 3;
  }
  changeColorTime = millis();
}

function fizzySpeed() {
    console.log(circleX,'x')
    console.log(speedX,'xs')
    console.log(circleY,'y')
    console.log(speedY,'ys')


  //Bounce walls
  if (circleX > 720) {
    speedX = -speedX;
  } else if (circleX < 100) {
    speedX = -speedX;
  }
  if (circleY > 380) {
    speedY = -speedY;
  } else if (circleY < 100) {
    speedY = -speedY;
  }
  circleX = circleX + speedX;
  circleY = circleY + speedY;
  eyesAndMouthPositions();
}


function eyesAndMouthPositions() {
  lefteyeX = circleX - 20;
  lefteyeY = circleY - 10;
  righteyeX = circleX + 20;
  righteyeY = circleY - 10;
  mouthX = circleX;
  mouthY = circleY + 10;
}

function eyesAndMouth() {
  //Eyes
  fill(0);
  circle(lefteyeX, lefteyeY, 15);
  circle(righteyeX, righteyeY, 15);

  // Mouth
  arc(mouthX, mouthY, 50, 50, 0, PI);
}

// Click items to straighten them up
function mousePressed() {
  if (mouseX > 255 && mouseX < 325 && mouseY > 155 && mouseY < 245) {
    mirrorIsClicked = true;
    isRotatedMirror = false;
  }
  if (mouseX > 570 && mouseX < 630 && mouseY > 280 && mouseY < 325) {
    pillowIsClicked = true;
    isRotatedPillow = false;
  }
  if (mouseX > 210 && mouseX < 260 && mouseY > 290 && mouseY < 325) {
    yellowIsClicked = true;
    isRotatedYellow = false;
  }
  if (mouseX > 145 && mouseX < 195 && mouseY > 270 && mouseY < 330) {
    greyIsClicked = true;
    isRotatedGrey = false;
  }
  if (mouseX > 140 && mouseX < 210 && mouseY > 120 && mouseY < 210) {
    blueIsClicked = true;
    isRotatedBlue = false;
  }

  if (mouseX > 450 && mouseX < 530 && mouseY > 80 && mouseY < 240) {
    clockIsClicked = true;
    isRotatedClock = false;
  }

  //Dragging burger
  if (
    burgerIsVisible &&
    mouseX > burgerX - 60 &&
    mouseX < burgerX + 60 &&
    mouseY > burgerY - 50 &&
    mouseY < burgerY + 20
  ) {
    dragging = true;
  }
}

function drawMirror() {
  let angle1 = radians(angleInDegree1);

  push();
  translate(290, 200);

  let mirrorIsHit =
    circleX <= 370 && circleX >= 210 && circleY >= 120 && circleY <= 280;

  if (
    !mirrorIsClicked &&
    mirrorIsHit &&
    circleColor === "rgb(224,90,90)" &&
    !isRotatedMirror
  ) {
    rotate(angle1);
    isRotatedMirror = true;
  } else if (
    !mirrorIsClicked &&
    mirrorIsHit &&
    circleColor === "#FFD75F" &&
    isRotatedMirror
  ) {
    rotate(0);
    isRotatedMirror = false;
  } else if (isRotatedMirror) {
    rotate(angle1);
  }
  if (mirrorIsClicked) {
    rotate(0);
  }

  stroke(150);
  strokeWeight(3);
  fill(200);
  ellipse(0, 0, 80, 100);

  // Mirror surface
  noStroke();
  fill("white");
  ellipse(0, 0, 70, 90);

  pop();

  mirrorIsClicked = false;
}

function drawBlueRectangle() {
  let angle1 = radians(angleInDegree1);

  push();
  translate(140, 120);

  let blueIsHit =
    circleX >= 130 && circleX <= 220 && circleY >= 110 && circleY <= 210;

  if (
    !blueIsClicked &&
    blueIsHit &&
    circleColor === "rgb(224,90,90)" &&
    !isRotatedBlue
  ) {
    rotate(-angle1);
    isRotatedBlue = true;
  } else if (
    !blueIsClicked &&
    blueIsHit &&
    circleColor === "#FFD75F" &&
    isRotatedBlue
  ) {
    rotate(0);
    isRotatedBlue = false;
  } else if (isRotatedBlue) {
    rotate(-angle1);
  }
  if (blueIsClicked) {
    rotate(0);
  }

  stroke(0);
  strokeWeight(1);
  fill("#009688");
  rect(0, 0, 70, 80);

  // Frame for the rectangle
  stroke(50);
  strokeWeight(2);
  fill(0, 110, 128);
  rect(-5, -5, 80, 90); // Frame

  // Blue rectangle
  stroke(0);
  strokeWeight(1);
  fill("#009688");
  rect(0, 0, 70, 80);

  textSize(65);
  text("👸", 2, 60);

  pop();

  blueIsClicked = false;
}

// Grey rectangle
function drawGreyRectangle() {
  let angle2 = radians(angleInDegree2);
  push();
  translate(145, 270);

  let greyIsHit =
    circleX <= 200 && circleX >= 140 && circleY >= 260 && circleY <= 330;

  if (
    !greyIsClicked &&
    greyIsHit &&
    circleColor === "rgb(224,90,90)" &&
    !isRotatedGrey
  ) {
    rotate(-angle2);
    isRotatedGrey = true;
  } else if (
    !greyIsClicked &&
    greyIsHit &&
    circleColor === "#FFD75F" &&
    isRotatedGrey
  ) {
    rotate(0);
    isRotatedGrey = false;
  } else if (isRotatedGrey) {
    rotate(-angle2);
  }
  if (greyIsClicked) {
    rotate(0);
  }

  stroke(0);
  strokeWeight(1);
  fill("#9E9E9E");
  rect(0, 0, 50, 60);

  stroke(80, 80, 80);
  strokeWeight(4);
  line(0, 0, 0, 60);

  textSize(40);
  text("🎼", 5, 45);

  pop();

  greyIsClicked = false;
}

function drawYellowRectangle() {
  let angle2 = radians(angleInDegree2);
  push();
  translate(215, 290);

  let yellowIsHit =
    circleX <= 260 && circleX >= 210 && circleY >= 280 && circleY <= 350;

  if (
    !yellowIsClicked &&
    yellowIsHit &&
    circleColor === "rgb(224,90,90)" &&
    !isRotatedYellow
  ) {
    rotate(angle2);
    isRotatedYellow = true;
  } else if (
    !yellowIsClicked &&
    yellowIsHit &&
    circleColor === "#FFD75F" &&
    isRotatedYellow
  ) {
    rotate(0);
    isRotatedYellow = false;
  } else if (isRotatedYellow) {
    rotate(angle2);
  }
  if (yellowIsClicked) {
    rotate(0);
  }
  stroke(0);
  strokeWeight(1);
  fill("#FFC107");
  rect(0, 0, 40, 50);

  stroke(150, 100, 20);
  strokeWeight(4);
  line(0, 0, 0, 50);

  textSize(30);
  text("🎨", 5, 35);

  pop();

  yellowIsClicked = false;
}

function drawBedPillow() {
  let angle2 = radians(angleInDegree2);
  stroke(0);
  strokeWeight(1);
  fill("rgb(247,234,236)");
  rect(550, 250, 100, 60);

  beginShape();
  stroke(0);
  strokeWeight(1);
  fill("rgb(233,195,201)");
  vertex(650, 310);
  vertex(550, 310);
  vertex(520, 430);
  vertex(680, 430);

  endShape(CLOSE);

  rect(540, 430, 20, 40);
  rect(640, 430, 20, 40);

  //pillow
  push();
  translate(570, 280);

  let pillowIsHit =
    circleX <= 640 && circleX >= 560 && circleY >= 270 && circleY <= 340;

  if (
    !pillowIsClicked &&
    pillowIsHit &&
    circleColor === "rgb(224,90,90)" &&
    !isRotatedPillow
  ) {
    rotate(angle2);
    isRotatedPillow = true;
  } else if (
    !pillowIsClicked &&
    pillowIsHit &&
    circleColor === "#FFD75F" &&
    isRotatedPillow
  ) {
    rotate(0);
    isRotatedPillow = false;
  } else if (isRotatedPillow) {
    rotate(angle2);
  }
  if (pillowIsClicked) {
    rotate(0);
  }

  stroke(50);
  strokeWeight(2);
  fill(255);
  rect(-5, -5, 70, 55, 10);

  stroke(0);
  strokeWeight(1);
  fill("white");
  rect(0, 0, 60, 45, 10);

  pop();

  pillowIsClicked = false;
}

function drawClock() {
  let angle1 = radians(angleInDegree1);

  push();
  translate(450, 160);

  let clockIsHit =
    circleX <= 530 && circleX >= 150 && circleY >= 80 && circleY <= 240;

  if (
    !clockIsClicked &&
    clockIsHit &&
    circleColor === "rgb(224,90,90)" &&
    !isRotatedClock
  ) {
    rotate(angle1);
    isRotatedClock = true;
  } else if (
    !clockIsClicked &&
    clockIsHit &&
    circleColor === "#FFD75F" &&
    isRotatedClock
  ) {
    rotate(0);
    isRotatedClock = false;
  } else if (isRotatedClock) {
    rotate(angle1);
  }
  if (clockIsClicked) {
    rotate(0);
  }

  stroke(0);
  fill(255);
  ellipse(0, 0, 80, 80);

  // Clock hands
  strokeWeight(2);
  line(0, 0, 25, 0);
  strokeWeight(1);
  line(0, 0, 0, -30);

  pop();

  clockIsClicked = false;
}

//Burger and dragging
function drawBurger() {
  push();
  translate(burgerX, burgerY);

  // Bottom bun
  fill(210, 180, 140);
  ellipse(0, 10, 100, 40);

  // Top bun
  fill(210, 180, 140);
  ellipse(0, -40, 100, 50);

  // Patty
  fill(101, 67, 33);
  rect(-50, -10, 100, 20);

  // Cheese
  fill(255, 223, 0);
  rect(-45, -20, 90, 10);

  // Lettuce
  fill(50, 205, 50);
  rect(-48, -30, 97, 15);

  pop();
}

function keyPressed() {
  if (key === "b") {
    burgerIsVisible = true;
    burgerX = width / 2;
    burgerY = height - 50;
  }
}

function mouseDragged() {
  if (dragging) {
    burgerX = mouseX;
    burgerY = mouseY;

    if (
      burgerX > circleX - 100 / 2 &&
      burgerX < circleX + 100 / 2 &&
      burgerY > circleY - 100 / 2 &&
      burgerY < circleY + 100 / 2
    ) {
      circleColor = "#FFD75F";
      burgerIsVisible = false;
      changeColorTime = millis();
      speedX = 5;
      speedY = 3;
    }
  }
}