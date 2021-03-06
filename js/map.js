'use strict'

function initializeMap() {

	//"global"(to this function) vars for returning later
	var mapObj = {},
		markersArr = [],
		resultsArr = [],
		placesObj = {},
		directionsObj = {};

	var seattle = { lat: 47.6062, lng: -122.3321 };
	
	var currentCtr, 
		searchParam,
		userLoc,
		directionsDisplay;


	var returnObj = {

		//create map and make ready to add to DOM
		//custom map control functions
		//assign map button listeners
		createMap: function(ctr) {
			var map,
				containerIs500,
				mapEl = mapElements.mapEl,
				mapContainer = mapElements.mapContainer,
				controlDiv = mapElements.controlDiv,
				centerBtn = mapElements.centerBtn;

			var mapOptions = {
				center: ctr,
	            zoom: 15,
	            mapTypeId: 'roadmap',
	            tilt: 45,
	            heading: 0,
	            gestureHandling: 'cooperative',
	            zoomControl: true,
	            mapTypeControl: true,
	            streetViewControl: true,
	            rotateControl: true,
	            fullscreenControl: true,
	            streetViewControlOptions: { position: google.maps.ControlPosition.LEFT_BOTTOM  },
	            styles: mapStyles
			};
			var mapOptionsSmall = {
				//options for smaller viewport= removes ui controls except for zoom
	            center: ctr,
	            zoom: 12,
	            mapTypeId: 'roadmap',
	            heading: 0,
	            gestureHandling: 'greedy',
	            zoomControl: false,
	            mapTypeControl: false,
	            streetViewControl: false,
	            rotateControl: false,
	            fullscreenControl: false,
	            styles: mapStyles
			};
			
			controlDiv.id = "controlDiv";
			centerBtn.id = "center";
      		centerBtn.innerHTML = "Centered";
      		controlDiv.appendChild(centerBtn);
      		mapContainer.style.display = "block";
			containerIs500 = mapContainer.clientWidth > 500;	

			if (containerIs500) {
		    	map = new google.maps.Map(mapEl, mapOptions);
			   	map.controls[google.maps.ControlPosition.BOTTOM_CENTER].push(controlDiv);
		    	controlDiv.style.marginBottom = "25px";
	    	} else {
	        	map = new google.maps.Map(mapEl, mapOptionsSmall);
		    	map.controls[google.maps.ControlPosition.LEFT_BOTTOM].push(controlDiv);
		    };
		 
			mapObj = map;
			currentCtr = returnObj.getMapCtr();
			returnObj.assignMapListeners();
			
		},
	  	
	  	//#####event handlers######
		assignMapListeners: function() {
			var centerBtn = mapElements.centerBtn;

			google.maps.event.addDomListener(centerBtn, 'click', returnObj.setMapCenter);

            mapObj.addListener('center_changed', function() {
                centerBtn.style.fontWeight = 500;
                centerBtn.style.color = "rgb(0,0,0)";
                centerBtn.innerHTML = "Re-Center";
            })
		},

		highlightMarkerResult: function() {
			var target = document.getElementById(this.id);
			_dom.highlightTarget(target);
		},
		

		setMapCenter: function() {
			//uses map,setCenter but also other changes to zoom and centerBtn
			var map = mapObj;
			var centerBtn = mapElements.centerBtn;
			var ctr = currentCtr;
			
			map.setCenter(ctr);
            map.setZoom(15);
            !function() {
                centerBtn.style.fontWeight = 400;
                centerBtn.style.color = "rgb(86,86,86)";
                centerBtn.innerHTML = "Centered";
                }();
        },
		
		//#####categories search functions#####
		startSearch: function(fn) {
			var map = mapObj;
			var ctr;
			_dom.repositionSearchBar();
			if (Object.getOwnPropertyNames(map).length === 0) {
              	console.log('new map object- creating new map');
                returnObj.createMap(userLoc || seattle);
            } else {
              	console.log('existing map object');
              	//recenter map on new map bounds center
              	//clear initial loc value based on user loc
              	currentCtr = returnObj.getMapCtr();
              	returnObj.setMapCenter();
            };
            returnObj.callService();
		},

		callService: function() {
			var map = mapObj;
			var service = new google.maps.places.PlacesService(map);
			var searchEl = searchElements.searchInput;
						
			searchParam = JSON.parse(searchEl.dataset.searchparams);
            
            var request = {
                    location: returnObj.getMapCtr(),
                    rankBy: google.maps.places.RankBy.DISTANCE,
                    type: searchParam.type,
                    name: searchParam.name  
                };           

            service.nearbySearch(request, returnObj.searchCallback);
        },

        searchCallback: function(results,status) {
        	var i = 1;
        	var map = mapObj;
        	var icons = {
                donuts : {
                    url: "img/donut.png",
                    scaledSize: new google.maps.Size(40,40)
                },
                beers : {
                    url: "https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png",
                    scaledSize: new google.maps.Size(30,30)
                },
                burgers: {
                    url: "https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png",
                    scaledSize: new google.maps.Size(30,30)
                },
                coffee: {
                    url: "https://maps.gstatic.com/mapfiles/place_api/icons/cafe-71.png",
                    scaledSize: new google.maps.Size(30,30)
                },
                books : {
                    url: "https://maps.gstatic.com/mapfiles/place_api/icons/shopping-71.png",
                    scaledSize: new google.maps.Size(30,30)
                }
            };

            if (status == google.maps.places.PlacesServiceStatus.OK) {
            	resultsArr = results;
            	markersArr.forEach(function(marker){
                     marker.setMap(null);
                })
                markersArr = [];
                
                returnObj.removeExistingDirectionDisplay();

            	results.forEach(function(item) {
            		
					//create markers and add listeners from each item in results array
                    var marker = new google.maps.Marker({
                            id: item.place_id,
                            position: item.geometry.location,
                            icon: icons[searchParam.name],
                            map: map,
                            title: item.name + "\n" + item.vicinity,
                            label: '' + i + '',
                            vicinity: item.vicinity
                    });
                    marker.addListener('click',returnObj.highlightMarkerResult);
                    markersArr.push(marker);
                    i++;
            	})
            } else {
            	resultsArr = google.maps.places.PlacesServiceStatus;
            };

    		mapResults = resultsArr;
    		//prefer to call on dom.js (where function is declared) for clarity but need to call here because async maps callback 
            _dom.createResultsList()
                       
        },

        //#####places search functions#####

		searchPlaces: function(id) {
			var map = mapObj;
			var request = {
				placeId: id
			};
			var service = new google.maps.places.PlacesService(map);
			returnObj.removeExistingDirectionDisplay();
			service.getDetails(request, returnObj.placesCallback);
		},

		placesCallback: function(place,status) {
			if (status == google.maps.places.PlacesServiceStatus.OK) {
				placeResults = place;
				placesObj = place;
				_dom.expandPlacesDiv(placeResults.place_id)
			} else {
				placesObj = status;
			}
		},

		removeExistingDirectionDisplay: function() {
			if (directionsDisplay) {
				directionsDisplay.setMap(null);
			};
		},

		//#####directions search functions#####

		startDirections: function(location) {
			var map = mapObj;
			var directionsService;
			var request = {
				origin: userLoc || seattle,
				destination: location,
				travelMode: 'DRIVING'
			};
			returnObj.removeExistingDirectionDisplay();
			directionsDisplay = new google.maps.DirectionsRenderer();
			directionsService = new google.maps.DirectionsService();
			directionsDisplay.setMap(map);
			directionsService.route(request, returnObj.directionsCallback)
		},

		directionsCallback: function(result, status) {
			if (status == "OK") {
				directionsDisplay.setDirections(result);
				directionsObj = result;
				markersArr.forEach(function(marker){
					marker.setMap(null);
			});


			} else {
				console.log(status);
			};
		},

		//#####getters#####

		getMapCtr: function() {
			//if new map ctrs on seattle otherwise current center
			var map = mapObj;
			var ctr = Object.getOwnPropertyNames(map).length === 0? userLoc: map.getCenter().toJSON();
			return ctr;
		},

		getMapObj: function() {
			return mapObj;
		},

		getResultsArr: function() {
			return resultsArr;
		},

		getMarkersArr: function() {
			return markersArr;
		},

		getPlacesObj: function() {
			return placesObj;
		},

		getDirectionsObj: function() {
			return directionsObj;
		},

		getDirectionsDisplay: function() {
			return directionsDisplay;
		},

		//doesn't really 'set' it, just takes location and passes it to a variable
		setUserLoc: function(position) {
			userLoc = { 
			 	lat: _getUserLocation.getloc().coords.latitude,
			 	lng: _getUserLocation.getloc().coords.longitude
				 };
			return userLoc;
		}


	};
	return returnObj;
}

