module.exports.config = {
		name: "sexy",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "Gia Quân",
	description: "xem ảnh sexy",
	commandCategory: "Hình Ảnh",
	usages: "sexy",
	cooldowns: 5,
  info: [
    {
      key: 'Text',
      type: 'Văn Bản',
      example: 'sexy',
      code_by: `Code By Gia Quân`
    }
  ]
};

module.exports.run = async ({ api, event }) => {
	const axios = require('axios');
    const request = require('request');
    const fs = require("fs");
   axios.get('https://sexy.code-gaga.repl.co').then(res => {
    let ext = res.data.data.substring(res.data.data.lastIndexOf(".") + 1);
    let callback = function () {
                    api.sendMessage("Ok đang request ...", event.threadID, () =>
                    api.sendMessage({
                          body: "Ảnh xexy nè <3😍",
                        attachment: fs.createReadStream(__dirname + `/cache/xexy.${ext}`)
                    }, event.threadID, () => fs.unlinkSync(__dirname + `/cache/xexy.${ext}`), event.messageID));
                };
                request(res.data.data).pipe(fs.createWriteStream(__dirname + `/cache/xexy.${ext}`)).on("close", callback);
            })
}