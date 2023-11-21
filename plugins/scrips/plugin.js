const { writeFileSync } = require("fs-extra");

const fs = require("fs");
module.exports.config = {
	name: "plugin",
	version: "1.0.2",
	credits: "Hoàng Quân",
	hasPermission: 2,
	description: "Quản lý module command",
	commandCategory: "system",
	usages: "command [exec] args",
	cooldowns: 0,
	dependencies: ["fs-extra"],
	info: [
		{
			key: 'exec',
			prompt: 'Lựa chọn lệnh cần thực thi',
			type: 'Văn Bản',
			example: 'all'
		}
	]
};
module.exports.run = async ({ event, api, client, args, configValue }) => {

	if (args[0] === "load") {
		const scripsLoaded = await loadPlugins('scrips', configValue, client.dirMain); // Đảo ngược vị trí tham số dirMain và configValue
		const scripsTotal = scripsLoaded.length;
		const scripsError = scripsTotal - scripsLoaded.filter(Boolean).length;

		let message = `⚙️ Đã load thành công  ${client.scrips.size} / ${scripsTotal} scrips`;
		if (scripsError > 0) message += ` (${scripsError} mã lỗi)`;

		api.sendMessage(message, event.threadID, event.messageID);
		
	}
};


// Hàm tải plugin
async function loadPlugins(type, configValue, dirMain) { // Đảo ngược vị trí tham số dirMain và configValue
	let pluginFiles;
	let loadedPlugins = [];
	try {
		if (type === 'scrips') {
			pluginFiles = await fs.promises.readdir(`${dirMain}/plugins/${type}`);
			// Đảm bảo rằng global.config đã tồn tại và được khởi tạo trước khi truy cập vào thuộc tính commandDisabled
			if (typeof global.config === "undefined") {
				global.config = {};
			}
			if (typeof global.config.commandDisabled === "undefined") {
				global.config.commandDisabled = [];
			}
			pluginFiles = pluginFiles.filter((file) => file.endsWith(".js") && !file.includes('example') && !global.config.commandDisabled.includes(file));
		}

		// Ghi nhận các plugin được load thành công
		loadedPlugins = pluginFiles.map((file) => {
			try {
				return require(`${dirMain}/plugins/${type}/${file}`);
			} catch (error) {
				console.error(`Không thể tải ${type}: ${file} với lỗi: ${error.message}`);
				return null;
			}
		});
	} catch (error) {
		console.error(`Lỗi đọc thư mục plugin ${type}: ${error.message}`);
	}

	return loadedPlugins;
}
