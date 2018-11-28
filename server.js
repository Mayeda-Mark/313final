//server.js

var express = require("express");
var app = express();
const { Pool } = require("pg");
const connectionString = process.env.DATABASE_URL || "postgress://footballuser:gohawks@localhost:5432/football";
const pool = new Pool({connectionString: connectionString});

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

app.get("/Football", function(req, res){
	console.log("Connected to Football.ejs")
	var bla = getWeeks(function(error, result){
		console.log(result);
		return result;
	});
	console.log(bla);
	res.render("Football");
})

//price
/*app.get("/price", function(req, res) {
	var weight = parseFloat(req.param('weight'));
	var type = parseInt(req.param('type'));
	var price = getPrices(weight, type);
	var param = { price: price };
	res.render("price", param);
})*/

function getWeeks(callback){
	console.log("getWeeks called");
	var sql = "SELECT * FROM Week ORDER BY id;";
	pool.query(sql, function(err, result){
		if(err) {
			console.log("An error with the database has occurred");
			console.log(err);
			callback(err, null);
		}
		//console.log("Found DB result: " + JSON.stringify(result.rows));
		callback(null, result.rows);
	});
}

app.listen(PORT, function() {
	console.log("Up and running")
})

