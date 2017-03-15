/**
 * Created by txl on 17-2-13.
 */
console.log(1,d3.select('body').attr('id', 'mm'));
console.log(1,d3.select('body').empty());
console.log(2,d3.select('#mm').node());
console.log(3,d3.select('.mm').size());
console.log(4,d3.select('svg'));
console.log(5,d3.selectAll('svg'));

var dom = document.getElementsByTagName('svg');
console.log(6,d3.select(dom));
console.log(1);
