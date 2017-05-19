function dom() {
	var	windowIs760 = container.clientWidth >= 760,
		
		returnObj = {

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
			_gmaps.getMapObj().setCenter(this.location);
			_gmaps.getMapObj().setZoom(15);

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

		expandPlacesDiv: function(targetEl) {
			var target = document.getElementById(targetEl);
			var addr = placeResults.formatted_address;
			placesElements.placesUl.innerHTML = "";
			placesElements.placesUl.innerHTML = '<li>' + placeResults.formatted_address + '</li> <li> <button class="btn-contact btn-website">Phone</button><button class="btn-contact btn-phone">Website</button> </li> <li id="open-or-closed">Open Now</li>'; 
			
			placesElements.openHoursLi.class = "open-hours";
			placesElements.openHoursLi.innerHTML = '<div> <ul>';
			placeResults.opening_hours.weekday_text.forEach(function(item){
				placesElements.openHoursLi.innerHTML += '<li>' + item + '</li>';
			})
			placesElements.openHoursLi.innerHTML += "</ul></div></li>";
			
			placesElements.placesUl.appendChild(placesElements.openHoursLi);
			placesElements.placeInfo = target.querySelectorAll('.placeInfo')[0];
			//placesElements.placeInfo.innerHTML = "";
			
			placesElements.placeInfo.appendChild(placesElements.placesUl);

		}
	};

	return returnObj;

}

