const config = require("../../config.json");
let
r = require('request').get,
api = 'https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=vi&dt=t&q=';

class Module {
constructor(a) {
this.config = a;
};
run() {};
event(o) {
let
a = o.event.body;

if (!a || o.api.getCurrentUserID() == o.event.senderID || a.startsWith(config.PREFIX))return; else r(api+encodeURI(a)).then(s=>s.data[2] != 'vi'?o.api.sendMessage(s.data[0].map(el=>el[0]).join(''), o.event.threadID, o.event.messageID): '').catch(console.log);
};
};

module.exports = new Module({
name: 'autotrans',
version: '1.1',
hasPermssion: 1,
credits: 'burh',
description: 'autotrans',
commandCategory: 'trans',
usages: '',
cooldowns: 0,
});