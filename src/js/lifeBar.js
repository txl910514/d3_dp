/**
 * Created by txl-pc on 2017/4/25.
 */
var data1, data2, data3, data4;
data1 = {
  datas: [
    {
      name:'呼吸机',
      value:0.14
    },
    {
      name:'血透机',
      value:0.56
    },
    {
      name:'心电图',
      value:0.53578
    },
    {
      name:'除颤仪',
      value:0.872
    },
    {
      name:'麻醉机',
      value:1
    },
    {
      name:'监护仪',
      value:0.99
    }
  ],
  scope:[
    {
      numScope:1,
      textColor:'#fff',
      barColor:['#2ea6de','#2ede7d']
    },
    {
      numScope:[0.95,1],
      textColor:'#b2bb22',
      barColor:['#aebb20','#e8bd3a']
    },
    {
      numScope:[0,0.95],
      textColor:'#ee6d6d',
      barColor:['#ee6d6d','#f4a856']
    }
  ],
  type:'complete'
};

data2 = {
  datas: [
    {
      name:'呼吸机',
      value:10/10,
      data:[{
        className:'total',
        num:10
      },{
        className:'current',
        num:10
      }]
    },
    {
      name:'血透机',
      value:9.6/10,
      data:[{
        className:'total',
        num:10
      },{
        className:'current',
        num:9
      }]
    },
    {
      name:'心电图',
      value:8/10,
      data:[{
        className:'total',
        num:10
      },{
        className:'current',
        num:8
      }]
    },
    {
      name:'除颤仪',
      value:7/10,
      data:[{
        className:'total',
        num:10
      },{
        className:'current',
        num:7
      }]
    },
    {
      name:'麻醉机',
      value:6/10,
      data:[{
        className:'total',
        num:10
      },{
        className:'current',
        num:6
      }]
    },
    {
      name:'监护仪',
      value:5/10,
      data:[{
        className:'total',
        num:10
      },{
        className:'current',
        num:5
      }]
    }],
  scope:[
    {
      numScope:1,
      textColor:'#fff',
      gradualClass:'current',
      barColor:['#2ea6de','#2ede7d']
    },
    {
      numScope:[0.95,1],
      textColor:'#b2bb22',
      gradualClass:'current',
      barColor:['#aebb20','#e8bd3a']
    },
    {
      numScope:[0,0.95],
      textColor:'#ee6d6d',
      gradualClass:'current',
      barColor:['#ee6d6d','#f4a856']
    }
  ],
  type:'circle'
};

data3 = {
  datas: [
    {
      name:'呼吸机',
      value:10/10,
      data:[{
        className:'total',
        num:10
      },{
        className:'current',
        num:10
      }]
    },
    {
      name:'血透机',
      value:9.99/10,
      data:[{
        className:'total',
        num:10
      },{
        className:'current',
        num:9.99
      }]
    },
    {
      name:'心电图',
      value:8/10,
      data:[{
        className:'total',
        num:10
      },{
        className:'current',
        num:8
      }]
    },
    {
      name:'除颤仪',
      value:8.88/10,
      data:[{
        className:'total',
        num:10
      },{
        className:'current',
        num:8.88
      }]
    },
    {
      name:'麻醉机',
      value:6/10,
      data:[{
        className:'total',
        num:10
      },{
        className:'current',
        num:6
      }]
    },
    {
      name:'监护仪',
      value:5/10,
      data:[{
        className:'total',
        num:10
      },{
        className:'current',
        num:5
      }]
    }
  ],
  scope:[
    {
      numScope:1,
      textColor:'#fff',
      gradualClass:'current',
      barColor:['#2ea6de','#2ede7d']
    },
    {
      numScope:[0.95,1],
      textColor:'#b2bb22',
      gradualClass:'current',
      barColor:['#aebb20','#e8bd3a']
    },
    {
      numScope:[0,0.95],
      textColor:'#ee6d6d',
      gradualClass:'current',
      barColor:['#ee6d6d','#f4a856']
    }
  ],
  type:'rect'
};

data4 = {
  datas: [
    {
      name:'呼吸机',
      value:10/10,
      data:[{
        className:'total',
        num:10
      },{
        className:'current',
        num:10
      }]
    },
    {
      name:'血透机',
      value:9.6/10,
      data:[{
        className:'total',
        num:10
      },{
        className:'current',
        num:9
      }]
    },
    {
      name:'心电图',
      value:8/15,
      data:[{
        className:'total',
        num:15
      },{
        className:'current',
        num:8
      }]
    },
    {
      name:'除颤仪',
      value:7/10,
      data:[{
        className:'total',
        num:10
      },{
        className:'current',
        num:7
      }]
    },
    {
      name:'麻醉机',
      value:6/10,
      data:[{
        className:'total',
        num:10
      },{
        className:'current',
        num:6
      }]
    },
    {
      name:'监护仪',
      value:5/10,
      data:[{
        className:'total',
        num:10
      },{
        className:'current',
        num:5
      }]
    }],
  scope:[
    {
      numScope:1,
      textColor:'#fff',
      gradualClass:'current',
      barColor:['#2ea6de','#2ede7d']
    },
    {
      numScope:[0.95,1],
      textColor:'#b2bb22',
      gradualClass:'current',
      barColor:['#aebb20','#e8bd3a']
    },
    {
      numScope:[0,0.95],
      textColor:'#ee6d6d',
      gradualClass:'current',
      barColor:['#ee6d6d','#f4a856']
    }
  ],
  type:'complete_context'
};

data = data2;

var formatCount = d3.format(",.1f");

var svg = d3.select('body')
    .append('svg')
    .attr('width', 350)
    .attr('height',300);


var defs;
var linearGradient;





var   margin = {top: 10, right: 50, bottom: 10, left: 10},
  width = +svg.attr("width") - margin.left - margin.right,
  height = +svg.attr("height") - margin.top - margin.bottom;

var svgG = svg.append('g')
  .attr('transform', "translate("+ margin.left+ ","+ margin.top +")");


var x = d3.scaleLinear().range([0, width*0.9])
  .domain([0, d3.max(data.datas,function (d) {
    return d.value*100;
  })]);

var y = d3.scaleBand().rangeRound([0, height]).padding(0.85)
  .domain(data.datas.map(function(d) { return d.name; }));

var bar = svgG.selectAll("g")
  .data(data.datas)
  .enter().append("g")
  .attr("transform", function(d, i) { return "translate(0," + y(d.name) + ")"; });



bar.append("text")
  .attr("x", function(d) { return x(d.value*100) + 3; })
  .attr("y", y.bandwidth() / 2)
  .attr("dy", ".35em")
  .attr('class','labelText')
  .text(function(d,i,ele) {
    data.scope.map(function (scope) {
      if(typeof scope.numScope === 'number') {
        if (d.value <= scope.numScope) {
          if(typeof scope.textColor === 'string'){
            d3.select(ele[i]).style('fill', scope.textColor);
          }
        }
      }
      else if (scope.numScope.constructor === Array) {
        if (d.value < scope.numScope[1] && d.value >= scope.numScope[0]) {
          if(typeof scope.textColor === 'string'){
            d3.select(ele[i]).style('fill', scope.textColor);
          }
        }
      }

    });
    return formatCount(d.value*100) +'%';
  })
  .attr('transform', function (d) {
    return "translate("+(width - x(d.value*100)-margin.left)+",0)";
  });

bar.append("text")
  .attr('x',0)
  .attr('y',-y.bandwidth()-2)
  .attr('class','nameText')
  .text(function (d) {
    return d.name;
  });


function scope_each(ele, i, compute, colorLinear, d, figureName) {
  data.scope.map(function (scope,m) {
    var parent = d3.select(ele[i].parentNode);
    var parentLine = d3.select(ele[i].parentNode.parentNode);
    if (parent.classed(figureName + scope.gradualClass)) {
      if(typeof scope.numScope === 'number') {
        if(parentLine.data()[0].value <= scope.numScope) {
          if(typeof scope.barColor === 'string') {
            d3.select(ele[i]).style('fill', scope.barColor);
          }
          else if(scope.barColor.constructor === Array) {
            if (figureName === 'context') {
              d3.select(ele[i]).style('fill', 'url(#'+ scope.gradualClass +'_linearColor'+ m +')');
            }
            else {
              d3.select(ele[i]).style('fill', compute[m](colorLinear(d)));
            }
          }
        }
      }
      else if(scope.numScope.constructor === Array) {
        if(parentLine.data()[0].value < scope.numScope[1] && parentLine.data()[0].value > scope.numScope[0]){
          if(typeof scope.barColor === 'string') {
            d3.select(ele[i]).style('fill', scope.barColor);
          }
          else if(scope.barColor.constructor === Array)  {
            if (figureName === 'context') {
              d3.select(ele[i]).style('fill', 'url(#'+ scope.gradualClass +'_linearColor'+ m +')');
            }
            else {
              d3.select(ele[i]).style('fill', compute[m](colorLinear(d)));
            }
          }
        }
      }
    }
  });
}

function maxLineScale() {
  var circleArray = [];
  data.datas.forEach(function(d) {
    circleArray.push(d.data);
  });
  var mergeCircle = d3.merge(circleArray);
  var circleLine = d3.scaleLinear().range([0, width*0.9])
    .domain([0, d3.max(mergeCircle, function (d) {
      return d.num;
    })]);
  return {
    mergeCircle:mergeCircle,
    circleLine:circleLine
  };
}

function gradualColor() {
  data.scope.map(function (d,i) {
    if(typeof d.barColor === 'string'){

    }
    else if(d.barColor.constructor === Array){
      defs = svg.append("defs");
      linearGradient = defs.append("linearGradient")
        .attr("id", d.gradualClass ? d.gradualClass +"_linearColor"+i : "linearColor"+i)
        .attr("x1", "0%")
        .attr("y1", "0%")
        .attr("x2", "100%")
        .attr("y2", "0%");
      linearGradient.append("stop")
        .attr("offset", "0%")
        .style("stop-color", d.barColor[0]);

      linearGradient.append("stop")
        .attr("offset", "100%")
        .style("stop-color", d.barColor[1]);
    }
  });
}

function complete() {
  gradualColor();
  bar.append("rect")
    .attr("width", function(d,i,ele) {
      data.scope.map(function (scope,m) {
        if(typeof scope.numScope === 'number') {
          if(d.value <= scope.numScope) {
            if(typeof scope.barColor === 'string') {
              d3.select(ele[i]).style('fill', scope.barColor);
            }
            else if(scope.barColor.constructor === Array) {
              d3.select(ele[i]).style('fill', 'url(#linearColor'+ m +')')
            }
          }
        }
        else if(scope.numScope.constructor === Array) {
          if(d.value < scope.numScope[1] && d.value > scope.numScope[0]){
            if(typeof scope.barColor === 'string') {
              d3.select(ele[i]).style('fill', scope.barColor);
            }
            else if(scope.barColor.constructor === Array)  {
              d3.select(ele[i]).style('fill', 'url(#linearColor'+ m +')');
            }
          }
        }
      });
      return x(d.value*100);
    })
    .attr("height", y.bandwidth())
    .attr('ry', 4)
    .attr('rx',4);
}

function circle_rect(shape) {
  var maxScale = maxLineScale();
  var compute = [];
  data.scope.map(function (d,i) {
    if(typeof d.barColor === 'string'){

    }
    else if(d.barColor.constructor === Array){
      compute[i] = d3.interpolate(d.barColor[0], d.barColor[1]);
    }
  });
  var circleMax = d3.max(maxScale.mergeCircle,function (d) {
    return d.num;
  });
  var colorLinear = d3.scaleLinear()
    .domain([0,circleMax])
    .range([0,1]);
  switch (shape) {
    case 'circle':
      circle(circleMax, compute, colorLinear,maxScale.circleLine);
      break;
    case 'rect':
      rect(circleMax, compute, colorLinear,maxScale.circleLine);
      break;
    default:
      break;
  }
}


function circle(circleMax, compute, colorLinear,circleLine) {
  var r = circleLine(circleMax) / (circleMax*2) /2;
  if (r > y.bandwidth()) {
    r = y.bandwidth();
  }
  var circleG = bar.selectAll('.circleG')
    .data(function (d) {
      return d.data;
    })
    .enter()
    .append('g')
    .attr('class', function (d) {
      return 'circleG circle'+d.className;
    })
    .selectAll('circle')
    .data(function (d) {
      return d3.range(d.num);
    })
    .enter()
    .append('circle')
    .attr('r', r)
    .attr('transform', function (d,i, ele) {
      scope_each(ele,i, compute, colorLinear, d, 'circle');
      return "translate("+ (circleLine(d)+r) +","+ y.bandwidth()/2 +")";
    });
}

function rect(circleMax, compute, colorLinear,circleLine) {
  //var r = circleLine(circleMax) / (circleMax*2) /2;
/*  if (r > y.bandwidth()) {
    r = y.bandwidth();
  }*/

  bar.selectAll('.rectG')
    .data(function (d) {
      return d.data;
    })
    .enter()
    .append('g')
    .attr('class', function (d) {
      return 'rectG rect'+d.className;
    })
    .selectAll('rect')
    .data(function (d) {
      return d3.range(d.num);
    })
    .enter()
    .append('rect')
    .attr('width', circleLine(1) - circleLine(0)-1)
    .attr('height',y.bandwidth())
    .attr('transform', function (d,i, ele) {
      scope_each(ele,i, compute, colorLinear, d,'rect');
      return "translate("+ (circleLine(d)) +","+ y.bandwidth()/2 +")";
    });
}

function complete_context() {
  gradualColor();
  var maxCompleteScale = maxLineScale();
  bar.selectAll('.complete_contextG')
    .data(function (d) {
      return d.data;
    })
    .enter()
    .append('g')
    .attr('class', function (d) {
      return 'contextG context'+d.className;
    })
    .selectAll('rect')
    .data(function (d) {
      return [d.num];
    })
    .enter()
    .append('rect')
    .attr('width', function (d,i, ele) {
      scope_each(ele,i, null, null, d, 'context');
      return maxCompleteScale.circleLine(d);
    })
    .attr('height', y.bandwidth())
    .attr('rx',4)
    .attr('ry',4);
}

switch (data.type) {
  case 'complete':
    complete();
    break;
  case 'circle':
    circle_rect(data.type);
    break;
  case 'rect':
    circle_rect(data.type);
    break;
  case 'complete_context':
    complete_context(data.type);
    break;
  default:
    break;
}
