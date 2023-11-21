const fs = require('fs');
const path = require('path');

const dataFolderPath = path.join(__dirname, '..', '..', 'strick'); // Đường dẫn đến thư mục ngoài plugins/scripts
const dataFilePath = path.join(dataFolderPath, 'data.json'); // Đường dẫn đến tệp JSON

// Đọc dữ liệu từ file JSON
function readData() {
  try {
    if (fs.existsSync(dataFilePath)) {
      const jsonData = fs.readFileSync(dataFilePath, 'utf8');
      return JSON.parse(jsonData);
    } else {
      return {};
    }
  } catch (err) {
    console.error('Error reading data:', err);
    return {};
  }
}

// Ghi dữ liệu vào file JSON
function writeData(data) {
  try {
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 4), 'utf8');
  } catch (err) {
    console.error('Error writing data:', err);
  }
}

// Lấy số tin nhắn của thành viên từ dữ liệu
function getMessageCount(threadID, userID, data) {
  return data[threadID] && data[threadID][userID] ? data[threadID][userID].messageCount : 0;
}

// Cập nhật số tin nhắn của thành viên vào dữ liệu
function updateMessageCount(threadID, userID, messageCount) {
  try {
    const data = readData();
    if (!data[threadID]) {
      data[threadID] = {};
    }
    data[threadID][userID] = {
      ...data[threadID][userID],
      messageCount: messageCount,
    };
    writeData(data);
  } catch (err) {
    console.error('Error updating message count:', err);
  }
}

module.exports.config = {
  name: "checktt",
  version: "0.0.1",
  hasPermssion: 0,
  credits: "CatalizCS",
  description: "Kiểm tra số tin nhắn của thành viên",
  commandCategory: "system",
  usages: "checktt args",
  cooldowns: 5,
  envConfig: {
    "maxColumn": 10
  }
};

module.exports.run = async ({ args, api, event }) => {
  var mention = Object.keys(event.mentions);
  const data = await api.getThreadInfo(event.threadID);

  // Kiểm tra xem thư mục có tồn tại chưa, nếu chưa thì tạo mới
  if (!fs.existsSync(dataFolderPath)) {
    fs.mkdirSync(dataFolderPath);
  }

  // Cập nhật số tin nhắn của thành viên khi tương tác trong nhóm
  if (event.type === 'message' && event.isGroup) {
    const threadID = event.threadID;
    const userID = event.senderID;
    const messageCount = getMessageCount(threadID, userID, await readData()) + 1;
    await updateMessageCount(threadID, userID, messageCount);
  }

  // Kiểm tra xem data.userInfo có tồn tại và là một mảng hay không
  if (data.userInfo && Array.isArray(data.userInfo) && data.userInfo.length > 0) {
    if (args[0] === "all") {
      let number = 0, msg = "", storage = [], exp = [];
      for (const value of data.userInfo) {
        storage.push({ "id": value.id, "name": value.name });
      }
      for (const user of storage) {
        const messageCount = getMessageCount(event.threadID, user.id, await readData());
        exp.push({ "name": user.name, "messageCount": messageCount });
      }
      exp.sort((a, b) => b.messageCount - a.messageCount);

      const itemsPerPage = 20; // Số thành viên hiển thị trên mỗi trang
      const pageCount = Math.ceil(exp.length / itemsPerPage); // Tính số trang

      // Kiểm tra nếu người dùng không nhập số trang thì hiển thị trang đầu tiên
      const page = args[1] ? parseInt(args[1]) : 1;
      if (isNaN(page) || page < 1 || page > pageCount) {
        return api.sendMessage(`Số trang không hợp lệ. Nhập từ 1 đến ${pageCount}.`, event.threadID);
      }

      const startIndex = (page - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;

      const pageData = exp.slice(startIndex, endIndex);

      for (const [index, userData] of pageData.entries()) {
        number = startIndex + index + 1;
        msg += `${number}. ${userData.name} với ${userData.messageCount} tin nhắn\n-------------\n`;
      }

      msg += `Trang ${page}/${pageCount}`;

      return api.sendMessage(msg, event.threadID);
    } else if (mention[0]) {
      let storage = [], exp = [];
      for (const value of data.userInfo) {
        storage.push({ "id": value.id, "name": value.name });
      }
      for (const user of storage) {
        const messageCount = getMessageCount(event.threadID, user.id, await readData());
        exp.push({ "name": user.name, "messageCount": messageCount, "uid": user.id });
      }
      exp.sort((a, b) => {
        if (a.messageCount !== b.messageCount) return b.messageCount - a.messageCount;
        return parseInt(a.uid) - parseInt(b.uid);
      });

      let infoUser = exp.find(info => parseInt(info.uid) === parseInt(mention[0]));
      if (infoUser) {
        return api.sendMessage(`${infoUser.name} có ${infoUser.messageCount} tin nhắn`, event.threadID);
      } else {
        return api.sendMessage("Không tìm thấy thông tin người dùng", event.threadID);
      }
    } else {
      const userID = event.senderID;
      const messageCount = getMessageCount(event.threadID, userID, await readData());
      return api.sendMessage(`Bạn có ${messageCount} tin nhắn`, event.threadID);
    }
  } else {
    // Xử lý khi không tìm thấy thông tin người dùng
    return api.sendMessage("Không tìm thấy thông tin người dùng", event.threadID);
  }
};

// Thêm sự kiện lắng nghe tin nhắn trong nhóm
module.exports.event = async function ({ event }) {
  if (event.type !== 'message') return; // Chỉ xử lý tin nhắn mới, không xử lý các sự kiện khác
  if (event.isGroup) {
    const threadID = event.threadID;
    const userID = event.senderID;
    const messageCount = getMessageCount(threadID, userID, readData()) + 1;
    updateMessageCount(threadID, userID, messageCount);
}
};
