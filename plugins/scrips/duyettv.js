
 module.exports.config = {
  name: "duyettv",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "hoàng",
  description: "Duyệt Thành Viên Trong Danh Sách Phê Duyệt Box",
  commandCategory: "Box Chat",
  usages: "",
  cooldowns: 0
}, module.exports.run = async function({
  args: e,
  event: a,
  api: s,
  Users: n,
  Threads: r,
  client
}) {
  var {
    userInfo: t,
    adminIDs: o
  } = await s.getThreadInfo(a.threadID);
  if (o = o.map((e => e.id)).some((e => e == s.getCurrentUserID()))) {
    const e = await s.getThreadInfo(a.threadID);
    let r = e.approvalQueue.length;
    var u = "";
    for (let a = 0; a < r; a++) {
      u += `[${a+1}].${await n.getNameUser(e.approvalQueue[a].requesterID)} - ${e.approvalQueue[a].requesterID}\n\n`
    }
    u += "Rep tin nhắn này kèm thành viên mà bạn duyệt", s.sendMessage(`====『 𝐑𝐄𝐐𝐔𝐄𝐒𝐓 』 ====\n\n${u}`, a.threadID, ((e, s) => client.handleReply.push({
      name: this.config.name,
      author: a.senderID,
      messageID: s.messageID,
      type: "reply"
    })))
  } else s.sendMessage("Hãy Cho Bot Làm Qtv", a.threadID)
}, module.exports.handleReply = async function({
  api: e,
  args: a,
  Users: s,
  handleReply: n,
  event: r,
  Threads: t
}) {
  const {
    threadID: o,
    messageID: u
  } = r;
  if ("reply" === n.type) {
    let a = (await e.getThreadInfo(r.threadID)).approvalQueue[parseInt(r.body - 1)].requesterID;
    e.addUserToGroup(a, o), e.sendMessage(`Thêm thành công`, o, (() => e.unsendMessage(n.messageID)))
  }
};