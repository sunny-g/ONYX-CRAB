// var url = 'http://localhost:3000/';
// var filename = 'photos/dolphin.jpg';
var cardboard;

function setup() {

  cardboard = new Cardboard();
  imageInit(1,2, cardboard);
  cardboard.effect.separation = 0.6;
  cardboard.update = function() {
    Cardboard.prototype.update.call(this);
  };
  document.getElementById('stereoView').appendChild(cardboard.renderer.domElement);
}

function imageInit(url, filename) {

  var pic = THREE.ImageUtils.loadTexture(url + filename, null, function() {
    console.log('loading texture');
  }, function(err) {
    if (err) {
      console.log('got an error loading texture');
    }
  });

  var planegeometry = new THREE.PlaneGeometry( 635, 441 );
  var planematerial = new THREE.MeshBasicMaterial({
    color: 0xFFFFFF,
    map: pic
  });
  var plane = new THREE.Mesh( planegeometry, planematerial );
  cardboard.scene.add( plane );

  cardboard.camera.position.y = 441 / 1.5;
}
