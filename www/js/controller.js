angular.module('starter.controllers', ['ionic','firebase'])
.controller('MapCtrl', ['$firebase', '$ionicPopup', 'GeoAlert', MapCtrl]);

function MapCtrl($firebase, $ionicPopup, GeoAlert) {

  var map = this;

  // Initiate Firebase
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
    // Get location from map marker
    var lat = map.user.latitude || 17;
    var lgt = map.user.longitude || 78;

    // End the previous game
    GeoAlert.end();

    // Call startGame using the map marker as target
    map.startGame(lat, lgt);

    // Store Marker position in Firebase
    fb.$push({
      latitude: lat,
      longitude: lgt
    }).then(function(ref) {
      map.user.desc = '';
      // map.showAlert('LocalSense', 'Your location has been saved!!');
    }, function(error) {
      console.log('Error:', error); 
    });
  };

  map.startGame = function(latitude, longitude) {
    
    map.showAlert('LocalSense', 'Game Started!!');
    
    // Begin the game using the GeoAlert service
    GeoAlert.begin(latitude, longitude, function() {
      // Callback function run when target is reached
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