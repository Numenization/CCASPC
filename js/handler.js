// main handler for CCASPC
// stores global variables and links up UI to functionality

// globals

// global variables for defining how the graph looks
var borderWidth = 3; //px
var tickWidth = 2; // px
var tickLength = 15; // px
var strokeColor = '#000000'
var canvas = null;
var innerGraphBuffer = 75;
var dotSize = 4;

// chart object
var chart = new Chart();

// test functions
function addRandom() {
	var index = chart.numberOfPoints + 1;
	var val = Math.random() * 20 + 100;
	console.log([index, val]);
	chart.addPoint(new Point(index, val));
}

var interval = null;
function start() {
	if(interval !== null)
		stop();
	interval = window.setInterval(function() {addRandom();}, 250);
}

function stop() {
	clearInterval(interval);
}