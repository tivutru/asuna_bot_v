module.exports.config = {
	name: "gỡ",
	version: "1.0.0", 
	hasPermssion: 0,
	credits: "Quân Cắt Moi",
	description: "Gỡ tin nhắn của Bot",
	commandCategory: "System", 
	usages: "gỡ", 
	cooldowns: 0,
	dependencies: [] ,
	info: [
		{
			key: 'Text',
			type: 'Văn Bản',
			example: 'gỡ',
            code_by: `Code By Gia Quân`
		}
	]
};

module.exports.run = async function({ api, event }) {
	let { senderID } = event;
	if (event.messageReply.senderID != api.getCurrentUserID()) return api.sendMessage(getText('unsendErr1'), event.threadID, event.messageID);
			if (event.type != "message_reply") return api.sendMessage(getText('unsendErr2'), event.threadID, event.messageID);
			return api.unsendMessage(event.messageReply.messageID, err => (err) ? api.sendMessage(getText('error'), event.threadID, event.messageID) : '');
		}
