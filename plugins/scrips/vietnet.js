module.exports.config = {
    name: "vietnet",
    version: "1.0.1",
    hasPermssion: 0,
    credits: "Hoàng  Quân",
    description: "xem tin tức mới ",
    commandCategory: "game",
    usages: "vietnet[]",
    cooldowns: 5,
    info: [
        {
          key: 'Text',
          type: 'Văn Bản',
          example: 'vietnet',
          code_by: `Code By Gia Quân`
        }
      ]
    };
    
    module.exports.run = async function({ api, event, args }) {
const request = require('request')
var cheerio = require('cheerio')
var chovui = request.get('https://vnexpress.net/tin-tuc-24h', (error, response, html) => {
  if (!error && response.statusCode == 200) {
    var $ = cheerio.load(html);
    var thoigian = $('.time-count');
    var tieude = $('.thumb-art');
    var noidung = $('.description');
    var time = thoigian.find('span').attr('datetime');
    var title = tieude.find('a').attr('title');
    var des = noidung.find('a').text();
    var link = noidung.find('a').attr('href');
    var description = des.split('.');
   
    api.sendMessage(`Tin tức mới nhất\r\nThời gian đăng: ${time}\r\nTiêu đề: ${title}\r\n\nNội dung: ${description[0]}\r\nLiên kết: ${link}\r\n\n`,event.threadID,event.messageID)
    }
}
)}