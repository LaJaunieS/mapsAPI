'use strict'

function getUserLocation() {
	var loc;
	var permissionGranted;
	var confirmGLPermissions = window.sessionStorage.getItem('locationPermission') || null;

	if (confirmGLPermissions === null) {
		confirmGLPermissions = confirm("Do you want this site to access your location? It is only for the purpose of starting a search near your location, and won't be stored after you close this browser.");
	} else {
		permissionGranted = window.sessionStorage.getItem('locationPermission');
	};


	var returnObj = {
		setLocation: function(position) {
			if (confirmGLPermissions) {
				//check for user permission
				permissionGranted = true;
				
				//check for geolocation property in browser
				if (position) {
					loc = position;
					_gmaps.setUserLoc(loc);
				} else {
					console.log("Unable to get location information. This feature may not be suppored in your browser");
					loc = undefined;
				};

			} else {
				permissionGranted = false;
				console.log("Got it. The initial location will be Seattle, WA");
				loc = undefined;
			};
			window.sessionStorage.setItem('locationPermission', permissionGranted);
		},

		getloc: function() {
			return loc;
		},

		getGLPermissions: function() {
			return confirmGLPermissions;
		}

	};

	return returnObj;
}

