module.exports.config = {
	name: "subscribe",
	eventType: ["log:subscribe"],
	version: "1.0.0",
	credits: "Hoàng Quân",
	description: "Listen events",
	dependencies: ["request", "fs-extra"]
};

module.exports.run = async function({ api, event, client, global }) {
	if (event.logMessageData.addedParticipants.some(i => i.userFbId == api.getCurrentUserID())) {
		api.changeNickname(`[ ${global.config.PREFIX} ] • ${(!global.config.BOTNAME) ? "Nguyễn Hoàng Quân" : global.config.BOTNAME}`, event.threadID, api.getCurrentUserID());
		api.sendMessage(`Connected successfully!`, event.threadID);
		api.sendMessage("kết nối thành công", event.threadID);
	} else {
		const { createReadStream, existsSync, mkdirSync } = require("fs-extra");
		const threadInfo = await api.getThreadInfo(event.threadID);
		const threadName = threadInfo.threadName;
		const settings = client.threadSetting.get(event.threadID) || {};
		const addedParticipants = event.logMessageData.addedParticipants.map(participant => participant.fullName);
		const memLength = threadInfo.participantIDs.length;
		const type = (addedParticipants.length > 1) ? 'các bạn' : 'bạn';

		let msg = (typeof settings.customJoin === "undefined") ?
			`GGWP, ${addedParticipants.join(', ')}\nĐến với ${threadName}.\n${type} là thành viên thứ ${memLength} của nhóm 🌈` :
			settings.customJoin.replace(/\{threadName}/g, threadName).replace(/\{type}/g, type).replace(/\{soThanhVien}/g, memLength);

		const formPush = { body: msg };
		try {
			await api.sendMessage(formPush, event.threadID);
		} catch (error) {
			console.error("Đã xảy ra lỗi:", error);
			await api.sendMessage("Gửi thông báo bị lỗi, xin vui lòng thử lại sau.", event.threadID);
		}
	}
};