

//to do-add callout marker showing location; add marker showing item centered upon

//script sequence:
//elements.js
//location.js
//mapStyles.js
//map.js
//search.js
//dom.js
//main.js

'use strict'
var _gmaps = initializeMap(),
	_dom = dom(),
	_getUserLocation = getUserLocation(),
	mapResults = [],
	placeResults = {};

navigator.geolocation.getCurrentPosition(function(position){
	_getUserLocation.setLocation(position);
	});  //add error handler; 

			
searchElements.searchBtn.addEventListener('click', function() {
	if (document.getElementById('visible-option').children[0].innerHTML !== "Show me...") {
		_gmaps.startSearch();	
	};
})








