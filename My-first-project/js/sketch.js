
let circleX = 100;
let circleY = 200;
let speedX = 4;
let speedY = 2;
let lefteyeX = 80;
let lefteyeY = 190;
let lefteyeSpeedX = 4;
let lefteyeSpeedY = 2;
let righteyeX = 120;
let righteyeY = 190;
let righteyeSpeedX = 4;
let righteyeSpeedY = 2;
let mouthX = 100;
let mouthY = 210;
let mouthSpeedX = 4;
let mouthSpeedY = 2;
let circleColor = "#FFD75F";


let isRotatedPillow = false;
let isRotatedMirror = false;
let isRotatedGrey = false;
let isRotatedYellow = false; 
let isRotatedBlue = false; 

let angleInDegree1 = -45;
let angleInDegree2 = -20;

function setup() {
  let cnv = createCanvas(800, 500);
  cnv.parent("p5-canvas-container");
}

function draw() {
  background(209, 222, 230);
  
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
  
  
  //white circle on the wall
  let angle1 = radians(angleInDegree1);
  
    push();
  translate(290, 200);
  
  if(circleX <= 370 && circleX >= 210 && circleY >= 120 && circleY <= 280){
    isRotatedMirror = true; 
  }

  if (isRotatedMirror) {
    rotate(angle1); 
  }
  stroke(0);
  strokeWeight(1);
  fill("white");
  ellipse(0, 0, 70, 90);

  pop(); 
  
  
  //Blue rectangle on the wall
  push();
  translate(140, 120);
  
  if(circleX <= 220 && circleX >= 130 && circleY >= 110 && circleY <= 210){
    isRotatedBlue = true; 
  }

  if (isRotatedBlue) {
    rotate(-angle1); 
  }
  stroke(0);
  strokeWeight(1);
  fill("#009688");
  rect(0, 0, 70, 80); 

  pop(); 
  
  
  
  
  let angle2 = radians(angleInDegree2);

  //grey rectangle on the table
  push();
  translate(145, 270);
  
  if(circleX <= 200 && circleX >= 140 && circleY >= 260 && circleY <= 330){
    isRotatedGrey = true; 
  }

  if (isRotatedGrey) {
    rotate(-angle2); 
  }
  stroke(0);
  strokeWeight(1);
  fill("#9E9E9E");
  rect(0, 0, 50, 60); 

  pop(); 
  
  
  //yellow rectangle on the table
  push();
  translate(215, 290);
  
  if(circleX <= 260 && circleX >= 210 && circleY >= 280 && circleY <= 350){
    isRotatedYellow = true; 
  }

  if (isRotatedYellow) {
    rotate(angle2); 
  }
  stroke(0);
  strokeWeight(1);
  fill("#FFC107");
  rect(0, 0, 40, 50); 

  pop(); 
  
  
  //the bed 
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
  
  if(circleX <= 640 && circleX >= 560 && circleY >= 270 && circleY <= 340){
    isRotatedPillow = true; 
  }
  

  if (isRotatedPillow) {
    rotate(angle2); 
  }
  stroke(0);
  strokeWeight(1);
  fill("white");
  rect(0, 0, 60, 45); 

  pop();  

  function mousePressed(){
    if(mouseX > 570 && mouseX < 630 && mouseY > 280 && mouseY < 325){
      isRotatedPillow = true;
    }
  }
  
  //Food pop up
  
  
  
  //Drag food
  
  
  
  //Make Fizzy shake
  
  
  
  
  
  
  
  
  //text, instruction
  textSize(25);
  fill("rgb(201,93,93)");
  text("Click the rotated items", 400, 180, );

  
  //Fizzy body
  stroke(0);
  strokeWeight(1);
  fill(circleColor);
  circle(circleX,circleY, 100);
  circleX = circleX + speedX;
  circleY = circleY + speedY;
  
   if(circleX > 720){
    speedX = -speedX;
    lefteyeSpeedX = -lefteyeSpeedX;
    righteyeSpeedX = -righteyeSpeedX;
    mouthSpeedX = -mouthSpeedX;
      
  }else if(circleX < 100){
   speedX = -speedX;
   lefteyeSpeedX = -lefteyeSpeedX; 
   righteyeSpeedX = -righteyeSpeedX;
   mouthSpeedX = -mouthSpeedX;
    
  }
  if(circleY > 380){
    speedY = -speedY;
    lefteyeSpeedY = -lefteyeSpeedY;
    righteyeSpeedY = -righteyeSpeedY;
    mouthSpeedY = -mouthSpeedY;
    
  }else if(circleY < 100){
    speedY = -speedY;
    lefteyeSpeedY = -lefteyeSpeedY;
    righteyeSpeedY = -righteyeSpeedY;
    mouthSpeedY = -mouthSpeedY;
  }
  
  //Fizzy eyes
  fill(0);
  circle(lefteyeX, lefteyeY, 20);
  lefteyeX = lefteyeX + lefteyeSpeedX;
  lefteyeY = lefteyeY + lefteyeSpeedY;

  
  fill(0);
  circle(righteyeX, righteyeY, 20);
  righteyeX = righteyeX + righteyeSpeedX;
  righteyeY = righteyeY + righteyeSpeedY;
  
  //Fizzy mouth
  arc(mouthX,mouthY,50,50,0,PI);
  mouthX = mouthX + mouthSpeedX;
  mouthY = mouthY + mouthSpeedY;
  
}