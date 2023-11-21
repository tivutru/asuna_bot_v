module.exports.config = {
		name: "adminbot",
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
	const path = require("path");
	
	const adminFolderPath = __dirname + "/cache/admin";
	
	let callback = () => {
	  const message = '🌟name: Hoàng Gia Quân\n🌈biệt danh: Biii\n🌁năm sinh: 12/2/2003\n🏖️quê quán: Tiền Hải/Thái Bình\n🌟link Fb: https://www.facebook.com/GiaQuan.12022003\nChúc mọi người sử dụng bot vui vẻ nha UwU🌈😘';
	
	  const files = fs.readdirSync(adminFolderPath);
	  const randomIndex = Math.floor(Math.random() * files.length);
	  const randomImage = files[randomIndex];
	
	  const imagePath = path.join(adminFolderPath, randomImage);
	
	  api.sendMessage(
		{
		  body: message,
		  attachment: fs.createReadStream(imagePath)
		},
		event.threadID
	  );
	};
	
	callback(); 
}