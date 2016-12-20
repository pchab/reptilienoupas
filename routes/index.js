var express = require('express');
var router = express.Router();

var hashCode = function(s){
  return s.split("").reduce(function(a,b){a=((a<<5)-a)+b.charCodeAt(0);return a&a},0);              
};

/* GET home page. */
router.get('/', function(req, res) {
	var templateVariables = { 
		title: 'Reptilien ou pas ?',
		text: 'Some famous reptilians:',
		footer: 'Find out the reptilians among us'
	};

	res.render('form', templateVariables);
});

/* GET answer page. */
router.get('/:name', function(req, res) {
	var name = req.params.name.trim();
	var templateVariables = { 
		title: 'Reptilien ou pas ?',
		text: name + ' is' + (!!(hashCode(name) %2) ? ' ': ' not ') + 'a reptilian.',
		footer: 'Find out the reptilians among us'
	};

	res.render('index', templateVariables);
});

module.exports = router;
