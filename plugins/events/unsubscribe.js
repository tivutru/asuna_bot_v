module.exports.config = {
	name: "unsubscribe",
	eventType: ["log:unsubscribe"],
	version: "1.0.0",
	credits: "Hoàng Quân",
	description: "listen events",
	dependencies: ["request", "fs-extra"]
};

module.exports.run = async function({ api, event }) {
	const leftUserId = event.logMessageData.leftParticipantFbId;
	const botUserId = api.getCurrentUserID();

	if (leftUserId === botUserId) return;

	try {
		const userInfo = await api.getUserInfo(leftUserId);
		const name = userInfo[leftUserId].name;
		const type = (event.author === leftUserId) ? "tự rời" : "bị xoá";
		const msg = `GGWP, ${name} đã ${type} khỏi nhóm`;

		await api.sendMessage({ body: msg }, event.threadID);
	} catch (error) {
		console.error("Đã xảy ra lỗi:", error);
	}
};
