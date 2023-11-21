const fs = require('fs');
module.exports.config = {
  name: "chupweb",
  version: "1.0.0",
  credits: "Hoàng",
  hasPermssion: 1,
  description: "Bật tắt antiout",
  usages: "antiout on/off",
    commandCategory: "system",
  cooldowns: 0,
 
};
 
module.exports.run = async({ api, event, client, Threads, args}) => {
    if (!args.join("") != " " ){ return api.sendMessage("Bạn phải nhập link", event.threadID, event.messageID);}
var link = args[0];
	const open = require('open');
await open(`${link}`,{
	app: {
		name: open.apps.chrome
	}
});
api.sendMessage("Vui lòng chờ 15s bạn nhé",event.threadID, event.messageID);

 function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  };
       /// CHỤP VÀ GỬI ///
const screenshot = require('screenshot-desktop')
let fs = require('fs')
await delay(10000)
screenshot().then((img) => {
  console.log(img)
  fs.writeFileSync("./plugins/scrips/cache/sc.png",img)
}).catch((err) => {
})
   // HÀM GỬI //
 

 
 
await delay(12000)
  var body = ` ảnh nè hihi`
 
 
return api.sendMessage({body: body, attachment: fs.createReadStream(__dirname + "/cache/sc.png")}, event.threadID, event.messageID);
}