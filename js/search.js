//console.log("search js");

var visibleOption = document.getElementById('visible-option');
var nonVisibleOptions = document.getElementById('nonvisible-options');
var nonVisibleLiItems = nonVisibleOptions.children;	
var visible = false;

function showOptions() {
	if (!visible) {
		visibleOption.children[0].innerHTML = "Show me Donuts!"
		nonVisibleOptions.style.display = "block";
		visible = true;
	} else {
		nonVisibleOptions.style.display = "none";
		visible = false;
	}
}

function selectOption() {
	visibleOption.children[0].innerHTML = this.innerHTML;
	visibleOption.children[0].title = this.title;
	nonVisibleOptions.style.display = "none";
	visible = false;
}

visibleOption.addEventListener('click', showOptions);

for (var i = 0; i < nonVisibleLiItems.length; i++) {
	var element = nonVisibleLiItems[i];
	element.onclick = selectOption;	
};