function dom() {
	var	windowIs760 = container.clientWidth >= 760,
		
		returnObj = {

		repositionSearchBar: function() {
			var searchBar = document.getElementById('searchBar');
			if (windowIs760) {
				searchBar.style.margin = "10px 0 0";
			} else {
				searchBar.style.margin = "10px auto 0";
			};
		},

		createResultsList: function() {
			var i = 1;

			resultsElements.resultsUl.innerHTML = "";
			resultsElements.resultsLiArr = [];
			resultsElements.resultsList.style.visibility = "visible";
			resultsList.scrollTop = 0;
			mapResults = _gmaps.getResultsArr();
			mapResults.forEach(function(item){
				var li = document.createElement('li');
				var expandLink;

				li.innerHTML = "<h2>" + i + ". " + item.name + "</h2><p>" + item.vicinity + "</p><div class='expand'><p>More</p></div><div class='placeInfo'></div>";
  				li.id = item.place_id;
  				li.location = item.geometry.location;
  				resultsElements.resultsLiArr.push(li);
  				li.onclick = _dom.centerOnResult;
  				resultsElements.resultsUl.appendChild(li);
  				resultsElements.resultsList.appendChild(resultsElements.resultsUl);
  				expandLink = li.querySelector('.expand p');
				
				expandLink.addEventListener('click', function() {
					_dom.placesTarget(li.id);
  				});
  				
	  			if (windowIs760) {
	  				resultsList.style.height = "90vh";
	  			} else {
	            	resultsList.style.height = "400px";
	  			};
	  			i++;
			});
		},

		centerOnResult: function() {
			var map = _gmaps.getMapObj();
			
			_gmaps.getMapObj().setCenter(this.location);
			_gmaps.getMapObj().setZoom(15);
			//if directions lookup would have cleared markers- re-add to map
			_gmaps.getMarkersArr().forEach(function(marker){
				if (marker.map === null) {
					marker.setMap(map);
				};
			});
			
		},

		highlightTarget: function(target) {
			var targetOffSet = target.offsetTop-300;
			target.style.animation = "";
			resultsElements.resultsList.scrollTop = targetOffSet;
			target.style.animation = "flash .5s";
		},

		placesTarget: function(id) {
			var target = document.getElementById(id);
			_gmaps.searchPlaces(id);
		},

		setOpenClosed: function(openOrClosed) {
			if (openOrClosed.open_now) {
				//el.className = "open";
				return 'Open Now'
			} else {
				//el.className = "closed";
				return 'Closed';
			};
		},

		expandPlacesDiv: function(targetEl) {
			var target = document.getElementById(targetEl);
			var addr = placeResults.formatted_address || "none";
			var openOrClosed = placeResults.opening_hours || "none";
			var testIfOpen = returnObj.setOpenClosed(openOrClosed) || "none";
			var openClosedEl;
			var directionsBtn;
			
			placesElements.placesUl.innerHTML = "";
			placesElements.placesUl.innerHTML = '<li>' + placeResults.formatted_address + '</li> <li id="buttons"> <button class="btn-contact btn-directions">Directions</button><a href="tel:'+ placeResults.formatted_phone_number + '"><button class="btn-contact btn-phone">Phone</button></a><a target="_blank" href="' + placeResults.website + '"><button class="btn-contact btn-website">Website</button></a> </li> <li id="open-or-closed">' + testIfOpen + '</li>'; 
			
			placesElements.openHoursLi.class = "open-hours";
			placesElements.openHoursLi.innerHTML = '<div> <ul>';
			
			//some results didnt have opening hours - note and handle this error condition
			if(openOrClosed.open_now !== undefined) {
				placeResults.opening_hours.weekday_text.forEach(function(item){
					placesElements.openHoursLi.innerHTML += '<li>' + item + '</li>';
				})
			};

			placesElements.openHoursLi.innerHTML += "</ul></div></li>";
			
			placesElements.placesUl.appendChild(placesElements.openHoursLi);
			placesElements.placeInfo = target.querySelectorAll('.placeInfo')[0];
			//placesElements.placeInfo.innerHTML = "";
			
			placesElements.placeInfo.appendChild(placesElements.placesUl);
			
			openClosedEl = document.getElementById('open-or-closed');
			if (openOrClosed.open_now) {
				openClosedEl.className = "open";
			} else {
				openClosedEl.className = "closed";
			};

			directionsBtn = document.querySelector('.btn-directions');
			directionsBtn.addEventListener('click', function() {
				_gmaps.startDirections(placeResults.geometry.location);
		});
			
		}
	};

	return returnObj;

}

