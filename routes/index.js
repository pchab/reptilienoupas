var express = require('express');
var router = express.Router();

var hashCode = function(s){
  return s.split("").reduce(function(a,b){a=((a<<5)-a)+b.charCodeAt(0);return a&a},0);              
};

var templateVariables = {
	en: {
		title: 'Reptilian or not ?',
		text: 'Some famous reptilians:',
		footer: 'Find out the reptilians among us'
	},
	fr: {
		title: 'Reptilien ou pas ?',
		text: 'Des reptiliens célèbres:',
		footer: 'Trouve les reptiliens parmi nous'
	}
};

/* GET home page. */
router.get('/', function(req, res) {
	var lang = req.acceptsLanguages('fr') || 'en';

	res.render('form', templateVariables[lang]);
});

/* GET answer page. */
router.get('/:name', function(req, res) {
	var name = req.params.name.trim();
	var lang = req.acceptsLanguages('fr') || 'en';
	var answer = JSON.parse(JSON.stringify(templateVariables[lang]));

	if (lang !== 'fr') {
		answer.text = name + ' is' + (!!(hashCode(name) %2) ? ' ': ' not ') + 'a reptilian.';
	} else {
		answer.text = name + (!!(hashCode(name) %2) ? ' est ': " n'est pas ") + 'un reptilien.';
	}
	

	res.render('index', answer);
});

module.exports = router;
