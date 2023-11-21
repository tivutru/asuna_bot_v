module.exports.config = {
    name: "setbio",
    version: "1.0.1",
    hasPermssion: 0,
    credits: "Hoàng  Quân",
    description: "đổi tiểu sử của bot ",
    commandCategory: "game",
    usages: "setbio[text]",
    cooldowns: 5,
    info: [
        {
          key: 'Text',
          type: 'Văn Bản',
          example: 'setbio',
          code_by: `Code By Gia Quân`
        }
      ]
    };
    
    module.exports.run = async function({ api, event, args }) {
 api.changeBio(args.join(" "), (e) => {
    if(e) api.sendMessage("xảy ra lỗi" + e, event.threadID); 
    return api.sendMessage("Đã đổi tiểu sử của bot thành :\n"+event.args.join(" "), event.threadID, event.messgaeID)
  }
  )}