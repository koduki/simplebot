var http = require('http');
var url = require('url');
var qs = require('querystring');

var port = 9000;
var host = '127.0.0.1';

function createRMA(){
  // Load necessary libraries
  var RakutenMA = require('./rakutenma/rakutenma');
  var fs = require('fs');
  // Initialize a RakutenMA instance
  // with an empty model and the default ja feature set
  var rma = new RakutenMA();
  rma.featset = RakutenMA.default_featset_ja;

  // Initialize a RakutenMA instance with a pre-trained model
  var model = JSON.parse(fs.readFileSync("./rakutenma/model_ja.json"));
  rma = new RakutenMA(model, 1024, 0.007812);  // Specify hyperparameter for SCW (for demonstration purpose)
  rma.featset = RakutenMA.default_featset_ja;

  // Set the feature hash function (15bit)
  rma.hash_func = RakutenMA.create_hash_func(15);

  return rma;
}

var toString = function(data){
  return '[' + data.map(function(xs){ return '[' + xs.join(',') +']'}).join(',') + ']'
};

var ma = createRMA();
var server = http.createServer(function(req, res){
  var params = url.parse(req.url, true).query;
  var text = params['text'];
  console.log(typeof text);

  if(typeof text === 'string'){
    var tokens = ma.tokenize(text);
    console.log(tokens);

    res.writeHead(200, {'Content-Type':'application/json'});
    res.end(toString(tokens) + '\n');
  } else {
    res.writeHead(404, {'Content-Type':'text/plain'});
    res.end("not found." + '\n');
  }
}).listen(port, host);

console.log("Server running at http://" + host + ":" + port);
