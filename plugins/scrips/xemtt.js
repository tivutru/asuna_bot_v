module.exports.config = {
    name: "xemtt",
version: "1.0.0",
hasPermssion: 0,
credits: "Gia Quân",
description: "xem tt nhóm",
commandCategory: "check",
usages: "xemtt",
cooldowns: 5,
info: [
    {
        key: 'Text',
        type: 'Văn Bản',
        example: 'xemtt',
        code_by: `Code By Gia Quân`
    }
]
};

module.exports.run = async ({ api, event, getThread }) => {

    if(!event.isGroup) return
    var IDs = Object.keys(event.mentions);
    var mem = Object.keys(getThread.user);
    let rank = [];
    for(let id of mem){
        rank.push({
            id: id,
            count: getThread.user[id].countchat,
            name: global.data.user[id].name
        })
    }
    rank.sort((a,b)=>  b.count - a.count)
    if(IDs.length != 0){
        var speech = "\n";
        for (let i in IDs){
            let top = rank.findIndex(info => parseInt(info.id) == parseInt(IDs[i])) + 1;
            let infoUser = rank[top - 1];
            var data = `${infoUser.name}: ${infoUser.count} tin nhắn và xếp thứ ${top} \n`;
            speech = speech + data;
        }
        return api.sendMessage(speech,event.threadID)
    }else if(event.args[0] == "all"){
        var page = 1;
        page = parseInt(event.args[1]) || 1;
        page < -1 ? page = 1 : "";
        var msg = "Độ tương tác trong box:\n";
        var limit = 10;
        var numPage = Math.ceil(mem.length/limit);
        for(var i = limit*(page - 1); i < limit*(page-1) + limit; i++){
            if(i >= rank.length) break;
            let infoUser = rank[i];
            msg += `${i+1}.${infoUser.name}: ${infoUser.count} tin nhắn\n=========\n`
        }
        msg += `--Trang ${page}/${numPage}--\n=========\nDùng ${global.config.prefix}xemtt all số trang muốn xem`
        return api.sendMessage(msg,event.threadID);
    }else{
        let top = rank.findIndex(info => parseInt(info.id) == parseInt(event.senderID)) + 1;
        let infoUser = rank[top - 1];
        var data = `${infoUser.name}: ${infoUser.count} tin nhắn và xếp thứ ${top}\n`; 
        return api.sendMessage(data,event.threadID)
    }
}