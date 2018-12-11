// The purpose of this script is to individually test each component using Whitebox Testing Methodology
// In order to begin the tests, run the function "startTests()" from the web console with index.html open

// p5.js is provided by a third-party and all of its components are assumed to be in working condition

// |----------------------- data.js components -----------------------|

// Point object (no dependency)
function pointTests() {
	// create new point
	var point = new Point();
	var errors = 0;

	// check point default values to assure constructor worked properly
	if(!(point.x === 0 && point.y === 0)) {
		console.error('Test for Point constructor failed!');
	}

	// set metric value and verify it was set correctly
	point.setValue(100);
	if(!point.y === 100) {
		console.error('Test for Point setValue failed!');
	}

	// set time value and verify it was set correctly
	point.setValue(100);
	if(!point.x === 100) {
		console.error('Test for Point setTime failed!');
	}

	console.log('Point object tested resulting in ' + errors + ' errors.');
}

// Chart object (depends on Point object)
function chartTests() {
	var chart = new Chart();

}

// |----------------------- statistics_handler.js components -----------------------|

// |----------------------- drawing_handler.js components -----------------------|

// |----------------------- handler.js components (integration) -----------------------|