module.exports.config = {
    name: "resend",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "Hoàng",
    description: "",
    commandCategory: "Game",
    usages: "[reply]",
    cooldowns: 5,
    dependencies: [
  "axios",
  ]
};

module.exports.event = async function ({ event, api, client, Users }) {
  const request = require("request");
    const axios = require("axios")
    const { writeFileSync, createReadStream } = require("fs-extra");
   
  let {messageID, senderID, threadID, body:content } = event;
     if (!client.logMessage) client.logMessage = new Map();
     if (!client.botID) client.botID = api.getCurrentUserID();
 
  const thread = client.threadSetting.get(threadID) || {};
 
  if (typeof thread["resend"] != "undefined" && thread["resend"] == false) return;
  if (senderID == client.botID) return;

       
     if(event.type != "message_unsend") client.logMessage.set(messageID,{
        msgBody: content,
        attachment:event.attachments
      })
    if(event.type == "message_unsend") {
      var getMsg = client.logMessage.get(messageID);
      if(!getMsg) return;
     let name = await api.getUserInfo(event.senderID).name;
      if(getMsg.attachment[0] == undefined) return api.sendMessage(`Ai đó đã gỡ 1 tin nhắn\nNội dung: ${getMsg.msgBody}`,event.threadID)
      else {
            let num = 0
            let msg = {
              body:`Ai đó vừa gỡ ${getMsg.attachment.length} tệp đính kèm.${(getMsg.msgBody != "") ? `\n\nNội dung: ${getMsg.msgBody}` : ""}`,
              attachment:[],
              mentions:{tag:name,id:senderID}
            }
          for (var i of getMsg.attachment) {
            num += 1;
        var getURL = await request.get(i.url);
        var pathname = getURL.uri.pathname;
        var ext = pathname.substring(pathname.lastIndexOf(".") + 1);
        var path = __dirname + `/cache/${num}.${ext}`;
        var data = (await axios.get(i.url, { responseType: 'arraybuffer' })).data;
        writeFileSync(path, Buffer.from(data, "utf-8"));
      msg.attachment.push(createReadStream(path));
  }
        api.sendMessage(msg, threadID);
        }
      }
   }

module.exports.run = async function({ api, event, Threads, args, client }) {
    const { threadID, messageID } = event;

    var settings = (await Threads.getData(threadID)).settings;
      switch(args[0]) {
    case "on": {
        settings["resend"] = true;

     await Threads.setData(event.threadID, options = { settings });
      client.threadSetting.set(event.threadID, settings);
      api.sendMessage("Bật resend thành công!!", event.threadID);
      break;
    }
  case "off": {
      settings["resend"] = false;
      await Threads.setData(event.threadID, options = { settings });
      client.threadSetting.set(event.threadID, settings);
      api.sendMessage("Tắt resend thành công!!", event.threadID);
      break;
    }
    default: {
      utils.throwError("resend",event.threadID,event.messageID);
      break;
    }
  }
}
