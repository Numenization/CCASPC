// Each funtion uses three points of decimal accuracy except for the median function
// "mean" isn't declared locally so that it can be passed to the functions for computing standard deviation and variance

var mean = 0;
function calcMean(data) {

  var i, mean, length = data.length; sum = 0;
  for (i = 0; i < data.length; i++) {
    sum += data[i];
  }
  mean = sum / length;
  return mean.toFixed(3);

}
mean = calcMean(data);

function calcStdDev(data, mean) {
  var stdData = new Array;
  var i, sum = 0;

  for (i = 0; i < data.length; i++) {
    
    stdData.push(Math.pow((data[i] - mean), 2));

    sum += stdData[i];
  }
  sum /= stdData.length;
  return sum.toFixed(3);
}

function calcMin(data){
  var m = data[0];
  var i;
  for ( i = 0; i < data.length; i++ ){
    if (data[i] < m){
      m = data[i];
    }
  }
  return m;
}

function calcMax(data){
   var m = data[0];
  var i;
  for ( i = 0; i < data.length; i++ ){
    if (data[i] > m){
      m = data[i];
    }
  }
  return m;
}

function calcVar(data, mean) {
  var stdData = new Array;
  var i, sum = 0;

  for (i = 0; i < data.length; i++) {
    
    stdData.push(Math.pow((data[i] - mean), 2));

    sum += stdData[i];
  }
  sum /= stdData.length;
  
  return (Math.sqrt(sum)).toFixed(3);
}

function calcMed(data){
    data.sort( function(a,b) {return a - b;} );

    var half = Math.floor(data.length/2);

    if(data.length % 2)
        return data[half];
    else
        
    return (data[half-1] + data[half]) / 2.0;
}