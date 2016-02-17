#! /usr/bin/env node

var i18n = require('../index');

var config = getConfig();

console.log("Action to execute = " + config["action"]);

console.dir(config);

switch (config["action"]) {
	case "upload":
		i18n.crowdin.upload(config["project"], config["apiKey"], config["marker"], config["files"]);
		break;
	case "download":
		i18n.crowdin.download(config["project"], config["apiKey"], config["destFolder"]);
		break;
	default:
		console.error("Missing action params: --action=[upload, download]");
}

function getDefaultConfig() {
	var configFile = process.cwd() + "/package.json";

	console.log('Looking for config file = ' + configFile);

	var configStr = require('fs').readFileSync(configFile);
	var configJson = JSON.parse(configStr);

	var config = {};

	if (configJson["i18n"]) {
		console.log("Config found!");
		var i18nConfig = configJson["i18n"];

		if (i18nConfig["crowdin"]) {
			if (i18nConfig["crowdin"]["apiKey"]) {
				config["apiKey"] = i18nConfig["crowdin"]["apiKey"];
				console.log("Config found: crowdin API key = " + config["apiKey"]);
			}
			if (i18nConfig["crowdin"]["project"]) {
				config["project"] = i18nConfig["crowdin"]["project"];
				console.log("Config found: crowdin project = " + config["project"]);
			}
		}
	}

	return config;
}

function getConfig() {
	var config = getDefaultConfig();

	var args = process.argv.slice(2);

	args.forEach(function(e, i, a) {
		var splittedArg = e.split('=');
		config[splittedArg[0].substring(2)] = splittedArg[1];
	})

	return config;
}
