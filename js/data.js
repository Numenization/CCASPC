// chart class definition
function Chart(metric=0, time=0) {
	this.numberOfPoints = 0;
	this.points = [];
	this.metricType = metric;
	this.timeType = time;
	this.mean = 0;
	this.median = 0;
	this.max = 0;
	this.min = 0;
	this.minTime = 0;
	this.maxTime = 0;
	this.variance = 0;
	this.stdDeviation = 0;
}

Chart.prototype.update = function () {
	this.numberOfPoints = this.points.length;
	this.mean = calcMean(this.points);
	this.median = calcMed(this.points);
	this.max = calcMax(this.points);
	this.min = calcMin(this.points);
	this.maxTime = calcMaxTime(this.points);
	this.minTime = calcMinTime(this.points);
	this.variance = calcVar(this.points);
	this.stdDeviation = calcStdDev(this.points);
}

Chart.prototype.addPoint = function(point) {
	if(!(point instanceof Point))
		return;
	this.points.push(point);
	this.update();
}

Chart.prototype.getMetric = function() {
	if(this.metricType === 0) {
		return "KLOC";
	}
	else if(this.metricType === 1) {
		return "Function Points";
	}
}

Chart.prototype.getTime = function() {
	if(this.timeType === 0) {
		return "Days";
	}
	else if(this.timeType === 1) {
		return "Weeks";
	}
	else if(this.timeType === 2) {
		return "Months";
	}
}

// point class definition
function Point(x=0,y=0) {
	this.time = x;
	this.val = y;
}

Point.prototype.setValue = function (y) {
	this.val = y;
}

Point.prototype.setTime = function(x) {
	this.time = x;
}