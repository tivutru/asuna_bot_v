module.exports.config = {
		name: "trai",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "Gia Quân",
	description: "Ảnh trai đepkvcl",
	commandCategory: "Hình Ảnh",
	usages: "trai",
	cooldowns: 5,
    info: [
        {
            key: 'Text',
            type: 'Văn Bản',
            example: 'trai',
            code_by: `Code By Gia Quân`
        }
    ]
};

module.exports.run = async ({ api, event }) => {
 const axios = require('axios');
    const request = require('request');
    const fs = require("fs");
    axios.get('https://trai.code-gaga.repl.co').then(res => {
    let ext = res.data.data.substring(res.data.data.lastIndexOf(".") + 1);
    let callback = function () {
                    api.sendMessage("Ok đang request ...", event.threadID, () =>
                    api.sendMessage({
                          body: "Ảnh trai đây 🤣",
                        attachment: fs.createReadStream(__dirname + `/cache/trai.${ext}`)
                    }, event.threadID, () => fs.unlinkSync(__dirname + `/cache/trai.${ext}`), event.messageID));
                };
                request(res.data.data).pipe(fs.createWriteStream(__dirname + `/cache/trai.${ext}`)).on("close", callback);
            })
}