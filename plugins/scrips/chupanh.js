module.exports.config = {
	name: "chupanh",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "Hoàng",
	description: "Chụp một trang web nào đó (sex thì cút)",
	commandCategory: "other",
	usages: "chupanh + link web",
	cooldowns: 5,
	dependencies: ["request","fs-extra"]
};

module.exports.onLoad = () => {
    const { existsSync, createWriteStream } = require("fs-extra");
    const request = require('request');

    const exist = existsSync(__dirname + "/cache/anime.json");
    const writeData = createWriteStream(__dirname + "/cache/anime.json");
    if (!exist) return request("https://raw.githubusercontent.com/blocklistproject/Lists/master/porn.txt").pipe(writeData);
    else return;
}

module.exports.run = ({ event, api, args, client }) => {
    const request = require("request");
    const fs = require("fs-extra");
    const url = require('url');

    if (!client.pornList) client.pornList = fs.readFileSync(__dirname + "/cache/pornList.txt", "utf-8").split('\n').filter(site => site && !site.startsWith('#')).map(site => site.replace(/^(0.0.0.0 )/, ''));
    let urlParsed = url.parse(args[0]);

    if (client.pornList.some(pornURL => urlParsed.host == pornURL)) return api.sendMessage("Trang web bạn nhập không an toàn!!(NSFW PAGE)", event.threadID, event.messageID);

    try {
        return request(`https://image.thum.io/get/width/1920/crop/400/fullpage/noanimate/${args[0]}`)
            .pipe(fs.createWriteStream(__dirname + `/cache/${event.senderID}-ss.png`))
            .on("close", () => api.sendMessage({ attachment: fs.createReadStream(__dirname + `/cache/${event.senderID}-ss.png`) }, event.threadID, () => fs.unlinkSync(__dirname + `/cache/${event.senderID}-ss.png`)));
    }
    catch {
        return api.sendMessage("Không tìm thấy url này, định dạng không đúng ?", event.threadID, event.messageID);
    }
}