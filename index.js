const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')  
  .get('/math', function (req, res) {
  	var num1 = parseFloat(req.param('num1'));
  	var num2 = parseFloat(req.param('num2'));
  	var result;
  	var operator = req.param('operator');
  	switch (operator) {
  		case 'add':
  			result = (num1 + num2);
  			break;
  		case 'sub':
  			result = num1 - num2;
  			break;
  		case 'mul':
  			result = num1 * num2;
  			break;
  		case 'div':
  			result = num1 / num2;
  			break;
  	}
  	res.render('pages/math', {
  		result:result
  	});
  })
  .get('/', (req, res) => res.render('pages/index'))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
