module.exports.config = {
	name: "e",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "GiaQuân-Quân cắt đầu moi",
	description: "Game",
	commandCategory: "game",
	usages: "ms [args]",
	cooldowns: 1,
	info: [],
};
module.exports.run = async function ({ api, event, handleReply, client, Currencies }) {
  let { senderID } = event;
    if (author = event.senderID) return;
    var data = await Currencies.getData(author);
var gun = data.gun
var shield = data.shield
var money = data.money
switch (event.type) {
        case "menu": {
            switch (event.body) {
                case "1": {
                    return api.sendMessage(
                        "Bạn đã mua thành công lưới ⚔️"
                  , event.threadID, (error, info) => {
                      global.client.handleReply.push({
                          name: this.config.name,
                          messageID: info.messageID,
                          author: event.senderID,
                          type: "money"
                      });
                  }, event.threadID);
                } 
                case "2": {
                    return api.sendMessage(
                        "Bạn đã mua thành công súng ⚔️"
                  , event.threadID, (error, info) => {
                      global.client.handleReply.push({
                          name: this.config.name,
                          messageID: info.messageID,
                          author: event.senderID,
                          type: "money"
                      });
                  }, event.threadID);
                }
                default:
                    break;
            }
            return;
          }
          case "shield": {
            var content = event.body;
            if(content > money ) api.sendMessage("Báº¡n khÃ´ng Ä‘á»§ tiá»n mua giÃ¡p vui lÃ²ng chÄƒm chá»‰ lÃ m viá»‡c hÆ¡n",event.threadID)
            else 
            {
            await Currencies.increaseMoney(event.author, parseInt(content / 100));
            var money = ((await Currencies.getData(event.author)).money) - parseInt(content);
            await Currencies.setData(event.author, { money })
            var msg = `Giao dịch hoàn tất`
            api.sendMessage(msg,event.author)
          
            }
          break;
       }
       case "money": {
        var content = event.body;
        if(content > money) api.sendMessage("Tiá»n cá»§a báº¡n khÃ´ng Ä‘á»§",event.threadID)
        else 
        {
            await Currencies.increaseMoney(event.senderID, parseInt("-"+content))
        var money = ((await Currencies.getData(event.author)).money) + parseInt(content / 100);
        await Currencies.setData(event.author, { money })
        api.sendMessage(msg,event.author);
      
        }
      break;
   }
      }
    }
module.exports.run = async function({ api, event, client, args }) {
    const fs = require("fs-extra");
	const dirFile = __dirname + "/cache/bill.json";

	var getList = fs.readFileSync(dirFile);
	var getData = JSON.parse(getList);
	
if(!args[0])return api.sendMessage(
                "ðŸ’³_____Menu_____ðŸ’³" +
                "\nCửa hàng bán công cụ" +
                "\n\n1. Mua lưới" +
                "\n2. Mua súng" +
                "\n3. Update sau ⚙️⚒⚙️" +
                "\n\nHãy reply món đồ bạn muốn mua bằng số⚙️"
            , event.threadID, (error, info) => {
              
            }, event.threadID);
     
    if (args[0] == "check") {
        var workList = "";
			getData.map(item => workList += `\n ${item}`);
			return api.sendMessage(`${workList}`, event.threadID);
		}
        
}