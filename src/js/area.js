/**
 * Created by txl on 17-5-8.
 */

var data = [
  {
    name:'呼吸机1',
    value:16
  },
  {
    name:'呼吸机2',
    value:23
  },
  {
    name:'呼吸机3',
    value:56
  },
  {
    name:'呼吸机4',
    value:38
  },
  {
    name:'呼吸机5',
    value:97
  },
  {
    name:'呼吸机6',
    value:46
  }
]
var svg = d3.select(".content")
  .append('svg')
  .attr('width', '100%')
  .attr('height', '100%')

var defs = svg.append("defs");
var linearGradient = defs.append("linearGradient")
  .attr("id","linearColor")
  .attr("x1","0%")
  .attr("y1","0%")
  .attr("x2","100%")
  .attr("y2","0%");

var stop1 = linearGradient.append("stop")
  .attr("offset","0%")
  .style("stop-color", '#2ea6de');

var stop2 = linearGradient.append("stop")
  .attr("offset","100%")
  .style("stop-color", '#2ede7d');

var svgWidth = document.querySelector('.content').offsetWidth,
  svgHeight = document.querySelector('.content').offsetHeight;

var margin = {left:10, top:10, bottom:10, right:10},
width = svgWidth - margin.left - margin.right,
  height = svgHeight - margin.top - margin.bottom;

var svgG = svg.append('g')
  .attr('transform', "translate("+ margin.left+ ","+ margin.top +")");

var y = d3.scaleLinear().range([height, 0])
  .domain([0, d3.max(data, function (d) {
    console.log(d.value)
    return d.value;
  })]);

var x = d3.scaleBand().rangeRound([0, width]).padding(0.1)
  .domain(data.map(function(d) { return d.name; }));

var line = d3.line()
  .x(function(d) {
    console.log(d);
    return  x(d.name);
  })
  .y(function(d) {
    console.log(y(d.value))
    return  y(d.value);
  })
  .curve(d3.curveCatmullRom.alpha(0.5));

svgG.append("path")
  .datum(data)
  .attr("class", "line")
  .attr("d", line)
  .attr('fill', 'none')
  .style('stroke','url(#'+ linearGradient.attr("id") +')');

