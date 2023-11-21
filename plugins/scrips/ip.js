module.exports.config = {
    name: "ip",
    version: "1.0.1",
    hasPermssion: 0,
    credits: "Hoàng Quân",
    description: "check ip ",
    commandCategory: "system",
    usages: "ip [ip + số ip]",
    cooldowns: 5,
    info: [
        {
          key: 'Text',
          type: 'Văn Bản',
          example: 'ip',
          code_by: `Code By Gia Quân`
        }
      ]
    };
    
    module.exports.run = async function({ api, event }) {
    
const IPInfo = require("ip-info3");
const getinfo = new IPInfo.getIPInfo();
   if(!event.args[0]) return api.sendMessage("Vui lòng nhập địa chỉ ip.",event.threadID,event.messageID);
    getinfo.GetAll(event.args[0]).then(a => {
      api.sendMessage({body:`=====DATA======\n❄️Vùng: ${a.countryCode}\n💦Nước: ${a.country}\n👀ST: ${a.region}\n🐋Tỉnh: ${a.regionName}\n🦋Thành phố: ${a.city}\n🐧Múi giờ: ${a.timezone}\n🏝Nhà mạng: ${a.org},\nTọa độ: ${a.lat + " " + a.lon}`}, event.threadID, event.messageID)
if(a.message == 'private range') api.sendMessage("private range !!!",event.threadID,event.messageID)
if(a.message == 'invalid query')api.sendMessage("Địa chỉ ip không hợp lệ.",event.threadID, event.messageID)
})
    }