!function initialize() {

    //console.log('test');
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
      centerBtn.innerHTML = "Centered";
      controlDiv.appendChild(centerBtn);

  //map variables
    
  //breakpoint in css
  var windowIs760 = container.clientWidth >= 760;
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
          gestureHandling: 'greedy',
          zoomControl: false,
          mapTypeControl: false,
          streetViewControl: false,
          rotateControl: false,
          fullscreenControl: false,
          //styling for map
          styles: mapStyles
      }; 
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
      //for setting map controls
      var containerIs500 = mapContainer.clientWidth > 500;  
      
      mapEl.style.display = "block";
      
      if (containerIs500) {
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
      map.setCenter(seattle);
      map.setZoom(15);
      !function() {
          centerBtn.style.fontWeight = 400;
          centerBtn.style.color = "rgb(86,86,86)";
          centerBtn.innerHTML = "Centered";
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
      map.setZoom(15);
  }

  function assignMapListeners() {
          //listeners
      google.maps.event.addDomListener(centerBtn, 'click', setCenter);

      map.addListener('center_changed', function() {
          centerBtn.style.fontWeight = 500;
          centerBtn.style.color = "rgb(0,0,0)";
          centerBtn.innerHTML = "Re-Center";
      })

  }

  function assignPlaceDetailsListeners() {
      var expand = document.querySelectorAll('.expand');
      //console.log(expand);
      for(var aa = 0; aa < expand.length; aa++) {
          expand[aa].addEventListener('click', function(){
            var id = this.parentNode.id;
            searchPlaces(id);
            //console.log(id);
          });
      };
  //console.log(expand);
  }

  function startSearch() {
      headerDiv.style.display = "none";
      
      if (Object.getOwnPropertyNames(map).length === 0) {
          createMap(seattle);
      } else {
          map.setCenter(map.getCenter().toJSON());
          map.setZoom(15);
      };
      callService();
  }

  function callService() {
      var service = new google.maps.places.PlacesService(map);
      searchParam = JSON.parse(document.getElementById('visible-option').children[0].dataset.searchparams);
      
      var request = {
              location: map.getCenter() || seattle,
              rankBy: google.maps.places.RankBy.DISTANCE,
              type: searchParam.type,
              name: searchParam.name  
          };           

      service.nearbySearch(request, searchCallback);
  }


  function searchPlaces(id) {
      var request = {
        placeId: id
      };
      var service = new google.maps.places.PlacesService(map);
      console.log(request.placeId);
      service.getDetails(request,placesCallback);
  }

  function placesCallback(place, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      console.log(place);
      } else {
        console.log(status);
      }
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
          //console.log(results);
          results.forEach(function(item){
              //improves relevance of search results
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
              markers.push(marker);
                  
              var li = document.createElement('li');
              li.innerHTML = "<h2>" + i + ". " + item.name + "</h2><p>" + item.vicinity + "</p><p class='expand'>More</p>";
              li.id = item.place_id;
              li.location = item.geometry.location;
              
              google.maps.event.addDomListener(li,'click',centerOnResult);
              ul.appendChild(li);

              marker.addListener('mouseover', showMarkerInfo);
              marker.addListener('mouseout', removeMarkerInfo);
              i++;
          });

          resultsList.scrollTop = 0;
          resultsList.style.visibility = "visible";
          if (windowIs760) {
              resultsList.style.height = "90vh";
          } else {
              resultsList.style.height = "400px";
          };
          resultsList.appendChild(ul);
          assignPlaceDetailsListeners();
                   
      } else {
          console.log('connection error');
      };
  }



     //API Key - AIzaSyD-ysCChphJtFjAWNY0ge7kwE7YGlPFEXw
      //!!remember to restrict api key in api console access to specific domain before putting in production
      //also when finished building remember to wrap everything in an initialize function that will call with the window.onload event handler
      searchBtn.onclick = startSearch;
      startSearch();  //remove when finished with expanded results list
  

}()


  