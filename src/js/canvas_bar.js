/**
 * Created by txl on 17-4-13.
 */

var canvas = document.querySelector("canvas"),
  context = canvas.getContext("2d"),
  gradient;

canvas.style.background = '#1f2a33';
var margin = {top: 20, right: 20, bottom: 30, left: 40},
  width = canvas.width - margin.left - margin.right,
  height = canvas.height - margin.top - margin.bottom;
/**
 * d3.scaleBand 构建一个默认的Band比例尺。默认的 domain为空, range 为 [0, 1], 没有padding, 没有 rounding 和 alignment.
 * rangeRound 设置或获取range，所有的band就是由这个区间分割而来。
 * padding 等于同时设置或获取inner 和 outer.
 * */
var x = d3.scaleBand()
  .rangeRound([0, width])
  .padding(0.9);

/**
 *  d3.scaleLinear 创建一个默认的线性比例尺。domain 默认为 [0, 1], range 默认为 [0, 1], 默认的插值类型为 interpolator, 默认clamping 不启用.
 *
* */
var y = d3.scaleLinear()
  .rangeRound([height, 0]);

/**
 * translate translate() 方法重新映射画布上的 (0,0) 位置。
 注释：当您在 translate() 之后调用诸如 fillRect() 之类的方法时，值会添加到 x 和 y 坐标值上。
 * */

context.translate(margin.left, margin.top);

/**
 * d3.csv  导入csv数据
 * */
d3.csv("/js/data.csv", function(d) {
  d.frequency = +d.frequency;
  return d;
}, function(error, data) {
  if (error) throw error;
  /**
   * x.domain 设置或获取domain。domain中的第一个值对应range中的第一个band，以此类推。
   * d3.max 返回给定的array中的最大值。如果数组为空，则返回undefined。如果指定了accessor则相当于在计算最小值之前调用了
   * */
  x.domain(data.map(function(d) { return d.letter; }));
  y.domain([0, d3.max(data, function(d) { return d.frequency; })]);

  /**
   * d3.ticks  在start和stop之间计算出一个等间隔的、精确的刻度序列，count用于指定参考刻度个数。由于小数可能并不精确，因此使用了d3-format进行了格式化。
   * tickFormat 如果指定了 format 则设置tick的格式并返回axis. 如果 format 没有指定则返回当前的格式化方法, 默认为null. 也就是说不会对刻度进行格式化操作. 当指定了 scale.tickFormat时, 下由axis.tickArguments传入的参数也会被格式化处理.
   参考 d3-format 和 d3-time-format 来获取关于格式化的相关文档. 例如, 显示逗号分组的1千分位s:
   * x.bandwidth() 返回每个band的宽度.
   **/
  var yTickCount = 10,
    yTicks = y.ticks(yTickCount),
    yTickFormat = y.tickFormat(yTickCount, "%");
  context.beginPath();
  x.domain().forEach(function(d) {
    context.moveTo(x(d) + x.bandwidth() / 2, height);
    context.lineTo(x(d) + x.bandwidth() / 2, height + 6);
  });
  context.strokeStyle = "black";
  context.stroke();

  context.textAlign = "center";
  context.textBaseline = "top";
  context.fillStyle = '#8596a5';
  x.domain().forEach(function(d) {
    context.fillText(d, x(d) + x.bandwidth() / 2, height + 6);
  });

  context.beginPath();
  yTicks.forEach(function(d) {
    context.moveTo(0, y(d) + 0.5);
    context.lineTo(-6, y(d) + 0.5);
  });
  context.strokeStyle = "black";
  context.stroke();

  context.textAlign = "right";
  context.textBaseline = "middle";
  yTicks.forEach(function(d) {
    context.fillText(yTickFormat(d), -9, y(d));
  });

  context.beginPath();
  context.moveTo(-6.5, 0 + 0.5);
  context.lineTo(0.5, 0 + 0.5);
  context.lineTo(0.5, height + 0.5);
  context.lineTo(-6.5, height + 0.5);
  context.strokeStyle = "black";
  context.stroke();

  context.beginPath();
  context.moveTo(0.5, height + 6);
  context.lineTo(0.5, height);
  context.lineTo(width, height);
  context.lineTo(width, height + 6);
  context.strokeStyle = "black";
  context.stroke();

  context.save();
  context.rotate(-Math.PI / 2);
  context.textAlign = "right";
  context.textBaseline = "top";
  context.font = "bold 10px sans-serif";
  context.fillText("Frequency", -10, 10);
  context.restore();

/*  context.fillStyle = "steelblue";*/
  data.forEach(function(d) {
    gradient = context.createLinearGradient(x(d.letter), y(d.frequency), x.bandwidth(), height - y(d.frequency));
    gradient.addColorStop("0","#2ede7d");
    gradient.addColorStop("1.0","#2ea6de");
    context.fillStyle=gradient;
    context.fillRect(x(d.letter), y(d.frequency), x.bandwidth(), height - y(d.frequency));
  });
});