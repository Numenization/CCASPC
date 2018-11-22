var borderWidth = 3; //px
var tickWidth = 2; // px
var tickLength = 15; // px
var strokeColor = '#000000'
var canvas = null;
var innerGraphBuffer = 75;

var data = [];

function setup() {
	var holder = document.getElementById('canvas-holder');
	var info = holder.getBoundingClientRect();
	canvas = createCanvas(info.width, info.height);
	canvas.parent('canvas-holder');
	background(240);
	fakeData();
	drawGraph();
}

function draw() {
	background(240);
	drawGraph();
}


function fakeData() {
	for(var i = 0; i < 10; i++) {
		data.push([Math.floor(Math.random() * 10) + 95, i]);
		console.log(data[i]);
	}
}
var avg = 100;
var s = 1;

function maxV(x) {
	var r = x[0][0];
	for(var i = 0; i < x.length; i++) {
		if(x[i][0] > r) {
			r = x[i][0];
		}
	}
	return r;
}

function minV(x) {
	var r = x[0][0];
	for(var i = 0; i < x.length; i++) {
		if(x[i][0] < r) {
			r = x[i][0];
		}
	}
	return r;
}

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

	// come up with optimal bounds for y-axis
	var yMin = 0;
	var yMax = 0;

	// upper bound
	if(maxV(data) > avg + 4*s) {
		yMax = maxV(data);
	}
	else {
		yMax = avg + 4*s;
	}

	// lower bound
	if(minV(data) < avg - 4*s) {
		yMin = minV(data);
	}
	else {
		yMin = avg - 4*s;
	}

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
	strokeWeight(tickWidth);
	line(innerGraphBuffer - tickLength / 2, yPos, innerGraphBuffer + tickLength / 2, yPos);
	strokeWeight(tickWidth / 2);
	dashedLine(innerGraphBuffer + tickLength / 2 + 5, yPos, width - innerGraphBuffer / 2, yPos, 5, 5);
	strokeWeight(0);
	text(avg + 3*s, innerGraphBuffer - tickLength, yPos);

	// LCL tick
	yPos = map(avg - 3*s, yMin, yMax, height - innerGraphBuffer, innerGraphBuffer);
	strokeWeight(tickWidth);
	line(innerGraphBuffer - tickLength / 2, yPos, innerGraphBuffer + tickLength / 2, yPos);
	strokeWeight(tickWidth / 2);
	dashedLine(innerGraphBuffer + tickLength / 2 + 5, yPos, width - innerGraphBuffer / 2, yPos, 5, 5);
	strokeWeight(0);
	text(avg - 3*s, innerGraphBuffer - tickLength, yPos);

	// x axis ticks with labels
	textAlign(CENTER, CENTER);
	distance = width - (innerGraphBuffer + innerGraphBuffer / 2)
	var xTickSpacing = 0;
	if(data.length > 5) {
		xTickSpacing = distance / (data.length + 1);
	}
	else {
		xTickSpacing = distance / 6;
	}

	for(var i = 0; i < data.length; i++) {
		xPos = innerGraphBuffer + (i + 1) * xTickSpacing;
		strokeWeight(tickWidth);
		line(xPos, height - innerGraphBuffer + tickLength / 2, xPos, height - innerGraphBuffer - tickLength / 2)
		strokeWeight(0);
		text(data[i][1], xPos, height - innerGraphBuffer + tickLength + 2);
	}

	// other labels
	textAlign(CENTER, CENTER);
	strokeWeight(0);
	text('Control Chart for Statistical Process Control', width / 2, 25);
	text('Time Value: (UNIT)', width / 2, height - 25);
	translate(width / 2, height / 2);
	rotate(-PI/2);
	text('Mean Value: (UNIT)', 0, -(width / 2) + 15);
	rotate(PI/2);
	translate(0, 0);
}