/*
  Check our the GOAL and the RULES of this exercise at the bottom of this file.
  
  After that, follow these steps before you start coding:

  1. rename the dancer class to reflect your name (line 35).
  2. adjust line 20 to reflect your dancer's name, too.
  3. run the code and see if a square (your dancer) appears on the canvas.
  4. start coding your dancer inside the class that has been prepared for you.
  5. have fun.
*/

let dancer;

function setup() {
  // no adjustments in the setup function needed...
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("p5-canvas-container");

  // ...except to adjust the dancer's name on the next line:
  dancer = new NatsumiDancer(width / 2, height / 2);
}

function draw() {
  // you don't need to make any adjustments inside the draw loop
  background(0);
  drawFloor(); // for reference only

  dancer.update();
  dancer.display();
}

// You only code inside this class.
// Start by giving the dancer your name, e.g. LeonDancer.
class NatsumiDancer {
  constructor(startX, startY) {
    this.startX = startX;
    this.startY = startY;
    this.x = startX;
    this.y = startY;
    // add properties for your dancer here:
    this.color = color(255,221,0);
    this.armAngle = 0;
    this.legAngle = 0; 
    this.speed = 1.5;
    this.amplitude = 20;
    this.boundary = 150;
    this.jumping = 25;
  }
  update() {
    this.x += this.speed;
    if (this.x > this.startX + this.boundary || this.x < this.startX - this.boundary) {
      this.speed *= -1;

      this.color = color(255,random(100,240),random(122,255));
    }
    
    this.y = this.startY + sin(frameCount * 0.1) * this.jumping;

    this.legAngle = sin(frameCount * 0.1) * QUARTER_PI / 2; // Legs swing in/out
    this.armAngle = cos(frameCount * 0.1) * QUARTER_PI / 2;
  }
  display() {
    // the push and pop, along with the translate 
    // places your whole dancer object at this.x and this.y.
    // you may change its position on line 19 to see the effect.
    push();
    translate(this.x, this.y);

    // ******** //
    // ⬇️ draw your dancer from here ⬇️
    
    //Dancer body

    if(this.speed < 0){
      scale(-1,1);
    }
    fill(this.color);
    stroke(0);
    strokeWeight(1);
    rect(-25,-30,50,60);

    //Holes
    fill(lerpColor(this.color, color(0, 0, 0), 0.15));
    ellipse(-15,-3,8,8);
    ellipse(10,-1,6,6);
    ellipse(-10,10,5,5);
    ellipse(15,10,7,7);
    ellipse(-20,-22,6,6);
    ellipse(18,-25,5,5);

    //Shirt and tie
    fill(255);
    rect(-25,15,50,10);
    fill(255,0,0);
    triangle(0,15,-5,25,5,25);


    //Eyes
    fill(255);
    ellipse(-10,-15,10,10);
    ellipse(10,-15,10,10);
    
    fill(41,212,255);
    ellipse(-10,-15,5,5);
    ellipse(10,-15,5,5);

    fill(0);
    ellipse(-10,-15,1,1);
    ellipse(10,-15,1,1);


    //Mouth
    fill(0);
    arc(0,-9,20,10,0,PI);
    
    //Teeth
    fill(255); 
    rect(-5, -8, 4, 5); 
    rect(1, -8, 4, 5); 


    //Arms
    fill(255);
    push();
    translate(-25,0);
    rotate(this.armAngle + sin(frameCount * 0.1) * 0.1);
    rect(0,0,20,5);
    fill(0);
    ellipse(17,2.5,5,5);
    pop();

    push();
    translate(25,0);
    rotate(-this.armAngle - sin(frameCount * 0.1) * 0.1);
    rect(0,0,20,5);
    fill(0);
    ellipse(17,2.5,5,5);
    pop();

    //Pants
    fill(102,51,0);
    rect(-25,25,50,10);


    //Legs
    fill(255);
    push();
    translate(-10,30);
    rotate(this.legAngle + sin(frameCount * 0.1) * 0.1);
    rect(0,0,5,20);
    fill(0);
    ellipse(2.5,22,10,5);
    pop();

    push();
    translate(10,30);
    rotate(-this.legAngle - sin(frameCount * 0.1) * 0.1);
    rect(0,0,5,20);
    fill(0);
    ellipse(2.5,22,10,5);
    pop();
  

    // ⬆️ draw your dancer above ⬆️
    // ******** //

    // the next function draws a SQUARE and CROSS
    // to indicate the approximate size and the center point
    // of your dancer.
    // it is using "this" because this function, too, 
    // is a part if your Dancer object.
    // comment it out or delete it eventually.
    // this.drawReferenceShapes()

    pop();
  }
  drawReferenceShapes() {
    noFill();
    stroke(255, 0, 0);
    line(-5, 0, 5, 0);
    line(0, -5, 0, 5);
    stroke(255);
    rect(-100, -100, 200, 200);
    fill(255);
    stroke(0);
  }
}



/*
GOAL:
The goal is for you to write a class that produces a dancing being/creature/object/thing. In the next class, your dancer along with your peers' dancers will all dance in the same sketch that your instructor will put together. 

RULES:
For this to work you need to follow one rule: 
  - Only put relevant code into your dancer class; your dancer cannot depend on code outside of itself (like global variables or functions defined outside)
  - Your dancer must perform by means of the two essential methods: update and display. Don't add more methods that require to be called from outside (e.g. in the draw loop).
  - Your dancer will always be initialized receiving two arguments: 
    - startX (currently the horizontal center of the canvas)
    - startY (currently the vertical center of the canvas)
  beside these, please don't add more parameters into the constructor function 
  - lastly, to make sure our dancers will harmonize once on the same canvas, please don't make your dancer bigger than 200x200 pixels. 
*/