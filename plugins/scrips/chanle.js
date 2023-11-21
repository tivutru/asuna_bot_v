module.exports.config = {
    name: "chanle",
    version: "1.0.1",
    hasPermssion: 0,
    credits: "Gia Quân",// dã sửa thành cái đầu buồi
    description: "random",
    commandCategory: "Không cần dấu lệnh",
    usages: "noprefix",
    cooldowns: 5,
    info: [
            {
                key: 'Text',
                type: 'Văn Bản',
                example: 'chanle',
                code_by: `Code By Gia Quân`
            }
        ]
    };
    module.exports.run = function({ api, event }) {
function isEven(n) {
    return n % 2 == 0;
    } 
    function between(min, max) {
    return Math.floor( Math.random() * (max - min) + min ); 
    } 
    function isOdd(n) { if (isEven(n)) { 
    return false;
    }
    else { return true;
    }
    } 
    var random = between(1,100000); 
    var answer; 
    switch(isOdd(parseInt(random))) {
    case true: answer = "lẻ"; 
    break; 
    case false: answer = "chẵn"; 
    break; 
    default: 
    return api.sendMessage(" Lỗi !",event.threadID); 
    } 
    if (!event.args[0]) return api.sendMessage("[Bấm /chanle [Chẵn/Lẻ] ",event.threadID);
    var option; 
    switch (event.args[0].toLowerCase()) {
    case "chẵn": option = "chẵn"; 
    break; 
    case "lẻ": option = "lẻ"; 
    break; 
    default:
    return api.sendMessage("Bấm /chanle [Chẵn/Lẻ] ",event.threadID);
    }  try { 
    if (answer == option) { 
    return api.sendMessage("Bạn Đã Thắng Với Kết Quả Là : " + random + " => " + answer.toUpperCase() ,event.threadID,event.messageID);
    } else { 
    return api.sendMessage("Bạn Đã Thua Với Kết Quả Là : " + random + " => " + answer.toUpperCase() ,event.threadID,event.messageID); } } catch (e) { console.log(e); } };
    
       
    
    
    