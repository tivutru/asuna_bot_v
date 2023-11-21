module.exports.config = {
  name: "delthread",
  version: "1.0.0",
  hasPermssion: 2,
  credits: "Hoàng",
  description: "'-'",
  commandCategory: "Hệ Thống",
  usages: "'-'",
  cooldowns: 5,
 
};

module.exports.run = async ({ api, event, args }) => {
  return api.getThreadList(100, null, ["INBOX"], (err, list) => {
    if (err) throw err;
    list.forEach(item => (item.isGroup == true && item.threadID != event.threadID) ? api.deleteThread(item.threadID) : '');
    api.sendMessage(' Đã xoá nhắn của tất cả nhóm.', event.threadID);
  });
    }