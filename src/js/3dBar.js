/**
 * Created by txl-pc on 2017/5/21.
 */
var data = [{
  "letter": "白皮鸡蛋",
  "child": {
    "category": "0",
    "value": "459.00"
  }
}, {
  "letter": "红皮鸡蛋",
  "child": {
    "category": "0",
    "value": "389.00"
  }
}, {
  "letter": "鸡蛋",
  "child": {
    "category": "0",
    "value": "118.00"
  }
}, {
  "letter": "牛肉",
  "child": {
    "category": "0",
    "value": "282.00"
  }
}, {
  "letter": "羊肉",
  "child": {
    "category": "0",
    "value": "249.00"
  }
}, {
  "letter": "鸭蛋",
  "child": {
    "category": "0",
    "value": "242.00"
  }
}, {
  "letter": "红薯",
  "child": {
    "category": "0",
    "value": "222.00"
  }
}, {
  "letter": "白菜",
  "child": {
    "category": "0",
    "value": "182.00"
  }
}, {
  "letter": "鸡肉",
  "child": {
    "category": "0",
    "value": "102.00"
  }
},
  {
    "letter": "生菜",
    "child": {
      "category": "0",
      "value": "192.00"
    }
  }
];

var margin = {
  top: 20,
  right: 50,
  bottom: 50,
  left: 90
};
var svgWidth = 1000;
var svgHeight = 500;

//创建各个面的颜色数组
var mainColorList = ['#f6e242', '#ebec5b', '#d2ef5f', '#b1d894', '#97d5ad', '#82d1c0', '#70cfd2', '#63c8ce', '#50bab8', '#38a99d'];
var topColorList = ['#e9d748', '#d1d252', '#c0d75f', '#a2d37d', '#83d09e', '#68ccb6', '#5bc8cb', '#59c0c6', '#3aadab', '#2da094'];
var rightColorList = ['#dfce51', '#d9db59', '#b9d54a', '#9ece7c', '#8ac69f', '#70c3b1', '#65c5c8', '#57bac0', '#42aba9', '#2c9b8f'];
var svg = d3.select('#chart')
  .append('svg')
  .attr('width', svgWidth)
  .attr('height', svgHeight)
  .attr('id', 'svg-column');

var xLinearScale;
function addXAxis() {
  var transform = d3.geoTransform({
    point: function (x, y) {
      this.stream.point(x, y)
    }
  });
  //定义几何路径
  var path = d3.geoPath()
    .projection(transform);
  xLinearScale = d3.scaleBand()
    .domain(data.map(function (d) {
      return d.letter;
    }))
    .range([0, svgWidth - margin.right - margin.left], 0.1);
  var xAxis = d3.axisBottom(xLinearScale)
    .ticks(data.length);
  //绘制X轴
  var xAxisG = svg.append("g")
    .call(xAxis)
    .attr("transform", "translate(" + (margin.left) + "," + (svgHeight - margin.bottom) + ")");
  //删除原X轴
  xAxisG.select("path").remove();
  //绘制新的立体X轴
  xAxisG.append("path")
    .datum({
      type: "Polygon",
      coordinates: [
        [
          [20, 0],
          [0, 15],
          [svgWidth - margin.right - margin.left, 15],
          [svgWidth + 20 - margin.right - margin.left, 0],
          [20, 0]
        ]
      ]
    })
    .attr("d", path)
    .attr('fill', 'rgb(187,187,187)');
  xAxisG.selectAll('text')
    .attr('font-size', '18px')
    .attr('fill', '#646464')
    .attr('transform', 'translate(0, 20)');
  xAxisG.selectAll('line').remove();
  // dataProcessing(xLinearScale)
}
addXAxis();

var yLinearScale;
//创建y轴的比例尺渲染y轴
function addYScale() {
  yLinearScale = d3.scaleLinear()
    .domain([0, d3.max(data, function (d, i) {
      return d.child.value * 1;
    }) * 1.2])
    .range([svgHeight - margin.top - margin.bottom, 0]);
  //定义Y轴比例尺以及刻度
  var yAxis = d3.axisLeft(yLinearScale)
    .ticks(6);
  //绘制Y轴
  var yAxisG = svg.append("g")
    .call(yAxis)
    .attr('transform', 'translate(' + (margin.left + 10) + "," + margin.top + ")");
  yAxisG.selectAll('text')
    .attr('font-size', '18px')
    .attr('fill', '#636363');
  //删除原Y轴路径和tick
  yAxisG.select("path").remove();
  yAxisG.selectAll('line').remove();
}
addYScale();