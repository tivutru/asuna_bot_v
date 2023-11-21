module.exports.config = {
	name: "linhcute",
version: "1.0.0",
hasPermssion: 0,
credits: "Hoàng Quân",
description: "xem thông tin linh",
commandCategory: "ảnh",
usages: "linhcute",
cooldowns: 5,
info: [
	{
		key: 'Text',
		type: 'Văn Bản',
		example: 'linhcute',
		   code_by: `Code By Gia Quân`
	}
]

};
module.exports.run = async ({ api, event }) => {
const axios = require('axios');
const request = require('request');
const fs = require("fs");

var link = [ 
"https://i.imgur.com/aEFTsa3.mp4",
"https://i.imgur.com/aEFTsa3.mp4"
   ];
let callback = () =>
api.sendMessage("Chờ tí OK...", event.threadID, () =>
api.sendMessage({ 
body: 'Linhkunn siu cuti nè 😘',
attachment: fs.createReadStream(__dirname + "/cache/linh.mp4")
}, event.threadID, event.messageID));
   request(link[Math.floor(Math.random() * link.length)]).pipe(fs.createWriteStream(__dirname+"/cache/linh.mp4")).on("close",() => callback());
}