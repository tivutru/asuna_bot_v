module.exports.config = {
    name: "birthday",
    version: "1.0.1",
    hasPermssion: 0,
    credits: "Hoàng Quân",
    description: "tính ngày sinh nhật",
    commandCategory: "system",
    usages: "birthday [Text]",
    cooldowns: 5,
    info: [
        {
          key: 'Text',
          type: 'Văn Bản',
          example: 'birthday',
          code_by: `Code By Gia Quân`
        }
      ]
    };
    
    module.exports.run = async function({ api, event, args }) {
      
    
   let tip = event.args[0];
   if (!tip) return api.sendMessage(`Thiếu dữ liệu cần thiết`,event.threadID,event.messageID);
else {
    const axios = require('axios');
    const request = require('request');
    const fs = require("fs");
  const moment = require("moment-timezone");
  var hientai = moment.tz("Asia/Ho_Chi_Minh").format("DD/MM/YYYY");
  var time = `${tip} => ${hientai}`;
  axios.get(`https://le31.glitch.me/age?q=${time}`).then(res => {
   let mess = res.data.data;
   return api.sendMessage(`Ngày Tháng Năm : ${tip}\nTính từ năm sinh đến hiện tại: \n${mess}`, event.threadID, event.messageID);
  });
}
    }