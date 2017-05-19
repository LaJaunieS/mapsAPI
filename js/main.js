'use strict'
var gmaps = initialize(),
	windowIs760 = container.clientWidth >= 760,
	mapResults = [],
	placeResults = {};




function createResultsList() {
	
	resultsElements.resultsUl.innerHTML = "";
	resultsElements.resultsLiArr = [];
	
	var i = 1;
	resultsElements.resultsList.style.visibility = "visible";
	resultsList.scrollTop = 0;
	mapResults = gmaps.getResultsArr();
	mapResults.forEach(function(item){
		var li = document.createElement('li');
		var expandLink;
		
		li.innerHTML = "<h2>" + i + ". " + item.name + "</h2><p>" + item.vicinity + "</p><div class='expand'><p>More</p></div><div class='placeInfo'></div>";
  		li.id = item.place_id;
  		li.location = item.geometry.location;
  		resultsElements.resultsLiArr.push(li);
  		li.onclick = centerOnResult;
  		resultsElements.resultsUl.appendChild(li);
  		resultsElements.resultsList.appendChild(resultsElements.resultsUl);
  		expandLink = li.querySelector('.expand p');

  		expandLink.addEventListener('click', function() {
  			placesTarget(li.id);
  		});;
  		if (windowIs760) {
  			resultsList.style.height = "90vh";
  		} else {
            resultsList.style.height = "400px";
  		};
  		i++;
	})
}

function centerOnResult() {
	gmaps.getMapObj().setCenter(this.location);
	gmaps.getMapObj().setZoom(15);

}

function highlightTarget(target) {
	var targetOffSet = target.offsetTop-300;
	target.style.animation = "";
	resultsElements.resultsList.scrollTop = targetOffSet;
	target.style.animation = "flash .5s";
}

function placesTarget(id) {
	var target = document.getElementById(id);
	gmaps.searchPlaces(id);
	//expandPlacesDiv(target);
}

function expandPlacesDiv(targetEl) {
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

			
searchElements.searchBtn.onclick = gmaps.startSearch;






