module.exports.config = {
    name: "naptien",
    version: "1.0.0",
    hasPermssion: 0,
    description: "Nạp tiền cho người dùng hoặc tự nạp tiền",
    commandCategory: "Economy",
    usages: "!naptien [số tiền] hoặc !naptien [@người_dùng] [số tiền]",
    cooldowns: 5
  };
  
  module.exports.run = async function ({ api, event, args, Currencies, Users }) {
    const mention = Object.keys(event.mentions)[0]; // Lấy key đầu tiên trong object mentions
    const userID = mention ? Object.keys(event.mentions)[0] : event.senderID;
    // Nếu có mention người dùng thì lấy ID của người được mention, nếu không thì lấy ID của người gửi tin nhắn
  
    const amount = parseFloat(args[args.length - 1]); // Số tiền nằm ở cuối mảng args
  
    if (isNaN(amount) || amount <= 0) {
      return api.sendMessage("Vui lòng nhập số tiền hợp lệ!", event.threadID);
    }
  
    const data = await Currencies.getData(userID);
    data.money += amount;
  
    if (userID === event.senderID) {
      Currencies.setData(event.senderID, data);
      api.sendMessage(`Bạn đã nạp thành công ${amount}đ vào tài khoản của mình!`, event.threadID);
    } else {
      const senderData = await Currencies.getData(event.senderID);
      if (senderData.money < amount) {
        return api.sendMessage("Số tiền của bạn không đủ để thực hiện giao dịch này!", event.threadID);
      }
  
      senderData.money -= amount;
      Currencies.setData(event.senderID, senderData);
      Currencies.setData(userID, data);
  
      const senderName = event.senderID === api.getCurrentUserID() ? "Bot" : (await Users.getData(event.senderID)).name;
      const userName = (await Users.getData(userID)).name;
  
      api.sendMessage(
        `Bạn đã nạp thành công ${amount}đ vào tài khoản của ${userName}!\nSố dư hiện tại của bạn là ${senderData.money} đ.`,
        event.threadID
      );
    }
  };