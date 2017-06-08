/**
 * Created by txl-pc on 2017/6/8.
 */
var fs = require('fs');
var path= require('path');

fs.readFile(__dirname + '/old.json', {flag: 'r+', encoding: 'utf8'}, function (err, data) {
  if(err) {
    console.error(err);
    return;
  }
  var newData = {};
  newData.new = JSON.parse(data).old.reverse()
  console.log(newData);
  fs.writeFile(__dirname + '/new.json', JSON.stringify(newData, null, 2),'utf-8',function(){
    console.log("输出完毕")
  })
});