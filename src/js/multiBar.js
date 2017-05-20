/**
 * Created by txl on 17-5-18.
 */
var data = [
  {
    state: 'AB',
    data: [
      {
        name:'小王',
        value:1738
      },
      {
        name:'大王',
        value:5476
      },
      {
        name:'老王',
        value:1088
      }
    ]
  },
  {
    state: 'BC',
    data: [
      {
        name:'小王',
        value:1938
      },
      {
        name:'大王',
        value:3876
      },
      {
        name:'老王',
        value:988
      }
    ]
  },
  {
    state: 'CD',
    data: [
      {
        name:'小王',
        value:538
      },
      {
        name:'大王',
        value:7376
      },
      {
        name:'老王',
        value:2688
      }
    ]
  },
  {
    state: 'DE',
    data: [
      {
        name:'小王',
        value:2138
      },
      {
        name:'大王',
        value:6476
      },
      {
        name:'老王',
        value:3988
      }
    ]
  },
  {
    state: 'EF',
    data: [
      {
        name:'小王',
        value:5138
      },
      {
        name:'大王',
        value:4876
      },
      {
        name:'老王',
        value:5188
      }
    ]
  },
  {
    state: 'FG',
    data: [
      {
        name:'小王',
        value:6738
      },
      {
        name:'大王',
        value:6676
      },
      {
        name:'老王',
        value:5519
      }
    ]
  },
]
var svg = d3.select(".content")
  .append('svg')
  .attr('width', '100%')
  .attr('height', '100%')

var svgWidth = document.querySelector('.content').offsetWidth,
  svgHeight = document.querySelector('.content').offsetHeight;

var margin = {left:50, top:10, bottom:20, right:10},
  width = svgWidth - margin.left - margin.right,
  height = svgHeight - margin.top - margin.bottom;

var g = svg.append('g')
  .attr('transform', "translate("+ margin.left+ ","+ margin.top +")");

var x0 = d3.scaleBand()
  .rangeRound([0, width])
  .padding(0.1);

var x1 = d3.scaleBand()
  .padding(0.1);

var y = d3.scaleLinear()
  .rangeRound([height, 80]);

var z = d3.scaleOrdinal()
  .range(["#00FA9A", "#98F5FF", "#98FB98", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

var keys = data[0].data.map(function (d) {
  return d.name;
})

x0.domain(data.map(function(d) { return d.state; }));
x1.domain(data[0].data.map(function (d) {
  return d.name
})).rangeRound([0, x0.bandwidth()]);

y.domain([0, d3.max(data, function(d) {
  return d3.max(d.data, function(m) { return m.value });
})]).nice();

g.append("g")
  .selectAll("g")
  .data(data)
  .enter().append("g")
  .attr("transform", function(d) { return "translate(" + x0(d.state) + ",0)"; })
  .selectAll("rect")
  .data(function(d) {
    return d.data
  })
  .enter().append("rect")
  .attr("x", function(d) { return x1(d.name); })
  .attr("y", function(d) { return y(d.value); })
  .attr("width", x1.bandwidth())
  .attr("height", function(d) { return height - y(d.value); })
  .attr("fill", function(d) {
    return z(d.name);
  });

var axis_x = g.append("g")
  .attr("class", "axis")
  .attr("transform", "translate(0," + height + ")")
  .call(d3.axisBottom(x0));

axis_x.selectAll("text").style("fill","#899baa");
axis_x.selectAll('path').style("stroke","#899baa");
axis_x.selectAll('line').style("stroke","#899baa");

var axis_y = g.append("g")
  .attr("class", "axis")
  .call(d3.axisLeft(y).ticks(null, "s"))

axis_y.append("text")
  .attr("x", 2)
  .attr("y", y(y.ticks().pop()) + 0.5)
  .attr("dy", "0.32em")
  .attr("fill", "#000")
  .attr("font-weight", "bold")
  .attr("text-anchor", "start")
  .text("Population");

axis_y.selectAll('path').style("stroke","#899baa");
axis_y.selectAll('line').style("stroke","#899baa");
axis_y.selectAll("text").style("fill","#899baa");

var legend = g.append("g")
  .attr("font-family", "sans-serif")
  .attr("font-size", 10)
  .attr("text-anchor", "end")
  .selectAll("g")
  .data(keys.slice().reverse())
  .enter().append("g")
  .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

legend.append("rect")
  .attr("x", width - 19)
  .attr("width", 19)
  .attr("height", 19)
  .attr("fill", z);

legend.append("text")
  .attr("x", width - 24)
  .attr("y", 9.5)
  .attr("dy", "0.32em")
  .attr('fill', '#fff')
  .text(function(d) { return d; });

