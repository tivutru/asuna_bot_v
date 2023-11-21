module.exports.config = {
	name: "alow",
	version: "1.3.0",
	hasPermssion: 0,
	credits: "Hoàng Quân",
	description: "Tạo các lệnh tùy chỉnh",
	commandCategory: "system",
	usages: "/ a => à (Tạo lệnh tùy chỉnh A với output À) /del a (Xóa lệnh tùy chỉnh A)",
	cooldowns: 5,
	dependencies: ["fs-extra"]
  }
  
  module.exports.onLoad = () => {
	const fs = require("fs-extra");
	if (!fs.existsSync(__dirname + "/cache/customCommands.json")) fs.writeFileSync(__dirname + "/cache/customCommands.json", JSON.stringify([]), 'utf-8');
  }
  
  module.exports.event = function({ api, event }) {
	const fs = require("fs-extra"); 
	if (event.type !== "message_unsend" && event.body.length !== -1) {
	  let customCommands = JSON.parse(fs.readFileSync(__dirname + "/cache/customCommands.json"));
	  if (customCommands.some(item => item.id == event.threadID)) {
		let getThreadCommands = customCommands.find(item => item.id == event.threadID).commands;
		if (getThreadCommands.some(item => item.trigger == event.body)) {
		  let commandOutput = getThreadCommands.find(item => item.trigger == event.body).output;
		  if (commandOutput.indexOf(" | ") !== -1) {
			var arrayOutput = commandOutput.split(" | ");
			return api.sendMessage(`${arrayOutput[Math.floor(Math.random() * arrayOutput.length)]}`, event.threadID);
		  }
		  else return api.sendMessage(`${commandOutput}`, event.threadID);
		}
	  }
	}
  }
  
  module.exports.run = function({ api, event, args }) {
	const fs = require("fs-extra");
	var { threadID, messageID } = event;
	var content = event.body;
	if (!content.startsWith('/')) return; // Kiểm tra nếu không bắt đầu bằng dấu lệnh "/"
	content = content.slice(1).trim(); // Bỏ đi dấu lệnh "/" ở đầu
  
	const commandName = "alow";
	if (content.startsWith(commandName)) {
	  content = content.slice(commandName.length).trim(); // Loại bỏ tên lệnh customCommand khỏi content
	}
  
	// Kiểm tra nếu content chứa dấu '=>'
	const separatorIndex = content.indexOf(" => ");
	if (separatorIndex !== -1) {
	  let trigger = content.slice(0, separatorIndex).trim(); // Bỏ khoảng trắng ở đầu và cuối của trigger
	  let output = content.slice(separatorIndex + 4, content.length).trim(); // Bỏ khoảng trắng ở đầu và cuối của output
	  if (trigger && output) {
		return fs.readFile(__dirname + "/cache/customCommands.json", "utf-8", (err, data) => {
		  if (err) throw err;
		  var oldData = JSON.parse(data);
		  if (!oldData.some(item => item.id == threadID)) {
			let addThis = {
			  id: threadID,
			  commands: []
			}
			addThis.commands.push({ trigger, output });
			oldData.push(addThis);
			return fs.writeFile(__dirname + "/cache/customCommands.json", JSON.stringify(oldData), "utf-8", (err) => {
			  if (err) console.error(err);
			  else {
				const successMessage = `Alow OK !\n____________\nTrigger: [ ${trigger} ]\n___________\nOutput: [ ${output} ]`;
				api.sendMessage(successMessage, threadID, messageID);
			  }
			});
		  }
		  else {
			let getCommand = oldData.find(item => item.id == threadID);
			if (getCommand.commands.some(item => item.trigger == trigger)) {
			  let index = getCommand.commands.indexOf(getCommand.commands.find(item => item.trigger == trigger));
			  let existingOutput = getCommand.commands.find(item => item.trigger == trigger).output;
			  getCommand.commands[index].output = existingOutput + " | " + output;
			  api.sendMessage("Lệnh tùy chỉnh đã tồn tại trong nhóm này", threadID, messageID);
			  return fs.writeFile(__dirname + "/cache/customCommands.json", JSON.stringify(oldData), "utf-8");
			}
			getCommand.commands.push({ trigger, output });
			return fs.writeFile(__dirname + "/cache/customCommands.json", JSON.stringify(oldData), "utf-8", (err) => {
			  if (err) console.error(err);
			  else {
				const successMessage = `Alow OK !\n____________\nTrigger: [ ${trigger} ]\n___________\nOutput: [ ${output} ]`;
				api.sendMessage(successMessage, threadID, messageID);
			  }
			});
		  }
		});
	  }
	}
  
	// Nếu content bắt đầu bằng '/del', xóa lệnh tùy chỉnh
	if (content.startsWith('dell')) {
	  let deleteThis = content.slice(5, content.length);
	  if (!deleteThis) return api.sendMessage("Không tìm thấy lệnh cần xóa", threadID, messageID);
	  return fs.readFile(__dirname + "/cache/customCommands.json", "utf-8", (err, data) => {
		if (err) throw err;
		var oldData = JSON.parse(data);
		var getThreadCommands = oldData.find(item => item.id == threadID).commands;
		if (!getThreadCommands.some(item => item.trigger == deleteThis)) return api.sendMessage("Không tìm thấy lệnh cần xóa", threadID, messageID);
		getThreadCommands.splice(getThreadCommands.findIndex(item => item.trigger === deleteThis), 1);
		fs.writeFile(__dirname + "/cache/customCommands.json", JSON.stringify(oldData), "utf-8", (err) => {
		  if (err) console.error(err);
		  else api.sendMessage("Đã xóa lệnh thành công!", threadID, messageID);
		});
	  });
	}
  
	// Nếu không khớp với các điều kiện trên, hiển thị hướng dẫn sử dụng
	api.sendMessage(`Định dạng không hợp lệ\nVui lòng sử dụng / ${commandName} a => à (Tạo lệnh tùy chỉnh A với output À) /del a (Xóa lệnh tùy chỉnh A)`, threadID, messageID);
  }
  