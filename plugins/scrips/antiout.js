const fs = require('fs');
const path = require('path');

const statusFolderPath = path.join(__dirname, '..', '..', 'strick');
const statusFilePath = path.join(statusFolderPath, 'antioutStatus.json.json'); // Đường dẫn đến tệp JSON

// Hàm để đọc trạng thái từ tệp
function readStatusFromFile() {
  try {
    const data = fs.readFileSync(statusFilePath, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    return {};
  }
}

// Hàm để lưu trạng thái vào tệp
function saveStatusToFile(status) {
  const data = JSON.stringify(status);
  fs.writeFileSync(statusFilePath, data, 'utf8');
}

module.exports.config = {
  name: "antiout",
  version: "1.0.0",
  credits: "Hoàng Quân",
  hasPermssion: 1,
  description: "Bật tắt antiout",
  usages: "antiout on/off",
  commandCategory: "system",
  cooldowns: 0,
  info: [
    {
      key: 'Text',
      type: 'Văn Bản',
      example: 'antiout',
      code_by: `Code By Hoàng Quân`
    }
  ]
};

// Ở phần run trong module command antiout
module.exports.run = async ({ api, event, Threads, args, utils }) => {
  const threadID = event.threadID;
  const antioutStatus = readStatusFromFile();

  let settings = (await Threads.getData(threadID)).settings;
  switch(args[0]) {
    case "on": {
      settings["antiout"] = true;
      antioutStatus[threadID] = true; // Lưu trạng thái vào biến antioutStatus
      saveStatusToFile(antioutStatus); // Lưu trạng thái vào tệp
      await Threads.setData(threadID, options = { settings });
      api.sendMessage("Bật antiout thành công!!", threadID);
      break;
    }
    case "off": {
      settings["antiout"] = false;
      antioutStatus[threadID] = false; // Lưu trạng thái vào biến antioutStatus
      saveStatusToFile(antioutStatus); // Lưu trạng thái vào tệp
      await Threads.setData(threadID, options = { settings });
      api.sendMessage("Tắt antiout thành công!!", threadID);
      break;
    }

    default: {
      utils.throwError("antiout", threadID, event.messageID);
      break;
    }
  }
}
