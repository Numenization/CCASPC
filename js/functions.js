// Each funtion uses three points of decimal accuracy except for the median function


/*

Nick:
these need to be changed to work with arrays of point objects instead
of arrays of real numbers.

anywhere data[i], you need to use data[i].val

there also needs to be functions for calculating the min/max time of the points
so you would use data[i].time

delete this comment when done

*/

function calcMean(data) {

  var i, mean, length = data.length; sum = 0;
  for (i = 0; i < data.length; i++) {
    sum += data[i];
  }
  mean = sum / length;
  return mean.toFixed(3);

}


function calcStdDev(data) {
  var stdData = new Array;
  var i, sum = 0;

  for (i = 0; i < data.length; i++) {
    
    stdData.push(Math.pow((data[i] - calcMean(data)), 2));

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

function calcVar(data) {
  var stdData = new Array;
  var i, sum = 0;

  for (i = 0; i < data.length; i++) {
    
    stdData.push(Math.pow((data[i] - calcMean(data)), 2));

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