module.exports.config = {
	name: "uptime",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "Gia_Quân",
	description: "Kiểm tra thời gian bot đã online",
	commandCategory: "system",
	usages: "uptime",
	cooldowns: 5,
	info: [
		{
			key: 'Text',
			type: 'Văn Bản',
			example: 'uptime',
            code_by: `Code By Gia Quân`
		}
	]
};

module.exports.run = async ({ api, event, client }) => {
	const time = process.uptime(),
		hours = Math.floor(time / (60 * 60)),
		minutes = Math.floor((time % (60 * 60)) / 60),
		seconds = Math.floor(time % 60);

	const timeStart = Date.now();
	return api.sendMessage("Ok get time...", event.threadID, () => api.sendMessage(` ${hours}h: ${minutes}m: ${seconds}s.\n\n🌟=====Asuna_chan=====🌟`, event.threadID, event.messageID));
}