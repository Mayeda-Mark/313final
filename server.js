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
	getWeeks(function(error, result){
		getTeams(function(error, result2){
		res.render("Football", {week: result, team: result2});
		});
	});
})

app.get("/results", function(req, res){
	console.log("requesting table");
	var id = req.query.Team1;
	getTeamName(id, function(error, result){
		console.log(result.name);
		displayData(id, function(error, result2){
		//console.log(result2);
		res.render("results", {team: result, table: result2});
		});
	});
});
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
		callback(null, result.rows);
	});
}

function getTeams(callback){
	var sql = "SELECT * FROM Team ORDER BY name;";
	pool.query(sql, function(err, result){
		if(err) {
			console.log("An error with the database has occurred");
			console.log(err);
			callback(err, null);
		}
		callback(null, result.rows);
	});
}

app.listen(PORT, function() {
	console.log("Up and running")
})

function displayData(id, callback){
	var sql = "SELECT Analysis.Team_id, Analysis.Week_id, Score.teamScore, Score.oppScore, Score.iswin, Spread.proj_spread, Score.realSpread, Analysis.spreadDifference FROM ((Analysis INNER JOIN Spread ON Analysis.spread_id = Spread.id) INNER JOIN Score ON Analysis.score_id = Score.id) WHERE Analysis.Team_id = " + id + " ORDER BY Analysis.Week_id;";
	pool.query(sql, function(err, result){
		if(err) {
			console.log("An error with the database has occurred");
			console.log(err);
			callback(err, null);
		}
		callback(null, result.rows);
	});
}

function getTeamName(id, callback){
	var sql = "SELECT name FROM Team WHERE id = " + id + ";";
	pool.query(sql, function(err, result){
		if(err) {
			console.log("An error with the database has occurred");
			console.log(err);
			callback(err, null);
		}
		callback(null, result.rows);
	});
}