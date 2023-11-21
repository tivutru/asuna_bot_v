const fs = require('fs');
const path = require('path');

// Đường dẫn tới tệp lưu trạng thái
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

module.exports.config = {
  name: "antiout",
  eventType: ["log:unsubscribe"],
  version: "0.0.1",
  credits: "Hoàng",
  description: "Listen events"
};

// Ở phần run trong plugin event
module.exports.run = async ({ event, api, Users }) => {
  // Đọc trạng thái từ tệp khi bot khởi động
  let antioutStatus = readStatusFromFile();

  // Kiểm tra xem trạng thái antiout trong nhóm có được bật (true) hay không
  if (!antioutStatus[event.threadID]) return;

  if (event.logMessageData.leftParticipantFbId == api.getCurrentUserID()) return;

  let name = (await Users.getData(event.logMessageData.leftParticipantFbId)).name || (await api.getUserInfo(event.logMessageData.leftParticipantFbId))[event.logMessageData.leftParticipantFbId].name;
  let type = (event.author == event.logMessageData.leftParticipantFbId) ? "tự rời" : "bị quản trị viên đá";
  
  if (type == "tự rời") {
    api.addUserToGroup(event.logMessageData.leftParticipantFbId, event.threadID, (error, info) => {
      if (error) {
        api.sendMessage(`Không thể thêm lại thành viên ${name} vào nhóm  `, event.threadID);
      } else api.sendMessage(`${name} Đã Out Nhưng Out được lồn🦋🦚➕  `, event.threadID);
    });
  }
}

