module.exports = function({ api, client, global, models, timeStart }) {
	const Users = require("./controllers/users")({ models, api }),
				Threads = require("./controllers/threads")({ models, api }),
				Currencies = require("./controllers/currencies")({ models });
	const logger = require("../utils/log.js");
	const chalk = require("chalk");
	//////////////////////////////////////////////////////////////////////
	//========= Push all variable from database to environment =========//
	//////////////////////////////////////////////////////////////////////
	(async function() {
		try {
			console.log(chalk.yellow(`============== GET CONFIG ==============`));
			console.log(chalk.green("[ ASUNA LOADER ] » ","Bắt Đầu...√"));
            logger(`Account ID => ${api.getCurrentUserID()}`, `[ ASUNA LOADER ]`);
            logger(`Dấu Lệnh => [ ${global.config.PREFIX} ]`, `[ ASUNA LOADER ]`);
            logger(`Tên Bot => ${global.config.BOTNAME}`, `[ ASUNA LOADER ]`);
            logger("Uptime Post 6000...√", "[ ASUNA LOADER ]");
			console.log(chalk.yellow(`============== PLUGIN ==============`));
            logger.loader(`Done: ${client.commands.size} Plugins`);
            logger.loader(`Done: ${client.events.size} Plugins events`);
        const threads = (await Threads.getAll());
        const users = (await Users.getAll(["userID", "banned", "name"]));
    for (const info of threads) {
        client.allThread.push(info.threadID);
        client.threadSetting.set(info.threadID, info.settings || {});
        client.threadInfo.set(info.threadID, info.threadInfo || {});
    if (info.banned == 1) client.threadBanned.set(info.threadID, 1);
}   
    for (const info of users) {
        client.allUser.push(info.userID);
    if (info.name && info.name.length != 0) client.nameUser.set(info.userID, info.name);
    if (info.banned == 1) client.userBanned.set(info.userID, 1);
}
    }
		catch (error) {
			return logger.loader("Khởi tạo biến môi trường không thành công, Lỗi: " + error, "error");
		}
	})();
	///////////////////////////////////////////////
	//========= Require all handle need =========//
	//////////////////////////////////////////////
	require("./handle/handleSchedule")({ api, global, client, models, Users, Threads, Currencies });
	const utils = require("../utils/funcs.js")({ api, global, client });
	const handleCommand = require("./handle/handleCommand")({ api, global, client, models, Users, Threads, Currencies, utils });
	const handleCommandEvent = require("./handle/handleCommandEvent")({ api, global, client, models, Users, Threads, Currencies, utils });
	const handleReply = require("./handle/handleReply")({ api, global, client, models, Users, Threads, Currencies });
	const handleReaction = require("./handle/handleReaction")({ api, global, client, models, Users, Threads, Currencies });
	const handleEvent = require("./handle/handleEvent")({ api, global, client, models, Users, Threads, Currencies });
	const handleCreateDatabase = require("./handle/handleCreateDatabase")({ global, api, Threads, Users, Currencies, models, client });
	//////////////////////////////////////////////////
	//========= Send event to handle need =========//
	/////////////////////////////////////////////////
	return (event) => {
		switch (event.type) {
			case "message":
			case "message_reply":
			case "message_unsend":
				handleCommand({ event });
				handleReply({ event });
				handleCommandEvent({ event });
				handleCreateDatabase({ event });
				break;
			case "event":
				handleEvent({ event });
				break;
			case "message_reaction":
				handleReaction({ event });
				break;
			case "ping":
				api.sendMessage("", api.getCurrentUserID(), (error, info) => {});
				break;
			default:
				break;
		}
	};
};
