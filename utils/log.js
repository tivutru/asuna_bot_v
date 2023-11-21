const chalk = require('chalk');

module.exports = (data, option) => {
	switch (option) {
		case "warn":
			console.log(chalk.bold.hex("#00FFFF").bold('[ WARN ] » ') + data);
			break;
		case "error":
			console.log(chalk.red('[ ERROR ] » ') + data);
			break;
		default:
			console.log(chalk.bold.hex("#00FFFF").bold(`${option} » `) + data);
			break;
	}
}

module.exports.loader = (data, option) => {
	switch (option) {
		case "warn":
			console.log(chalk.yellow('[ LOADER ] » ') + data);
			break;
		case "error":
			console.log(chalk.red('[ LOADER ] » ') + data);
			break;
		default:
			console.log(chalk.bold.hex("#66FF00").bold(`[ LOADER ] » `) + data);
			break;
	}
}
