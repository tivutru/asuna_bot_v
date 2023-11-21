module.exports.config = {
    name: "history",
    version: "1.0.1",
    hasPermssion: 0,
    credits: "Hoàng & Quân",
    description: "dữ liệu box ",
    commandCategory: "system",
    usages: "history [Text]",
    cooldowns: 5,
    info: [
        {
          key: 'Text',
          type: 'Văn Bản',
          example: 'history',
          code_by: `Code By Gia Quân`
        }
      ]
    };
    
    module.exports.run = async function({ api, event }) {
    
 let allbox = (await api.getThreadList( 100, null, ["INBOX"])).filter(group => group.isSubscribed && group.isGroup);
   
 var msg = "";
 var dontuse = "";
 var hist = [];
 
for(let box of allbox) {
     try{
let settings = ( await api.getThreadInfo(box.threadID)).settings || {};

if(!settings.lastUse) {dontuse += box.name+"\nĐã sử dụng bot\n\n"}
  else{
 var datenow = settings.lastUse.datenow;
 var time = settings.lastUse.time;
 
 hist.push({
     threadID: box.threadID,
     time: time,
     datenow: datenow
 })
         }
 } catch(e) {}
 };
 
var history2 = hist.sort((a, b) => b.datenow - a.datenow);

 for(let lichsu of history2) {
     var name = ( await api.getThreadInfo(lichsu.threadID)).name;
     
     msg += name+'\n'+lichsu.threadID+"\n"+lichsu.time+"\n\n";
 }
api.sendMessage("Lịch sử lần cuối sử dụng bot của các nhóm\n\n" +msg+"\n"+dontuse, event.threadID, event.messageID);

 } 