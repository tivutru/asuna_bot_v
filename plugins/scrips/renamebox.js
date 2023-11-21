module.exports.config = {
		name: "renamebox",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "Gia Quân",
	description: "set biệt danh cho các tv box",
	commandCategory: "system",
	usages: "renamebox",
	cooldowns: 5,
    info: [
        {
            key: 'Text',
            type: 'Văn Bản',
            example: 'renamebox',
            code_by: `Code By Gia Quân`
        }
    ]
};

module.exports.run = async function({ api, event, args }) {
 var threadInfo = await api.getThreadInfo(event.threadID)
    var idtv = threadInfo.participantIDs
 console.log(threadInfo)
 const name = args.join(" ")
 function delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    };
    for(let setname of idtv) {
 await delay(1000)
 api.changeNickname(`${name}`, event.threadID, setname);
 }
   api.sendMessage("🌟Done ChangeNickname Success🌟", event.threadID, event. messageID);
}
