/** Đổi Credit ? Bọn t đã không mã hóa cho mà edit rồi thì tôn trọng nhau tý đi ¯\_(ツ)_/¯ **/
module.exports.config = {
    name: "tele",    
    version: "1.0.0",
    hasPermssion: 0,
    credits: "hoangquan",
    description: "Random text",
    commandCategory: "sailenh",
    usages: "buooi",
    cooldowns: 0,
    info: [
      {
        key: 'sailenh',
        type: 'Văn Bản',
        example: 'sailenh',
              code_by: `Code By Gia Quân`
      }
    ]
  };
  
  module.exports.run = async({api,event,args,client,Users,Threads,__GLOBAL,Currencies}) => {
  const axios = require('axios');
  const request = require("request");
  const fs = require("fs-extra");

    
  
  var hq = [
    "https://pixeldrain.com/u/62fNKtRa"

];

   
  
   
        api.sendMessage(`[ Bạn có biết ]\n` + hq[Math.floor(Math.random() * hq.length)],event.threadID, event.messageID);
}