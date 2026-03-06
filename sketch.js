let catModel;

let rotX = 0;
let rotY = 0;

let colorPicker;
let sizeSlider;

function preload(){

// load the OBJ model
catModel = loadModel('catV1.obj', true);

}

function setup(){

createCanvas(windowWidth, windowHeight, WEBGL);

colorPicker = document.getElementById("furColor");
sizeSlider = document.getElementById("sizeSlider");

}

function draw(){

background(220);

orbitControl(); // mouse rotation

ambientLight(150);
directionalLight(255,255,255,0.5,1,-0.5);

let c = colorPicker.value;
let size = sizeSlider.value;

push();

scale(size * 50); // increase model size if needed
normalMaterial();
fill(c);

model(catModel);

pop();

}

function windowResized(){
resizeCanvas(windowWidth, windowHeight);
}
