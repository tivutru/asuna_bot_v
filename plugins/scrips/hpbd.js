module.exports.config = {
		name: "hpbd",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "Gia Quân",
	description: "tag hpbd ",
	commandCategory: "Hình Ảnh",
	usages: "hpbd",
	cooldowns: 5,
   info: [
      {
         key: 'Text',
         type: 'Văn Bản',
         example: 'hpbd',
         code_by: `Code By Gia Quân`
      }
   ]
};

module.exports.run = async function({ api, args, Users, event}) {
  
const { threadID, messageID, senderID, mentions } = event;
var mention = Object.keys(mentions)[0];
setTimeout(() =>
api.sendMessage({
   body:"Chúc mừng sinh nhật  🎂" + mentions[mention].replace("@", "") ,
   mentions: [{
    tag: mentions[mention].replace("@", ""),
    id: mention
   }]
  }, threadID, messageID), 1000)
setTimeout(() =>
api.sendMessage({
   body:  `Chúc mừng sinh nhật em, sang một tuổi mới, thành công mới, nhiều niềm vui mới, nhiều thắng lợi mới, và nếu có thể thì cả người yêu mới nữa nhé. Vì vẫn luôn có một người luôn đứng đó đợi em!\n luôn bên cạnh em ❤️ `  + mentions[mention].replace("@", "") ,
   mentions: [{
    tag: mentions[mention].replace("@", ""),
    id: mention
   }]
  }, threadID), 2500)
  const axios = require('axios');
    const request = require('request');
    const fs = require("fs");
    
var link = [ 
"https://i.imgur.com/i3YRuFM.jpg",

];
let callback = () =>
 api.sendMessage({ 
 attachment: fs.createReadStream(__dirname + "/cache/hpbd.jpg")
  }, event.threadID, event.messageID);
       request(link[Math.floor(Math.random() * link.length)]).pipe(fs.createWriteStream(__dirname+"/cache/hpbd.jpg")).on("close",() => callback());
       setTimeout(() =>
       api.sendMessage({
          body:"Chúc em tất cả❤️ " + mentions[mention].replace("@", "") ,
          mentions: [{
           tag: mentions[mention].replace("@", ""),
           id: mention
          }]
         }, threadID), 3000)
}