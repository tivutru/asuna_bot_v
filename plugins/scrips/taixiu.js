module.exports.config = {
  name: "taixiu",
version: "1.0.0",
hasPermssion: 0,
credits: "Gia Quân",
description: "Oánh tài xỉu thông qua api key",
commandCategory: "tài xỉu",
usages: "taixiu",
cooldowns: 5,
  info: [
      {
          key: 'Text',
          type: 'Văn Bản',
          example: 'taixiu',
          code_by: `Code By Gia Quân`
      }
  ]
};
module.exports.run = async function ({ event, api, args, Currencies,Users,Threads }) {
const axios = require('axios');
  const request = require('request');
  const fs = require("fs");
  
  async function outMsg(data) {
    api.sendMessage(data, event.threadID, event.messageID);
  }
  
  var data = await Currencies.getData(event.senderID);
  var money = data.money || 0; // Khởi tạo giá trị tiền là 0 nếu chưa được đặt
  
  if (!args[0]) {
    outMsg("🎲Vui lòng nhập 'tài' hoặc 'xỉu'");
  } else {
    var turnbot = ["tài", "xỉu"];
    var botturn = turnbot[Math.floor(Math.random() * turnbot.length)];
    const userturn = args[0];
    const betAmount = parseFloat(args[1]); // Chuyển đổi số tiền cược thành số thập phân
  
    if (isNaN(betAmount)) {
      outMsg("🎲Vui lòng nhập số tiền cược hợp lệ.");
    } else if (betAmount < 10) {
      outMsg("🎲Số đặt cược của bạn phải lớn hơn 10$");
    } else if (betAmount > money) {
      outMsg(`Số dư bạn không đủ ${betAmount}$ để có thể chơi`);
    } else {
      // Cung cấp đường link hình ảnh như trước đó
      var link = [
        "https://i.ibb.co/VDvjxtp/2-B84457-A-DE8-D-4-F70-8389-1703-EA26-E512.jpg",
        "https://i.ibb.co/Dgktt5R/8-B035-A94-649-A-4640-B164-9534-CE84-AB43.jpg",
        "https://i.ibb.co/x2DD4WX/674693-E3-1-C92-4699-93-CD-E2-D3-B3-F68914.png",
        "https://i.ibb.co/s6N1JSm/E4573-AB5-C5-A7-4-CF5-A8-AC-E13402-FFF994.png",
        "https://i.ibb.co/6sYnwB8/F13-BB757-43-C1-4957-B388-02-A1-E906166-C.png",
        "https://i.ibb.co/yBRxhFw/6988-E6-CC-4-A72-4-E39-8140-0235-A4-C3-B8-F1.png",
        "https://i.ibb.co/x1DLd5Q/F48-E2-A45-1-E49-45-DE-ADF1-CECAE54-C633-F.jpg",
      ];
  
      let callback = () => {
        api.sendMessage("🌟 Vui lòng chờ\nĐang lắc nhé...", event.threadID);
        request(link[Math.floor(Math.random() * link.length)]).pipe(
          fs.createWriteStream(__dirname + `/cache/taixiu/taixiu${userturn === botturn ? "1" : "2"}.jpg`)
        ).on("close", () => {
          const resultMsg = `🎲Bạn đã ${userturn === botturn ? "thắng" : "thua"}🎲\n🌟Bạn chọn : ${userturn}\n🌈Nhà cái về : ${botturn}\n🌟Bạn ${
            userturn === botturn ? "nhận được + " : "đã thua và bị - "
          }${betAmount}$ USA`;
  
          api.sendMessage(
            {
              body: resultMsg,
              attachment: fs.createReadStream(__dirname + `/cache/taixiu/taixiu${userturn === botturn ? "1" : "2"}.jpg`),
            },
            event.threadID,
            event.messageID
          );
        });
      };
  
      callback();
  
      if (userturn === botturn) {
        // Người dùng thắng
        money += betAmount;
        Currencies.setData(event.senderID, { money: money });
      } else {
        // Người dùng thua
        money -= betAmount;
        Currencies.setData(event.senderID, { money: money });
      }
    }
  }
  
}