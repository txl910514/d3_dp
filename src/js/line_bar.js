/**
 * Created by txl on 17-5-13.
 */
var data = [
  {
    name:'呼吸机1',
    line:90,
    bar: 83
  },
  {
    name:'呼吸机2',
    line:40,
    bar: 32
  },
  {
    name:'呼吸机3',
    line:70,
    bar:64
  },
  {
    name:'呼吸机h',
    line:60,
    bar: 53
  },
  {
    name:'呼吸机4',
    line:80,
    bar: 72
  },
  {
    name:'呼吸机5',
    line:20,
    bar: 16
  },
  {
    name:'呼吸机6',
    line:50,
    bar: 43
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

var barGradient = defs.append("linearGradient")
  .attr("id","barColor")
  .attr("x1","0%")
  .attr("y1","0%")
  .attr("x2","0%")
  .attr("y2","100%");

barGradient.append("stop")
  .attr("offset","0%")
  .style("stop-color", '#2ea6de');

barGradient.append("stop")
  .attr("offset","100%")
  .style("stop-color", '#2ede7d');

var svgWidth = document.querySelector('.content').offsetWidth,
  svgHeight = document.querySelector('.content').offsetHeight;

var margin = {left:20, top:10, bottom:20, right:10},
  width = svgWidth - margin.left - margin.right,
  height = svgHeight - margin.top - margin.bottom;

var svgG = svg.append('g')
  .attr('transform', "translate("+ margin.left+ ","+ margin.top +")");

var lineMax = d3.max(data, function (d) {
  return d.line;
});
var barMax = d3.max(data, function (d) {
  return d.bar;
});

var y = d3.scaleLinear().range([height, 0])
  .domain([0, Math.max(lineMax, barMax)]);

var x = d3.scaleBand().rangeRound([0, width])
  .padding(0.85)
  .domain(data.map(function(d) { return d.name; }));

var line = d3.line()
  .x(function(d) {
    return  x(d.name);
  })
  .y(function(d) {
    return  y(d.line);
  })
  .curve(d3.curveCatmullRom.alpha(0.5));

var symbol = d3.symbol()
  .size(64)
  .type(d3.symbolCircle);

var color = d3.scaleSequential(d3.interpolate("#2ea6de","#2ede7d"));

svgG.append('g')
  .attr('class', 'bagG')
  .selectAll('.bar')
  .data(data)
  .enter()
  .append('rect')
  .attr('x', function(d) {
    console.log(x.bandwidth());
    return x(d.name)
  })
  .attr('y', function(d) {
    return y(d.bar)
  })
  .attr('width', x.bandwidth())
  .attr('height', function(d) {
    return height - y(d.bar);
  })
  .attr('fill', 'url(#'+ barGradient.attr("id") +')')


svgG.append('g')
  .attr('class', 'line')
  .attr('transform', 'translate('+ x.bandwidth() / 2 +', 0)')
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
    return 'translate('+ x(d.name) + ',' + y(d.line) + ')'
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
  .attr('stroke-dasharray', '10,5')
  .attr('opacity','0.2')
  .attr('transform', 'translate('+ lineMargin +',0)');
axis_y.selectAll("path").style("display","none");