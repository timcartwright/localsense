angular.module('starter.controllers', ['ionic','firebase'])

.controller('MapCtrl', ['$firebase', '$ionicPopup', MapCtrl])
.directive('map', MapDtv);

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

function MapDtv() {
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      var zValue = scope.$eval(attrs.zoom);
      var lat = scope.$eval(attrs.lat);
      var lng = scope.$eval(attrs.lng);

      var myLatlng = new google.maps.LatLng(lat,lng),

      mapOptions = {
        zoom: zValue,
        center: myLatlng
      },

      map = new google.maps.Map(element[0],mapOptions),

      marker = new google.maps.Marker({
        position: myLatlng,
        map: map,
        draggable: true
      });

      google.maps.event.addListener(marker, 'dragend', function(evt) {
        console.log('Current Latitude:',evt.latLng.lat(),'Current Longitude:',evt.latLng.lng());
        scope.$parent.map.user.latitude = evt.latLng.lat();
        scope.$parent.map.user.longitude = evt.latLng.lng();
        // scope.$apply();        
      });
    }
  };

};