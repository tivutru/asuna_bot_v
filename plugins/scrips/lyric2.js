module.exports.config = {
    name: "lyric2",  
    version: "1.0.0",
    hasPermssion: 0,
    credits: "Hoàng",
    description: "tìm lời bài hát",
    commandCategory: "media",
    usages: "lyric2 'tên bài hát'",
    cooldowns: 5,
    dependencies: ["lyrics-finder"],
    envConfig: {
"YOUTUBE_API": "AIzaSyAoRKGq6kkrDl1-Y97C10l8qz3TBarMV44",
"SOUNDCLOUD_API": "M4TSyS6eV0AcMynXkA3qQASGcOFQTWub"
}
};

module.exports.run = async function({ api, event, args, __GLOBAL }) {
  var lyr = require("lyrics-finder");
  const axios = require("axios"),
        fs = require("fs-extra");
  var {body} = event;
  let lyrics = await lyr(body);

  const YouTubeAPI = require("simple-youtube-api");
const youtube = new YouTubeAPI("AIzaSyAoRKGq6kkrDl1-Y97C10l8qz3TBarMV44");
var results = await youtube.searchVideos(body, 1);
for (let value of results) {var idmus = value.id;}
 
 
  var ytdl = require("ytdl-core");

ytdl("https://m.youtube.com/watch?v="+idmus)
                .pipe(fs.createWriteStream(__dirname + `/cache/lyric.m4a`))
                .on("close", () => {
 
/*var getms = (await axios.get(abc, {responseType: "arraybuffer"})).data;
 
    fs.writeFileSync(__dirname + "/cache/lyric.m4a", Buffer.from(getms, "utf-8"));*/
 
  api.sendMessage({attachment: fs. createReadStream(__dirname+"/cache/lyric.m4a"), body: lyrics}, event.threadID, event.messageID);
  }
           
           
          )  }

       