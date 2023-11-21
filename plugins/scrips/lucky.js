module.exports.config = {
	name: "lucky",
	version: "0.0.1",
	hasPermssion: 0,
	credits: "vtb",
	description: "Đoán số",
	commandCategory: "game",
	usages: "lucky 5",
    cooldowns: 5,
    dependencies: [],
};

module.exports.run = async function ({ api, event, args, Currencies }) {
    const { threadID, messageID, senderID } = event;
    const getRandomInt = (min, max) => {
        return Math.floor(Math.random() * (max - min)) + min;
      };
      var i = 1000
    var data = await Currencies.getData(event.senderID);
    var money = data.money
    var number = getRandomInt(0, 5)
    if(money < 5) api.sendMessage("Bạn không đủ tiền 💵!",event.threadID,event.messageID)
    else {
      if(!args[0]) api.sendMessage("Không có số dự đoán 🔢",event.threadID,event.messageID)
        else{
         if(args[0] > 5) api.sendMessage("Dự đoán không được lớn hơn 5 🏮",event.threadID,event.messageID)
           else {
             if(args[0] == number){
                 api.sendMessage(number + " Chính là con số may mắn, bạn đã nhận được 1000 đô 💵", event.threadID, () => Currencies.setData(event.senderID, options = {money: money + parseInt(i)}),event.messageID);
                }
         else api.sendMessage("🥮Con số may mắn là " + number + "\n" + "Chúc bạn may mắn lần sau 🏮 !\n====Lưu ý====\n🥮Đoán sai, bạn bị trừ 100$. Đoán đúng bạn sẽ nhận 1000$ 💵",event.threadID, () => Currencies.setData(event.senderID, options = {money: money - 100}),event.messageID);
      }
    }
  }
}
