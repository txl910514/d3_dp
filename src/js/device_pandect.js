/**
 * Created by txl-pc on 2017/5/3.
 */
var data1, data2, data3,data;
data1 = [{
  title: '设备总数',
  num:1000,
  unit:'台'
}];

data2 = [{
  title: '在用设备',
  num:2890,
  unit:'台'
}];

data3 = [{
  title: '月完善设备',
  num:9999,
  unit:'台'
}];

data = data3;

var svg = d3.select('.content')
  .append('svg')
  .attr('width', 250)
  .attr('height',250);

var   margin = {top: 10, right: 10, bottom: 10, left: 10},
  width = +svg.attr("width") - margin.left - margin.right,
  height = +svg.attr("height") - margin.top - margin.bottom;

var svgG = svg.append('g')
  .attr('transform', "translate("+ margin.left+ ","+ margin.top +")");

var G = svgG
  .selectAll('.deviceG')
  .data(data)
  .enter()
  .append('g')
  .attr('transform', "translate(0,"+ height/2 +")")
  .attr('class', 'deviceG')
  .selectAll('.deviceLine')
  .data(function (d) {
    var data_d = [];
    for (var key in d) {
      data_d.push({
        name: key,
        text:d[key]
      });
    }
    return data_d;
  })
  .enter()
  .append('text')
  .attr('class', function (d) {
    return 'deviceLine text_' + d.name;
  })
  .text(function (d) {
    return d.text;
  })
  .attr('y', function (d,i,ele) {
    var fontSize = parseInt(d3.select(ele[i]).style('font-size'));
    var ele_height0 = parseInt(ele[0].getBBox().height);
    console.log(ele_height0);
    if(d.name === 'num') {
      return  fontSize + 5 - ele_height0/2;
    }
    if(d.name === 'unit') {
      var parent = ele[i].parentNode;
      var parent_height = parent.getBBox().height;
      console.log(parent_height);
      d3.select(parent).attr('transform', 'translate(0,'+ ((height-parent_height)/2 + ele_height0) +')');
      var height_num = parseInt(d3.select(ele[i-1]).style('font-size'));
      return fontSize + 5 + height_num/2 - ele_height0/2;
    }
    return -ele_height0/2;
  })
  .attr('x', function (d,i, ele) {
    if(d.name === 'unit') {
      var width = ele[i-1].getComputedTextLength();
      return width + 5;
    }
    else {
      return 0;
    }
  });