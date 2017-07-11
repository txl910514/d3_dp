/**
 * Created by txl on 17-5-8.
 */

var data = [
  {
    name:'呼吸机1',
    value:90
  },
  {
    name:'呼吸机2',
    value:40
  },
  {
    name:'呼吸机3',
    value:70
  },
  {
    name:'呼吸机h',
    value:60
  },
  {
    name:'呼吸机4',
    value:80
  },
  {
    name:'呼吸机5',
    value:20
  },
  {
    name:'呼吸机6',
    value:50
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

var areaGradient = defs.append("linearGradient")
  .attr("id","areaColor")
  .attr("x1","0%")
  .attr("y1","0%")
  .attr("x2","0%")
  .attr("y2","100%");

areaGradient.append("stop")
  .attr("offset","0%")
  .style("stop-color", '#2ede7d');

areaGradient.append("stop")
  .attr("offset","100%")
  .style("stop-color", '#1f2a33');

var svgWidth = document.querySelector('.content').offsetWidth,
  svgHeight = document.querySelector('.content').offsetHeight;

var margin = {left:20, top:10, bottom:20, right:10},
width = svgWidth - margin.left - margin.right,
  height = svgHeight - margin.top - margin.bottom;

var svgG = svg.append('g')
  .attr('transform', "translate("+ margin.left+ ","+ margin.top +")");

var y = d3.scaleLinear().range([height, 0])
  .domain([0, d3.max(data, function (d) {
    return d.value;
  })]);

var x = d3.scaleBand().rangeRound([0, width])
  .paddingInner(1)
  .paddingOuter(0.5)
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
  .curve(d3.curveCatmullRom.alpha(0.9));

var area = d3.area()
  .x(function(d) {
    return x(d.name);
  })
  .y0(y(0))
  .y1(function(d) {
    return y(d.value);
  })
  .curve(d3.curveCatmullRom.alpha(0.9));

var symbol = d3.symbol()
    .size(64)
    .type(d3.symbolCircle);

var color = d3.scaleSequential(d3.interpolate("#2ea6de","#2ede7d"));

svgG.append('g')
  .attr('class', 'area')
  .append("path")
  .datum(data)
  .attr("class", "line_path")
  .attr('opacity',0.4)
  .attr("d", area)
  .style('fill','url(#'+ areaGradient.attr("id") +')');

svgG
  .append('g')
  .attr('class', 'line')
  .append("path")
  .datum(data)
  .attr("class", "line_path")
  .attr("d", line)
  .attr('fill', 'none')
  .style('stroke','url(#'+ linearGradient.attr("id") +')');

svgG.select('.line')
  .selectAll('.circle')
  .data(data)
  .enter()
  .append('path')
  .attr('d', symbol.type(d3.symbolCircle))
  .attr('transform', function(d) {
    return 'translate('+ x(d.name) + ',' + y(d.value) + ')'
  })
  .attr("stroke-width", 3)
  .attr('fill', '#fff')
  .style('stroke', function(d){
    return color(x(d.name)/width)
  });



var axis_x = svgG.append("g")
  .attr("class", "axis axis--x")
  .attr("transform", "translate(0," + height + ")")
  .call(d3.axisBottom(x));

axis_x.selectAll("text").style("fill","#899baa");
axis_x.selectAll("line").style("display","none");
axis_x.selectAll("path").style("display","none");
/*axis_x.selectAll('.tick')
  .attr('transform', function (d) {
    return "translate("+ x(d) +",0)";
  });*/

var lineMargin = 15;
var axis_y = svgG.append("g")
  .attr("class", "axis axis--y")
  .attr("transform", "translate(0,0)")
  .call(d3.axisLeft(y).tickSize(-width + lineMargin));

axis_y.selectAll("text").style("fill","#899baa");
axis_y.selectAll("line")
  .attr('stroke','#899baa')
  .attr('opacity','0.2')
  .attr('transform', 'translate('+ lineMargin +',0)');
axis_y.selectAll("path").style("display","none");



