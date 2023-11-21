module.exports.config = {
name: "help",
version: "1.0.1",
hasPermssion: 0,
credits: "Hoàng & Quân",
description: "Hướng dẫn cho người mới",
commandCategory: "system",
usages: "help [Text]",
cooldowns: 5,
info: [
    {
      key: 'Text',
      type: 'Văn Bản',
      example: 'help',
      code_by: `Code By Gia Quân`
    }
  ]
};

module.exports.run = function({ api, event, args, client, global }) {

 let { senderID, threadID, messageID } = event;

const { commands } = client;
  const command = commands.get((args[0]));
  const threadSetting = client.threadSetting.get(event.threadID.toString()) || {};

  if (!command) {
        const arrayInfo = [];
        const page = parseInt(args[0]) || 1;
    const numberOfOnePage = 15;
    let i = 0;
    var group = [], msg = "🌟🌈====Asuna====🌈🌟\n";
   
    for (var [name] of (commands)) {
      arrayInfo.push(name);
    }

    arrayInfo.sort((a, b) => a.data - b.data);
   
    const startSlice = numberOfOnePage*page - numberOfOnePage;
    i = startSlice;
    const returnArray = arrayInfo.slice(startSlice, startSlice + numberOfOnePage);
   
    for (let item of returnArray) msg += `${++i}/ ${item}\n`;
         const t = `❗Trang (${page}/${Math.ceil(arrayInfo.length/numberOfOnePage)})\nDùng &help + Số trang\nĐể xem các lệnh trên Bot\nHiện tại có ${arrayInfo.length} lệnh trên bot này`;
   return api.sendMessage(msg + t, threadID,messageID);



}
const infoHelp = command.config.info;
  var infoText = "";
  if (!infoHelp || infoHelp.length == 0) infoText = 'Không có';
  else {
    for (var i = 0; i < infoHelp.length; i++) {
      infoText +=
        `\n key: ${infoHelp[i].key}` + 
        `\n • Định dạng: ${infoHelp[i].type}` + 
        `\n • Cách dùng: ${infoHelp[i].example}` +
        `\n • Code By: ${infoHelp[i].code_by}\n`

    }
  }
  return api.sendMessage(
    `=== ${command.config.name.toUpperCase()} ===\n${command.config.description}\n\n❯ Group: ${command.config.commandCategory}\n❯ Usage: ${command.config.usages}\n❯ Trong đó: ${infoText}\n❯ Cooldown: ${command.config.cooldowns}s\n❯ Prefix: ${(threadSetting.hasOwnProperty("PREFIX")) ? threadSetting.PREFIX : global.config.PREFIX}`, event.threadID)


   return api.sendMessage("Lỗi rồi bạn ưi",event.threadID,event.messageID);
   
  };
