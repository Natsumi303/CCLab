// CCLab Mini Project - 9.R Particle World Template

let NUM_OF_PARTICLES = 45; // Decide the initial number of particles.

let particles = [];
let stars = [];

function setup() {
  let canvas = createCanvas(800, 600);
  canvas.parent("p5-canvas-container");

  // generate particles
  for (let i = 0; i < NUM_OF_PARTICLES; i++) {
    particles[i] = new Particle(random(width), random(height));
  }
}

function draw() {
  background(0,0,30,50);

  // update and display
  for (let i = 0; i < particles.length; i++) {
    let p = particles[i];
    p.update();
    p.display();
  }

  for(let i = 0; i < stars.length; i ++){
    stars[i].display();
  }
}

function mousePressed(){
  stars.push(new Star(mouseX,mouseY));
}

class Particle {
  // constructor function
  constructor(startX, startY) {
    // properties (variables): particle's characteristics
    this.x = startX;
    this.y = startY;
    this.dia = random(3,7);
    this.speedX = random(2,5);
    this.speedY = random(3,7);
    this.color = color(255);
    this.repulsion = 100;
  }
  // methods (functions): particle's behaviors
  update() {

    if(this.x > mouseX - this.repulsion && this.x < mouseX + this.repulsion && this.y > mouseY - this.repulsion && this.y < mouseY + this.repulsion){
      this.color = color(random(255), random(255),random(255));

      if(this.x < mouseX){
        this.x -= 2;
      }else{
        this.x += 2;
      }

      if(this.y < mouseY){
        this.y -= 2;
      }else{
        this.y += 2;
      }
    }else{
      this.color = color(255);
      this.x += this.speedX;
      this.y += this.speedY;
    }

    if (this.x > width || this.y > height) {
      this.x = random(width); 
      this.y = -10; 
    }
  }

  display() {
    // particle's appearance
    push();
    translate(this.x, this.y);
    stroke(255, 150);
    noStroke();
    fill(this.color);
    circle(0, 0, this.dia);

    pop();
}
}

class Star{
  constructor(x,y){
    this.x = x;
    this.y = y;
    this.width = 15;
    this.height = 30;
    this.color = color(random(255), random(255), random(255),50);
  }

  display(){
    push();
    translate(this.x, this.y);
    noStroke();
    fill(this.color);
    
    beginShape();
    vertex(0,-this.height/2);
    vertex(this.width/2,0);
    vertex(0,this.height/2);
    vertex(-this.width/2,0);
    endShape(CLOSE);

    pop();
  }
}