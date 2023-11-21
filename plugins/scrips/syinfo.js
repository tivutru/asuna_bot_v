module.exports.config = {
		name: "syinfo",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "Gia Quân",
	description: "xem thông tin bot trên máy chủ",
	commandCategory: "Hình Ảnh",
	usages: "syinfo",
	cooldowns: 5,
	info: [
		{
			key: 'Text',
			type: 'Văn Bản',
			example: 'syinfo',
            code_by: `Code By Gia Quân`
		}
	]
};

module.exports.run = async ({ api, event }) => {
	const axios = require('axios');
    const request = require('request');
    const fs = require("fs");
    return api.sendMessage(`Hoạt động ở máy chủ\n>Pixel 3 XL\nSê-ri\n>88HY0111W\nPhiên bản phần cứng\n>PVT1.0\nđịa chỉ ip\n>10.41.26.19\nSố bản dựng\n>SP1A.210812.016.C1`, event.threadID, event.messageID)
    }