module.exports.config = {
name: "pp",
version: "1.0.1",
hasPermssion: 0,
credits: "Gia Quân",// dã sửa thành cái đầu buồi
description: "pp",
commandCategory: "Không cần dấu lệnh",
usages: "noprefix",
cooldowns: 5,
info: [
        {
            key: 'Text',
            type: 'Văn Bản',
            example: 'pp',
            code_by: `Code By Gia Quân`
        }
    ]
};
module.exports.event = async function({ event, api, Users })  {
    const request = require('request');
        const fs = require("fs-extra");
      const axios = require(`axios`);
      const {threadID, senderID } = event;
      const nameUser = (await Users.getData(senderID)).name || (await Users.getInfo(senderID)).name;
    if ((event.body == "Pp") || (event.body == "pp")) { return api.sendMessage({
    body: `🌈Pai pai ${nameUser} chúc bạn ra đi thanh thản nhé 😉❤️`,
    mentions: [
        {
        tag: nameUser,
        id: senderID
        }
        ]
    }, event.threadID, event.messagerID);
    }
    };
    
    
    module.exports.run = async ({ event, api, Currencies, args, utils }) => {
    
    
    api.sendMessage(`dùng cái đầu buồi địt mẹ mày`,event.threadID); /// điền cái buồi gì cũng đuơcj
    
    
    
    }
    
    