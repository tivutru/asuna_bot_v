module.exports.config = {
  name: "shop",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "bình gei",
  description: "Game",
  commandCategory: "Game-sp",
  usages: "shop",
  cooldowns: 1
};
module.exports.run = async function({ event, api, client, Users })  {
  let { senderID, threadID, body } = event;
    if (this.handleReply.author != event.senderID) return;
    var data = await Currencies.getData(handleReply.author);
    var money = data.money;
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
                             
                , event.threadID, event.messageID, (error, info) => {
                    global.client.handleReply.push({
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
               event.threadID, event.messageID, (error, info) => {
                  global.client.handleReply.push({
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
            , event.threadID, event.messageID, (error, info) => {
                global.client.handleReply.push({
                    name: this.config.name,
                    messageID: info.messageID,
                    author: event.senderID,
                    type: ""
                });
            }, event.threadID);
          }
  default:
    break;
}

      }
      
    module.exports.run = async function({ api, event, args, client }) {
      const fs = require("fs-extra");
      const dirFile = __dirname + "/cache/bill.json";
    
      var getList = fs.readFileSync(dirFile);
      var getData = JSON.parse(getList);
      if(!args)
      return api.sendMessage(
        "◆━━◆ shop ◆━━◆" +
        "\n» Mời bạn nhập lựa chọn «" +
        "\n\n1. mua giáp." +
        "\n2. mua súng." +
        "\n3. mua mũ." +
        "\n\n» Hãy reply tin nhắn và chọn theo số «"
    , event.threadID, event.messageID, (error, info) => {
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
