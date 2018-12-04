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

// p5 function: gets called on script startup
function setup() {
	// set up a canvas to use
	var holder = document.getElementById('canvas-holder');
	var info = holder.getBoundingClientRect();
	canvas = createCanvas(info.width, info.height);
	canvas.parent('canvas-holder');

	// start drawing
	background(240);
	drawGraph();
}

// p5 function: gets called every frame
function draw() {
	// this will clear out the previously drawn image so that we dont
	// keep drawing over the same image (looks funky)
	background(240);
	drawGraph();
}

// function that will draw a dashed line from point (x1,y1) to (x2,y2)
function dashedLine(x1, y1, x2, y2, l, g) {
    var pc = dist(x1, y1, x2, y2) / 100;
    var pcCount = 1;
    var lPercent = gPercent = 0;
    var currentPos = 0;
    var xx1 = yy1 = xx2 = yy2 = 0;
 
    while (int(pcCount * pc) < l) {
        pcCount++
    }
    lPercent = pcCount;
    pcCount = 1;
    while (int(pcCount * pc) < g) {
        pcCount++
    }
    gPercent = pcCount;
 
    lPercent = lPercent / 100;
    gPercent = gPercent / 100;
    while (currentPos < 1) {
        xx1 = lerp(x1, x2, currentPos);
        yy1 = lerp(y1, y2, currentPos);
        xx2 = lerp(x1, x2, currentPos + lPercent);
        yy2 = lerp(y1, y2, currentPos + lPercent);
        if (x1 > x2) {
            if (xx2 < x2) {
                xx2 = x2;
            }
        }
        if (x1 < x2) {
            if (xx2 > x2) {
                xx2 = x2;
            }
        }
        if (y1 > y2) {
            if (yy2 < y2) {
                yy2 = y2;
            }
        }
        if (y1 < y2) {
            if (yy2 > y2) {
                yy2 = y2;
            }
        }
 
        line(xx1, yy1, xx2, yy2);
        currentPos = currentPos + lPercent + gPercent;
    }
}

// main function to draw the actual graph
function drawGraph() {
	// border
	stroke(0);
	strokeWeight(borderWidth);
	borderAdjustment = borderWidth / 2;

	line(0, borderAdjustment - 1, width, borderAdjustment - 1);
	line(0, height - borderAdjustment, width, height - borderAdjustment);
	line(borderAdjustment - 1, 0, borderAdjustment - 1, height);
	line(width - borderAdjustment, 0, width - borderAdjustment, height);


	// inner graph border
	line(innerGraphBuffer, innerGraphBuffer, width - innerGraphBuffer / 2, innerGraphBuffer);
	line(innerGraphBuffer, height - innerGraphBuffer, width - innerGraphBuffer / 2, height - innerGraphBuffer);
	line(innerGraphBuffer - 1, innerGraphBuffer, innerGraphBuffer - 1, height - innerGraphBuffer);
	line(width - innerGraphBuffer / 2, innerGraphBuffer, width - innerGraphBuffer / 2, height - innerGraphBuffer);

	// check if we have valid data, if we don't the program will hang
	if(chart.numberOfPoints < 3)
		return;

	console.log('got to data set up');

	// set up some chart data
	var avg = chart.mean;
	var s = chart.stdDeviation;
	var min = chart.min;
	var max = chart.max;
	var minTime = chart.minTime;
	var maxTime = chart.maxTime;

	console.log('got passed data set up');

	// come up with optimal bounds for y-axis
	var yMin = 0;
	var yMax = 0;

	// upper bound
	if(max > avg + 3*s) {
		yMax = max + s;
	}
	else {
		yMax = avg + 4*s;
	}

	// lower bound
	if(min < avg - 3*s) {
		yMin = min - s;
	}
	else {
		yMin = avg - 4*s;
	}



	console.log('set up y axis bounds');

	textAlign(RIGHT,CENTER);
	// y axis ticks with labels (label mean, UCL, LCL)
	// mean tick
	var yPos = map(avg, yMin, yMax, height - innerGraphBuffer, innerGraphBuffer);
	strokeWeight(tickWidth);
	line(innerGraphBuffer - tickLength / 2, yPos, width - innerGraphBuffer / 2, yPos);
	strokeWeight(0);
	text(avg, innerGraphBuffer - tickLength, yPos);

	// UCL tick
	yPos = map(avg + 3*s, yMin, yMax, height - innerGraphBuffer, innerGraphBuffer);
	console.log('got y pos')
	strokeWeight(tickWidth);
	line(innerGraphBuffer - tickLength / 2, yPos, innerGraphBuffer + tickLength / 2, yPos);
	console.log('drew tick')
	strokeWeight(tickWidth / 2);
	dashedLine(innerGraphBuffer + tickLength / 2 + 5, yPos, width - innerGraphBuffer / 2, yPos, 5, 5);
	console.log('drew dashed line')
	strokeWeight(0);
	text(avg + 3*s, innerGraphBuffer - tickLength, yPos);

	console.log('drew ucl line')

	// LCL tick
	yPos = map(avg - 3*s, yMin, yMax, height - innerGraphBuffer, innerGraphBuffer);
	strokeWeight(tickWidth);
	line(innerGraphBuffer - tickLength / 2, yPos, innerGraphBuffer + tickLength / 2, yPos);
	strokeWeight(tickWidth / 2);
	dashedLine(innerGraphBuffer + tickLength / 2 + 5, yPos, width - innerGraphBuffer / 2, yPos, 5, 5);
	strokeWeight(0);
	text(avg - 3*s, innerGraphBuffer - tickLength, yPos);

	console.log('got to setting up bounds');

	// get bounds for x axis
	var xMin = 0;
	var xMax = 0;

	if(chart.numberOfPoints > 10) {
		xMin = minTime - 1;
		xMax = maxTime + 1;
	}
	else {
		xMin = 0;
		xMax = 11;
	}

	// draw lines between points
	// we have to do this before drawing the points otherwise the lines will get drawn on top of the points
	// which will not look correct
	lastPoint = null;
	for(var i = 0; i < chart.numberOfPoints; i++) {
		var x = map(chart.points[i].time, xMin, xMax, innerGraphBuffer, width - innerGraphBuffer / 2);
		var y = map(chart.points[i].val, yMax, yMin, innerGraphBuffer, height - innerGraphBuffer);

		// draw line between points
		if(lastPoint == null) {
			lastPoint = [x,y];
		}
		else {
			strokeWeight(tickWidth);
			line(lastPoint[0], lastPoint[1], x, y);
			lastPoint = [x,y];
		}
	}

	textAlign(CENTER, CENTER);
	// plot points
	for(var i = 0; i < data.length; i++) {
		// tick mark and label on x axis
		var xPos = map(chart.points[i].time, xMin, xMax, innerGraphBuffer, width - innerGraphBuffer / 2);
		if(data.length > 200) {
			strokeWeight(tickWidth / 2);
		}
		else {
			strokeWeight(tickWidth);
		}
		line(xPos, height - innerGraphBuffer + tickLength / 2, xPos, height - innerGraphBuffer - tickLength / 2);
		strokeWeight(0);
		if(data.length > 40){
			textSize(8);
		}
		else {
			textSize(12);
		}

		// scale the label text so that we avoid overlapping
		// highest level of scaling works well with data sets less than 500 points
		if(data.length < 75) {
			text(chart.points[i].time, xPos, height - innerGraphBuffer + tickLength + 2)
		}
		else if(data.length > 75 && data.length <= 105 && i%2==1) {
			text(chart.points[i].time, xPos, height - innerGraphBuffer + tickLength + 2)
		}
		else if(data.length > 105 && data.length <= 145 && i%3==2) {
			text(chart.points[i].time, xPos, height - innerGraphBuffer + tickLength + 2)
		}
		else if(data.length > 145 && data.length <= 200 && i%5==4) {
			text(chart.points[i].time, xPos, height - innerGraphBuffer + tickLength + 2)
		}
		else if(data.length > 200 && i%10==9) {
			text(chart.points[i].time, xPos, height - innerGraphBuffer + tickLength + 2)
		}

		// plot point
		var x = xPos;
		var y = map(chart.points[i].val, yMax, yMin, innerGraphBuffer, height - innerGraphBuffer);
		
		stroke(0);

		if(chart.points[i].time >= avg + 3 * s || chart.points[i].time <= avg - 3 * s) { 
			stroke(255, 0, 0);
		}
		else {
			stroke(0);
		}
		strokeWeight(dotSize);
		ellipse(x, y, dotSize, dotSize);
		stroke(0);
	}

	// other labels
	textSize(12);
	textAlign(CENTER, CENTER);
	strokeWeight(0);
	text('Control Chart for Statistical Process Control', width / 2, 25);
	text('Time Value: (' + chart.getTime() + ')', width / 2, height - 25);
	translate(width / 2, height / 2);
	rotate(-PI/2);
	text('Metric Value: (' + chart.getMetric() + ')', 0, -(width / 2) + 15);
	rotate(PI/2);
	translate(0, 0);
}