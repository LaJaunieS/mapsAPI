//to do- bring in jquery for basic uis like expand list?
//fix geolocation feature to only search user location on initial search- after that search from current map center as before
//something isn't working with initial input option

'use strict'
var _gmaps = initializeMap(),
	_dom = dom(),
	_getUserLocation = getUserLocation(),
	mapResults = [],
	placeResults = {};

navigator.geolocation.getCurrentPosition(function(position){
	_getUserLocation.setLocation(position);
	});  //add error handler; 

			
searchElements.searchBtn.onclick = _gmaps.startSearch;








