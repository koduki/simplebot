// RakutenMA demo

// Load necessary libraries
var RakutenMA = require('./rakutenma');
var fs = require('fs');

// Initialize a RakutenMA instance
// with an empty model and the default ja feature set
var rma = new RakutenMA();
rma.featset = RakutenMA.default_featset_ja;

// Initialize a RakutenMA instance with a pre-trained model
var model = JSON.parse(fs.readFileSync("model_ja.json"));
rma = new RakutenMA(model, 1024, 0.007812);  // Specify hyperparameter for SCW (for demonstration purpose)
rma.featset = RakutenMA.default_featset_ja;

// Set the feature hash function (15bit)
rma.hash_func = RakutenMA.create_hash_func(15);

// Tokenize one sample sentence
console.log(rma.tokenize("彼は新しい仕事できっと成功するだろう。"));
console.log(rma.tokenize("こんにちは。今日はいい天気ですね。"));
