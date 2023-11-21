module.exports.config = {
    name: "bot",
version: "1.0.1",
hasPermssion: 0,
credits: "Gia Quân",// dã sửa thành cái đầu buồi
description: "bot",
commandCategory: "Không cần dấu lệnh",
usages: "noprefix",
cooldowns: 5,
info: [
        {
            key: 'Text',
            type: 'Văn Bản',
            example: 'bot',
            code_by: `Code By Gia Quân`
        }
    ]
};
module.exports.event = async function({ event, api })  {
const request = require('request');
    const fs = require("fs-extra");
  const axios = require(`axios`);
let { senderID } = event;
let name = (await api.getUserInfo(event.senderID))[event.senderID].name;
 if ((event.body == "bot") || (event.body == "Bot") || (event.body == "bott") || (event.body == "bottt")|| (event.body == "bot ơi") || (event.body == "Bot ơi") || (event.body == "bottt")|| (event.body == "Bottt")  ) { return api.sendMessage({
body: `${name} ới bot đây gọi j lắm :))`,
mentions: [
{
tag: name,
id: event.senderID
}
]
}, event.threadID, event.messagerID);
}
};


module.exports.run = async ({ event, api, Currencies, args, utils }) => {


api.sendMessage(`dùng cái đầu buồi địt mẹ mày`,event.threadID); /// điền cái buồi gì cũng đuơcj



}

