module.exports.config = {
name: "prefix",
version: "1.0.1",
hasPermssion: 0,
credits: "Gia Quân",// dã sửa thành cái đầu buồi
description: "prefix",
commandCategory: "Không cần dấu lệnh",
usages: "noprefix",
cooldowns: 5,
info: [
		{
			key: 'Text',
			type: 'Văn Bản',
			example: 'prefix',
            code_by: `Code By Gia Quân`
		}
	]
};
module.exports.event = async function({ event, api })  {
	const request = require('request');
		const fs = require("fs-extra");
	  const axios = require(`axios`);
	let { senderID } = event;
	let name = (await api.getUserInfo(event.senderID))[event.senderID].name;
	 if ((event.body == "Prefix") || (event.body == "prefix")) { return api.sendMessage({
	body: `🌈Chào ${name} \n🌈Prefix của bot là [ & ] nhé😉❤️`,
	mentions: [
	{
	tag: name,
	id: event.senderID
	}
	],
	attachment: [
		require("fs").createReadStream(__dirname + "/cache/prefix/1.gif")
	
	]
	}, event.threadID, event.messagerID);
	}
	};
	
	
	module.exports.run = async ({ event, api, Currencies, args, utils }) => {
	
	
	api.sendMessage(`dùng cái đầu buồi địt mẹ mày`,event.threadID); /// điền cái buồi gì cũng đuơcj
	
	
	
	}
	