module.exports.config = {
    name: "teach",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "Hoàng Quân",
    description: "dạy sim",
    commandCategory: "Dành cho người dùng",
    usages: "image",
    cooldowns: 5,
    info: [
        {
          key: 'teach',
          type: 'Văn Bản',
          example: 'teach',
                code_by: `Code By Gia Quân`
        }
      ]
  };
const axios = require('axios');

module.exports.run = async ({ api, event, args }) => {
let { messageID, threadID } = event;
let work = args.join(" ");
let fw = work.indexOf(" => ");
if (fw == -1) {
api.sendMessage("Sai cách dùng\n\nteach câu hỏi => câu trả lời",threadID,messageID);
} else {
let ask = work.slice(0, fw);
let answer = work.slice(fw + 4, work.length);
if (ask=="") {api.sendMessage("Thiếu câu hỏi",threadID,messageID)} else {
if (!answer) {api.sendMessage("Thiếu câu trả lời",threadID,messageID)} else {
axios.get(encodeURI(`https://lol.tamtrinh3.repl.co/sim?type=teach&ask=${ask}&ans=${answer}`)).then(res => {
if (res.data.error == "Đã Có Câu Trả Lời"){
api.sendMessage("Đã Có Câu Trả Lời",threadID,messageID)} else {
if (res.data.error == "null") {api.sendMessage('Lỗi sảy ra',threadID,messageID)} else {
api.sendMessage("Đã dạy thành công",threadID,messageID);
}
}
})
}
}
}
}