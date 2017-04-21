/**
 * Created by txl on 17-4-11.
 */
/*var datainit = [
  {id:19, name:'a'},
  {id:78, name:'b'},
  {id:23, name:'c'},
  {id:16, name:'e'},
  {id:21, name:'f'}
];

var dataupdate = [
  {id:15, name:'d'},
  {id:22, name:'g'}
];

function template_func(datainit) {
  var p = d3.select('body').selectAll('p');
  var update = p.data(datainit);
  var enter = update.enter();
  var exit = update.exit();
  update.text(function(d) {
    return d.name;
  });

  enter.append('p').text(function(d) {
    return d.name;
  });

  exit.remove();
}

template_func(datainit);

setTimeout(function() {
  template_func(dataupdate);
}, 20*1000);*/
