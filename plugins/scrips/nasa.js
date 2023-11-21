module.exports.config = {
    name: "nasa",
    version: "1.0.1",
    hasPermssion: 0,
    credits: "Hoàng  Quân",
    description: "toạ độ của tàu vũ trụ ",
    commandCategory: "system",
    usages: "nasa [Text]",
    cooldowns: 5,
    info: [
        {
          key: 'Text',
          type: 'Văn Bản',
          example: 'nasa',
          code_by: `Code By Gia Quân`
        }
      ]
    };
    
    module.exports.run = async function({ api, event }) {
    
  const request = require('request');
  return request(`http://api.open-notify.org/iss-now.json`, (err, response, body) => {
    if (err) throw err;
    var jsonData = JSON.parse(body);
    api.sendMessage(`Vị trí hiện tại của \nTrạm không gian quốc tế\n🌠Vĩ độ: ${jsonData.iss_position.latitude}\n🌌Kinh độ: ${jsonData.iss_position.longitude}`, event.threadID, event.messageID);
  });
  }