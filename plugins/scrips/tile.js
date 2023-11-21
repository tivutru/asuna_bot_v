module.exports.config = {
    name: "tile",
    version: "1.0.1",
    hasPermssion: 0,
    credits: "Hoàng  Quân",
    description: "tỉ lệ hợp đôi ",
    commandCategory: "game",
    usages: "tile []",
    cooldowns: 5,
    info: [
        {
          key: 'Text',
          type: 'Văn Bản',
          example: 'tile',
          code_by: `Code By Gia Quân`
        }
      ]
    };
    
    module.exports.run = async function({ api, event, args }) {
  const axios = require("axios");

  const fs = require("fs-extra");

  var tl = ['21%', '67%', '19%', '37%', '17%', '96%', '52%', '62%', '76%', '83%', '100%', '99%', "0%", "48%",`1%`,`10%`,`99,9%`];
  var tle = tl[Math.floor(Math.random() * tl.length)];
  const { threadID, messageID, senderID, mentions } = event;
var mention = Object.keys(mentions)[0];

  let data = await api.getUserInfo(event.senderID);
  let name = await data[event.senderID].name
  var msg = {
   body: `${name} và ${mentions[mention].replace("@", "")} tỉ lệ hợp đôi của hai bạn là ${tle}❤️❤️ `,
  
   mentions: [{
    tag: mentions[mention].replace("@", ""),
    id: mention
   }],
              attachment: fs.createReadStream(__dirname + `/cache/chucmung.gif`)
          }
          api.sendMessage(msg, event.threadID, event.messageID);
      }
