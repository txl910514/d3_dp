/**
 * Created by txl on 17-4-17.
 */
/**
 * d3.range 根据start(如果指定)和stop以及step(如果指定)返回生成的序列。start默认为0，step默认为1。返回的序列不包含stop.例如:
 * d3.randomBates 返回一个自变量为n的服从Bates distribution分布的随机数生成器。
 * */
var data = d3.range(100).map(d3.randomBates(100));

var formatCount = d3.format(",.0f");

var svg = d3.select("svg"),
  margin = {top: 10, right: 30, bottom: 30, left: 30},
  width = +svg.attr("width") - margin.left - margin.right,
  height = +svg.attr("height") - margin.top - margin.bottom,
  g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

/**
 *  d3.scaleLinear 创建一个默认的线性比例尺。domain 默认为 [0, 1], range 默认为 [0, 1], 默认的插值类型为 interpolator, 默认clamping 不启用.
 * rangeRound 设置或获取range，所有的band就是由这个区间分割而来。
 * */

var x = d3.scaleLinear()
  .rangeRound([0, width]);

/**
 * d3.histogram() 使用默认的设置创建一个直方图生成器.
 * domin 如果指定了domain则设置直方图的输入范围，这个值是一个[min,max]数组，表示直方图可取的最小值和最大值，如果生成的数据某个元素的值超出这个范围，则忽略这个元素。
 * thresholds  如果指定了thresholds，则根据指定的数组或方法设置阈值生成器并返回直方图生成器。默认的阈值是使用Sturges’ formula方法. 阈值是以数组的形式定义的，比如 [x0, x1, …]. 任何比 x0 小的值被放置在第一个bin中。大于等于 x0 但是小于 x1 的被放置在第二个bin中; 以此类推. 最终直方图生成器 将包含 thresholds.length + 1 个 bins. 参考 histogram thresholds 获取更多信息.
 *  ticks  在start和stop之间计算出一个等间隔的、精确的刻度序列，count用于指定参考刻度个数。由于小数可能并不精确，因此使用了d3-format进行了格式化。
 * */
var bins = d3.histogram()
  .domain(x.domain())
  .thresholds(x.ticks(20))
(data);
var y = d3.scaleLinear()
  .domain([0, d3.max(bins, function(d) { return d.length; })])
  .range([height, 0]);

var bar = g.selectAll(".bar")
  .data(bins)
  .enter().append("g")
  .attr("class", "bar")
  .attr("transform", function(d) { return "translate(" + x(d.x0) + "," + y(d.length) + ")"; });

bar.append("rect")
  .attr("x", 1)
  .attr("width", x(bins[0].x1) - x(bins[0].x0) - 1)
  .attr("height", function(d) { console.log(y(d.length)); console.log(d.length); return height - y(d.length); });

bar.append("text")
  .attr("dy", ".75em")
  .attr("y", 6)
  .attr("x", (x(bins[0].x1) - x(bins[0].x0)) / 2)
  .attr("text-anchor", "middle")
  .text(function(d) { return formatCount(d.length); });

/**
 * d3.axisBottom  根据指定的 scale构造一个bottom-axis, tick 参数为空, tick 大小为 6 并且 padding为 3. 轴在水平方向绘制.
 * */
g.append("g")
  .attr("class", "axis axis--x")
  .attr("transform", "translate(0," + height + ")")
  .call(d3.axisBottom(x));

g.append("g")
  .attr("class", "axis axis--y")
  .attr("transform", "translate(0,0)")
  .call(d3.axisLeft(y));