module.exports.config = {
	name: "money",
	version: "0.0.1",
	hasPermssion: 0,
	credits: "Hoàng & Quân",
	description: "Kiểm tra số tiền của bản thân hoặc người được tag",
	commandCategory: "economy",
	usages: "money",
	cooldowns: 5,
	info: [
		{
			key: 'Text',
			type: 'Văn Bản',
			example: 'money',
            code_by: `Code By Gia Quân`
		}
	]
};

module.exports.run = async function({ api, event, args, Currencies, utils }) {
	if (!args[0]) {
		const money = (await Currencies.getData(event.senderID)).money;
		return api.sendMessage(`Số tiền bạn hiện đang có: ${money} đô`, event.threadID);
	}
	else if (Object.keys(event.mentions).length == 1) {
		var mention = Object.keys(event.mentions)[0];
		const money = (await Currencies.getData(mention)).money;
		return api.sendMessage({
			body: `Số tiền của ${event.mentions[mention].replace("@", "")} hiện đang có là: ${money} coin.`,
			mentions: [{
				tag: event.mentions[mention].replace("@", ""),
				id: mention
			}]
		}, event.threadID, event.messageID);
	}
}