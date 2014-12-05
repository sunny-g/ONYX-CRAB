function Cardboard() {

  this.renderer = new THREE.WebGLRenderer({
    antialias: true
  });
  this.renderer.setSize(window.innerWidth, window.innerHeight);
var camera, scene, renderer;
var effect, controls;
var element, container;

var clock = new THREE.Clock();

function sceneInit() {
  /********************/
  /********************/
  // BOILERPLATE TO RENDER THE ENVIRONMENT
  // DO NOT TOUCH THIS
  renderer = new THREE.WebGLRenderer();
  element = renderer.domElement;
  container = document.getElementById('stereoView');
  container.appendChild(element);

  effect = new THREE.StereoEffect(renderer);
  scene = new THREE.Scene();

  /********************/
  // UNDERSTAND THIS STUFF BETTER
  // camera = new THREE.PerspectiveCamera(90, 1, 0.001, 700);
  camera = new THREE.PerspectiveCamera(45, 650/580, 0.1, 700 );
  camera.position.set(0, 10, 0);
  scene.add(camera);

  controls = new THREE.OrbitControls(camera, element);
  controls.rotateUp(Math.PI / 2);
  controls.target.set(
    // camera.position.x + 0.1,
    camera.position.x,
    camera.position.y,
    camera.position.z
  );
  controls.noZoom = true;
  controls.noPan = true;

  var pointLight =
    new THREE.PointLight(0xFFFFFF);

  // set its position
  pointLight.position.x = 10;
  pointLight.position.y = 50;
  pointLight.position.z = 130;

  // add to the scene
  scene.add(pointLight);

  function setOrientationControls(e) {
    if (!e.alpha) {
      return;
    }

    controls = new THREE.DeviceOrientationControls(camera, true);
    controls.connect();
    controls.update();

    element.addEventListener('click', fullscreen, false);
    window.removeEventListener('deviceorientation', setOrientationControls);
  }

  window.addEventListener('deviceorientation', setOrientationControls, true);

  var light = new THREE.HemisphereLight(0x777777, 0x000000, 0.6);
  scene.add(light);
  
  window.addEventListener('resize', resize, false);
  setTimeout(resize, 1);
}

  this.scene = new THREE.Scene();
  this.effect = new THREE.StereoEffect(this.renderer);

  this.camera = new THREE.PerspectiveCamera(
  90, window.innerWidth / window.innerHeight, 0.001, 700);
  this.scene.add(this.camera);

  this.controls = new THREE.DeviceOrientationControls(this.camera, true);

  this.orbitControls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
  this.orbitControls.noZoom = true;
  this.orbitControls.noPan = true;
  this.orbitControls.autoRotate = false;

  window.addEventListener('resize', this.resize.bind(this), false);

  this._initControls = this.initControls.bind(this);
  window.addEventListener('deviceorientation', this._initControls, false);

  setTimeout(this.resize.bind(this), 0);

  // hack for resize when iframe doesn't get a rotation event
  // window.addEventListener('message', this.resize.bind(this), false );

  this.animate = this.animate.bind(this);
  setTimeout(this.play.bind(this), 0);

}

Cardboard.prototype.initControls = function(event) {
  if (event.alpha) {

    window.removeEventListener('deviceorientation', this._initControls, false);
    this.renderer.domElement.addEventListener('click', this.fullscreen.bind(this), false);

    this.orbitControls.enabled = false;

    this.controls.connect();
    this.controls.update();
  }
};

Cardboard.prototype.animate = function() {
  if (!this._playing)
    return;
  requestAnimationFrame(this.animate);
  this.update();
  this.render();
};

Cardboard.prototype.pause = function() {
  this._playing = false;
};

Cardboard.prototype.play = function() {
  if (this._playing) return;
  this._playing = true;
  this.animate();
};

Cardboard.prototype.update = function() {
  // hack to resize if width and height change
  if (this.width !== window.innerWidth || this.height !== window.innerHeight) {
    this.resize();
  }
  this.camera.updateProjectionMatrix();
  if (this.controls.freeze === false) {
    this.controls.update();
  } else {
    this.orbitControls.update();
  }
};

Cardboard.prototype.render = function() {
  //if (this.controls.freeze === false) {
  this.effect.render(this.scene, this.camera);
  //} else {
  //this.renderer.render(this.scene, this.camera);
  //}
};

Cardboard.prototype.fullscreen = function() {
  if (this.renderer.domElement.requestFullscreen) {
    this.renderer.domElement.requestFullscreen();
  } else if (this.renderer.domElement.msRequestFullscreen) {
    this.renderer.domElement.msRequestFullscreen();
  } else if (this.renderer.domElement.mozRequestFullScreen) {
    this.renderer.domElement.mozRequestFullScreen();
  } else if (this.renderer.domElement.webkitRequestFullscreen) {
    this.renderer.domElement.webkitRequestFullscreen();
  }
};

Cardboard.prototype.resize = function() {
  this.width = window.innerWidth;
  this.height = window.innerHeight;
  this.camera.aspect = this.width / this.height;
  this.camera.updateProjectionMatrix();
  this.renderer.setSize(this.width, this.height);
  this.effect.setSize(this.width, this.height);
};
