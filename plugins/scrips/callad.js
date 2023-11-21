module.exports.config = {
  name: "callad",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Hoàng",
  description: "thông báo lỗi của bot đến admin hoặc góp ý",
  commandCategory: "Tiện ích",
  usages: "[lỗi gặp phải hoặc ý kiến]",
  cooldowns: 5,
};

module.exports.handleReply = async function({ api, args, event, handleReply, Users, client}) {
var data = await api.getUserInfo(event.senderID); 
  var name =  await data[event.senderID].name;
 switch(handleReply.type) {
   case "reply": {
     var idad = "100064065644851";
     for(let ad of idad) {
     api.sendMessage({body: "Phản hồi từ admin"+name+":\n"+event.body, mentions: [{
      id: event.senderID,
      tag: name}]},ad , (e, data) => client.handleReply.push({
      name: this.config.name,
      messageID: data.messageID,
      messID: event.messageID,
      author: event.senderID,
      id: event.threadID,
      type: "calladmin"}))
     }
   break;}
    case "calladmin": {
      api.sendMessage({ body: `Phản hồi từ admin ${name} đến bạn:\n━━━━━━━━━━━\n${event.body}\n━━━━━━━━━━━\n➢ Rep tin nhắn này để tiểp tục✅`, mentions: [{tag: name, id : event.senderID}]}, handleReply.id, (e, data) => client.handleReply.push({
  name: this.config.name,
  author: event.senderID,
  messageID: event.messageID,
  type: "reply"}), handleReply.messID);
   break;}
     
     }
  
  
};

module.exports.run = async function({ api, event, args, Users, client }) {
  if (!args[0])
    return api.sendMessage(
      "➢ Bạn chưa nói gì",
      event.threadID,
      event.messageID
    );
  var data = await api.getUserInfo(event.senderID); 
  var name =  await data[event.senderID].name;
  var idbox = event.threadID;
 // const url = (api.getCurrentUserID(event.senderID));
  var datathread = await api.getThreadInfo(event.threadID);
  var namethread = datathread.name;

  const moment = require("moment-timezone");
  var gio = moment.tz("Asia/Ho_Chi_Minh").format("HH:mm:ss D/MM/YYYY");
  var soad = "1";
  api.sendMessage(
    "✅Đã Gửi Báo Cáo",
    event.threadID,
    () => {
    var ad = "100064065644851";
    
        api.sendMessage(`Báo cáo từ: ${name}\nNhóm: ${namethread || "Không Có Tên Nhóm"}\n📩𝑰𝑫 𝑩𝒐𝒙: ${idbox}\n━━━━━━━━━━━ \n⚠️Lỗi: ${args.join(
            " "
          )}\n━━━━━━━━━━━\n⏰time: ${gio}`,
          ad, (error, info) =>
            client.handleReply.push({
              name: this.config.name,
              messageID: info.messageID,
              author: event.senderID,
              messID: event.messageID,
              id: idbox,
              type: "calladmin"
            })
        );
    }
    
  );
};