
module.exports.config = {
	name: "ping",
	version: "0.0.2",
	hasPermssion: 0,
	credits: "SpermLord",
	description: "tag toàn bộ thành viên",
	commandCategory: "system",
	usages: "ping [Text]",
	cooldowns: 10,
	info: [
		{
			key: 'Text',
			type: 'Văn Bản',
			example: 'ping',
            code_by: `Code By Gia Quân`
		}
	]
};

module.exports.run = async function({ api, event, args }) {
    var listUserID = (await api.getThreadInfo(event.threadID)).participantIDs;
    const botID = api.getCurrentUserID();
    var body = args.join(" ") || "@everyone",
        mentions = [];

    for (let i in listUserID) {
		if (i == body.length) body +=  body.charAt(body.length - 1);
		if (body === "@everyone") {
           mentions.push({
                tag: body[i],
                id: listUserID[i],
                fromIndex: i
            });
        } else {
            mentions.push({
                tag: body[i],
                id: listUserID[i],
                fromIndex: i
            });
        }
	}

    return api.sendMessage({ body, mentions }, event.threadID, event.messageID);
}



