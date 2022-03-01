// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

// var THREE = require('three');
// require('three/examples/js/loaders/GLTFLoader');

// require('three/examples/js/loaders/GLTFLoader');
// var GLTFLoader = require('three/examples/js/loaders/GLTFLoader');

var THREE =  require('three');

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

console.log('GLTFLoader', GLTFLoader)

var modelUrl = 'https://s1.meixiu.mobi/pc/fileUpload/scene.gltf';

var loader = new GLTFLoader();

loader.load(modelUrl, function ( gltf ) {

	scene.add( gltf.scene );

}, undefined, function ( error ) {

	console.error( error );

} );
/** 1.建立了场景、相机和渲染器 */
var scene = new THREE.Scene()
/** 透视摄像机 PerspectiveCamera */
/**
 * 第一个参数是视野角度（FOV）;第二个参数是长宽比（aspect ratio)
 * 接下来的两个参数是近截面（near）和远截面（far）
 */
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

camera.position.set( 0, 0, 100 );
camera.lookAt( 0, 0, 0 );

var canvas = document.createElement( 'canvas' );
var context = canvas.getContext( 'webgl2', { alpha: false } );

var renderer = new THREE.WebGLRenderer({ canvas, context })
renderer.setSize(window.innerWidth, window.innerHeight )
/**
 * 将renderer（渲染器）的dom元素（renderer.domElement）添加到我们的HTML文档中。
 * 这就是渲染器用来显示场景给我们看的<canvas>元素。
 */
document.body.appendChild(renderer.domElement)

/** 2.创建一个立方体 */
var geometry = new THREE.BoxGeometry(1,1,1);
var material = new THREE.MeshBasicMaterial({color: 0x00ff00});
var cube = new THREE.Mesh(geometry, material)
scene.add(cube)

camera.position.z = 5

/** 3.渲染场景 */
function animate() {
    requestAnimationFrame(animate)
    // 这段代码每帧都会执行（正常情况下是60次/秒）
    cube.rotation.x += 0.01;
	cube.rotation.y += 0.01;
    renderer.render(scene, camera)
}

animate()   