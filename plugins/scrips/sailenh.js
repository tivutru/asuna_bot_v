/** Đổi Credit ? Bọn t đã không mã hóa cho mà edit rồi thì tôn trọng nhau tý đi ¯\_(ツ)_/¯ **/
module.exports.config = {
    name: "",    
    version: "1.0.0",
    hasPermssion: 0,
    credits: "hoangquan",
    description: "Random text",
    commandCategory: "sailenh",
    usages: "buooi",
    cooldowns: 0,
    info: [
      {
        key: 'sailenh',
        type: 'Văn Bản',
        example: 'sailenh',
              code_by: `Code By Gia Quân`
      }
    ]
  };
  
  module.exports.run = async({api,event,args,client,Users,Threads,__GLOBAL,Currencies}) => {
  const axios = require('axios');
  const request = require("request");
  const fs = require("fs-extra");

    
  var link = [ 
  "https://i.imgur.com/eThdzbE.jpg",
  "https://i.imgur.com/w4Ve9ch.jpg",
  ];

  var hq = ["1 + 1 = 2",
  "Tôi là bot",
"2 x 2 = 4",
"Chào em anh đứng đây từ chiều",
"Bạn đã biết",
"kẹo sữa mikita được làm từ sữa",
"Trái đất hình tròn",
"Admin đang ế",
"Em tên là Asuna"
];

   
  
   
        api.sendMessage(`[ Bạn có biết ]\n` + hq[Math.floor(Math.random() * hq.length)],event.threadID, event.messageID);
}