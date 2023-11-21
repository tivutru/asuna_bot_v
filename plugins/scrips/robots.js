const os = require('os');
const moment = require('moment-timezone');
const axios = require('axios');
const fs = require('fs-extra');
const path = require('path');

let botStartTime = moment(); // Thời gian bắt đầu hoạt động của bot

module.exports.config = {
  name: "robots",
  version: "1.0.2", // Cập nhật phiên bản
  hasPermssion: 0,
  credits: "vtb",
  description: "Hiển thị thông tin hệ thống và gửi video wibu ngẫu nhiên từ API",
  commandCategory: "Economy",
  usages: "/robots",
  cooldowns: 30,
  dependencies: ["axios", "fs-extra"],
  info: []
};

module.exports.run = async ({ api, event }) => {
  api.sendMessage("Đang lấy dữ liệu từ BOT", event.threadID);

  try {
    // Lấy thông tin RAM
    const totalRAM = (os.totalmem() / (1024 * 1024 * 1024)).toFixed(2);
    const usedRAM = ((os.totalmem() - os.freemem()) / (1024 * 1024 * 1024)).toFixed(2);
    const freeRAM = (os.freemem() / (1024 * 1024 * 1024)).toFixed(2);

    // Lấy số người dùng trong nhóm
    const numUsers = (await api.getThreadInfo(event.threadID)).participantIDs.length;

    // Tính thời gian hoạt động của bot
    const uptimeDuration = moment.duration(moment().diff(botStartTime));
    const uptimeString = `${uptimeDuration.days()} ngày ${uptimeDuration.hours()} giờ ${uptimeDuration.minutes()} phút ${uptimeDuration.seconds()} giây`;

    // Hiển thị thông tin hệ thống
    let systemInfoMessage = "⚙Thông tin hệ thống:\n";
    systemInfoMessage += `⏰Thời gian: ${moment().tz("Asia/Ho_Chi_Minh").format("DD-MM-YYYY HH:mm:ss")}\n`;
    systemInfoMessage += `⏲Thời gian hoạt động của bot: ${uptimeString}\n`;
    systemInfoMessage += `💽Tổng RAM: ${totalRAM} GB\n`;
    systemInfoMessage += `💾RAM đã sử dụng: ${usedRAM} GB\n`;
    systemInfoMessage += `💿RAM còn trống: ${freeRAM} GB\n`;
    systemInfoMessage += `🖥CPU: ${os.cpus()[0].model} ${os.cpus().length} cores\n`;
    systemInfoMessage += `👥Số người dùng trong nhóm: ${numUsers}\n`;

    // Lấy dữ liệu từ file config
    const config = require("../../config.json");
    systemInfoMessage += `🔧Prefix: ${config['PREFIX']}\n`;
    systemInfoMessage += `👑Admin bot:\n${config['ADMINBOT'].map(id => `https://facebook.com/${id}`).join('\n')}\n`;

    // Gửi thông tin hệ thống và video
    const response = await axios.get('https://api-bot.tamtrinh3.repl.co/images/uptime');
    const { url } = response.data;

    const videoResponse = await axios.get(url, { responseType: 'arraybuffer' });
    const videoPath = path.join(__dirname, "/cache/video.mp4");
    fs.writeFileSync(videoPath, Buffer.from(videoResponse.data, "binary"));

    api.sendMessage(
      {
        body: systemInfoMessage,
        attachment: fs.createReadStream(videoPath)
      },
      event.threadID
    );
  } catch (error) {
    console.error(error);
    api.sendMessage("Đã xảy ra lỗi khi lấy thông tin từ API hoặc xử lý.", event.threadID);
  }
};