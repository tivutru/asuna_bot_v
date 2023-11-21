module.exports.config = {
    name: "scrip",
    version: "1.0.1",
    hasPermssion: 0,
    credits: "Hoàng & Quân",
    description: "Hướng dẫn cho người mới",
    commandCategory: "system",
    usages: "help [Text]",
    cooldowns: 5,
    info: [
        {
          key: 'Text',
          type: 'Văn Bản',
          example: 'scrip',
          code_by: `Code By Gia Quân`
        }
      ]
    };
    
    module.exports.run = function({ api, event, args, client, global }) {
      
    
    const arrayInfo = [];
    
        arrayInfo.length;
        arrayInfo.sort((a, b) => a.data - b.data);
   
             const t = `❗ ${arrayInfo.length} / ${arrayInfo.length} plugins`;
       return api.sendMessage( t, event.threadID, event.messageID);
    
    
    
  }
    