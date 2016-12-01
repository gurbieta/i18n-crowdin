module.exports = function(text, jsFile) {
	var singularRegex = new RegExp('msgid "(.*?)"\nmsgstr "(.*?)"\n', 'g');
	var pluralRegex = new RegExp('msgid "(.*?)"\nmsgid_plural "(.*?)"\nmsgstr\\[0\\] "(.*?)"\nmsgstr\\[1\\] "(.*?)"\n', 'g');

	var translations = {};

	var myArray;
	while ((myArray = singularRegex.exec(text)) !== null) {
		translations[myArray[1]] = myArray[2];
	}

	while ((myArray = pluralRegex.exec(text)) !== null) {
		translations[myArray[1]] = myArray[3];
		translations[myArray[2]] = myArray[4];
	}

	var content = "var i18nMap = " + JSON.stringify(translations, null, '\t');

	require('fs').writeFile(jsFile, content, function(err) {
		if (err) throw err;
		console.log(jsFile + ' saved!');
	});
};
