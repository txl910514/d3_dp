/**
 * Created by txl-pc on 2017/4/24.
 */

var width = 600,
  height = 300;

var formatCount = d3.format(",.0f");

var fields = [
  {value: 24, size: 24, label: "%", update: function(date) { return date.getHours(); }}
];

var arc = d3.arc()
  .innerRadius(height /2.5 - 10)
  .outerRadius(height /2.5 - 5)
  .startAngle(0)
  .endAngle(function(d) {
    return (d.value / d.size) * 2 * Math.PI;
  });

var svg = d3.select("body").append("svg")
  .attr("width", width)
  .attr("height", height);

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

var field = svg.selectAll(".field")
  .data(fields)
  .enter().append("g")
  .attr("transform", function(d, i) { return "translate(" + (i * 2 + 1.25) / 2.5 * width + "," + height / 2 + ")"; })
  .attr("class", "field");

field.append("path")
  .attr("class", "path path--background")
  .attr("d", arc);

var path = field.append("path")
  .attr("class", "path path--foreground")
  .style('fill','url(#'+ linearGradient.attr("id") +')');
var label = field.append("text")
  .attr("class", "label")
  .attr("dy", ".35em");

(function update() {
  field
    .each(function(d) { d.previous = d.value, d.value = 14; });

  path.transition()
    .ease(d3.easeElastic)
    .duration(750)
    .attrTween("d", arcTween);

  label
    .text(function(d) { return formatCount(d.value / d.size*100) + d.label; });
})();

function arcTween(b) {
  console.log(b);
  var i = d3.interpolate({value: b.previous}, b);
  return function(t) {
    return arc(i(t));
  };
}