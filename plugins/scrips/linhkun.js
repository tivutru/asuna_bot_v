module.exports.config = {
	name: "linhkun",
version: "1.0.0",
hasPermssion: 0,
credits: "Hoàng Quân",
description: "xem thông tin linhkun",
commandCategory: "ảnh",
usages: "linhkun",
cooldowns: 5,
info: [
	{
		key: 'Text',
		type: 'Văn Bản',
		example: 'linhkun',
		   code_by: `Code By Gia Quân`
	}
]

};
module.exports.run = async ({ api, event }) => {
const axios = require('axios');
const request = require('request');
const fs = require("fs");

var link = [ 
"https://i.imgur.com/z96EtkT.jpg",
"https://i.imgur.com/wozMqzm.jpg",
"https://i.imgur.com/3qNsBnb.jpg",
"https://i.imgur.com/JNjgJyO.jpg"
   ];
let callback = () =>
api.sendMessage("Đang lấy thông tin của linhkun ❤️", event.threadID, () =>
api.sendMessage({ 
body: 'Linhkunn siu cuti nè 😘\nFacebook: https://www.facebook.comhttps://www.facebook.com/100081277471000\n|Welcome to my profile|',
attachment: fs.createReadStream(__dirname + "/cache/giaquan.jpg")
}, event.threadID, event.messageID));
   request(link[Math.floor(Math.random() * link.length)]).pipe(fs.createWriteStream(__dirname+"/cache/giaquan.jpg")).on("close",() => callback());
}