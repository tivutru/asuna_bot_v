module.exports.config = {
	name: "meme",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "CatalizCS",
	description: "Random ảnh chế :D",
	commandCategory: "random-img",
	usages: "meme",
	cooldowns: 1,
	dependencies: ['request', 'fs-extra']
};

module.exports.run = async ({ api, event }) => {
	const axios = require('axios');  
	 const fs = require("fs-extra");
	 let res = (await axios.get(encodeURI(`https://api-bot.tamtrinh3.repl.co/images/meme`))).data;
	 let soluong = res.count;
	let pubg = (await axios.get(`${res.url}`, { responseType: "arraybuffer" } )).data;
		  fs.writeFileSync( __dirname + "/cache/hi.png", Buffer.from(pubg, "utf-8"));
	  return api.sendMessage({body:`Ảnh nè Bạn\nSố ảnh hiện có: ${soluong}\nAuthor: Hoàng Quân`,attachment: fs.createReadStream(__dirname + `/cache/hi.png`)}, event.threadID);
	}
	