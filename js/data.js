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
	this.mean = calcMean(points);
	this.median = calcMed(points);
	this.max = calcMax(points);
	this.min = calcMin(points);
	this.maxTime = calcMaxTime(points);
	this.minTime = calcMinTime(points);
	this.variance = calcVar(points);
	this.stdDeviation = calcStdDev(points);
}

Chart.prototype.addPoint = function(point) {
	if(!(point instanceof Point))
		return;
	points.push(point);
	this.update();
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