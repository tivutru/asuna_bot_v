module.exports.config = {
    name: "authenticator",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "Hoàng Quân",
    description: "lấy mã 2 fa",
    commandCategory: "Dành cho người dùng",
    usages: "image",
    cooldowns: 5,
    info: [
        {
          key: 'authenticator',
          type: 'Văn Bản',
          example: 'authenticator',
                code_by: `Code By Gia Quân`
        }
      ]
  };
  
  module.exports.run = async({api,event,args,client,Users,Threads,__GLOBAL,Currencies}) => {
    const axios = require('axios');
  const request = require("request");
  const fs = require("fs-extra");
  //if (module.exports.checkQTVOnly(event.threadID, event.senderID)) {
  //  api.sendMessage("Bạn không có quyền sử dụng lệnh này vì chế độ qtvOnly đang được bật.", event.threadID);
  //  return;
 // }


    const authenticator = require('authenticator');
    var formattedToken = authenticator.generateToken(args.join(""));
     
    var { threadID, messageID } = event;
    api.sendMessage("Đã gửi request đến past /",event.threadID);
      api.sendMessage('⏳ Đang lấy mã 2 fa cho bạn...', event.threadID, (err, info) => {
      setTimeout(() => {
    return api.sendMessage(formattedToken,threadID,messageID);
     }, 200);
    }, event.messageID);
  };