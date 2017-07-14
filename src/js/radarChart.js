/**
 * Created by txl-pc on 2017/7/11.
 */
var data = [
  {
    name: '品牌1品牌1',
    value: 0.16
  },
  {
    name: '品牌1',
    value: 0.19
  },
  {
    name: '品牌1品牌1',
    value: 0.18
  },
  {
    name: '品牌1',
    value: 0.14
  },
  {
    name: '品牌1品牌1',
    value: 0.13
  },
  {
    name: '品牌1',
    value: 0.2
  }
]
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
var radius = d3.min([svgHeight, svgWidth]) / 2,
  // 指标的个数，即fieldNames的长度
  total = 6,
  // 需要将网轴分成几级，即网轴上从小到大有多少个正多边形
  level = 4,
  // 网轴的范围，类似坐标轴
  rangeMin = 0,
  rangeMax = d3.max(data, function (d) {
    return d.value
  }),
  arc = 2 * Math.PI;
console.log(d3.min([svgHeight, svgWidth]))
// 每项指标所在的角度
var onePiece = arc/total;
// 计算网轴的正多边形的坐标
var polygons = {
  webs: [],
  webPoints: []
};
console.log(polygons)
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
  })
  .attr('fill-opacity', 0.35)
  .attr('stroke-width', function (d, i) {
    if (i === 0) {
      return 6
    } else {
      return 1
    }
  })
  .attr('stroke', function (d, i) {
    if (i === 0) {
      return '#70DAFD'
    } else {
      return 'rgba(0, 0, 0, 0.2)'
    }
  })
  .attr('fill', function (d, i) {
    if (i === 0) {
      return '#70DAFD'
    }
    else {
      return 'none'
    }
  })
;

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

var circles = main.append('g')
  .attr('class', 'circles');
circles.selectAll('circle')
  .data(polygons.webPoints[0])
  .enter()
  .append('circle')
  .attr('cx', function(d) {
    return d.x;
  })
  .attr('cy', function(d) {
    return d.y;
  })
  .attr('r', 8)
  .attr('fill', function(d, index) {
    return '#70DAFD';
  });
var areasData = [];
var area = '',
  points = [];
for(var k=0;k<total;k++) {
  var r = radius * (data[k].value - rangeMin)/(rangeMax - rangeMin);
  var x = r * Math.sin(k * onePiece + onePiece / 2),
    y = r * Math.cos(k * onePiece + onePiece / 2);
  area += x + ',' + y + ' ';
  points.push({
    x: x,
    y: y
  })
}
areasData.push({
  polygon: area,
  points: points
});

var areas = main.append('g')
  .classed('areas', true);

// 添加g分组用来包含一个雷达图区域下的多边形以及圆点
areas.selectAll('g')
  .data(areasData)
  .enter()
  .append('g')
  .attr('class',function(d, i) {
    return 'area' + (i+1);
  });
for(var i=0;i<areasData.length;i++) {
  // 依次循环每个雷达图区域
  var areaDom = areas.select('.area' + (i+1)),
    areaData = areasData[i];
  // 绘制雷达图区域下的多边形
  areaDom.append('polygon')
    .attr('points', areaData.polygon)
    .attr('stroke', '#70DAFD')
    .attr('stroke-width', 6)
    .attr('fill-opacity', 0.5)
    .attr('fill', function(d, index) {
      return '#70DAFD';
    });
  // // 绘制雷达图区域下的点
  // var circles = areaDom.append('g')
  //   .classed('circles', true);
  // circles.selectAll('circle')
  //   .data(areaData.points)
  //   .enter()
  //   .append('circle')
  //   .attr('cx', function(d) {
  //     return d.x;
  //   })
  //   .attr('cy', function(d) {
  //     return d.y;
  //   })
  //   .attr('r', 3)
  //   .attr('stroke', function(d, index) {
  //     return getColor(i);
  //   });
}

var names = main.append('g')
  .classed('names', true);

names.selectAll('text')
  .data(polygons.webPoints[0])
  .enter()
  .append('text')
  .attr('class', function (d, i) {
    return 'name' + i
  })
  .text(function (d, i) {
    return data[i].name.slice(0, 5)
  })
  .attr('x', function(d, i, ele) {
    var x = 0
    if ((i * onePiece + onePiece / 2) > Math.PI) {
      x = d.x - ele[i].getBBox().width - 30;
    }
    else {
      x = d.x + 30
    }
    return x;
  })
  .attr('y', function(d) {
    return d.y;
  })

var percents = main.append('g')
  .classed('percents', true);

percents.selectAll('text')
  .data(polygons.webPoints[0])
  .enter()
  .append('text')
  .text(function (d, i) {
    return parseFloat((data[i].value * 100).toFixed(1)) + '%'
  })
  .attr('x', function(d, i, ele) {
    var x = 0
    if ((i * onePiece + onePiece / 2) > Math.PI) {
      var nameWidth = names.selectAll('.name' + i).node().getBBox().width
      var percentWidth = ele[i].getBBox().width
      if (nameWidth > percentWidth) {
        percentWidth = nameWidth
      } else {
        names.selectAll('.name' + i)
          .attr('x', d.x - percentWidth - 30)
      }
      x = d.x - percentWidth - 30;
    }
    else {
      x = d.x + 30
    }
    return x;
  })
  .attr('y', function(d, i, ele) {
    return d.y + ele[i].getBBox().height;
  })

