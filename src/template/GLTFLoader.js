/*
 * @Descripttion:
 * @TapdLink: https://XXX
 * @DesignsLink: https://XXX
 * @RelatedPersons: XXX[市场]、XXX[产品]、XXX[前端]、XXX[后端]、XXX[设计]
 * @version: 1.0.0
 * @Author: shentong
 * @LastEditors: shentong
 * @Date: 2022-03-02 10:46:51
 */
var THREE = require("three");

import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
// import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

var availableUrlModelList = [
  "https://s1.meixiu.mobi/pc/fileUpload/sceneGarden.gltf",
  "https://threejs.org/examples/models/gltf/RobotExpressive/RobotExpressive.glb",
  "https://s1.meixiu.mobi/pc/fileUpload/robot.glb",
  //   "https://threejs.org/examples/models/gltf/SheenChair.glb",
  //   "https://threejs.org/examples/models/gltf/LittlestTokyo.glb",
  // "https://threejs.org/examples/models/gltf/Soldier.glb",
  // "http://localhost:8081/examples/models/gltf/ferrari.glb",
];

var controls, mixer;

var canvas = document.createElement("canvas");
var context = canvas.getContext("webgl2", { alpha: true });

var loader = new GLTFLoader();
// var dracoLoader = new DRACOLoader();
// dracoLoader.setDecoderPath("../libs/draco/gltf");
// loader.setDRACOLoader(dracoLoader);

var clock = new THREE.Clock();
/** 建立了场景、相机和渲染器 */
var scene = new THREE.Scene();
/**
 * @description 透视摄像机 PerspectiveCamera
 * 第一个参数是视野角度（FOV）;第二个参数是长宽比（aspect ratio)
 * 接下来的两个参数是近截面（near）和远截面（far）
 */
var camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0, 0, 100);
camera.lookAt(0, 0, 0);
camera.position.z = 5;

var renderer = new THREE.WebGLRenderer({ canvas, context });
renderer.setSize(window.innerWidth, window.innerHeight);
// three.js 的色彩空间渲染方式  【重要】
renderer.outputEncoding = THREE.sRGBEncoding;
renderer.textureEncoding = THREE.sRGBEncoding;

loader.load(
  availableUrlModelList[availableUrlModelList.length - 1],
  function (gltf) {
    console.log("glft", gltf);
    // 动画
    if (gltf.animations.length) {
      mixer = new THREE.AnimationMixer(gltf.scene);
      const num = 0; // 默认播放第几个动画
      for (var i = 0; i < gltf.animations.length; i++) {
        var action = mixer.clipAction(gltf.animations[i]);
        action.stop();
      }
      gltf.animations[num] && mixer.clipAction(gltf.animations[num]).play();
    }

    gltf.scene.traverse(function (child) {
      if (child.isMesh) {
        child.frustumCulled = false;
        //模型阴影
        child.castShadow = true;
        // 材质丢失再复制，否则会造成部分模型阴影
        child.material.emissive = child.material.color;
        child.material.emissiveMap = child.material.map;
      }
    });
    setModelPosition(gltf.scene);
    scene.add(gltf.scene);
  },
  undefined,
  function (error) {
    console.error(error);
  }
);

// 添加灯光 【重要】
function addLights() {
  scene.add(new THREE.AmbientLight(0xffffff, 0.3));
  var light = new THREE.DirectionalLight(0xffffff, 0.8 * Math.PI);
  light.position.set(0, 50, 0);
  scene.add(light);
}
addLights();

controls = new OrbitControls(camera, renderer.domElement);
// controls.minDistance = 200;
// controls.maxDistance = 800;
// controls.autoRotate = true; // 是否自动旋转
controls.autoRotateSpeed = 1.7;
/**
 * 将renderer（渲染器）的dom元素（renderer.domElement）添加到我们的HTML文档中。
 * 这就是渲染器用来显示场景给我们看的<canvas>元素。
 */
document.body.appendChild(renderer.domElement);

/** 3.渲染场景 */
function animate() {
  requestAnimationFrame(animate);
  // 这段代码每帧都会执行（正常情况下是60次/秒）
  controls.update();
  renderer.render(scene, camera);

  var time = clock.getDelta();
  // update 推进混合器时间并更新动画
  if (mixer) {
    mixer.update(time);
  }
}

animate();

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener("resize", onWindowResize, false);

/**
 * 设置加载模型居中
 * {Object} object 模型对象
 */
function setModelPosition(group) {
  var box3 = new THREE.Box3();
  // 计算层级模型group的包围盒
  // 模型group是加载一个三维模型返回的对象，包含多个网格模型
  box3.expandByObject(group);
  // 计算一个层级模型对应包围盒的几何体中心在世界坐标中的位置
  var center = new THREE.Vector3();
  box3.getCenter(center);
  // console.log('查看几何体中心坐标', center);

  // 重新设置模型的位置，使之居中。
  group.position.x = group.position.x - center.x;
  group.position.y = group.position.y - center.y;
  group.position.z = group.position.z - center.z;
}
