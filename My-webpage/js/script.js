let curtain;
let recordPlayer;
let musicPlay;
let remoteControl;
let behindWindow;
let table;
let tv;
let book;
let pen;
let powerBotton;
let sceneChanged = false;
let remoteClicked = false;
let houseX = 490;
let houseY = 295;
let birdX = 400;
let birdY = 50;
let birdSpeed = 1;
let birdDirection = 1;
let girlX = 240;
let girlY = 430;
let dogX = 130;
let dogY = 445;
let dogYorigin = 445;
let dogYspeed = 0;
let dogJump = false;

let isPenClicked = false;
let message = "";
let inputBox = { x: 200, y: 220, width: 300, height: 130 };

let sunflowerAngle = 0;
let sunflowerClicked = false;

let flowerAngle = 0;
let flowerClicked = false;

let flower3Angle = 0;
let flower3Clicked = false;

let showMessage = false;
let showBubble = false;
let isStopped = false;
let sunAngle = 0;

let showImage = false;
let gardenSound;
let buttonPressed = false;
let tvChannel = 0;
let video1, video2, video3, video4;
let TVdisplay;
let powerTV;
let hiSound;
let dogBark;

let buttons = [];
let butterflies = [];

let fishExist = false;
let fishPositions = [];

let debugMode = true;
let canvasScale = 1.3;



function preload() {
  musicPlay = loadSound("assets/musicPlay.mp3");
  birdSound = loadSound("assets/birds.mp3");
  gardenSound = loadSound("assets/garden.mp3");
  hiSound = loadSound("assets/hi.wav");
  dogBark = loadSound("assets/dog.wav");
  fishWater = loadSound("assets/fish.wav");
  powerTV = loadImage("assets/tv.jpeg");
  video1 = createVideo("assets/Coca.mp4");
  video2 = createVideo("assets/burger.mp4");
  video3 = createVideo("assets/disney.mp4");
  video4 = createVideo("assets/bbc.mp4");
}

function setup() {
  let canvas = createCanvas(550 * canvasScale, 400 * canvasScale);
  canvas.parent("p5-canvas-container");
  table = new Table(0 * canvasScale, 200 * canvasScale, 550 * canvasScale, 200 * canvasScale);
  tv = new TV(270 * canvasScale, 110 * canvasScale, 140 * canvasScale, 80 * canvasScale);
  book = new Book(400 * canvasScale, 300 * canvasScale, 80 * canvasScale, 50 * canvasScale);
  recordPlayer = new RecordPlayer(50 * canvasScale, 220 * canvasScale, 100 * canvasScale, 80 * canvasScale);
  behindWindow = new BehindWindow(50 * canvasScale, 50 * canvasScale, 150 * canvasScale, 100 * canvasScale);
  remoteControl = new RemoteControl(200 * canvasScale, 300 * canvasScale, 30 * canvasScale, 60 * canvasScale, radians(-20));
  curtain = new Curtain(50 * canvasScale, 50 * canvasScale, 150 * canvasScale, 100 * canvasScale);
  pen = new Pen(370 * canvasScale, 290 * canvasScale, 8 * canvasScale, 50 * canvasScale, radians(-15));
  powerBotton = new PowerBotton(302 * canvasScale, 309 * canvasScale, 15);

  for (let i = 0; i < 2; i++) {
    buttons.push([]);
    for (let j = 0; j < 2; j++) {
      buttons[i].push(new Button(280 + 20 * j + 104, 280 + 20 * i + 150, 15));
    }
  }

  for (let i = 0; i < 4; i++) {
    butterflies.push(new Butterfly(random(width), random(height)));
  }


  video1.hide();
  video1.pause();
  video2.hide();
  video2.pause();
  video3.hide();
  video3.pause();
  video4.hide();
  video4.pause();

  currVideo = video1;
}

function draw() {
  background(229, 183, 164);

  if (sceneChanged) {
    drawGarden();
    moveBird();
    for (let pos of fishPositions) {
      drawFish(pos.x, pos.y);
    }

    if (showBubble) {
      drawBubble();
    }
    if (fishExist) {
      drawFish(fishX, fishY);
    }

  } else {

    table.display();
    table.update();
    tv.display();
    tv.update();
    recordPlayer.display();
    recordPlayer.update();
    remoteControl.display();
    remoteControl.update();
    book.display();
    book.update();
    pen.display();
    pen.update();
    behindWindow.display();
    behindWindow.update();
    curtain.display();
    curtain.update();

    // Remote control for the TV
    fill(100);
    rect(280 * canvasScale, 280 * canvasScale, 45 * canvasScale, 90 * canvasScale, 15);

    powerBotton.update();
    powerBotton.display();

    let buttonCount = 1;
    for (let i = 0; i < 2; i++) {
      for (let j = 0; j < 2; j++) {
        let btn = buttons[i][j];
        btn.display();
        btn.update();

        if (btn.isClicked == true) {
          tvChannel = buttonCount;
        }
        buttonCount++;
      }
    }

    if (powerBotton.isOn) {
      // play
      image(powerTV, 366, 157, 225, 120);

      if (tvChannel == 1) {
        video1.play();
        video2.stop();
        video3.stop();
        video4.stop();
        image(video1, 366, 157, 225, 120);
      }
      else if (tvChannel == 2) {
        video1.stop();
        video2.play();
        video3.stop();
        video4.stop();
        image(video2, 366, 157, 225, 120);
      }
      else if (tvChannel == 3) {
        video1.stop();
        video2.stop();
        video3.play();
        video4.stop();
        image(video3, 366, 157, 225, 120);
      }
      else if (tvChannel == 4) {
        video1.stop();
        video2.stop();
        video3.stop();
        video4.play();
        image(video4, 366, 157, 225, 120);
      }
    } else {
      tvChannel = 0;
      video1.stop();
      video2.stop();
      video3.stop();
      video4.stop();
    }

    if (showMessage) {
      displayMessage();
    }

    if (isPenClicked) {
      fill(244, 213, 169);
      rect(inputBox.x, inputBox.y, inputBox.width, inputBox.height);
      fill(0);
      textSize(18);
      text(message, inputBox.x + 10, inputBox.y + 25);
    }
  }
}

function drawGarden() {
  // Background sky
  noStroke();
  fill(135, 206, 250);
  rect(0, 0, width, height);

  // Ground
  noStroke();
  fill(34, 139, 34);
  rect(0, height - 180, width, 180);

  drawTrees();
  drawHouse();
  drawCloud();
  drawSun();
  drawBird();
  moveBird();
  drawGirl();
  drawRiver();


  if (dogJump) {
    dogY += dogYspeed;
    dogYspeed += 1;
    if (dogY > dogYorigin) {
      dogJump = false;
      // reset
      dogY = dogYorigin;
      dogYspeed = 0;
    }
  }

  if (sunflowerClicked) {
    sunflowerAngle += 0.02;
  }
  drawSunflower(sunflowerX, sunflowerY, sunflowerAngle);

  if (flowerClicked) {
    flowerAngle += 0.02;
  }
  drawFlower(flowerX, flowerY, flowerAngle);

  if (flower3Clicked) {
    flower3Angle += 0.02;
  }
  drawFlower3(flower3X, flower3Y, flower3Angle);

  drawDog();

  for (let i = 0; i < butterflies.length; i++) {
    butterflies[i].update();
    butterflies[i].display();
  }

  if (!gardenSound.isPlaying()) {
    gardenSound.play();
  }
}

function drawSun() {
  push();
  translate(80, 80);
  rotate(sunAngle);

  // Sun body
  fill(255, 204, 0, 200);
  noStroke();
  ellipse(0, 0, 90, 90);

  // Sun rays
  stroke(255, 204, 0);

  // Longer rays
  strokeWeight(5);
  line(0, -40, 0, -70);
  line(0, 40, 0, 70);
  line(-40, 0, -70, 0);
  line(40, 0, 70, 0);

  // Diagonal rays
  line(-30, -30, -60, -60);
  line(30, -30, 60, -60);
  line(-30, 30, -60, 60);
  line(30, 30, 60, 60);

  fill(255, 223, 0, 80);
  noStroke();
  ellipse(0, 0, 110, 110);

  fill(255, 181, 77, 200);
  noStroke();
  ellipse(0, 0, 60, 60);

  pop();

  sunAngle += 0.005;
}

function drawCloud() {

  //Cloud 1
  fill(255, 255, 255, 180);
  noStroke();
  ellipse(300, 60, 120, 60);
  ellipse(350, 50, 100, 50);
  ellipse(400, 60, 120, 60);
  ellipse(370, 80, 80, 40);

  // Cloud 2
  fill(255, 255, 255, 160);
  ellipse(490, 120, 130, 70);
  ellipse(530, 110, 120, 60);
  ellipse(570, 120, 130, 70);
  ellipse(550, 140, 90, 45);

  // Cloud 3
  fill(255, 255, 255, 180);
  ellipse(190, 150, 150, 80);
  ellipse(220, 140, 130, 70);
  ellipse(290, 150, 140, 75);
  ellipse(260, 170, 100, 50);

  // Cloud 4
  fill(255, 255, 255, 140);
  ellipse(50, 50, 100, 50);
  ellipse(90, 40, 110, 55);
  ellipse(130, 50, 120, 60);
  ellipse(100, 60, 90, 45);

  //Cloud 5
  fill(255, 255, 255, 170);
  ellipse(650, 100, 140, 70);
  ellipse(690, 90, 120, 60);
  ellipse(740, 100, 130, 65);
  ellipse(710, 120, 100, 50);

  // Cloud 6
  fill(255, 255, 255, 180);
  ellipse(750, 160, 150, 80);
  ellipse(800, 150, 130, 70);
  ellipse(850, 160, 140, 75);
  ellipse(820, 180, 100, 50);
}

function drawTrees() {
  for (let i = 0; i < 3; i++) {
    let treeX = 100 + i * 150;
    let treeY = height - 200;

    // Tree trunk
    noStroke();
    fill(139, 69, 19);
    rect(treeX, treeY, 20, 70);

    fill(34, 139, 34, 200);
    ellipse(treeX + 10, treeY - 30, 70, 70);
    fill(60, 179, 113, 180);
    ellipse(treeX - 20, treeY - 20, 60, 60);
    fill(144, 238, 144, 160);
    ellipse(treeX + 40, treeY - 20, 60, 60);
  }
}

function drawBird() {

  push();
  translate(birdX, birdY);
  if (birdDirection === -1) {
    scale(-1, 1);
  } else {
    scale(1, 1);
  }
  //Bird body
  fill(161, 171, 186);
  ellipse(0, 0, 40, 30);

  // Bird head 
  fill(161, 171, 186);
  ellipse(18, - 15, 20, 20);

  // Bird eye
  fill(0);
  ellipse(23, - 18, 5, 5);

  // Bird beak
  fill(255, 69, 0);
  triangle(28, - 20, 35, - 20, 28, - 15);

  // Bird tail
  fill(161, 171, 186);
  triangle(- 10, 8, - 30, 20, - 18, 25);

  // Bird wings
  fill(121, 124, 129);
  arc(3, 0, 40, 23, HALF_PI, PI + HALF_PI);
  pop();
}

function moveBird() {
  birdX += birdSpeed * birdDirection;
  birdY = 80 + sin(frameCount * 0.05) * 30;

  if (birdX > width + 50) {
    birdDirection = -1;
    birdX = width + 50;
  }


  if (birdX < -50) {
    birdDirection = 1;
    birdX = -50;
  }
}

function drawGirl() {
  // Hair
  fill(139, 69, 19);
  ellipse(girlX, girlY - 50, 60, 80);


  // Head
  fill(255, 224, 189);
  ellipse(girlX, girlY - 60, 40, 40);

  // Eyes
  fill(255);
  ellipse(girlX - 8, girlY - 65, 10, 7);
  ellipse(girlX + 8, girlY - 65, 10, 7);
  fill(0);
  ellipse(girlX - 8, girlY - 65, 4, 4);
  ellipse(girlX + 8, girlY - 65, 4, 4);
  fill(255);
  ellipse(girlX - 9, girlY - 66, 2, 2);
  ellipse(girlX + 7, girlY - 66, 2, 2);

  // Mouth
  fill(255, 105, 180);
  arc(girlX, girlY - 55, 15, 10, 0, PI);

  // Legs
  fill(255, 224, 189);
  rect(girlX - 8, girlY, 5, 25);
  rect(girlX + 3, girlY, 5, 25);

  // Shoes
  fill(255);
  ellipse(girlX - 6, girlY + 25, 10, 5);
  ellipse(girlX + 6, girlY + 25, 10, 5);

  // Body
  fill(255, 182, 193);
  rect(girlX - 10, girlY - 40, 20, 40);
  triangle(girlX - 20, girlY + 10, girlX + 20, girlY + 10, girlX, girlY - 40);

  // Arms
  fill(255, 224, 189);
  rect(girlX - 20, girlY - 35, 8, 20);
  rect(girlX + 12, girlY - 35, 8, 20);

  // Left hand
  fill(255, 224, 189); // Skin tone for hands
  ellipse(girlX - 17, girlY - 15, 12, 12); // Left hand (simplified, as a small circle)

  // Right hand
  ellipse(girlX + 17, girlY - 15, 12, 12); // Right hand (simplified, as a small circle)

  // Blush
  fill(255, 182, 193, 150);
  ellipse(girlX - 12, girlY - 60, 6, 4);
  ellipse(girlX + 12, girlY - 60, 6, 4);


}

function drawHouse() {
  noStroke();
  fill(255, 223, 186);
  rect(houseX, houseY, 100, 100);

  // Roof
  fill(215, 151, 91);
  beginShape();
  vertex(houseX, houseY);
  vertex(houseX + 50, houseY - 50);
  vertex(houseX + 100, houseY);
  endShape(CLOSE);

  // Door
  fill(215, 151, 91);
  rect(houseX + 35, houseY + 55, 30, 45);

  fill(0);
  ellipse(houseX + 43, houseY + 80, 5, 5);

  // Windows
  fill(173, 216, 230);
  rect(houseX + 15, houseY + 15, 30, 30, 5);
  rect(houseX + 55, houseY + 15, 30, 30, 5);
  stroke(0);
  strokeWeight(1);
  line(houseX + 30, houseY + 15, houseX + 30, houseY + 45);
  line(houseX + 15, houseY + 30, houseX + 45, houseY + 30);
  line(houseX + 65, houseY + 15, houseX + 65, houseY + 45);
  line(houseX + 55, houseY + 30, houseX + 85, houseY + 30);
}

function drawBubble() {
  fill(255, 255, 255);
  noStroke();
  ellipse(310, 250, 200, 100);

  triangle(260, 350, 280, 250, 290, 300);

  fill(0);
  textSize(16);
  textAlign(CENTER, CENTER);
  text("Hi! Nice to meet u!", 310, 250);
}

function drawRiver() {
  noStroke();
  fill(70, 130, 180);
  ellipse(650, 440, 120, 98);
  ellipse(600, 460, 120, 100);
  ellipse(550, 460, 120, 95);
}

function drawFish(x, y) {
  noStroke();
  fill(255, 165, 0);
  ellipse(x, y, 20, 8.5);
  triangle(x - 10, y, x - 20, y - 5, x - 20, y + 5); // Fish tail
}

function drawSunflower(x, y, angle) {
  // Stem
  noStroke();
  fill(106, 154, 81);
  rect(x - 1.25, y + 10, 2.5, 50);

  push();
  translate(x, y);
  rotate(angle);

  // Petals
  fill(255, 204, 0);
  noStroke();
  for (let i = 0; i < 20; i++) {
    rotate(radians(360 / 20));
    ellipse(15, 0, 20, 5);
  }

  // Center of sunflower
  fill(102, 51, 0);
  ellipse(0, 0, 20, 20);

  pop();

  // Leaves
  push();
  noStroke();
  fill(123, 176, 94);
  translate(x - 5, y + 35);
  rotate(radians(-30));
  ellipse(0, 0, 15, 5);
  pop();

  push();
  noStroke();
  fill(123, 176, 94);
  translate(x + 10, y + 40);
  rotate(radians(30));
  ellipse(0, 0, 20, 7);
  pop();
}

function drawFlower(x, y, angle) {
  // Stem
  noStroke();
  fill(106, 154, 81);
  rect(x - 1.25, y + 10, 2.5, 50);

  push();
  translate(x, y);
  rotate(angle);

  // Petals
  fill(229, 118, 118);
  noStroke();
  for (let i = 0; i < 20; i++) {
    rotate(radians(360 / 20));
    ellipse(15, 0, 20, 5);
  }

  // Center of sunflower
  fill(232, 168, 105);
  ellipse(0, 0, 20, 20);

  pop();

  // Leaves
  push();
  noStroke();
  fill(123, 176, 94);
  translate(x - 5, y + 35);
  rotate(radians(-30));
  ellipse(0, 0, 15, 5);
  pop();

  push();
  noStroke();
  fill(123, 176, 94);
  translate(x + 10, y + 40);
  rotate(radians(30));
  ellipse(0, 0, 20, 7);
  pop();
}

function drawFlower3(x, y, angle) {
  // Stem
  noStroke();
  fill(106, 154, 81);
  rect(x - 1.25, y + 10, 2.5, 50);

  push();
  translate(x, y);
  rotate(angle);

  // Petals
  fill(165, 140, 202);
  noStroke();
  for (let i = 0; i < 20; i++) {
    rotate(radians(360 / 20));
    ellipse(15, 0, 20, 5);
  }

  // Center of sunflower
  fill(234, 167, 77);
  ellipse(0, 0, 20, 20);

  pop();

  // Leaves
  push();
  noStroke();
  fill(123, 176, 94);
  translate(x - 5, y + 35);
  rotate(radians(-30));
  ellipse(0, 0, 15, 5);
  pop();

  push();
  noStroke();
  fill(123, 176, 94);
  translate(x + 10, y + 40);
  rotate(radians(30));
  ellipse(0, 0, 20, 7);
  pop();

}

function drawDog() {
  fill(139, 69, 19);
  ellipse(dogX, dogY, 60, 30);

  // Dog head
  fill(255, 224, 189);
  ellipse(dogX + 30, dogY - 20, 30, 30);

  // Dog ears
  push();
  fill(150, 85, 19);
  translate(dogX + 15, dogY - 25);
  rotate(PI / 8);
  ellipse(0, 0, 15, 30);
  pop();

  push();
  fill(150, 85, 19);
  translate(dogX + 47, dogY - 25);
  rotate(-PI / 8);
  ellipse(0, 0, 15, 30);
  pop();

  // Dog eyes
  fill(255);
  ellipse(dogX + 25, dogY - 20, 12, 10);
  ellipse(dogX + 42, dogY - 20, 12, 10);
  fill(0);
  ellipse(dogX + 25, dogY - 20, 5, 5);
  ellipse(dogX + 42, dogY - 20, 5, 5);

  // Dog nose
  fill(0);
  ellipse(dogX + 35, dogY - 10, 8, 8);


  // Dog legs
  fill(139, 69, 19);
  rect(dogX - 20, dogY + 10, 12, 18);
  rect(dogX + 8, dogY + 10, 12, 18);
  fill(160, 82, 45);
  ellipse(dogX - 12, dogY + 25, 15, 8);
  ellipse(dogX + 15, dogY + 25, 15, 8);

  // Dog tail
  stroke(139, 69, 19);
  strokeWeight(5);
  noFill();
  arc(dogX - 40, dogY, 40, 30, PI, TWO_PI);


}

class Butterfly {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = random(15, 25);
    this.speedX = random(-2, 2);
    this.speedY = random(-2, 2);
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    if (this.x > width) this.x = 0;
    if (this.x < 0) this.x = width;
    if (this.y > height) this.y = 0;
    if (this.y < 0) this.y = height;
  }

  display() {

    push();
    translate(this.x, this.y);

    // Wings 
    fill(255, 182, 193, 150);
    noStroke();

    // Top wings
    ellipse(10, -5, this.size * 1.4, this.size);
    ellipse(-10, -5, this.size * 1.4, this.size);

    // Bottom wings
    ellipse(11, 8, this.size - 5, this.size / 1.8);
    ellipse(-11, 8, this.size - 5, this.size / 1.8);

    // Butterfly body
    fill(210, 112, 112);
    ellipse(0, 0, this.size / 2.5, this.size + 5);

    stroke(210, 112, 112);
    strokeWeight(1);
    line(-2, -this.size / 2, -10, -this.size);
    line(2, -this.size / 2, 10, -this.size);

    pop();
  }
}

class Table {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }

  update() {
  }

  display() {
    fill(139, 69, 19);
    rect(this.x, this.y, this.w, this.h);
  }
}

class BehindWindow {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }

  update() {
  }

  display() {

    noStroke();
    // Sky
    fill(135, 206, 250);
    rect(this.x, this.y, this.w, this.h);


    for (let i = 0; i < 3; i++) {
      let treeX = this.x + 20 + i * 40;
      let treeY = this.y + this.h / 2;
      let treeW = 20;
      let treeH = 50;

      fill(139, 69, 19);
      rect(treeX + treeW / 2 - 5, treeY, 10, treeH);

      fill(34, 139, 34);
      ellipse(treeX + treeW / 2, treeY - 20, 40, 40);
      ellipse(treeX + treeW / 2 - 15, treeY - 10, 30, 30);
      ellipse(treeX + treeW / 2 + 15, treeY - 10, 30, 30);

    }

    //Grass
    fill(34, 139, 34);
    rect(this.x, this.y + this.h / 2 + 20, this.w, this.h / 2 - 20);


    //Bird
    let birdX = this.x + this.w - 50;
    let birdY = this.y + 30;

    fill(161, 171, 186); // Bird body
    ellipse(birdX, birdY, 20, 18); // Body

    fill(0); // Bird eye
    ellipse(birdX + 5, birdY - 2, 3, 3);

    fill(255, 69, 0); // Bird beak
    triangle(birdX + 10, birdY - 2, birdX + 15, birdY, birdX + 10, birdY + 2);

    // Bird wing
    fill(121, 124, 129);
    arc(birdX - 2, birdY, 15, 10, HALF_PI, PI + HALF_PI);
  }
}

class Curtain {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.leftX = x;
    this.rightX = x + w;
    this.openSpeed = 2;
    this.isOpening = false;
    this.soundPlayed = false;
  }

  update() {
    this.open();
  }

  display() {

    stroke(0);
    strokeWeight(1.5);
    fill(232, 203, 125);
    rect(this.leftX, this.y, this.w / 2, this.h);
    rect(this.rightX - this.w / 2, this.y, this.w / 2, this.h);

    stroke(50);
    strokeWeight(1);

    for (let i = this.leftX + 5; i < this.leftX + this.w / 2; i += 5) {
      line(i, this.y, i, this.y + this.h);
    }

    for (let i = this.rightX - this.w / 2; i < this.rightX - 5; i += 5) {
      line(i, this.y, i, this.y + this.h);
    }
  }

  open() {
    if (this.isOpening) {
      // Move the left curtain to the left
      if (this.leftX > this.x - this.w / 3) {
        this.leftX -= this.openSpeed;
      }

      // Move the right curtain to the right
      if (this.rightX < this.x + this.w + this.w / 3) {
        this.rightX += this.openSpeed;
      }
    }
  }
}

class TV {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }

  update() {
  }

  display() {
    push();
    translate(this.x, this.y);
    scale(1.4);
    stroke(0);
    strokeWeight(1);
    fill("grey");
    rect(0, 0, this.w, this.h, 10);


    fill(200);
    rect(10, 10, this.w - 20, this.h - 20);


    fill(255);
    rect(50, -14, this.w - 100, this.h - 90);
    line(this.w / 2 - 10, - 14, 50, - 40);
    line(this.w / 2 + 10, - 14, this.w - 50, - 40);
    rect(50, 104, this.w - 100, this.h - 90);
    rect(20, 113, this.w - 35, this.h - 92);

    pop();

  }
}

class RecordPlayer {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.isSpinning = false;
    this.angle = 0;
    this.sound = musicPlay;
  }

  update() {
    if (this.isSpinning) {
      this.angle += 0.05;
    }
  }

  display() {
    fill(195, 146, 106);
    rect(this.x, this.y, this.w, this.h, 5);

    push();
    translate(this.x + this.w / 2, this.y + this.h / 2);
    rotate(this.angle);

    fill(0);
    noStroke();
    ellipse(0, 0, 60 * canvasScale);

    fill(200);
    ellipse(0, 0, 10 * canvasScale);

    fill(255);
    ellipse(0, 0, 2 * canvasScale);

    noFill();
    stroke(200);
    strokeWeight(1);

    arc(0, 0, 50, 50, QUARTER_PI, HALF_PI);
    arc(0, 0, 50, 50, PI + QUARTER_PI, PI + HALF_PI);

    // Glowing arcs
    arc(0, 0, 40, 40, QUARTER_PI, HALF_PI);
    arc(0, 0, 40, 40, PI + QUARTER_PI, PI + HALF_PI);



    pop();

    strokeWeight(3);
    stroke(255);
    line(this.x + this.w / 2 + 10, this.y + 40, this.x + this.w, this.y + this.h / 4);

  }

  changeSpinning() {
    this.isSpinning = !this.isSpinning;
    if (this.isSpinning) {
      this.music();
    }
  }

  music() {
    if (!musicPlay.isPlaying()) {
      musicPlay.play();
    }
  }
}


class RemoteControl {
  constructor(x, y, w, h, angle) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.angle = angle;
  }

  update() {
  }

  display() {

    push();
    translate(this.x, this.y);
    rotate(this.angle);
    stroke(0);
    strokeWeight(1);
    fill(225);
    rect(0, 0, this.w, this.h, 5);
    fill(229, 210, 118);
    ellipse(this.w / 2, this.h / 2, 20 * canvasScale);
    stroke(0);
    strokeWeight(2);
    line(this.w / 2 + 3, 0, 21, - 20);

    pop();
  }

}

class Book {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }

  update() {

  }


  display() {
    fill(226, 165, 116);
    stroke(1);
    strokeWeight(1);
    rect(this.x, this.y, this.w, this.h);
    line(this.x + this.w / 2, this.y, this.x + this.w / 2, this.y + this.h);

    stroke(0);
    for (let i = 1; i < 6; i++) {
      let lineY = this.y + i * 10;

      line(this.x + 8, lineY, this.x + this.w - 60, lineY);
      line(this.x + 60, lineY, this.x + this.w - 8, lineY);
    }
  }
}

function displayMessage() {

  push();
  fill(225);
  stroke(0);
  strokeWeight(2);
  rect(width / 2 - 100, height / 2 + 35, 240, 150, 10);

  fill(0);
  noStroke();
  textSize(15);
  textStyle(ITALIC);
  textAlign(CENTER, CENTER);
  textWrap(WORD);
  text("To the future, we invite you to step back in time and explore the many ways we entertained ourselves in the present. I hope you get a kick out of how we filled our days! ", width / 2 - 90, height / 2 + 110, 220);
  pop();
}

class Pen {
  constructor(x, y, w, h, angle) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.angle = angle;
  }

  update() {

  }

  display() {

    push();
    translate(this.x, this.y);
    rotate(this.angle);
    // Pen barrel
    fill(50);
    rect(0, 0, this.w, this.h);

    // Pen tip
    fill(100);
    triangle(
      0, this.h,
      this.w, this.h,
      this.w / 2, this.h + 10
    );
    pop();
  }
}

class Button {
  constructor(x, y, diameter) {
    this.x = x;
    this.y = y;
    this.r = diameter / 2;
    this.isClicked = false;
  }
  update() {
    this.checkClick();
  }
  display() {
    fill(200);
    circle(this.x, this.y, this.r * 2);
  }
  checkClick() {
    let distance = dist(mouseX, mouseY, this.x, this.y);
    if (mouseIsPressed && distance < this.r) {
      this.isClicked = true;
    } else {
      this.isClicked = false;
    }
  }
}

class PowerBotton {
  constructor(x, y, diameter) {
    this.x = x;
    this.y = y;
    this.d = diameter;
    this.isOn = false;
  }

  update() {
    if (mouseIsPressed && dist(mouseX, mouseY, this.x, this.y) < this.d / 2) {
      this.isOn = !this.isOn;
    }
  }

  display() {
    if (this.isOn) {
      fill("green");
    } else {
      fill("red");
    }
    circle(this.x, this.y, this.d);
  }

}

let sunflowerX = 400;
let sunflowerY = 430;
let flowerX = 350;
let flowerY = 350;
let flower3X = 50;
let flower3Y = 360;

function mousePressed() {
  if (sceneChanged == true) {
    if (mouseX >= houseX && mouseX <= houseX + 100 && mouseY > houseY && mouseY < houseY + 100) {
      sceneChanged = false;
    }

    if (mouseX > girlX - 20 && mouseX < girlX + 20 &&
      mouseY > girlY - 80 && mouseY < girlY + 100) {
      hiSound.play();
      showBubble = true;
    }

    if (mouseX > dogX - 10 && mouseX < dogX + 45 && mouseY > dogY - 30 && mouseY < dogY + 20) {
      dogBark.play();
      dogJump = true;
      dogYspeed = -10;
    }

    if (mouseX > sunflowerX - 20 && mouseX < sunflowerX + 20 &&
      mouseY > sunflowerY - 20 && mouseY < sunflowerY + 20) {
      sunflowerClicked = true;
    }

    if (mouseX > flowerX - 20 && mouseX < flowerX + 20 && mouseY > flowerY - 20 && mouseY < flowerY + 20) {
      flowerClicked = true;
    }

    if (mouseX > flower3X - 20 && mouseX < flower3X + 20 &&
      mouseY > flower3Y - 20 && mouseY < flower3Y + 20) {
      flower3Clicked = true;
    }

    if (mouseX > 500 && mouseX < 550 * canvasScale && mouseY > 400 && mouseY < 400 * canvasScale) {
      // Add a new fish at the clicked location
      fishPositions.push({ x: mouseX, y: mouseY });
      fishWater.play();
    }

    //外面的interaction放在这里
  } else {
    if (musicPlay.isPlaying() === true) {
      isStopped = true;
      musicPlay.stop();
    }
    if (mouseX > remoteControl.x
      && mouseX < remoteControl.x + remoteControl.w
      && mouseY > remoteControl.y
      && mouseY < remoteControl.y + remoteControl.h) {
      curtain.isOpening = true;
      remoteClicked = true;

      if (!birdSound.isPlaying()) {
        birdSound.play();
      }
    }

    if (mouseX > recordPlayer.x
      && mouseX < recordPlayer.x + recordPlayer.w
      && mouseY > recordPlayer.y
      && mouseY < recordPlayer.y + recordPlayer.h) {
      recordPlayer.changeSpinning();
    }

    if (
      mouseX >= behindWindow.x &&
      mouseX <= behindWindow.x + behindWindow.w &&
      mouseY >= behindWindow.y &&
      mouseY <= behindWindow.y + behindWindow.h
    ) {
      if (remoteClicked) {
        sceneChanged = !sceneChanged;
      }
    }

    if (mouseX > book.x && mouseX < book.x + book.w && mouseY > book.y && mouseY < book.y + book.h) {
      showMessage = true;
    } else {
      showMessage = false;
    }
  }
  let d = dist(mouseX, mouseY, pen.x, pen.y);
  if (d < 30) {
    isPenClicked = !isPenClicked;
    message = "";
  } else {
    isPenClicked = false;
  }
}

function keyTyped() {
  if (isPenClicked) {
    message += key;
  }
}

function keyPressed() {
  if (keyCode === ENTER) {
    isPenClicked = false;
  }

  if (keyCode === BACKSPACE && isPenClicked) {
    message = message.slice(0, -1);
  }
}

