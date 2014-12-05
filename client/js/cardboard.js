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

function resize() {
  var width = container.offsetWidth;
  var height = container.offsetHeight;

  camera.aspect = width / height;
  camera.updateProjectionMatrix();

  renderer.setSize(width, height);
  effect.setSize(width, height);
}

function update(dt) {
  resize();
  camera.updateProjectionMatrix();
  controls.update(dt);
}

function render(dt) {
  effect.render(scene, camera);
}

function animate(t) {
  requestAnimationFrame(animate);

  update(clock.getDelta());
  render(clock.getDelta());
}

function fullscreen() {
  if (container.requestFullscreen) {
    container.requestFullscreen();
  } else if (container.msRequestFullscreen) {
    container.msRequestFullscreen();
  } else if (container.mozRequestFullScreen) {
    container.mozRequestFullScreen();
  } else if (container.webkitRequestFullscreen) {
    container.webkitRequestFullscreen();
  }
}
