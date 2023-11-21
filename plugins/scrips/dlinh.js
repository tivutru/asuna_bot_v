module.exports.config = {
	name: "dlinh",
version: "1.0.0",
hasPermssion: 0,
credits: "Gia Quân",
description: "xem thông tin admin",
commandCategory: "ảnh",
usages: "dlinh",
cooldowns: 5,
info: [
	{
		key: 'Text',
		type: 'Văn Bản',
		example: 'dlinh',
		   code_by: `Code By Gia Quân`
	}
]

};
module.exports.run = async ({ api, event }) => {
const axios = require('axios');
const request = require('request');
const fs = require("fs");

var link = [ 
    "https://i.ibb.co/KqkXCkJ/90-D77-A3-C-8-A0-B-4099-835-F-B84-E39-F4-FA54.jpg",
    "https://i.ibb.co/nMs38w5/F3-FEF896-C53-C-4-A86-A309-BB090-C908-B9-A.jpg",
    "https://i.ibb.co/HxGgZLm/3931-E025-424-E-4771-9-DAE-8-C803-AA6-F55-A.jpg",
    "https://i.ibb.co/Xx67YFN/25-DF148-D-53-E8-483-E-9-DCF-2-BDD4-C53-EB3-B.jpg",
    "https://i.ibb.co/6JLcN17/EFA19-E32-5486-4-F30-863-C-115-B9-C2-A7-D25.jpg",
    "https://i.ibb.co/2nPWgY2/11837-F00-412-F-4-BDC-AFE6-A82-B8146-CF17.jpg",
    "https://i.ibb.co/9N5bCBV/CF9-A0126-173-A-41-DC-9-B1-D-C503-B64-CF796.jpg",
    "https://i.ibb.co/cYzcvkT/A552-F5-B6-4-E36-4-FA5-8-DB0-29-CCC9249421.jpg",
    "https://i.ibb.co/r7Rqb9x/C172-D4-C1-4986-4414-BF20-09-D05-DF34-F83.jpg",
    "https://i.ibb.co/gzY5vVk/7-FA89723-A40-E-4-C57-81-A7-93427-F3-E42-F5.jpg",
    "https://i.ibb.co/S5BjDSh/CC003-D3-C-9-F17-4176-9-E41-5-E7-FB09-D7-E5-F.jpg",
    "https://i.ibb.co/02m76qf/FF116-C50-0-EDF-4-DB9-94-E1-3-A1-F582-D2-E45.jpg",
    "https://i.ibb.co/pPdnRj7/379-E7265-42-D6-4389-811-C-D871-F57-EE51-B.jpg",
    "https://i.ibb.co/bFrzgdp/6-D6640-F2-9-DBE-4-B4-C-A6-EB-BAFAAF86-D461.jpg",
    "https://i.ibb.co/PW2pWSS/2-D09-D8-E2-4691-415-E-A130-2-CE0-CDD1912-F.jpg",
    "https://i.ibb.co/bLpM0MV/41-A48740-E2-EE-4-B9-D-8-C80-E1-D3683840-EC.jpg",
    "https://i.ibb.co/2sJxy1R/45753-DEE-4440-4-F4-F-8-B67-2415-DE327-DFD.jpg",
    "https://i.ibb.co/JRr9JNc/4-E7-D9443-6771-4-E81-A4-DA-3-A286-AA48-E0-B.jpg"
];
let callback = () =>
api.sendMessage("Đang lấy thông tin của bạn Đlinh ❤️", event.threadID, () =>
api.sendMessage({ 
body: '🌟Đlinh siu cuti nè 😘\nFacebook: https://www.facebook.com/profile.php?id=100066118164266\n|Welcome to my profile|',
attachment: fs.createReadStream(__dirname + "/cache/giaquan.jpg")
}, event.threadID, event.messageID));
   request(link[Math.floor(Math.random() * link.length)]).pipe(fs.createWriteStream(__dirname+"/cache/giaquan.jpg")).on("close",() => callback());
}