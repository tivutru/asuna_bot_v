module.exports.config = {
    name: "fbavt",
    version: "1.0.1",
    hasPermssion: 0,
    credits: "Gia Quân",// dã sửa thành cái đầu buồi
    description: "fbavt",
    commandCategory: "Không cần dấu lệnh",
    usages: "noprefix",
    cooldowns: 5,
    info: [
            {
                key: 'Text',
                type: 'Văn Bản',
                example: 'fbavt',
                code_by: `Code By Gia Quân`
            }
        ]
    };
    module.exports.run = async function({ api, event }) {
const request = require("request");
const fs = require("fs")
const axios = require("axios")


if(event.args[0] == "me") {

var id = event.senderID;
var callback = () => api.sendMessage({attachment: fs.createReadStream(__dirname + "/cache/1.png")}, event.threadID, () => fs.unlinkSync(__dirname + "/cache/1.png"),event.messageID);   
return request(encodeURI(`https://graph.facebook.com/${id}/picture?height=720&width=720&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`)).pipe(fs.createWriteStream(__dirname+'/cache/1.png')).on('close',() => callback());
}



if (event.type != "message_reply") return api.sendMessage(`Reply người cần get avatar.`,event.threadID,event.messageID);
var id = event.messageReply.senderID;
var callback = () => api.sendMessage({attachment: fs.createReadStream(__dirname + "/cache/1.png")}, event.threadID, () => fs.unlinkSync(__dirname + "/cache/1.png"),event.messageID);   
return request(encodeURI(`https://graph.facebook.com/${id}/picture?height=720&width=720&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`)).pipe(fs.createWriteStream(__dirname+'/cache/1.png')).on('close',() => callback());
}
