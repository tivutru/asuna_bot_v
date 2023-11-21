module.exports.config = {
    name: "restart",
version: "1.0.0",
hasPermssion: 0,
credits: "Gia Quân",
description: "restart bot",
commandCategory: "system",
usages: "restart",
cooldowns: 5,

info: [
    {
        key: 'Text',
        type: 'Văn Bản',
        example: 'restart',
  code_by: `Code By Gia Quân`
    }
]
};

module.exports.run = async ({ api, event, args, client, utils }) => {
    const eval = require("eval");
    
    return api.sendMessage("Connected successfully✅", event.threadID, () => eval("module.exports = process.exit(1)", true), event.messageID);

   }
