let catModel;
let sharkModel;

let currentModel;

let colorPicker;
let sizeSlider;

function preload(){

catModel = loadModel('catV2.obj', true);
sharkModel = loadModel('sharkie_V1.obj', true);

}

function setup(){

createCanvas(windowWidth, windowHeight, WEBGL);

colorPicker = document.getElementById("furColor");
sizeSlider = document.getElementById("sizeSlider");

currentModel = catModel;

// Button controls
document.getElementById("catButton").onclick = () => {
    currentModel = catModel;
};

document.getElementById("sharkButton").onclick = () => {
    currentModel = sharkModel;
};

}

function draw(){

background(220);

orbitControl();

ambientLight(150);
directionalLight(255,255,255,0.5,1,-0.5);

let c = colorPicker.value;
let size = sizeSlider.value;

push();

noStroke();

// scale(size * 50);
// scale(size);
// let baseScale = 0.02;
let baseScale = 1;
scale(size * baseScale);

// fill(c);
// normalMaterial();
ambientMaterial(c);

model(currentModel);

pop();

}

function windowResized(){
resizeCanvas(windowWidth, windowHeight);
}
