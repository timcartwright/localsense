angular.module('starter.controllers', ['ionic','firebase'])
.controller('MapCtrl', ['$firebase', '$ionicPopup', MapCtrl]);

function MapCtrl($firebase, $ionicPopup) {

  var map = this;
  var firebaseObj = new Firebase("https://localsense.firebaseio.com/MapDetails");
  var fb = $firebase(firebaseObj);

  map.user = {};

  map.showAlert = function() {
    $ionicPopup.alert({
      title: 'LocalSense',
      template: 'Your location has been saved!!'
    });
  };

  map.saveDetails = function() {
    var lat = map.user.latitude;
    var lgt = map.user.longitude;
    var des = map.user.desc;

    fb.$push({
      latitude: lat,
      longitude: lgt,
      description: des
    }).then(function(ref) {
      map.user.desc = '';
      map.showAlert();
    }, function(error) {
      console.log('Error:', error); 
    });
  };
};