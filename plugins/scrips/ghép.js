module.exports.config = {
  name: "ghép",
  version: "1.0.5",
  hasPermssion: 0,
  credits: "KhanhMilo\nfix by DinhPhuc",
  description: "Ghép đôi với 1 đứa trong nhóm",
  commandCategory: "Group",
  usages: "ghép",
  cooldowns: 1,
  
};

module.exports.run = async function ({ api, event, args, Threads, Users,Currencies }) {
  const fs = require("fs-extra");
  const axios = require("axios");
  var data = await Currencies.getData(event.senderID);
   var tile = Math.floor(Math.random() * 101);
   let name1 = (await api.getUserInfo(event.senderID))[event.senderID].name;
	
  let loz = await api.getThreadInfo(event.threadID);
  var emoji = loz.participantIDs;
  var id = emoji[Math.floor(Math.random() * emoji.length)];

  
  var name2 = (await api.getUserInfo(id))[id].name


  var arraytag = [];
          arraytag.push({id: event.senderID, tag: name1});
          arraytag.push({id: id, tag: name2});
            let Avatar = (await axios.get( `https://graph.facebook.com/${event.senderID}/picture?height=720&width=720&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`, { responseType: "arraybuffer" } )).data;
      fs.writeFileSync( __dirname + "/cache/avt.png", Buffer.from(Avatar, "utf-8") );
  let Avatar2 = (await axios.get( `https://graph.facebook.com/${id}/picture?height=720&width=720&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`, { responseType: "arraybuffer" } )).data; 
      fs.writeFileSync( __dirname + "/cache/avt2.png", Buffer.from(Avatar2, "utf-8") );
  var imglove = [];
        imglove.push(fs.createReadStream(__dirname + "/cache/avt.png"));
        imglove.push(fs.createReadStream(__dirname + "/cache/avt2.png"));
  var msg = {body: `⚡️Ghép đôi thành công!\n⚡️Tỉ lệ hợp đôi: ${tile}%\n${name1} ❤️ ${name2}`, mentions: arraytag, attachment: imglove}
  return api.sendMessage(msg, event.threadID, event.messageID)
}
