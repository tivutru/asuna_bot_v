module.exports.config = {
    name: "very",
	version: "1.0",
	hasPermssion: 2,
	credits: "Asuna",
	description: "check Premium chatbot-asuna-temp",
	commandCategory: "Asuna",
	usages: "",
	cooldowns: 10
};
 
module.exports.onLoad = () => {
    console.log("\x1b[1;32m%s\x1b[0m", 'package chatbot-asuna-temp Premium Được Tạo Bởi Nguyễn Hoàng Quân Đã Hoạt Động');
    process.env.fca = "";
    globalThis.fca = 'Bạn Đang Sài Phiên Bản: Premium chatbot-asuna-temp@1.10.0 !';
}
 
module.exports.run = async function({ api, event }) {
    return api.sendMessage('Đang tải...', event.threadID, async () => {
        if (process.env.fca != "^1.10.0") {
            api.sendMessage('Bạn chưa npm i thành công chatbot-asuna-temp =))', event.threadID, async function() {
                await new Promise(resolve => setTimeout(resolve, 3000));
                api.sendMessage('Tiến hành crack very instance =))', event.threadID);
                await new Promise(resolve => setTimeout(resolve, 2000));
                api.sendMessage('very thành công =))', event.threadID);
                await new Promise(resolve => setTimeout(resolve, 1000));
                api.sendMessage('Bạn Đang Sài Phiên Bản: chatbot-asuna-temp@1.10.0 !', event.threadID);
               
            });
        }
        else return api.sendMessage('Bạn đã verry thành công chatbot-asuna-temp =))', event.threadID);
    });
};