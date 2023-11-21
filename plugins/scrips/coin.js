module.exports.config = {
name: "coin",
version: "1.0.1",
hasPermssion: 2,
credits: "Hoàng",
description: "thay đổi số tiền của bản thân hoặc người được tag",
commandCategory: "Economy",
usages: "coin [Tag]",
cooldowns: 5,

};

module.exports.run = async function({ api, event, args, Currencies, utils, Users}) {
  let { threadID, messageID, senderID } = event;
	const coins = parseInt(args[2])
	const userID = Object.keys(event.mentions)[0];
	var nameL
	switch(args[0]) {
		case "inc": {
		if (args[1] == 'me') return api.sendMessage({ body: `Đã thêm cho bản thân ${coins} đô`}, threadID, async () => {
            await Currencies.increaseMoney(senderID, coins);}, messageID);
        if(userID) nameL = event.mentions[userID].split(" ").length
		return api.sendMessage({ body: 'Đã chuyển cho ' + event.mentions[userID].replace(/@/g, "") + ` ${args[1+ nameL]} đô`}, threadID, async () => {
            await Currencies.increaseMoney(userID, parseInt(args[1+ nameL]));
            }, messageID);
       }
			break;
		case "dec": {
		if (args[1] == 'me') {
		let balance = (await Currencies.getData(userID)).money;
		if(args[2] == "all") return api.sendMessage(`Bạn đã giảm toàn bộ tiền của bản thân`, threadID, async () => {
            await Currencies.decreaseMoney(senderID, balance);}, messageID);
		 if(!isNaN(args[2])){ 
		 if(coins > balance) return api.sendMessage("Số tiền bạn giảm lớn hơn số tiền hiện có",threadID,messageID)
	       	else return api.sendMessage(`Đã giảm ${coins} tiền của bản thân`, threadID, async () => {
            await Currencies.decreaseMoney(senderID, coins);}, messageID);
            }
         else return api.sendMessage("Vui lòng nhập số tiền muốn giảm",threadID,messageID)
        }
	    else if(userID){
	    nameL = event.mentions[userID].split(" ").length
	    let balance = (await Currencies.getData(userID)).money;
	    if(args[1+ nameL] == "all") return api.sendMessage(`Bạn đã giảm toàn bộ tiền của ${event.mentions[userID].replace(/@/g, "")}`, threadID, async () => {
            await Currencies.decreaseMoney(userID, balance);}, messageID);
        
	    api.sendMessage({ body: `Đã giảm ${args[1+ nameL]} tiền của ` + event.mentions[userID].replace(/@/g, "")}, threadID, async () => {
            await Currencies.decreaseMoney(userID, parseInt(args[1+nameL]));}, messageID);
            }
        else return api.sendMessage("Bạn muốn giảm tiền của ai",threadID,messageID)
        }
			break;
		default:
		return utils.throwError("coins", threadID, messageID);
		break;
		}
	}