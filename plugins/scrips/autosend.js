const schedule = require('node-schedule');

module.exports.config = {
  name: 'autosend',
  version: '1.0.0',
  hasPermssion: 2,
  credits: 'vtb',
  description: 'Tự động gửi thông báo theo thời gian',
  commandCategory: 'Tiện ích',
  cooldowns: 0
};

module.exports.handleEvent = function({ api }) {
  const job6AM = schedule.scheduleJob('0 23 * * *', function() {
    api.sendMessage('Chúc mọi người một ngày mới tốt lành', api.getCurrentUserID());
  });

  const job11AM = schedule.scheduleJob('0 4 * * *', function() {
    api.sendMessage('11h đã đến lúc nấu, ăn trưa rồi', api.getCurrentUserID());
  });

  const job12PM = schedule.scheduleJob('0 5 * * *', function() {
    api.sendMessage('12h chúc mọi người buổi trưa vui vẻ', api.getCurrentUserID());
  });

  const job1PM = schedule.scheduleJob('0 6 * * *', function() {
    api.sendMessage('13h chúc mọi người buổi chiều vui vẻ', api.getCurrentUserID());
  });

  const job5PM = schedule.scheduleJob('0 10 * * *', function() {
    api.sendMessage('17h chúc mọi người chiều tà vui vẻ', api.getCurrentUserID());
  });

  const job7PM = schedule.scheduleJob('0 12 * * *', function() {
    api.sendMessage('19h chúc mọi người buổi tối vui vẻ', api.getCurrentUserID());
  });

  const job10PM = schedule.scheduleJob('0 15 * * *', function() {
    api.sendMessage('22h chúc mọi người ngủ ngon', api.getCurrentUserID());
  });
};

module.exports.run = function({ event }) {
  this.handleEvent(event);
};
