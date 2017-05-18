'use strict'
var main = initialize(),
	windowIs760 = container.clientWidth >= 760,
	mapResults = [];


//main.assignSearchListener();

//main.startSearch();

			
searchElements.searchBtn.addEventListener('click', function() {

	main.startSearch()
	
	/*var search = main.startSearch();
	console.log(search);*/
	
});

function createResultsList() {
	
	var i = 1;
	resultsElements.resultsList.style.visibility = "visible";
	mapResults = main.getResultsArr();
	mapResults.forEach(function(item){
		var li = document.createElement('li');
		
		li.innerHTML = "<h2>" + i + ". " + item.name + "</h2><p>" + item.vicinity + "</p><div class='expand'><p>More</p></div><div class='placeInfo'></div>";
  		li.id = item.place_id;
  		li.location = item.geometry.location;
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



