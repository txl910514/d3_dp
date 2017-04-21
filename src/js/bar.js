/**
 * Created by txl on 17-4-11.
 */
var dataset = [50,43,120,87,99,167,142];

var width = 400;
var height = 250;
var svg = d3.select('body').append('svg').attr('width', width).attr('height',height);
var padding = { top: 20, right:20, bottom: 20, left:20};
var rectStep = 55;
var rectWidth = 30;

var rect = svg.selectAll('rect').
  data(dataset).
  enter().
  append('rect').
  attr('fill', 'red').
  attr('x', function(d, i) {
    return padding.left + i*rectStep;
  }).
  attr('y', function(d) {
    return height - padding.bottom - d;
  }).
  attr('width', rectWidth).
  attr('height', function(d) {
    return d;
  });