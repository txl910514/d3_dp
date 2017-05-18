/**
 * Created by txl on 17-5-18.
 */
var svg = d3.select(".content")
  .append('svg')
  .attr('width', '100%')
  .attr('height', '100%')

var svgWidth = document.querySelector('.content').offsetWidth,
  svgHeight = document.querySelector('.content').offsetHeight;

var margin = {left:30, top:10, bottom:20, right:10},
  width = svgWidth - margin.left - margin.right,
  height = svgHeight - margin.top - margin.bottom;

var g = svg.append('g')
  .attr('transform', "translate("+ margin.left+ ","+ margin.top +")");

