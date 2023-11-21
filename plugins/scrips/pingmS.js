module.exports.config = {
	name: "pingmS",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "Giaquân",
	description: "Kiểm tra ping của bot",
	commandCategory: "system",
	usages: "ping",
	cooldowns: 5,
	info: [
		{
			key: 'Text',
			type: 'Văn Bản',
			example: 'pingmS',
            code_by: `Code By Gia Quân`
		}
	]
};

module.exports.run = async ({ api, event, client }) => {
	const timeStart = Date.now();
	return api.sendMessage("", event.threadID, () => api.sendMessage(`Say Ok\nPing: ${Date.now() - timeStart}......ms`, event.threadID, event.messageID));
}
