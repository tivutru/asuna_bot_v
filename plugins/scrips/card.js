const sendWaiting = true; // bật hoặc tắt gửi tin nhắn "đang tạo hình ảnh, vui ồng chờ đợi...";
const textWaiting = "Đang khởi tạo hình ảnh, vui lòng chờ đợi trong giây lát";
const fonts = "/cache/Play-Bold.ttf"
const downfonts = "https://drive.google.com/u/0/uc?id=1uni8AiYk7prdrC7hgAmezaGTMH5R8gW8&export=download"
const fontsLink = 27
const fontsInfo = 27
const colorName = "#00FFFF"

module.exports.config = {
  name: "card",
  version: "2.0.0",
  hasPermssion: 0,
  credits: "có cái l",
  description: "Tạo card thông tin người dùng facebook",
  commandCategory: "Thông tin",
  usages: "carrd",
  cooldowns: 10,
  dependencies: ["axios"]
};

module.exports.circle = async (image) => {
  const jimp = require("jimp");
  image = await jimp.read(image);
  image.circle();
  return await image.getBufferAsync("image/png");
}
module.exports.run = async function ({ api, event, args, Users }) {
  let { senderID, threadID, messageID } = event;
  const { loadImage, createCanvas } = require("canvas");
  const request = require('request');
  const fs = require("fs-extra");
  const axios = require("axios");
  const Canvas = require("canvas");
  let pathImg = __dirname + `/cache/1.png`;
  let pathAvata = __dirname + `/cache/2.png`;
  /*                 */
  if(event.type == "message_reply") { uid = event.messageReply.senderID }
    else mentions = event.senderID;
    var mentions = event.senderID
    console.log(mentions)
	let data = await api.getUserInfo(mentions);
let name = await data[mentions].name
let url = data[mentions].profileUrl;

  let getAvatarOne = (await axios.get(`https://graph.facebook.com/${mentions}/picture?height=720&width=720&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`, { responseType: 'arraybuffer' })).data;
  let bg = (
    await axios.get(encodeURI(`https://i.imgur.com/zzrtq1i.jpg`), {
      responseType: "arraybuffer",
    })
  ).data;
  fs.writeFileSync(pathAvata, Buffer.from(getAvatarOne, 'utf-8'));
  avataruser = await this.circle(pathAvata);
  fs.writeFileSync(pathImg, Buffer.from(bg, "utf-8"));

/*-----------------download----------------------*/
if(!fs.existsSync(__dirname+`${fonts}`)) {
      let getfont = (await axios.get(`${downfonts}`, { responseType: "arraybuffer" })).data;
       fs.writeFileSync(__dirname+`${fonts}`, Buffer.from(getfont, "utf-8"));
    };
/*---------------------------------------------*/
let baseImage = await loadImage(pathImg);
let baseAvata = await loadImage(avataruser);

   let canvas = createCanvas(baseImage.width, baseImage.height);
  let ctx = canvas.getContext("2d");
  ctx.drawImage(baseImage, 0, 0, canvas.width, canvas.height);
  ctx.drawImage(baseAvata, 810, 280, 190, 190);
  var sex = await data[mentions].gender;
  var gender = sex == 2 ? "Nam" : sex == 1 ? "Nữ" : "Trần Đức Bo";
  var content = args.join(" ");
    var birthday = birthday ? `${birthday}` : "Ẩn";
    var love = data.relationship_status ? `${data.relationship_status}` : "Single"
   var follow = follow ? ` ${follow} ` : "10.000"
     Canvas.registerFont(__dirname+`${fonts}`, {
        family: "Play-Bold"
    });
  ctx.font = `${fontsInfo}px Play-Bold`;
  ctx.fillStyle = "#6600FF";
  ctx.textAlign = "start";
  fontSize = 15;
  ctx.fillText(`${name}`,287, 176);

  ctx.font = `${fontsInfo}px Play-Bold`;
  ctx.fillStyle = "#FF6600";
  ctx.textAlign = "start";
  fontSize = 15;
  ctx.fillText(`${gender}`,215, 300);

  ctx.font = `${fontsInfo}px Play-Bold`;
  ctx.fillStyle = "#000000";
  ctx.textAlign = "start";
  fontSize = 15;
  ctx.fillText(`${follow}`, 234, 342);

  ctx.font = `${fontsInfo}px Play-Bold`;
  ctx.fillStyle = "#FF0000";
  ctx.textAlign = "start";
  fontSize = 15;
  ctx.fillText(`${love}`, 265, 410);

  ctx.font = `${fontsInfo}px Play-Bold`;
  ctx.fillStyle = "#990000";
  ctx.textAlign = "start";
  fontSize = 15;
  ctx.fillText(`${birthday}`, 240, 454);
 
  ctx.font = `${fontsLink}px Play-Bold`;
  ctx.fillStyle = "#0000EE";
  ctx.textAlign = "start";
  fontSize = 5;
  ctx.fillText(`${mentions}`, 146, 258);
  ctx.beginPath();
  ctx.font = `${fontsLink}px TUVBenchmark`;
  ctx.fillStyle = "#008800";
  ctx.textAlign = "start";
  fontSize = 5;  
  ctx.fillText(`${url}`, 255, 215);
  ctx.beginPath();

  const imageBuffer = canvas.toBuffer();
  fs.writeFileSync(pathImg, imageBuffer);
  fs.removeSync(pathAvata);
 
  return api.sendMessage(
    { attachment: fs.createReadStream(pathImg) },
    threadID,
    () => fs.unlinkSync(pathImg),
    messageID
  );
};
