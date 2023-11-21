module.exports.config = {
    name: "fast",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "Hoàng Quân",
    description: "kiểm tra tốc độ mạng",
    commandCategory: "system",
    usages: "fast [Text]",
    cooldowns: 5,
    info: [
        {
          key: 'Text',
          type: 'Văn Bản',
          example: 'fast',
          code_by: `Code By Gia Quân`
        }
      ]
    };
    
    module.exports.run = async function({ api, event, args, client, global }) {
      
    
const fast = require('fast-speedtest-api');
const speedTest = new fast({
    token: "YXNkZmFzZGxmbnNkYWZoYXNkZmhrYWxm",
    verbose: false,
    timeout: 10000,
    https: true,
    urlCount: 5,
    bufferSize: 8,
    unit: fast.UNITS.Mbps
});
const resault = await speedTest.getSpeed();
return api.sendMessage(
    "== Tốc độ load ==" + 
    "\n- Speed: " + Math.floor(resault) + " Mbps",
    event.threadID, event.messageID
);
}