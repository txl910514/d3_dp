/**
 * Created by txl on 17-5-3.
 */
var data = {
  data:[
    {
      label:'放射科',
      value:11
    },
    {
      label:'放射科',
      value:5
    },
    {
      label:'放射科',
      value:3
    },
    {
      label:'内科',
      value:4
    },
    {
      label:'内科',
      value:5
    },
    {
      label:'内科',
      value:6
    },
    {
      label:'放射科',
      value:7
    },
    {
      label:'内科',
      value:8
    },
    {
      label:'内科',
      value:9
    },
    {
      label:'放射科',
      value:10
    }
  ],
  color:['#2ca02c', '#ffbb78', '#aec7e8']
}
var width = document.querySelector('.content').offsetWidth,
  height = document.querySelector('.content').offsetHeight;

var svg = d3.select(".content").append("svg")
  .attr("width", '100%')
  .attr("height", '100%');

var radius = Math.min(width, height) / 2.5;

var outerRadius = radius *1.1;

var color = d3.scaleOrdinal(d3.schemeCategory20);

var pie = d3.pie()
  .sort(null)
  .value(function(d) {
    return d.value;
  });

var arc = d3.arc()
  .outerRadius(radius * 0.8)
  .innerRadius(radius*0.75)
  .cornerRadius(5)
  .padAngle(0.01);

var outerArc = d3.arc()
  .innerRadius(outerRadius*0.9)
  .outerRadius(outerRadius*0.9);
var arcForLine=d3.arc()
  .innerRadius(radius * 0.8)
  .outerRadius(radius * 0.8);

var svgG = svg.append('g')
  .datum(data.data)
  .attr('transform', "translate("+ width/2+ ","+ height/2 +")");
var num;

var formatCount = d3.format(",.1f");

svgG.append('g')
  .attr('class', 'slices')
  .selectAll('.slice')
  .data(pie)
  .enter()
  .append('path')
  .attr('class', 'slice')
  .attr('fill', function(d,i) {
    //console.log((d.endAngle - d.startAngle) / (2*Math.PI) );
    //console.log(formatCount((d.endAngle - d.startAngle) / (2*Math.PI)*100) );
    //console.log(num);
    //return data.color[i] || '#ffbb78';
    return color(i);
  })
  .attr('d', arc)

svgG.append('g')
  .attr('class', 'labels')
  .selectAll('.label')
  .data(pie)
  .enter()
  .append('text')
  .attr('class', 'label')
  .text(function(d){
    return d.data.label;
  })
  .attr('fill', function(d, i) {
    //return data.color[i] || '#ffbb78';
    return color(i);
  })
  .attr('transform', function(d,i,ele) {
    var pos = outerArc.centroid(d);
    var pos_reduce = 0;
    if(midAngle(d) < Math.PI) {
      pos_reduce = ele[i].getBBox().width;
    }
    pos[0] = radius * 1.1 *  (midAngle(d) < Math.PI ? 1 : -1) - pos_reduce;
    pos[1] = pos[1] + ele[i].getBBox().height/2+10;
    d3.select(ele[i].parentNode)
      .append('text')
      .text(function() {
        return formatCount((d.endAngle - d.startAngle) / (2*Math.PI)*100) + '%'
      })
      .attr('fill', function() {
        //return data.color[i] || '#ffbb78';
        return color(i);
      })
      .attr('transform', function(m,i, ele) {
        console.log(ele);
        var pos_text = outerArc.centroid(d);
        var pos_text_reduce = 0;
        if(midAngle(d) < Math.PI) {
          pos_text_reduce = ele[i].getBBox().width;
        }
        pos_text[0] = outerRadius *  (midAngle(d) < Math.PI ? 1 : -1) - pos_text_reduce;
        pos_text[1] = pos_text[1] - ele[i].getBBox().height/2;
        console.log(ele);
        return "translate("+ pos_text +")";
      })
    return "translate("+ pos +")";
  })

svgG.append('g')
  .attr('class', 'lines')
  .selectAll('.line')
  .data(pie)
  .enter()
  .append('polyline')
  .attr('class', 'line')
  .attr('fill','none')
  .style('stroke', function(d,i) {
    //return data.color[i] || '#ffbb78';
    return color(i);
  })
  .attr("points", function(d){
    var pos = outerArc.centroid(d);
    pos[0] = outerRadius * (midAngle(d) < Math.PI ? 1 : -1);
    return [arcForLine.centroid(d), outerArc.centroid(d), pos];
  })

svgG.append('g')
  .attr('class', 'dots')
  .selectAll('.dot')
  .data(pie)
  .enter()
  .append('circle')
  .attr('class', 'dot')
  .attr('r',5)
  .attr('fill', function(d,i) {
    //return data.color[i] || '#ffbb78';
    return color(i);
  })
  .attr('cx', function(d) {
    var pos = outerArc.centroid(d);
    pos[0] = outerRadius * (midAngle(d) < Math.PI ? 1 : -1);
    return pos[0];
  })
  .attr('cy', function(d) {
    var pos = outerArc.centroid(d);
    return pos[1];
  })

function midAngle(d){
  return d.startAngle + (d.endAngle - d.startAngle)/2;
}