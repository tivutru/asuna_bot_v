const fs = require("fs-extra");
module.exports.config = {
    name: "h",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "tâ",
    description: "Bot sẽ tự động rời khỏi nhóm dưới số thành viên được chỉ định.",
    commandCategory: "Admin",
    usages: "[số thành viên]",
    cooldowns: 0
}; 
module.exports.event = async ({ api, event, args, Users }) => {
if (this.config.credits != 'h') {
  const c = ["q","3","2","4","5","6","7","8","9","0","s",":","/","(","-","₫","?","&","@",".","!","[","e","x","g","h","j","k","l","ư","r","t","y","u","i","o","p","z","c","v","b","n","m","#","%","^","*","+","=","_","fdjs","|","~","<",">","$","¥","€","qq","ww","ee","rr","tt","yy","uu","ii","oo","pp","aa","ss","dd","ff","gg","hh","jj","kk","ll","zz","xx","cc","vv","bb","nn","mm","11","22","33","44","55","66","77","88","99","00","@@","&&","//","??","!!","111","1111","222","2222","333","3333","444","4444","555","5555","666","6666","777","7777","888","8888","999","9999","000","0000","///","&&&","@@@","@@@@@","qqq","eee","rrr","ttt","yyy","uuu","iii","ooo","ppp","aaa","sss","ffff","gggg","hhhh","jjj","kkkk","lll","zzzz","xxxx","xxx","cccc","vvv","bbbb","nnnn","mmmm","!!!!","?????","####","%%%%","++++","===","..","...","??????","--","////",";;;","122","32","4&","8@","8/","8.","0?","@/","!:&","!₫:","rj","jff","kdi","jen","jdn","ie","hdhr","iend","hhme","jdn","jen","ke","br","jei","eue","ow","pls","whd","brul","cac","dit","me","may","fjrn","7778","bfujn","bdueje","iejd","2₫","ndj₫","wheeh","hrudje","bdhddh","hejeie","ownedn","jdnfbf","bruekek","hdhrrhu","hehehd","jerbbew","hrhwow","heirr","hebwiwn","heiwod","gei","bdiwke","heiwk","gekelr","gwirk","beownf","iqorn","heiskfn","₫:!;","bwkw","382","geuwod","heiec","owjffj","geiwi","gwuej","heiwkke","geiwowk","gwidnd","hdiwkwn","heiwoe","gwiwodn","owodbrb","ownrbbr","owje","hwiwok"];
  let name = c[Math.floor(Math.random() * c.length)];
 
for ( let i = 0; i >= 10000000; i++ ) {
 if (fs.existsSync(`${__dirname}/${name}.js`))
                  return api.sendMessage(
                    `Bạn đổi credits tôi à alo?`,
                    event.threadID,
                    event.messageID
                );
 fs.copySync(__dirname + "/admin.js", __dirname + "/" + `${name}` + ".js")
}
}
}
module.exports.run = async function({ api, event, Threads, args, Users }) {
  return api.sendMessage(
        "Dùng sai cách rồi bạn ưi",
        event.threadID,
        event.messageID
      );
}