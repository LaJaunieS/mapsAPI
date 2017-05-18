'use strict'
var main = initialize(),
	windowIs760 = container.clientWidth >= 760,
	mapResults = [];


function createResultsList() {
	
	var existingUl = document.getElementById('list');
	resultsElements.resultsUl.innerHTML = "";
	resultsElements.resultsLiArr = [];
	
	var i = 1;
	resultsElements.resultsList.style.visibility = "visible";
	resultsList.scrollTop = 0;
	mapResults = main.getResultsArr();
	mapResults.forEach(function(item){
		var li = document.createElement('li');
		
		li.innerHTML = "<h2>" + i + ". " + item.name + "</h2><p>" + item.vicinity + "</p><div class='expand'><p>More</p></div><div class='placeInfo'></div>";
  		li.id = item.place_id;
  		li.location = item.geometry.location;
  		resultsElements.resultsLiArr.push(li);
  		li.onclick = centerOnResult;
  		resultsElements.resultsUl.appendChild(li);
  		resultsElements.resultsList.appendChild(resultsElements.resultsUl);
  		if (windowIs760) {
  			resultsList.style.height = "90vh";
  		} else {
            resultsList.style.height = "400px";
  		};
  		i++;
	})
}

function centerOnResult() {
	main.getMapObj().setCenter(this.location);

}

function highlightTarget(target) {
	var targetOffSet = target.offsetTop-200;
	if (target.style.animation.length !== 0) {
		target.style.animation = "";
	} else {
		resultsElements.resultsList.scrollTop = targetOffSet;
		target.style.animation = "flash .5s";
	}
}

			
searchElements.searchBtn.onclick = main.startSearch;





