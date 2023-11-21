module.exports.config = {
		name: "hoahoc",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "Gia Quân",
	description: "xem thông tin admin",
	commandCategory: "system",
	usages: "adminbot",
	cooldowns: 5,
	info: [
		{
			key: 'Text',
			type: 'Văn Bản',
			example: 'adminbot',
               code_by: `Code By Gia Quân`
		}
	]

};
module.exports.run = async ({ api, event }) => {
	const axios = require('axios');
    const request = require('request');
    const fs = require("fs");
    
var link = [ 
"https://i.imgur.com/WHG7fgi.jpg",
];
let callback = () =>
api.sendMessage("Ok đang request ...", event.threadID, () =>
 api.sendMessage({ 
	body:  `bảng tuần hoàn nguyên tố hoá học nè `, 
 attachment: fs.createReadStream(__dirname + "/cache/giaquan.jpg")
  }, event.threadID, event.messageID));
       request(link[Math.floor(Math.random() * link.length)]).pipe(fs.createWriteStream(__dirname+"/cache/giaquan.jpg")).on("close",() => callback());
}