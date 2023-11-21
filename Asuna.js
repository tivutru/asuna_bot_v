const { readdirSync, readFileSync, writeFileSync, existsSync, copySync } = require("fs-extra");
const fs = require('fs');
const util = require('util');
const {execSync} = util.promisify(require('child_process').execSync);
const { join, resolve } = require("path");
const logger = require("./utils/log.js");
const login = require("./main/project-api");
const timeStart = Date.now();
const app = require("express")();
const chalk = require("chalk");
const moment = require("moment-timezone");
const client = {
	commands: new Map(),
	events: new Map(),
	event: new Map(),
	userName: new Map(),
	schedule: [],
	allUser: [],
	allThread: [],
	handleReply: new Array(),
	handleReaction: new Array(),
	cooldowns: new Map(),
	userBanned: new Map(),
	nameUser: new Map(),
	threadBanned: new Map(),
	threadSetting: new Map(),
	commandBanned: new Map(),
	threadInfo: new Map(),
	commandRegister: new Map(),
	inProcess: false,
	dirConfig: "",
	AsunaPath: process.cwd(),
	dirMain: process.cwd(),
	timeLoadModule: "",
	language: new Object(),
	configPath: new String(),
	getTime: function (option) {
        switch (option) {
        case "seconds":
            return `${moment.tz("Asia/Ho_Chi_minh").format("ss")}`;
        case "minutes":
            return `${moment.tz("Asia/Ho_Chi_minh").format("mm")}`;
        case "hours":
            return `${moment.tz("Asia/Ho_Chi_minh").format("HH")}`;
        case "date":
            return `${moment.tz("Asia/Ho_Chi_minh").format("DD")}`;
        case "month":
            return `${moment.tz("Asia/Ho_Chi_minh").format("MM")}`;
        case "year":
            return `${moment.tz("Asia/Ho_Chi_minh").format("YYYY")}`;
        case "fullHour":
            return `${moment.tz("Asia/Ho_Chi_minh").format("HH:mm:ss")}`;
        case "fullYear":
            return `${moment.tz("Asia/Ho_Chi_minh").format("DD/MM/YYYY")}`;
        case "fullTime":
            return `${moment.tz("Asia/Ho_Chi_minh").format("HH:mm:ss DD/MM/YYYY")}`;
        }
    },
    timeStart: Date.now()
},		
global = {
	config: []
};
const argv = require('minimist')(process.argv.slice(2)); 
var configValue;
client.dirConfig = join(client.dirMain, "config.json");
try {
	configValue = require(client.dirConfig)
	console.log(chalk.yellow(`============== DOWNLOAD CONFIG ==============`));
	logger.loader(`Đã tìm thấy file config: "config.json"`);
}
catch(e) {
	logger.loader("Đã xảy ra lỗi khi load file config:\n"+e, "error");
};
try {
	for (const [name, value] of Object.entries(configValue)) {
		global.config[name] = value;
	}
	logger.loader("Config Loaded!");
}
catch(e) {
	return logger.loader("Không thể load config!\n "+e, "error");
}
writeFileSync(client.dirConfig, JSON.stringify(configValue, null, 2), 'utf8');
//
//language
//
const langFile = (readFileSync(`${__dirname}/languages/${global.config.language || "vi"}.lang`, {
    encoding: 'utf-8'
})).split(/\r?\n|\r/);
const langData = langFile.filter(item => item.indexOf('#') != 0 && item != '');
for (const item of langData) {
    const getSeparator = item.indexOf('=');
    const itemKey = item.slice(0, getSeparator);
    const itemValue = item.slice(getSeparator + 1, item.length);
    const head = itemKey.slice(0, itemKey.indexOf('.'));
    const key = itemKey.replace(head + '.', '');
    const value = itemValue.replace(/\\n/gi, '\n');
    if (typeof global.language[head] == "undefined") global.language[head] = new Object();
    global.language[head][key] = value;
}
global.getText = function (...args) {
    const langText = global.language;
    if (!langText.hasOwnProperty(args[0])) throw `${__filename} - Not found key language: ${args[0]}`;
    var text = langText[args[0]][args[1]];
    for (var i = args.length - 1; i > 0; i--) {
        const regEx = RegExp(`%${i}`, 'g');
        text = text.replace(regEx, args[i + 1]);
    }
    return text;
}
////////////
///plugins/events/scrips/
////////////
if (!client.scrips) client.scrips = new Map();
if (!client.events) client.events = new Map();
async function loadPlugins(type, dirMain, configValue) {
    let pluginFiles;
    try {
        if (type === 'scrips') {
            pluginFiles = await fs.promises.readdir(dirMain + "/plugins/scrips");
            pluginFiles = pluginFiles.filter((file) => file.endsWith(".js") && !file.includes('example') && !global.config.commandDisabled.includes(file));
        } else if (type === 'events') {
            pluginFiles = await fs.promises.readdir(dirMain + "/plugins/events");
            pluginFiles = pluginFiles.filter((file) => file.endsWith(".js") && !file.includes('example') && !global.config.commandDisabled.includes(file));
        }
        for (const file of pluginFiles) {
            const timeStartLoad = Date.now();
            let plugin; 
            try {
                plugin = require(`${dirMain}/plugins/${type}/${file}`);
                if (type === 'scrips') {
                       if (client.scrips.has(plugin.config.name)) throw new Error(`Tên plugin bị trùng: ${plugin.config.name}`);
                    client.scrips.set(plugin.config.name, plugin);
                } else if (type === 'events') {
                      if (client.events.has(plugin.config.name)) throw new Error(`Tên plugin bị trùng: ${plugin.config.name}`);
                    client.events.set(plugin.config.name, plugin);
                }
                if (plugin.config.envConfig) {
                       for (const [key, value] of Object.entries(plugin.config.envConfig)) {
                        if (typeof global[plugin.config.name] === "undefined") global[plugin.config.name] = {};
                        if (typeof configValue[plugin.config.name] === "undefined") configValue[plugin.config.name] = {};
                        if (typeof configValue[plugin.config.name][key] !== "undefined") global[plugin.config.name][key] = configValue[plugin.config.name][key];
                        else global[plugin.config.name][key] = value || "";
                        if (typeof configValue[plugin.config.name][key] === "undefined") configValue[plugin.config.name][key] = value || "";
                    }
                }	
                if (plugin.onLoad) {
                      try {
                        plugin.onLoad({ global, client, configValue });
                    } catch (error) {
                        logger.loader(`Lỗi onLoad plugins: ${plugin.config.name} với lỗi: ${error.name} - ${error.message}`, "error");
                    }
                }
                if (plugin.event) {
                    const registerCommand = client.commandRegister.get("event") || [];
                    registerCommand.push(plugin.config.name);
                    client.commandRegister.set("event", registerCommand);
                }
                if (type === 'scrips') {
                        client.commands.set(plugin.config.name, plugin);
                } 
				if (type === 'events') {
					client.commands.set(plugin.config.name, plugin);
                } 
            } catch (error) {
                logger.loader(`Không thể tải ${type}: ${file} với lỗi: ${error.message}`, "error");
            }
             if (Date.now() - timeStartLoad > 5) {
                client.timeLoadModule += `${plugin ? plugin.config.name : 'Unknown Plugin'} - ${Date.now() - timeStartLoad}ms\n`;
            }
        }
    } catch (error) {
        logger.loader(`Lỗi đọc thư mục plugin ${type}: ${error.message}`, "error");
    }
}
const dirMain = client.dirMain;
loadPlugins('scrips', client.dirMain, configValue);
loadPlugins('events', client.dirMain, configValue);
writeFileSync(client.dirConfig, JSON.stringify(configValue, null, 2), 'utf8');
///
//Restart
///
if (configValue.REFRESHING === 'on') {
	setTimeout(() => {
	  console.log("\n\n>> TỰ ĐỘNG KHỞI ĐỘNG LẠI SAU 10 PHÚT <<\n\n");
	  require("eval")("module.exports = process.exit(1)", true);
	}, 10 * 60 * 1000); // 3 phút tính bằng mili giây
  }
/////////////////
/////fbstate
////////////////
try {
	console.log(chalk.yellow(`============== APPSTATE ==============`));
	var appStateFile = resolve(join(client.dirMain, global.config.APPSTATEPATH || "appstate.json"));
	var appState = require(appStateFile);
    logger.loader("Đã Thêm Appstate.json");
if (e) {
	return logger("Đã xảy ra lỗi trong khi lấy appstate đăng nhập, lỗi: " + e, "error");
}
console.log("Bot ID: " + api.getCurrentUserID());
		api.listenMqtt((err, event) => {
			console.log(event);
			api.setOptions({
				forceLogin: true,
				listenEvents: true,
				selfListen: true
				});
				switch (event.type) {
					case "log:subscribe":
					case "log:unsubscribe":
					case "message": {
						cmds({ event, api });
						break;
						}
						case "event": {
						break;
						}
					}
				})
			}catch {
				console.log(chalk.yellow(`============== LOGIN BOT ==============`));
				logger.loader("Success Login In..")
	}
  //////
// On Bot
/////
function onBot({ models }) {
	login({ appState }, (error, api) => {
		if (error) return logger(JSON.stringify(error), "error");
    app.get("/", (req, res) => {
    	res.send("Hi...");
    });
  	 app.listen(process.env.PORT || 3000, )
    api.setOptions({
			forceLogin: true,
			listenEvents: true,
			logLevel: "error",
			selfListen: global.config.selfListen || false,
				});

		writeFileSync(appStateFile, JSON.stringify(api.getAppState(), null, "\t"));

		const handleListen = require("./includes/listen")({ api, models, client, global, timeStart });

		api.listenMqtt((error, event) => {
			if (error) return logger(`handleListener đã xảy ra lỗi: ${JSON.stringify(error)}`, "error");
			if ((["presence","typ","read_receipt"].some(typeFilter => typeFilter == event.type))) return;
			(global.config.DeveloperMode == true) ? console.log(event) : "";
			return handleListen(event);
		});

		setInterval(function () { return handleListen({ type: "ping", time: 1, reader: 1, threadID: 1 }) }, 60000);
		return;
	});	
}
///////////////////
/////database///
////////////
const { Sequelize, sequelize } = require("./includes/database");
(async () => {
	try {
		if (existsSync(resolve('./includes', 'skeleton_data.sqlite')) && !existsSync(resolve('./includes', 'data.sqlite'))) copySync(resolve('./includes', 'skeleton_data.sqlite'), resolve('./includes', 'data.sqlite'));
		var migrations = readdirSync(`./includes/database/migrations`);
		var completedMigrations = await sequelize.query("SELECT * FROM `SequelizeMeta`", { type: Sequelize.QueryTypes.SELECT });
		for (const name in completedMigrations) {
			if (completedMigrations.hasOwnProperty(name)) {
				const index = migrations.indexOf(completedMigrations[name].name);
				if (index !== -1) migrations.splice(index, 1);
			}
		}

		for (const migration of migrations) {
			var migrationRequire = require(`./includes/database/migrations/` + migration);
			migrationRequire.up(sequelize.queryInterface, Sequelize);
			await sequelize.query("INSERT INTO `SequelizeMeta` VALUES(:name)", { type: Sequelize.QueryTypes.INSERT, replacements: { name: migration } });
		}

		await sequelize.authenticate();
		logger("Kết nối cơ sở dữ liệu thành công", "[ DATABASE ]");
		const models = require("./includes/database/model");
		return onBot({ models });
	}
	catch (error) {
		() => logger(`Kết nối cơ sở dữ liệu thất bại, Lỗi: ${error.name}: ${error.message}`, "[ DATABASE ]");
	}
})();

