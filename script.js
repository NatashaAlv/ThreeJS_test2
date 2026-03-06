import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.158.0/build/three.module.js";
import { OrbitControls } from "https://cdn.jsdelivr.net/npm/three@0.158.0/examples/jsm/controls/OrbitControls.js";
import { OBJLoader } from "https://cdn.jsdelivr.net/npm/three@0.158.0/examples/jsm/loaders/OBJLoader.js";

let scene, camera, renderer, catModel;

init();
animate();

function init(){

scene = new THREE.Scene();
scene.background = new THREE.Color(0xf2f2f2);

camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth/window.innerHeight,
    0.1,
    1000
);

camera.position.set(0,2,5);

renderer = new THREE.WebGLRenderer({antialias:true});
renderer.setSize(window.innerWidth, window.innerHeight);

document.getElementById("viewer").appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);

const light1 = new THREE.DirectionalLight(0xffffff,1);
light1.position.set(5,10,5);
scene.add(light1);

const light2 = new THREE.AmbientLight(0xffffff,0.5);
scene.add(light2);

const loader = new OBJLoader();

loader.load("catV1.obj", function(object){

    object.traverse(function(child){
        if(child.isMesh){
            child.material = new THREE.MeshStandardMaterial({
                color:0xff9900
            });
        }
    });

    catModel = object;
    scene.add(catModel);

});

window.addEventListener("resize", onWindowResize);

setupUI();

}

function setupUI(){

const colorPicker = document.getElementById("furColor");

colorPicker.addEventListener("input", ()=>{

    if(!catModel) return;

    catModel.traverse(function(child){
        if(child.isMesh){
            child.material.color.set(colorPicker.value);
        }
    });

});

const rotationSlider = document.getElementById("rotation");

rotationSlider.addEventListener("input", ()=>{

    if(catModel){
        catModel.rotation.y = THREE.MathUtils.degToRad(rotationSlider.value);
    }

});

}

function onWindowResize(){

camera.aspect = window.innerWidth/window.innerHeight;
camera.updateProjectionMatrix();
renderer.setSize(window.innerWidth, window.innerHeight);

}

function animate(){
requestAnimationFrame(animate);
renderer.render(scene, camera);
}
