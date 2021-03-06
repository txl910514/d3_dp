/**
 * Created by txl-pc on 2017/4/24.
 */

var width = document.querySelector('.content').offsetWidth,
  height = document.querySelector('.content').offsetHeight;

var formatCount = d3.format(",.0f");

var fields = [
  { value: 12, total: 58, label: "%", cue:['12台','等待'] }
];
var fieldsJson = JSON.parse(JSON.stringify(fields[0]));
var fieldsCopy = [];
fieldsCopy.push(fieldsJson);
fieldsCopy[0].value = fieldsCopy[0].total;

var arc = d3.arc()
  .innerRadius(height / 2.5 - 10)
  .outerRadius(height / 2.5 - 5)
  .startAngle(0)
  .endAngle(function (d) {
    return (d.value / d.total) * 2 * Math.PI;
  })
  .cornerRadius(90);

var svg = d3.select(".content").append("svg")
  .attr("width", '100%')
  .attr("height", '100%');

var defs = svg.append("defs");
var linearGradient = defs.append("linearGradient")
  .attr("id", "linearColor")
  .attr("x1", "0%")
  .attr("y1", "0%")
  .attr("x2", "100%")
  .attr("y2", "0%");

var stop1 = linearGradient.append("stop")
  .attr("offset", "0%")
  .style("stop-color", '#2ea6de');

var stop2 = linearGradient.append("stop")
  .attr("offset", "100%")
  .style("stop-color", '#2ede7d');

var shifting = 1/4;

var field = svg.selectAll(".field")
  .data(fieldsCopy)
  .enter().append("g")
  .attr("transform", function (d, i) { return "translate(" +  shifting* width + "," + height / 2 + ")"; })
  .attr("class", "field");

field.append("path")
  .attr("class", "path path--background")
  .attr("d", arc);

var path = field.append("path")
  .attr("class", "path path--foreground")
  .attr('rx', '3px')
  .attr('ry', '5px')
  .style('fill', 'url(#' + linearGradient.attr("id") + ')');
var label = field.append("text")
  .attr("class", "label")
  .attr("dy", ".35em");

var textG = svg.append('g')
  .attr('transform', function (d,i) {
    return "translate(" +  (shifting* width + height / 2.5 + 20) + "," + height / 2 + ")";
  })
  .attr('class', 'textG');

var textLabel= textG.selectAll('.textLabel')
  .data(fields[0].cue)
  .enter()
  .append('text')
  .attr('class','textLabel')
  .attr('transform', function (d,i,m) {
    d3.select(m[i]).classed('textLabel'+i, true);
    return "translate(0," + 30*i + ")";
  });

var color = d3.scaleSequential(d3.interpolate("#2ede7d","#2ea6de"));

(function update() {
  field
    .each(function (d) { d.previous = d.value, d.value= fields[0].value  });

  path.transition()
    .ease(d3.easeElastic)
    .duration(750)
    .attrTween("d", arcTween);

  label
    .text(function (d) {
      return formatCount(d.value / d.total * 100) + d.label;
    });

  textLabel.text(function (d,i,ele) {
    return d;
  })


  var alpha = (fields[0].value / fields[0].total) * 2 * Math.PI -  Math.PI / 2;
  var cx = shifting*width  + (height / 2.5 - 6) * Math.cos(alpha);
  var cy = height / 2 + (height / 2.5 - 6) * Math.sin(alpha);
  svg.select("circle").remove();
  var circle = svg.append("circle")
    .attr("cx", cx)
    .attr("cy", cy)
    .attr("r", "6px")
    .attr("fill", "white")
    .attr("stroke", "#2ede7d")
    .attr("stroke-width", "4px")
    .style('stroke', color((fields[0].value / fields[0].total)>1?0.5:fields[0].value / fields[0].total));
  circle.transition()
    .ease(d3.easeElastic)
    .duration(750)
    .attr("cx", cx)
    .attr("cy", cy)

  /*   setTimeout(update, 5000);*/
})();

function arcTween(b) {
  var i = d3.interpolate({ value: b.previous }, b);
  return function (t) {
    return arc(i(t));
  };
}

