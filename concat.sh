#!/bin/sh

concat_files() {
	JS_DIR="js"
	TARGET_FILE="../public/js/app.js"

	cd $JS_DIR
	cat elements.js location.js mapStyles.js map.js search.js dom.js main.js > $TARGET_FILE
}


