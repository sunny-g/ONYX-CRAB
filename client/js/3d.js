// var url = 'http://localhost:3000/';
// var filename = 'photos/dolphin.jpg';

function imageInit(url, filename) {
  var pic = THREE.ImageUtils.loadTexture(url + filename, null, function() {
    console.log('loading texture');
  }, function(err) {
    console.log('got an error loading texture');
  });
  var planegeometry = new THREE.PlaneGeometry( 635, 441 );
  var planematerial = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    // side: THREE.DoubleSide,
    map: pic
  });
  var plane = new THREE.Mesh( planegeometry, planematerial );
  scene.add( plane );

  camera.position.y = 441 / 1.5;
}
