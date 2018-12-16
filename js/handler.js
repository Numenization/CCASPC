/* 

main handler for CCASPC
stores global variables and links up UI to functionality

co-authors: Selawai Mona
			Nicholas Spencer

Professor: Burce Maxim
Course: CIS 375.001, Software Engineering

*/

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
var needsToUpdate = false;

// test functions
function addRandom() {
	var index = chart.numberOfPoints + 1;
	var val = Math.random() * 20 + 100;
	console.log([index, val]);
	chart.addPoint(new Point(index, val));
}

function addPoint() {
	var index = chart.numberOfPoints + 1;
	var val = parseFloat(document.getElementById('val').value);
	console.log([index, val]);
	chart.addPoint(new Point(index, val));
	needsToUpdate = true;
}

var delay = 250;
var interval = null;
function start() {
	if(interval !== null)
		stop();
	interval = window.setInterval(function() {addRandom();}, delay);
}

function stop() {
	clearInterval(interval);
}

// file IO functions

// function to download text data to a file
// this WILL NOT work on older versions of browsers.
// this is only designed to work on modern versions of:
// Edge, Firefox, Chrome

// sample call: download('string data', 'filename.txt', 'text/plain')
function download(stringData, fileName, fileType) {
	var downloadObject = document.createElement('a');
	downloadObject.href = "data:" + fileType + "charset=utf-8," + encodeURIComponent(stringData);
	downloadObject.setAttribute('download', fileName);
	document.body.appendChild(downloadObject);
	// try downloading by forcing a mouse click event
	downloadObject.click();
	document.body.removeChild(downloadObject);
}

// when we load a file, we need to be able to tell when that happens then actually load the data
document.getElementById('file-input').onchange = function() {
	var reader = new FileReader();
	reader.readAsText(document.getElementById('file-input').files[0]);
	reader.onload = function() {
		var stringData = reader.result;
		if(stringData !== null) {
			var obj = JSON.parse(stringData);
			chart = Object.assign(new Chart, obj);
			needsToUpdate = true;
		}
	}
}

// |----------------------------------- HTML Element Event Linking -----------------------------------|

// Save Button event listener
document.getElementById("save-button0").addEventListener("click", function() {
	if(!(chart !== null && chart instanceof Chart))
		return;
	var stringData = JSON.stringify(chart);
	download(stringData, "ccaspc_data.chart", 'text/plain');
});

// Load Button event listener
document.getElementById("load-button0").addEventListener("click", function() {
	document.getElementById('file-input').click();
});

// Add initial 3 points
document.getElementById("submit-initial").addEventListener("click", function() {
	var x = document.getElementById("first-point-text").value,
		y = document.getElementById("second-point-text").value,
		z = document.getElementById("third-point-text").value;

	if(isNaN(x) || isNaN(y) || isNaN(z) || chart === null) {
		console.log("invalid input in initial value fields");
		return;
	}

	chart.addPoint(new Point(1, parseFloat(x)));
	chart.addPoint(new Point(2, parseFloat(y)));
	chart.addPoint(new Point(3, parseFloat(z)));
});

// Add additional points
document.getElementById("submit-add").addEventListener("click", function() {
	var x = document.getElementById("add-point-text").value;

	if(isNaN(x) || chart === null) {
		console.log("invalid input in add point field");
		return;
	}

	chart.addPoint(new Point(chart.numberOfPoints + 1, parseFloat(x)));
});