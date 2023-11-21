// Khai báo các modules cần thiết
const os = require("os");
const osUtils = require("os-utils");
const fast = require('fast-speedtest-api');
const speedTest = new fast({
  token: "YXNkZmFzZGxmbnNkYWZoYXNkZmhrYWxm",
  verbose: false,
  timeout: 10000,
  https: true,
  urlCount: 5,
  bufferSize: 8,
  unit: fast.UNITS.Mbps
});
const facebookAsunaApi = require("project-api");

// Hàm lấy thời gian hiện tại ở múi giờ "Asia/Ho_Chi_Minh"
function getTime() {
  const timeVN = new Date().toLocaleString("en-US", {
    timeZone: "Asia/Ho_Chi_Minh"
  });
  return timeVN;
}

// Hàm lấy thông tin RAM
function getRAM() {
  const totalRAM = os.totalmem() / 1024 / 1024; // Đổi từ byte sang MB
  const freeRAM = os.freemem() / 1024 / 1024; // Đổi từ byte sang MB
  const usedRAM = totalRAM - freeRAM;
  return {
    total: totalRAM.toFixed(2),
    used: usedRAM.toFixed(2),
    free: freeRAM.toFixed(2)
  };
}

// Xuất các hàm và thông tin cấu hình của module
module.exports = {
  config: {
    name: "upv2",
    version: "1.0.0",
    hasPermssion: 0,
    description: "Xem thông tin thời gian, RAM, số người dùng, ping và CPU",
    commandCategory: "Khác",
    usages: "!upv2",
    cooldowns: 5
  },
  getTime: getTime,
  getRAM: getRAM
};

function getNumUsers(api) {
  return new Promise((resolve, reject) => {
    api.getThreadInfo(api.getCurrentUserID(), (err, info) => {
      if (err) return reject(err);
      resolve(info.participantIDs.length);
    });
  });
}

function getPing() {
  return new Promise((resolve) => {
    speedTest.getSpeed().then(speeds => {
      resolve(speeds.ping.toFixed(2));
    }).catch(error => {
      console.log("Error getting ping:", error);
      resolve(null);
    });
  });
}

function getCPUUsage() {
  return new Promise((resolve) => {
    osUtils.cpuUsage((usage) => {
      resolve(usage * 100);
    });
  });
}

module.exports.run = async ({ api, event }) => {
  const [time, ram, numUsers, ping, cpuUsage] = await Promise.all([
    getTime(),
    getRAM(),
    getNumUsers(api),
    getPing(),
    getCPUUsage()
  ]);

  let response = "Thông tin:\n";
  response += `Thời gian tại Việt Nam: ${time}\n`;
  response += `Tổng RAM: ${ram.total} MB\n`;
  response += `RAM đã sử dụng: ${ram.used} MB\n`;
  response += `RAM còn trống: ${ram.free} MB\n`;
  response += `Số người dùng trong nhóm: ${numUsers}\n`;

  if (ping !== null) {
    response += `Ping: ${ping} ms\n`;
  } else {
    response += "Không thể lấy thông tin ping.\n";
  }

  response += `CPU Usage: ${cpuUsage.toFixed(2)}%`;

  api.sendMessage(response, event.threadID);
};