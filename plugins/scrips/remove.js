const { promisify } = require('util');
const sleep = promisify(setTimeout);

module.exports.config = {
  name: "remove",
  version: "1.0.4",
  hasPermssion: 0,
  credits: "Hoàng Quân",
  description: "remove",
  commandCategory: "Không cần dấu lệnh",
  usages: "noprefix",
  cooldowns: 5,
  info: [
    {
      key: 'Text',
      type: 'Văn Bản',
      example: 'remover',
      code_by: `Code By Hoàng Quân`
    }
  ]
};

module.exports.event = async function({ event, api, Users }) {
  const { threadID, senderID, body } = event;
  const nameUser = (await Users.getData(senderID)).name || (await Users.getInfo(senderID)).name;

  // Phản hồi tin nhắn chào hỏi
  const greetings = ["hi", "hello", "hii", "hai", "chào"];
  if (typeof body === 'string' && greetings.some(greeting => body.toLowerCase().includes(greeting))) {
    api.sendMessage({
      body: `🌈Chào bạn ${nameUser} chúc bạn một ngày vui vẻ nhé 😉❤️`,
      mentions: [{ tag: nameUser, id: senderID }]
    }, threadID);

    // Đá người dùng ra khỏi nhóm (chỉ đối với nhóm)
    const isGroup = threadID.includes('-');
    if (isGroup) {
      try {
        await sleep(1000); // Dùng sleep trong 1 giây để tránh bot bị giới hạn tốc độ
        api.removeUserFromGroup(senderID, threadID);
      } catch (err) {
        console.error(err);
      }
    }
  }
};

module.exports.run = async ({ event, api, Currencies, args, utils }) => {
  api.sendMessage("dùng cái đầu buồi địt mẹ mày", event.threadID);
};


