angular.module('starter.controllers', ['ionic','firebase'])
.controller('MapCtrl', ['$firebase', '$ionicPopup', 'GeoAlert', MapCtrl]);

function MapCtrl($firebase, $ionicPopup, GeoAlert) {

  var map = this;
  var firebaseObj = new Firebase("https://localsense.firebaseio.com/MapDetails");
  var fb = $firebase(firebaseObj);

  map.user = {};

  map.showAlert = function(title, message) {
    $ionicPopup.alert({
      title: title,
      template: message
    });
  };

  map.saveDetails = function() {
    var lat = map.user.latitude || 17;
    var lgt = map.user.longitude || 78;

    GeoAlert.end();
    map.startGame(lat, lgt);

    fb.$push({
      latitude: lat,
      longitude: lgt
    }).then(function(ref) {
      map.user.desc = '';
      map.showAlert('LocalSense', 'Your location has been saved!!');
    }, function(error) {
      console.log('Error:', error); 
    });
  };

  map.startGame = function(latitude, longitude) {
    
    map.showAlert('LocalSense', 'Game Started!!');
    
    GeoAlert.begin(latitude, longitude, function() {
      console.log('TARGET');
      GeoAlert.end();
      map.showAlert('LocalSense', "You're there!!"); 
    });
  };

  map.endGame = function() {
    GeoAlert.end();
    map.showAlert('LocalSense', "Game Ended"); 
  };
};