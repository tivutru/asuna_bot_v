module.exports.config = {
		name: "thơ",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "Gia Quân",
	description: "xem thơ chế dảk dảk bủh vủh lmao",
	commandCategory: "Random text",
	usages: "thơ",
	cooldowns: 5,
	info: [
		{
			key: 'Text',
			type: 'Văn Bản',
			example: 'thơ',
            code_by: `Code By Gia Quân`
		}
	]
};
module.exports.run = async ({ api, event }) => {
const axios = require('axios');
const res = await axios.get(`https://api-dev.hoang87.repl.co/api/poem?apikey=HOANG`);
var thơ = res.data.data
return api.sendMessage(` ${thơ} `, event.threadID, event.messageID)
}
