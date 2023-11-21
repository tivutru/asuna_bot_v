module.exports.config = {
  name: "gun",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "bình gei",
  description: "Game",
  commandCategory: "Game-sp",
  usages: "/shop/start",
  cooldowns: 1
};
module.exports.run = async ({ event, api, handleReply, Currencies, getText }) => {
  const { threadID, messageID, senderID } = event;
  let data = (await Currencies.getData(senderID)).data || {}
    if (handleReply.author  != event.senderID) return;
    switch (handleReply.type) {
      case "shop": {
          switch (event.body) {
              case "1": {
                  return api.sendMessage(
                    "\n mời bạn nhập lựa chọn " +
                    "\n\n1 giáp sắt (200$)" +
                    "\n2  giáp bạc (300$)" +
                    "\n3 giáp vàng (500$)" +
                    "\n\n Reply số để mua"                
                , event.threadID, (error, info) => {
                    global.handleReply.push({
                        name: this.config.name,
                        messageID: info.messageID,
                       author: event.senderID,
                        type: "armor"
                    });
                }, event.threadID);
              } 
              case "2": {
                return api.sendMessage(
                    "\n mời bạn nhập lựa chọn " +
                    "\n\n1 súng lục (200$)" +
                    "\n2  súng aka (800$)" +
                    "\n3 súng snip (1200$)" +
                    "\n\n Reply số để mua".
               event.threadID, (error, info) => {
                  global.handleReply.push({
                      name: this.config.name,
                      messageID: info.messageID,
                      author: event.senderID,
                      type: "gun"
                  });
              }, event.threadID);
            }
            case "3": {
              return api.sendMessage(
                  "Bạn có thể reply để mua mũ với giá (400$)"
            , event.threadID, (error, info) => {
                global.handleReply.push({
                    name: this.config.name,
                    messageID: info.messageID,
                    author: event.senderID,
                    type: "helmet"
                });
            }, event.threadID);
          }
  default:
    break;
}

      }
      
      module.exports.run = async ({  event, api, args, Currencies, getText }) => {
        const fs = require("fs-extra");
        const request = require("request");
       
        const { threadID, messageID, senderID } = event;
      if(!args[0])return api.sendMessage(
        "◆━━◆ shop ◆━━◆" +
        "\n» Mời bạn nhập lựa chọn «" +
        "\n\n1. mua giáp." +
        "\n2. mua súng." +
        "\n3. mua mũ." +
        "\n\n» Hãy reply tin nhắn và chọn theo số «"
    , event.threadID, (error, info) => {
        client.handleReply.push({
            name: this.config.name,
            messageID: info.messageID,
            author: event.senderID,
            type: "shop"
        });
    }, event.threadID);
  }
}
}
