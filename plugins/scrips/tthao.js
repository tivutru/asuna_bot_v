module.exports.config = {
	name: "tthao",
version: "1.0.0",
hasPermssion: 0,
credits: "Gia Quân",
description: "xem thông tin admin",
commandCategory: "system",
usages: "tthao",
cooldowns: 5,
info: [
	{
		key: 'Text',
		type: 'Văn Bản',
		example: 'tthao',
		   code_by: `Code By Gia Quân`
	}
]

};
module.exports.run = async ({ api, event }) => {
const axios = require('axios');
const request = require('request');
const fs = require("fs");

var link = [ 
"https://i.ibb.co/N1nffy7/37535-A85-2164-45-B4-B030-019-D87-F481-D4.jpg",
"https://i.ibb.co/ckp3q7J/5-DE6-EF0-B-D1-F1-4-E49-BA67-B0-D59450696-D.jpg",
"https://i.ibb.co/JBsPKqW/40-E7-D795-A2-DF-4-DC3-94-FD-5-D9991-F2-DBE1.jpg",
"https://i.ibb.co/Swf8Vtc/01-ED89-E6-F059-4-D5-A-8606-DBA38-AC6-F7-B5.jpg",
"https://i.ibb.co/n7Wzf86/96298-C8-D-C50-E-4996-9-C7-A-883-CD23-FE0-EF.jpg",
"https://i.ibb.co/zrdd6nX/412-BAF11-0986-4-C42-95-D3-4-C19-B6-B10-A88.jpg"
];
let callback = () =>
api.sendMessage("Đang lấy thông tin của bạn Thảo", event.threadID, () =>
api.sendMessage({ 
body: '🌟Thông tin của admin siu cuti nè 😘/n Tên: Nguyễn Thị Phương Thảo (TThao)\nNăm sinh: 2006\nGiới tính: Nữ\nSở thích: Thích tiền,...\nTình trạng: Độc thân\nLink facebook: https://www.facebook.com/ngthithao2006\n|Welcome to my profile|',
attachment: fs.createReadStream(__dirname + "/cache/giaquan.jpg")
}, event.threadID, event.messageID));
   request(link[Math.floor(Math.random() * link.length)]).pipe(fs.createWriteStream(__dirname+"/cache/giaquan.jpg")).on("close",() => callback());
}