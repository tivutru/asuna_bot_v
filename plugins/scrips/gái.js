module.exports.config = {
  name: "gái",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Hoàng",
  description: "",
  commandCategory: "Game",
  usages: "[reply]",
  cooldowns: 30,
  dependencies: [
		"request",
		"fs-extra",
		"path"
  ],
info: [
      {
          key: 'Text',
          type: 'Văn Bản',
          example: 'gái',
         code_by: `Code By Gia Quân`
      }
  ]
};
module.exports.run = async ({ api, event }) => {
	const axios = require('axios');  
	 const fs = require("fs-extra");
   api.sendMessage("Đang requets Api...", event.threadID);
	 let res = (await axios.get(encodeURI(`https://api-bot.tamtrinh3.repl.co/images/gai`))).data;
	 let soluong = res.count;
	let pubg = (await axios.get(`${res.url}`, { responseType: "arraybuffer" } )).data;
		  fs.writeFileSync( __dirname + "/cache/hi.png", Buffer.from(pubg, "utf-8"));
	  return api.sendMessage({body:`Ảnh nè Bạn\nSố ảnh hiện có: ${soluong}\nAuthor: Hoàng Quân`,attachment: fs.createReadStream(__dirname + `/cache/hi.png`)}, event.threadID);
	}
	
