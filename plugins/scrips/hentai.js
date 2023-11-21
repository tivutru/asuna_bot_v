module.exports.config = {
    name: "hentai",
    version: "1.0.1",
    hasPermssion: 0,
    credits: "Gia Quân",// dã sửa thành cái đầu buồi
    description: "hentai",
    commandCategory: "Không cần dấu lệnh",
    usages: "[prefix+hentai]",
    cooldowns: 5,
    info: [
            {
                key: 'Text',
                type: 'Văn Bản',
                example: 'hentai',
                code_by: `Code By Gia Quân`
            }
        ]
    };
    module.exports.run = async function({ api, event }) {
        const axios = require('axios');
        const request = require('request');
        const fs = require("fs");
        
    var link = ["https://i.imgur.com/jD7xBQM.jpg",
    "https://i.imgur.com/KAsTBcR.jpg",
    "https://i.imgur.com/tkQmpX2.jpg",
    "https://i.imgur.com/DfqrDMg.jpg",
    "https://i.imgur.com/hHLh6n5.jpg",
    "https://i.imgur.com/zx7mqgB.jpg",
    "https://i.imgur.com/Q9riShq.jpg",
    "https://i.imgur.com/myZLOEH.jpg",
    "https://i.imgur.com/NJcSUtu.jpg",
"https://i.imgur.com/ghMvwYR.jpg",
"https://i.imgur.com/Khvh6nv.jpg",
"https://i.imgur.com/Atk8aZX.jpg",
    ];
    let callback = () =>
    api.sendMessage("Ok đang request ...", event.threadID, () =>
     api.sendMessage({ 
    body: 'hentai nè >3😘',
     attachment: fs.createReadStream(__dirname + "/cache/hentai.jpg")
      }, event.threadID, event.messageID));
           request(link[Math.floor(Math.random() * link.length)]).pipe(fs.createWriteStream(__dirname+"/cache/hentai.jpg")).on("close",() => callback());
    }