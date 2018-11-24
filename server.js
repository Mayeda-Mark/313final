//server.js

var express = require("express");
var app = express();
const PORT = process.env.PORT || 8888
app.use(express.static("public"));
app.set("views", "views");
app.set("view engine", "ejs");

//Test
app.get("/", function(req, res) {
	console.log("root requested");
	res.write("Root!");
	res.end();
});

//price
app.get("/price", function(req, res) {
	var weight = parseFloat(req.param('weight'));
	var type = parseInt(req.param('type'));
	var price = getPrices(weight, type);
	var param = { price: price };
	res.render("price", param);
})

function getPrices(weight, type) {
	if ((type == 1 || 2) && (weight > 3.5)) {
		return "Your parcel/letter is too heavy to send!";
	}
	if ((type == 1 || 2) && (weight < 3.5 && weight > 3)) {
		weight = 4
	}
	if (weight > 13) {
		return "Your parcel/letter is too heavy to send!";
	}
	var cost;
	switch (type) {
		case 1:
			cost = (.50 + (parseInt(weight) * .21));
			break;
		case 2:
			cost = (.47 + (parseInt(weight) * .21));
			break;
		case 3:
			cost = (1 + (parseInt(weight) * .21));
			break;
		case 4:
			cost = (3.5 + (parseInt(weight) * .21));
			break;
	}
	return "Your parcel/letter costs $" + cost.toFixed(2);
}

app.listen(PORT, function() {
	console.log("Up and running")
})