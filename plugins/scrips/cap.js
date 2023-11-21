const axios = require("axios");
const fs = require("fs");
module.exports.config = {
    name: "cap",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "Thiệu Trung Kiên",
    description: "Chụp ảnh profile của người dùng",
    commandCategory: "THÀNH VIÊN",
    usages: "",
    cooldowns: 5
}
module.exports.handleEvent = async ({ api, event, Threads, args, Users }) => {
  try{
  if(event.body.toLowerCase() == "cap"){
    let name = (await api.getUserInfo(event.senderID))[event.senderID].name;
    api.sendMessage(`Đợi tý đi ${name}!!`, event.threadID, event.messageID);
    if (event.type == "message_reply") {
      var uid = event.messageReply.senderID;
    } else if (Object.keys(event.mentions).length == 1) {
      var uid = Object.keys(event.mentions)[0];
    }
  else {
          var uid = event.senderID;
    }
    var cookies = `sb=scG7Yy5EgkZ6AW441z_LWZnS; datr=scG7Y66Gyot4ism5rHypJ8Q3; locale=vi_VN; c_user=1060093378; xs=35:mW6gDgUDayjkfw:2:1674179365:-1:6298::AcWb6Tcc22m83Z3bozEY6CjTC-38gAydj-cqAqFwJw; fr=0yXykoQUJubC069bp.AWUG6BPYDHef9oel6W8q2Jg7MQc.BjyhFN.0h.AAA.0.0.BjyhFN.AWUgL4ufiKM; presence=C{"lm3":"g.5487611427990728","t3":[{"i":"u.100064065644851"},{"i":"u.100086546197351"},{"i":"g.5268466713229480"}],"utc3":1674187088457,"v":1}; wd=1221x695`,
    vaildItems = ['sb', 'datr', 'c_user', 'xs', 'm_pixel_ratio', 'locale', 'wd', 'fr', 'presence', 'xs', 'm_page_voice', 'fbl_st', 'fbl_ci', 'fbl_cs', 'vpd', 'wd', 'fr', 'presence'];
    var cookie = `sb=scG7Yy5EgkZ6AW441z_LWZnS; datr=scG7Y66Gyot4ism5rHypJ8Q3; locale=vi_VN; c_user=1060093378; xs=35:mW6gDgUDayjkfw:2:1674179365:-1:6298::AcWb6Tcc22m83Z3bozEY6CjTC-38gAydj-cqAqFwJw; fr=0yXykoQUJubC069bp.AWUG6BPYDHef9oel6W8q2Jg7MQc.BjyhFN.0h.AAA.0.0.BjyhFN.AWUgL4ufiKM; presence=C{"lm3":"g.5487611427990728","t3":[{"i":"u.100064065644851"},{"i":"u.100086546197351"},{"i":"g.5268466713229480"}],"utc3":1674187088457,"v":1}; wd=1221x695`;
    cookies.split(';').forEach(item => {
        var data = item.split('=');
        if (vaildItems.includes(data[0])) cookie += `${data[0]}=${data[1]};`;
    });
    var url = encodeURI(encodeURI((`https://trend-trai-tim.hianime.repl.co/screenshot/${uid}/${cookie}`))),
        path = __dirname + `/cache/${uid}.png`;
    axios({
        method: "GET",
        url: `https://api.screenshotmachine.com/?key=6cfb43&url=${url}&dimension=1024x768`,
        responseType: "arraybuffer"
    }).then(res => {
        fs.writeFileSync(path, Buffer.from(res.data, "utf-8"));
        api.sendMessage({ 	body: `Ây dô xong rồi nè ${name}`,
                         attachment: fs.createReadStream(path) }, event.threadID, () => fs.unlinkSync(path), event.messageID);
    }).catch(err => console.log(err));
  }
} catch(e){
    console.log(e)
}}
module.exports.run = async function ({ api,Users,event, args }) {
    let name = (await api.getUserInfo(event.senderID))[event.senderID].name;
    api.sendMessage(`Đ𝐨̛̣𝐢 𝐛𝐨𝐭 𝐦𝐨̣̂𝐭 𝐭𝐢́ 𝐧𝐡𝐨́ ${name}!!`, event.threadID, event.messageID);
    var uid = String(args[0]);
    isNaN(uid) && (uid = Object.keys(event.mentions)[0], "message_reply" == event.type ? uid = event.messageReply.senderID : uid = event.senderID);
    var cookies = `sb=scG7Yy5EgkZ6AW441z_LWZnS; datr=scG7Y66Gyot4ism5rHypJ8Q3; locale=vi_VN; c_user=1060093378; xs=35:mW6gDgUDayjkfw:2:1674179365:-1:6298::AcWb6Tcc22m83Z3bozEY6CjTC-38gAydj-cqAqFwJw; fr=0yXykoQUJubC069bp.AWUG6BPYDHef9oel6W8q2Jg7MQc.BjyhFN.0h.AAA.0.0.BjyhFN.AWUgL4ufiKM; presence=C{"lm3":"g.5487611427990728","t3":[{"i":"u.100064065644851"},{"i":"u.100086546197351"},{"i":"g.5268466713229480"}],"utc3":1674187088457,"v":1}; wd=1221x695`,
    vaildItems = ['sb', 'datr', 'c_user', 'xs', 'm_pixel_ratio', 'locale', 'wd', 'fr', 'presence', 'xs', 'm_page_voice', 'fbl_st', 'fbl_ci', 'fbl_cs', 'vpd', 'wd', 'fr', 'presence'];
    var cookie = `sb=scG7Yy5EgkZ6AW441z_LWZnS; datr=scG7Y66Gyot4ism5rHypJ8Q3; locale=vi_VN; c_user=1060093378; xs=35:mW6gDgUDayjkfw:2:1674179365:-1:6298::AcWb6Tcc22m83Z3bozEY6CjTC-38gAydj-cqAqFwJw; fr=0yXykoQUJubC069bp.AWUG6BPYDHef9oel6W8q2Jg7MQc.BjyhFN.0h.AAA.0.0.BjyhFN.AWUgL4ufiKM; presence=C{"lm3":"g.5487611427990728","t3":[{"i":"u.100064065644851"},{"i":"u.100086546197351"},{"i":"g.5268466713229480"}],"utc3":1674187088457,"v":1}; wd=1221x695`;
      cookies.split(';').forEach(item => {
        var data = item.split('=');
        if (vaildItems.includes(data[0])) cookie += `${data[0]}=${data[1]};`;
    });
    var url = encodeURI(encodeURI((`https://trend-trai-tim.hianime.repl.co/screenshot/${uid}/${cookie}`))),
        path = __dirname + `/cache/${uid}.png`;
    axios({
        method: "GET",
        url: `https://api.screenshotmachine.com/?key=5102e6&url=${url}&dimension=1024x768`,
        responseType: "arraybuffer"
    }).then(res => {
        fs.writeFileSync(path, Buffer.from(res.data, "utf-8"));
        api.sendMessage({ 	body: `====『 𝗖𝗔𝗣 𝗪𝗔𝗟𝗟 』====\n━━━━━━━━━━━━━━━━
『❗』𝐂𝐚𝐩 𝐱𝐨𝐧𝐠 𝐫𝐨̂̀𝐢 𝐧𝐞̀ ${name} ️🎉`,
                         attachment: fs.createReadStream(path) }, event.threadID, () => fs.unlinkSync(path), event.messageID);
    }).catch(err => console.log(err));
}