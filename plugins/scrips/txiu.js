module.exports.config = {
    name: "txiu",
    version: "1.0.1",
    hasPermssion: 0,
    description: "Chơi game tài xỉu",
    commandCategory: "Game",
    usages: "!txiu [tài/xỉu] [số tiền cược]",
    cooldowns: 5
  };
  
  module.exports.run = async function ({ event, api, args, Currencies }) {
    async function outMsg(data) {
      api.sendMessage(data, event.threadID, event.messageID);
    }
  
    var data = await Currencies.getData(event.senderID);
    var money = data.money || 0;
  
    if (!args[0]) {
      outMsg("🎲Vui lòng nhập 'tài' hoặc 'xỉu'");
    } else {
      const taiXiu = args[0].toLowerCase();
      const betAmount = parseFloat(args[1]);
  
      if (isNaN(betAmount)) {
        outMsg("🎲Vui lòng nhập số tiền cược hợp lệ.");
      } else if (betAmount < 10) {
        outMsg("🎲Số đặt cược của bạn phải lớn hơn hoặc bằng 10$");
      } else if (betAmount > money) {
        outMsg(`Số dư bạn không đủ ${betAmount}$ để có thể chơi`);
      } else {
        const taiWinRate = 15;
        const xiuWinRate = 85;
        const taiWinAmount = betAmount * 2;
  
        outMsg("🎲Nhà cái đang lắc, vui lòng đợi...");
        setTimeout(() => {
          const dice1 = Math.floor(Math.random() * 6) + 1;
          const dice2 = Math.floor(Math.random() * 6) + 1;
          const dice3 = Math.floor(Math.random() * 6) + 1;
          const total = dice1 + dice2 + dice3;
          const tai = total > 10;
          const xiu = total <= 10;
  
          let message = `🎲Kết quả:\n${dice1} - ${dice2} - ${dice3}\n`;
          message += `Cầu là ${tai ? "Tài" : "Xỉu"}\n`;
  
          if ((taiXiu === "tài" && tai) || (taiXiu === "xỉu" && xiu)) {
            message += `🎉Bạn đã thắng! Nhận được ${taiWinAmount} tiền cược.\n`;
            data.money += taiWinAmount;
          } else {
            message += `😢Bạn đã thua! Mất ${betAmount} tiền cược.\n`;
            data.money -= betAmount;
          }
  
          Currencies.setData(event.senderID, data);
          const taiRate = Math.random() * 20 + 80;
          const xiuRate = 100 - taiRate;
          message += `🍀Tỉ lệ cầu tài ván sau: ${taiRate.toFixed(2)}%\n`;
          message += `🍀Tỉ lệ cầu xỉu ván sau: ${xiuRate.toFixed(2)}%\n`;
          message += "🎲Chúc bạn may mắn lần sau!";
          outMsg(message);
        }, 5000);
      }
    }
  };