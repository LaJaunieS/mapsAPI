
console.log('test');
//existing DOM elements
var headerDiv = document.getElementById('headerContainer');
var mapContainer = document.getElementById('mapContainer');
var mapEl = document.getElementById('map');    
var searchBtn = document.getElementById('searchBtn');
var resultsList = document.getElementById('resultsList');
var searchParam;

//set custom controls
var controlDiv = document.createElement('div');
var centerBtn = document.createElement('button');
    controlDiv.id="controlDiv";
    centerBtn.id = "center";
    centerBtn.innerText = "Centered";
    controlDiv.appendChild(centerBtn);

//map variables
var containerIs500 = mapContainer.clientWidth <= 500;    
var seattle = { lat: 47.6062, lng: -122.3321 };

var map= {};
var markers = [];


//map create only after click event on search button

function createMap(ctr) {
    mapContainer.style.display = "block";
    var mapOptionsSmall = {

    //options for smaller viewport= removes ui controls except for zoom
    center: ctr,
    zoom: 12,
    mapTypeId: 'roadmap',
    heading: 0,
    //prevents one-finger scrolling on map on a mobile device
    gestureHandling: 'cooperative',
    zoomControl: true,
    mapTypeControl: false,
    streetViewControl: false,
    rotateControl: false,
    fullscreenControl: false,
    //styling for map
    styles: [   {
        "featureType": "administrative",
        "elementType": "labels.text",
        "stylers": [
          {
            "color": "#314420"
          }
        ]
      },
      {
        "featureType": "administrative",
        "elementType": "labels.text.stroke",
        "stylers": [
          {
            "color": "#ffffff"
          }
        ]
      },
      {
        "featureType": "administrative.locality",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#0a0d06"
          }
        ]
      },
      {
        "featureType": "administrative.locality",
        "elementType": "geometry.fill",
        "stylers": [
          {
            "color": "#0a0d06"
          }
        ]
      },
      {
        "featureType": "administrative.locality",
        "elementType": "geometry.stroke",
        "stylers": [
          {
            "color": "#0a0d06"
          }
        ]
      },
      {
        "featureType": "landscape",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#314420"
          }
        ]
      },
      {
        "featureType": "landscape",
        "elementType": "labels.text.stroke",
        "stylers": [
          {
            "color": "#ffffff"
          }
        ]
      },
      {
        "featureType": "landscape.natural",
        "elementType": "geometry.fill",
        "stylers": [
          {
            "color": "#a9c98b"
          }
        ]
      },
      {
        "featureType": "landscape.natural",
        "elementType": "labels.text",
        "stylers": [
          {
            "color": "#314420"
          }
        ]
      },
      {
        "featureType": "landscape.natural",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#314420"
          }
        ]
      },
      {
        "featureType": "landscape.natural",
        "elementType": "labels.text.stroke",
        "stylers": [
          {
            "color": "#ffffff"
          }
        ]
      },
      {
        "featureType": "road",
        "elementType": "geometry.fill",
        "stylers": [
          {
            "color": "#808040"
          },
          {
            "weight": 1
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "geometry.fill",
        "stylers": [
          {
            "color": "#eee9bb"
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "labels.text",
        "stylers": [
          {
            "color": "#400040"
          },
          {
            "visibility": "simplified"
          },
          {
            "weight": 8
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "visibility": "on"
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "labels.text.stroke",
        "stylers": [
          {
            "visibility": "on"
          }
        ]
      }
    ]
}; 
    var mapOptions = {


    center: ctr,
    zoom: 15,
    mapTypeId: 'roadmap',
    tilt: 45,
    heading: 0,
    //prevents one-finger scrolling on map on a mobile device
    gestureHandling: 'cooperative',
    //ui positioning property
    streetViewControlOptions: { position: google.maps.ControlPosition.LEFT_BOTTOM  },
    //styling for map
    styles: [   {
        "featureType": "administrative",
        "elementType": "labels.text",
        "stylers": [
          {
            "color": "#314420"
          }
        ]
      },
      {
        "featureType": "administrative",
        "elementType": "labels.text.stroke",
        "stylers": [
          {
            "color": "#ffffff"
          }
        ]
      },
      {
        "featureType": "administrative.locality",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#0a0d06"
          }
        ]
      },
      {
        "featureType": "administrative.locality",
        "elementType": "geometry.fill",
        "stylers": [
          {
            "color": "#0a0d06"
          }
        ]
      },
      {
        "featureType": "administrative.locality",
        "elementType": "geometry.stroke",
        "stylers": [
          {
            "color": "#0a0d06"
          }
        ]
      },
      {
        "featureType": "landscape",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#314420"
          }
        ]
      },
      {
        "featureType": "landscape",
        "elementType": "labels.text.stroke",
        "stylers": [
          {
            "color": "#ffffff"
          }
        ]
      },
      {
        "featureType": "landscape.natural",
        "elementType": "geometry.fill",
        "stylers": [
          {
            "color": "#a9c98b"
          }
        ]
      },
      {
        "featureType": "landscape.natural",
        "elementType": "labels.text",
        "stylers": [
          {
            "color": "#314420"
          }
        ]
      },
      {
        "featureType": "landscape.natural",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#314420"
          }
        ]
      },
      {
        "featureType": "landscape.natural",
        "elementType": "labels.text.stroke",
        "stylers": [
          {
            "color": "#ffffff"
          }
        ]
      },
      {
        "featureType": "road",
        "elementType": "geometry.fill",
        "stylers": [
          {
            "color": "#808040"
          },
          {
            "weight": 1
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "geometry.fill",
        "stylers": [
          {
            "color": "#eee9bb"
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "labels.text",
        "stylers": [
          {
            "color": "#400040"
          },
          {
            "visibility": "simplified"
          },
          {
            "weight": 8
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "visibility": "on"
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "labels.text.stroke",
        "stylers": [
          {
            "visibility": "on"
          }
        ]
      }
    ]
}; 
    mapEl.style.display = "block";

    if (!containerIs500) {
        map = new google.maps.Map(mapEl, mapOptions);
        map.controls[google.maps.ControlPosition.BOTTOM_CENTER].push(controlDiv);
        controlDiv.style.marginBottom = "25px";
    } else {
        map = new google.maps.Map(mapEl, mapOptionsSmall);
        map.controls[google.maps.ControlPosition.LEFT_BOTTOM].push(controlDiv);
    };

    assignMapListeners();
}



//listener functions
function setCenter() {
    //add listener later that changes when map moves- see above for using center_changed event
    map.setCenter(seattle);
    map.setZoom(15);
    !function() {
        centerBtn.style.fontWeight = 400;
        centerBtn.style.color = "rgb(86,86,86)";
        centerBtn.innerText = "Centered";
        }();
    }

function showMarkerInfo() {
   var target = document.getElementById(this.id);
    targetOffSet = target.offsetTop-400;
    target.style.backgroundColor = "efefef";
    resultsList.scrollTop = targetOffSet;
    target.style.backgroundColor = "#efefef";
}

function removeMarkerInfo() {
    var target = document.getElementById(this.id);
    target.style.backgroundColor = "#fff";
}

function centerOnResult() {
    map.setCenter(this.location);
}

function assignMapListeners() {
        //listeners
    google.maps.event.addDomListener(centerBtn, 'click', setCenter);

    map.addListener('center_changed', function() {
        centerBtn.style.fontWeight = 500;
        centerBtn.style.color = "rgb(0,0,0)";
        centerBtn.innerText = "Re-Center";
    })

}

function startSearch() {
    headerDiv.style.display = "none";
    
    if (Object.getOwnPropertyNames(map).length === 0) {
        createMap(seattle);
    } else {
        map.setCenter(map.getCenter().toJSON());
    };
    callService();
}

function callService() {
    var service = new google.maps.places.PlacesService(map);
    searchParam = JSON.parse(document.getElementsByTagName('select')[0].value);
    //console.log(searchParam);
    var request = {
            location: map.getCenter() || seattle,
            rankBy: google.maps.places.RankBy.DISTANCE,
            type: searchParam.type,
            name: searchParam.name  //eventually passed in as to input field value
        };           

    //request.location = map.getCenter();
    service.nearbySearch(request, searchCallback);
}


function searchCallback(results, status) {
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
    
    var ul = document.createElement('ul');
    
    //clear earlier markers if any, add new markers, add list results to dom
    if (status == google.maps.places.PlacesServiceStatus.OK) {
        markers.forEach(function(marker){
            marker.setMap(null);
        })
        
        resultsList.innerHTML = "";                
        markers = [];
        
        results.forEach(function(item){
            //improves relevance of search results
           // if (item.types[0] === searchParam) {
                //create markers and add listeners from each item in results array
                    
                    var marker = new google.maps.Marker({
                    id: item.id,
                    position: item.geometry.location,
                    icon: icons[searchParam.name],
                    map: map,
                    title: item.name + "\n" + item.vicinity,
                    label: '' + i + '',
                    vicinity: item.vicinity
                });
                markers.push(marker);
                
                var li = document.createElement('li');

                li.innerHTML = "<h2>" + i + ". " + item.name + "</h2><p>" + item.vicinity;
                li.id = item.id;
                li.location = item.geometry.location;
                google.maps.event.addDomListener(li,'click',centerOnResult);
                ul.appendChild(li);

                marker.addListener('mouseover', showMarkerInfo);
                marker.addListener('mouseout', removeMarkerInfo);
                i++;
                //console.log(item);
               // };
            });
        
            resultsList.scrollTop = 0;
            resultsList.style.height = "400px";
            resultsList.appendChild(ul);
        } else {
            console.log('connection error');
    };
};

//separate listener - needs to be assigned before map element created
searchBtn.onclick = startSearch;



   //API Key - AIzaSyD-ysCChphJtFjAWNY0ge7kwE7YGlPFEXw
    //!!remember to restrict api key in api console access to specific domain before putting in production
    //also when finished building remember to wrap everything in an initialize function that will call with the window.onload event handler
