/**
 * Created by txl-pc on 2017/4/25.
 */
var data1, data2, data3;
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
    }],
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
      value:36/50,
      data:[36,50],
      num: {
        total:50,
        current:36
      }
    },
    {
      name:'血透机',
      value:47/49,
      data:[45,49],
      num: {
        total:49,
        current:35
      }
    },
    {
      name:'心电图',
      value:34/48,
      data:[34,48],
      num: {
        total:48,
        current:34
      }
    },
    {
      name:'除颤仪',
      value:47/47,
      data:[47,47],
      num: {
        total:47,
        current:33
      }
    },
    {
      name:'麻醉机',
      value:32/46,
      data:[32,46],
      num: {
        total:46,
        current:32
      }
    },
    {
      name:'监护仪',
      value:31/45,
      data:[31,45],
      num: {
        total:45,
        current:31
      }
    }],
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
  type:'circle'
};

data = data2;

var formatCount = d3.format(",.1f");

var svg = d3.select('body')
    .append('svg')
    .attr('width', 400)
    .attr('height',300);


var defs;
var linearGradient;



data.scope.map(function (d,i) {
  if(typeof d.barColor === 'string'){

  }
  else if(d.barColor.constructor === Array){
    defs = svg.append("defs");
    linearGradient = defs.append("linearGradient")
      .attr("id", "linearColor"+i)
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


var   margin = {top: 20, right: 20, bottom: 30, left: 40},
  width = +svg.attr("width") - margin.left - margin.right,
  height = +svg.attr("height") - margin.top - margin.bottom;

var x = d3.scaleLinear().range([0, width*0.9])
  .domain([0, d3.max(data.datas,function (d) {
    return d.value*100;
  })]);

var y = d3.scaleBand().rangeRound([0, height]).padding(0.85)
  .domain(data.datas.map(function(d) { return d.name; }));

var bar = svg.selectAll("g")
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
    return "translate("+(width - x(d.value*100))+",0)";
  });

bar.append("text")
  .attr('x',0)
  .attr('y',-y.bandwidth())
  .attr('class','nameText')
  .text(function (d) {
    return d.name;
  });

function complete() {
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

function circle() {
  var circleG = bar.selectAll('.circleG')
    .data(function (d) {
      return d.data;
    })
    .enter()
    .append('g')
    .attr('class', 'circleG')
    .selectAll('circle')
    .data(function (d) {
      console.log(d);
      return d3.range(d);
    })
    .enter()
    .append('circle');
}

switch (data.type) {
  case 'complete':
    complete();
    break;
  case 'circle':
    circle();
    break;
  default:
    break;
}
