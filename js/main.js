//to do- bring in jquery for basic uis like expand list?
//use google or js geolocation to base search on users location
//link to directions based on user location
//change input ui to buttons

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








