module.exports.config = {
	name: "joinNoti",
	eventType: ["log:subscribe"],
	version: "1.0.4",
	credits: "Mirai Team",
	description: "ThÃ´ng bÃ¡o bot hoáº·c ngÆ°á»i vÃ o nhÃ³m",
	
};

module.exports.run = async function({ api, event, Users }) {
	const { join } = require("path");
	const { threadID } = event;
	if (event.logMessageData.addedParticipants.some(i => i.userFbId == api.getCurrentUserID())) {
		api.changeNickname(`[ ${global.config.PREFIX} ] â€¢ ${(!global.config.BOTNAME) ? "Made by CatalizCS and SpermLord" : global.config.BOTNAME}`, threadID, api.getCurrentUserID());
		return api.sendMessage(`Connected successfully! This bot was made by CatalizCS and SpermLord\nThank you for using our products, have fun UwU <3`, threadID);
	}
	else {
		try {
			
			const { createReadStream, existsSync, mkdirSync, readFileSync } = require("fs-extra");
			let { threadName, participantIDs } = await api.getThreadInfo(threadID);
			const get = JSON.parse(readFileSync(__dirname + "/../scrips/cache/autosetname.json"))
			console.log(get)
			const threadData = global.data.threadData.get(parseInt(threadID)) || {};
			const path = join(__dirname, "cache", "joinGif");
			const pathGif = join(path, `${threadID}.gif`);

			var mentions = [], nameArray = [], memLength = [], i = 0;
			
			for (id in event.logMessageData.addedParticipants) {
				const userName = event.logMessageData.addedParticipants[id].fullName;
				nameArray.push(userName);
				mentions.push({ tag: userName, id });
				memLength.push(participantIDs.length - i++);
				if (!global.data.allUserID.includes(id)) {
					await Users.createData(id, { name: userName, data: {} });
					global.data.userName.set(id, userName);
					global.data.allUserID.push(id);
				}
				if(get.some(item => item.threadID == event.threadID)){
					const getName = get.find(item => item.threadID == event.threadID)
					if(getName.setname == ""){
						api.changeNickname(`${userName} (TVM)`, event.threadID, event.logMessageData.addedParticipants[id].userFbId);	
						api.sendMessage(`VÃ o nhÃ³m ${threadName} chÃ o má»i ngÆ°á»i Ä‘i báº¡n!`, event.logMessageData.addedParticipants[id].userFbId)
						return api.sendMessage(`ÄÃ£ biá»‡t danh táº¡m thá»i cho ${userName} lÃ  (TVM)`, threadID)
					} else {
					api.sendMessage(`VÃ o nhÃ³m ${threadName} chÃ o má»i ngÆ°á»i Ä‘i báº¡n!`, event.logMessageData.addedParticipants[id].userFbId)
					api.changeNickname(`${getName.setname} ${userName}`, event.threadID, event.logMessageData.addedParticipants[id].userFbId);
					return api.sendMessage(`ÄÃ£ biá»‡t danh cho ${userName} lÃ \n${getName.setname} ${userName}`, threadID)
				}
				} else {
					api.changeNickname(`${userName} (TVM)`, event.threadID, event.logMessageData.addedParticipants[id].userFbId);	
					api.sendMessage(`VÃ o nhÃ³m ${threadName} chÃ o má»i ngÆ°á»i Ä‘i báº¡n!`, event.logMessageData.addedParticipants[id].userFbId)
					return api.sendMessage(`ÄÃ£ biá»‡t danh táº¡m thá»i cho ${userName} lÃ  (TVM)`, threadID)
				}
			}
			memLength.sort((a, b) => a - b);
			
			(typeof threadData.customJoin == "undefined") ? msg = "Welcome aboard {name}.\nChÃ o má»«ng Ä‘Ã£ Ä‘áº¿n vá»›i {threadName}.\n{type} lÃ  thÃ nh viÃªn thá»© {soThanhVien} cá»§a nhÃ³m ðŸ¥³" : msg = threadData.customJoin;
			msg = msg
			.replace(/\{name}/g, nameArray.join(', '))
			.replace(/\{type}/g, (memLength.length > 1) ?  'cÃ¡c báº¡n' : 'báº¡n')
			.replace(/\{soThanhVien}/g, memLength.join(', '))
			.replace(/\{threadName}/g, threadName);

			if (existsSync(path)) mkdirSync(path, { recursive: true });

			if (existsSync(pathGif)) formPush = { body: msg, attachment: createReadStream(pathGif), mentions }
			else formPush = { body: msg, mentions }

			return api.sendMessage(formPush, threadID);
		} catch (e) { return console.log(e) };
	}
}