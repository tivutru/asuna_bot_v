module.exports.config = {
    name: "ngọc",
    version: "1.0.1",
    hasPermssion: 0,
    credits: "Gia Quân",// dã sửa thành cái đầu buồi
    description: "ngocj",
    commandCategory: "Không cần dấu lệnh",
    usages: "noprefix",
    cooldowns: 5,
    info: [
            {
                key: 'Text',
                type: 'Văn Bản',
                example: 'hi',
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
     if ((event.body == "Ngọc") || (event.body == "@Hoài Ngọc")) { return api.sendMessage({
    body: `🌈Chào ${name} ngọc cute đáng iu đây 😉❤️`,
    mentions: [
    {
    tag: name,
    id: event.senderID
    }
    ],
    attachment: [
        require("fs").createReadStream(__dirname + "/cache/ngoc.jpg")
    ]
    }, event.threadID, event.messagerID);
    }
    };
    
    
    module.exports.run = async ({ event, api, Currencies, args, utils }) => {
    
    
    api.sendMessage(`dùng cái đầu buồi địt mẹ mày`,event.threadID); /// điền cái buồi gì cũng đuơcj
    
    
    
    }
    
    