/**
 * Created by txl-pc on 2017/7/11.
 */
var svg = d3.select(".container")
  .append('svg')
  .attr('width', '100%')
  .attr('height', '100%')

var svgWidth = document.querySelector('.container').offsetWidth,
  svgHeight = document.querySelector('.container').offsetHeight;
var main = svg.append('g')
  .attr('class', 'main')
  .attr('transform', "translate(" + svgWidth/2 + ',' + svgHeight/2 + ')');

// 设定一些方便计算的常量
var radius = 200,
  // 指标的个数，即fieldNames的长度
  total = 6,
  // 需要将网轴分成几级，即网轴上从小到大有多少个正多边形
  level = 4,
  // 网轴的范围，类似坐标轴
  rangeMin = 0,
  rangeMax = 100,
  arc = 2 * Math.PI;
// 每项指标所在的角度
var onePiece = arc/total;
// 计算网轴的正多边形的坐标
var polygons = {
  webs: [],
  webPoints: []
};
for(var k=level;k>0;k--) {
  var webs = '',
    webPoints = [];
  var r = radius/level * k;
  for(var i=0;i<total;i++) {
    var x = r * Math.sin(i * onePiece + onePiece / 2),
      y = r * Math.cos(i * onePiece + onePiece / 2);
    webs += x + ',' + y + ' ';
    webPoints.push({
      x: x,
      y: y
    });
  }
  polygons.webs.push(webs);
  polygons.webPoints.push(webPoints);
}

var webG = main.append('g')
  .attr('class', 'webs');
webG.selectAll('polygon')
  .data(polygons.webs)
  .enter()
  .append('polygon')
  .attr('points', function(d) {
    return d;
  });

var lines = main.append('g')
  .attr('class', 'lines');
lines.selectAll('line')
  .data(polygons.webPoints[0])
  .enter()
  .append('line')
  .attr('x1', 0)
  .attr('y1', 0)
  .attr('x2', function(d) {
    return d.x;
  })
  .attr('y2', function(d) {
    return d.y;
  });
