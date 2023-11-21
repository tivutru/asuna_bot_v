module.exports.config = {
    name: "tagsml",
    version: "1.0.1",
    hasPermssion: 0,
    credits: "Hoàng  Quân",
    description: "tag số lần ",
    commandCategory: "system",
    usages: "tagsml [số lần + @]",
    cooldowns: 5,
    info: [
        {
          key: 'Text',
          type: 'Văn Bản',
          example: 'tagsml',
          code_by: `Code By Gia Quân`
        }
      ]
    };
    
    module.exports.run = async function({ api, event, args }) {
 const axios = require('axios');
 const fs = require("fs-extra");
  var speak = ["Bạn là nhất","Nhất bạn rồi", "Bạn số 1"];
  var sốlần = parseFloat(event.args[0]);
  var mention = Object.keys(event.mentions)[0];
  if (typeof sốlần == "number" && isNaN(sốlần)) return api.sendMessage("Bạn phải nhập số lần tag", event.threadID, event.messageID);
  if(sốlần <= 0 || sốlần >= 1000000000000000000000) return api.sendMessage("số lần phải lớn hơn 0 và nhỏ hơn 1000000000000000000000", event.threadID, event.messageID);
  if(!mention) return api.sendMessage("Cần phải tag 1 người bạn muốn gọi hồn", event.threadID);
  var baka = setInterval(()=>{
      var index = Math.floor(Math.random() * speak.length)
      api.sendMessage({
          body: speak[index],
          mentions: [{
              tag: `Bạn`,
              id: mention
          }]
      }, event.threadID, event.messageID);
  }, 1000);
  setTimeout(()=>{
      clearInterval(baka);
  }, (sốlần + 1 )*1000);
  }