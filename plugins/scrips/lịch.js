module.exports.config = {

  name: "lịch", 
  version: "1.0.0", 
  hasPermssion: 0,
  credits:"hoàng quân",
  description: "Xem lịch", 
  commandCategory: "Other",
  usages: "lịch",
  cooldowns: 5, 
  info: [
    {
        key: 'Text',
        type: 'Văn Bản',
        example: 'lịch',
       code_by: `Code By Gia Quân`
    }
]
};

module.exports.run = async function({ api, Users, Threads, event, __GLOBAL }) {

  const axios = require("axios");
  //ngày giờ
  const moment = require('moment-timezone');
    var ngay = moment.tz('Asia/Ho_Chi_Minh').format('D/MM/YYYY');
    var gio = moment.tz('Asia/Ho_Chi_Minh').format('HH:mm:ss');
    var thu = moment.tz('Asia/Ho_Chi_Minh').format('dddd');
  //âm lịch (chưa có :))
  if (thu == 'Sunday') thu = 'Chủ Nhật'
  if (thu == 'Monday') thu = 'Thứ Hai'
  if (thu == 'Tuesday') thu = 'Thứ Ba'
  if (thu == 'Wednesday') thu = 'Thứ Tư'
  if (thu == "Thursday") thu = 'Thứ Năm'
  if (thu == 'Friday') thu = 'Thứ Sáu'
  if (thu == 'Saturday') thu = 'Thứ Bảy'
return api.sendMessage(`📅 Hôm nay là ngày\n-------•-------\n${ngay}\n-------•-------\n(${thu})\n-------•-------\n⏰Giờ: ${gio}\n-------•-------`, event.threadID, event.messageID);



}