angular.module('onyxCrab', [
  'ui.router'
])
.config(function($httpProvider, $stateProvider, $urlRouterProvider) {
  // $urlRouterProvider.otherwise('/');
  $stateProvider
  .state('index', {
    url: '',
    templateUrl : 'home.html',
    controller: 'MainCtrl',
  })
  .state('stereoView', {
    url: '/stereo',
    params: {'fileName':{}},
    templateUrl: 'stereoView.html',
    controller: 'StereoCtrl'
  })
})
.controller('MainCtrl', function ($scope, $state, $stateParams, $http) {

  // Set of Photos
  $scope.photos = [
    {src: 'photos/dolphin.jpg', desc: 'Image 01'},
    {src: 'photos/earth.jpg', desc: 'Image 02'},
    {src: 'photos/laferrari.jpg', desc: 'Image 03'},
    {src: 'photos/mini.jpg', desc: 'Image 04'},
    {src: 'photos/mmm.jpg', desc: 'Image 05'},
    {src: 'photos/mounds.jpg', desc: 'Image 06'},
    {src: 'photos/parrot.jpg', desc: 'Image 07'},
    {src: 'photos/puppy.jpg', desc: 'Image 08'},
    {src: 'photos/redvsblue.jpg', desc: 'Image 09'},
    {src: 'photos/rose.jpg', desc: 'Image 10'},
    {src: 'photos/space.jpg', desc: 'Image 11'},
    {src: 'photos/strawberry.jpg', desc: 'Image 12'},
    {src: 'photos/swan.jpg', desc: 'Image 13'},
    {src: 'photos/whiteTiger.jpg', desc: 'Image 14'}
  ];

  // if a current image is the same as requested image
  $scope.isActive = function (index) {
    return $scope._Index === index;
  };

  // render the selected image in VR
  $scope.showPhoto = function (index, photo) {
    var fileName = photo.src;
    $state.go('stereoView', {fileName: fileName});

  };

  $scope.uploadFile = function(){
    var input = document.getElementById('photoInput');
    var name = input.value.split('\\');
    name = 'photos/' + name[name.length-1];

    var file = input.files[0];

    // required to post the image data to the server properly
    var fd = new FormData();
    fd.append('file', file);

    $http.post('', fd, {
      transformRequest: angular.identity,
      headers: {'Content-Type': undefined}     
    }).success(function(data){
      console.log(data, 'POSTing image succeeded');
      $scope.photos.push({src: name, desc: "hello"});
    }).error(function(data){
      console.log(data, 'error in POSTing image');
    });
    
  };

})
.controller('StereoCtrl', function($scope, $state, $stateParams){

  var url = window.location.origin;
  var fileName = $stateParams.fileName;
  var filepath = url + '/' + fileName;

  init();
  imageInit(filepath, 650, 450);
  animate();

});
