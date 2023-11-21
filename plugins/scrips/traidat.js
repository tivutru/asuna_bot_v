module.exports.config = {
    name: "traidat",
    version: "1.0.1",
    hasPermssion: 0,
    credits: "Hoàng Quân",
    description: "xem ảnh trái đất",
    commandCategory: "system",
    usages: "traidat [Text]",
    cooldowns: 5,
    info: [
        {
          key: 'Text',
          type: 'Văn Bản',
          example: 'traidat',
          code_by: `Code By Gia Quân`
        }
      ]
    };
    
    module.exports.run = async function({ api, event }) {
      
    
   const request = require("request");
   const fs = require("fs-extra");
return request(`https://api.nasa.gov/EPIC/api/natural/images?api_key=DEMO_KEY`, (err, response, body) => {
 if (err) throw err;
 var jsonData = JSON.parse(body);
 var randomNumber = Math.floor(Math.random() * ((jsonData.length - 1) + 1));
 var image_name = jsonData[randomNumber].image
 var date = jsonData[randomNumber].date;
 var date_split = date.split("-")
 var year = date_split[0];
 var month = date_split[1];
 var day_and_time = date_split[2];
 var sliced_date = day_and_time.slice(0, 2);
 var image_link = `https://epic.gsfc.nasa.gov/archive/natural/${year}/${month}/${sliced_date}/png/` + image_name + ".png";
 let callback = function() {
   api.sendMessage({
     body: `✅dữ liệu được ăn cắp từ nasa✅\nẢnh được chụp gần đây nhất từ không gian\n\n ${jsonData[randomNumber].caption} on ${date}`,
     attachment: fs.createReadStream(__dirname + `/cache/randompic.png`)
   }, event.threadID, () => fs.unlinkSync(__dirname + `/cache/randompic.png`), event.messageID);
 };
 request(image_link).pipe(fs.createWriteStream(__dirname + `/cache/randompic.png`)).on("close", callback);
});
}