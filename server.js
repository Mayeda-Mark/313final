//server.js

var express = require("express");
const path = require('path')
var app = express();
const PORT = process.env.PORT || 5000
app.use(express.static("public"));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

//Test
app.get("/", function(req, res) {
	console.log("root requested");
	res.write("Root!");
	res.end();
});

//football
app.get("/football", function(req, res) {
	res.render("pages/football")
});
//price
app.get("/price", function(req, res) {
	var weight = parseFloat(req.param('weight'));
	var type = parseInt(req.param('type'));
	var price = getPrices(weight, type);
	var param = { price: price };
	res.render("pages/price", param);
})
app.listen(PORT, function() {
	console.log("Up and running")
})