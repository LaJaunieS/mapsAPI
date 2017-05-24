//to do- bring in jquery for basic uis like expand list?
//fix geolocation feature to only search user location on initial search- after that search from current map center as before
//something isn't working with initial input option

'use strict'
var _gmaps = initializeMap();
var _dom = dom();
var _getUserLocation = getUserLocation();

	

navigator.geolocation.getCurrentPosition(function(position){
	_getUserLocation.setLocation(position);
	});  //add error handler; not currently working in safari/mobile


var mapResults = [];
var placeResults = {};

			
searchElements.searchBtn.onclick = _gmaps.startSearch;








