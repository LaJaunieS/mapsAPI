'use strict'

function initialize() {

	//"global"(to this function) vars for returning later
	var mapObj = {},
		markersArr = [],
		resultsArr = [],
		placesObj = {};
	var seattle = { lat: 47.6062, lng: -122.3321 };
	var currentCtr;
	var searchParam;

	var returnObj = {

//create map and make ready to add to DOM
//custom map control functions
//assign map button listeners
		createMap: function(ctr) {
			var map;
			var containerIs500;
			var mapEl = mapElements.mapEl;
			var mapContainer = mapElements.mapContainer;
			var controlDiv = mapElements.controlDiv;
			var centerBtn = mapElements.centerBtn;

			var mapOptions = {
				center: ctr,
	            zoom: 15,
	            mapTypeId: 'roadmap',
	            tilt: 45,
	            heading: 0,
	            //prevents one-finger scrolling on map on a mobile device
	            gestureHandling: 'cooperative',
	            zoomControl: true,
	            mapTypeControl: true,
	            streetViewControl: true,
	            rotateControl: true,
	            fullscreenControl: true,
	            //ui positioning property
	            streetViewControlOptions: { position: google.maps.ControlPosition.LEFT_BOTTOM  },
	            //styling for map
	            styles: mapStyles
			};
			var mapOptionsSmall = {
				//options for smaller viewport= removes ui controls except for zoom
	            center: ctr,
	            zoom: 12,
	            mapTypeId: 'roadmap',
	            heading: 0,
	            //prevents one-finger scrolling on map on a mobile device
	            gestureHandling: 'greedy',
	            zoomControl: false,
	            mapTypeControl: false,
	            streetViewControl: false,
	            rotateControl: false,
	            fullscreenControl: false,
	            //styling for map
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
	  
		assignMapListeners: function() {
			var centerBtn = mapElements.centerBtn;

			google.maps.event.addDomListener(centerBtn, 'click', returnObj.setMapCenter);

            mapObj.addListener('center_changed', function() {
                centerBtn.style.fontWeight = 500;
                centerBtn.style.color = "rgb(0,0,0)";
                centerBtn.innerHTML = "Re-Center";
            })
		},

		setMapCenter: function() {
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
            //return map.getCenter();
        },
		
		getMapCtr: function() {
			var map = mapObj;
			var ctr = Object.getOwnPropertyNames(map).length === 0? seattle: map.getCenter();
			return ctr;
		},

		getMapObj: function() {
			return mapObj;
		},



//pull data from aPI and return data
//create markers from data and add markers to map
//assign marker listeners
		startSearch: function() {
			var map = mapObj;
			if (Object.getOwnPropertyNames(map).length === 0) {
              console.log('new map object- creating new map');
                returnObj.createMap(seattle);
            } else {
              console.log('existing map object');
                map.setCenter(map.getCenter().toJSON());
                map.setZoom(15);
                //returnObj.getMapObj();
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
        	var map = mapObj;
        	var i =1;
            
            var icons = {
                donuts : {
                    url: "https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png",
                    scaledSize: new google.maps.Size(30,30)
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
                },
            };

            if (status == google.maps.places.PlacesServiceStatus.OK) {
            	resultsArr = results;
            	console.log(results);
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
                    markersArr.push(marker);
            	})
            } else {
            	resultsObj = google.maps.places.PlacesServiceStatus;
            };
        },
		
		getResultsArr: function() {
			return resultsArr;
		},

		getMarkersArr: function() {
			return markersArr;
		}






//pull place data from API on click event
//return place data and make ready to add to DOM
	};
	return returnObj;
}
