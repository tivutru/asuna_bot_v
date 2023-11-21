module.exports.config = {
    name: "admin",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "Hoàng & Quân",
    description: "Quản lý admin bot[list/add/remove] [args]",
    commandCategory: "system",
    usages: "admin [list/add/remove] [args]",
    cooldowns: 5,
  info: [
        {
            key: 'Text',
            type: 'Văn Bản',
            example: 'admin',
      code_by: `Code By Gia Quân`
        }
    ]
};
// load data //
module.exports.onLoad = function() {
    const { writeFileSync, existsSync } = require('fs-extra');
    const { resolve } = require("path");
    const path = resolve(__dirname, 'cache', 'data.json');
    if (!existsSync(path)) {
        const obj = {
            adminbox: {}
        };
        writeFileSync(path, JSON.stringify(obj, null, 4));
    } else {
        const data = require(path);
        if (!data.hasOwnProperty('adminbox')) data.adminbox = {};
        writeFileSync(path, JSON.stringify(data, null, 4));
    }
}

module.exports.run = async ({ api, event, global, args, permssion, utils, client, Users }) => {
    const content = args.slice(1, args.length);
    const option = args[0];
    const { writeFileSync } = require("fs-extra");
    delete require.cache[require.resolve(client.dirConfig)];
    var config = require(client.dirConfig);

    if (option == "only") {
        if (permssion < 2) return api.sendMessage("[ 𝗠𝗢𝗗𝗘 ] → Làm gì đấy bạn ơi", threadID, messageID);
        
        if (config.adminOnly == false) {
          config.adminOnly = true;
          api.sendMessage("» Bật thành công admin only", event.threadID, event.messageID);
        } else {
          config.adminOnly = false;
          api.sendMessage("» Tắt thành công admin only", event.threadID, event.messageID);
        }
          writeFileSync(client.dirConfig, JSON.stringify(config, null, 4), 'utf8');

        }
   
    else if (option == "list") {
        const listAdmin = global.config.ADMINBOT;
        var msg = [];
        for (const id of listAdmin) {
            if (parseInt(id)) {
                const name = await Users.getNameUser(id);
                msg.push(`- ${name} - https://facebook.com/${id}`);
            }
        }

        return api.sendMessage(`[Admin] Danh sách toàn bộ admin bot: \n${msg.join("\n")}`, event.threadID, event.messageID);
    }

    else if (option == "add" && permssion == 2) {
        if (event.type == "message_reply") {
            global.config.ADMINBOT.push(event.messageReply.senderID);
            config.ADMINBOT.push(event.messageReply.senderID);
            const name = (await Users.getData(event.messageReply.senderID)).name || "Người dùng facebook";
            writeFileSync(client.dirConfig , JSON.stringify(config, null, 4), 'utf8');
            return api.sendMessage(`[Admin] Đã thêm người dùng vào admin bot:\n+ [ ${event.messageReply.senderID} ] » ${name}`, event.threadID, event.messageID);
        }
        else if (Object.keys(event.mentions).length !== 0) {
            var listAdd = [];
            const mention = Object.keys(event.mentions);
            for (const id of mention) {
                global.config.ADMINBOT.push(id);
                config.ADMINBOT.push(id);
                listAdd.push(`+ [ ${id} ] » ${event.mentions[id]}`);
            }
            writeFileSync(client.dirConfig , JSON.stringify(config, null, 4), 'utf8');
            return api.sendMessage(`[Admin] Đã thêm người dùng vào admin bot:\n${listAdd.join("\n").replace(/\@/g, "")}`, event.threadID, event.messageID);
        }
        else if (content.length != 0 && !isNaN(content)) {
            global.config.ADMINBOT.push(content);
            config.ADMINBOT.push(content);
            const name = (await Users.getData(content)).name || "Người dùng facebook";
            writeFileSync(client.dirConfig , JSON.stringify(config, null, 4), 'utf8');
            return api.sendMessage(`[Admin] Đã thêm người dùng vào admin bot:\n+ [ ${content} ] » ${name}`, event.threadID, event.messageID);
        }
        else return utils.throwError(this.config.name, event.threadID, event.messageID);
    }

    else if (option == "remove" && permssion == 2) {
        if (event.type == "message_reply") {
            const index = config.ADMINBOT.findIndex(item => item == event.messageReply.senderID);
            if (index == -1) return api.sendMessage(`[Admin] Người dùng mang id ${event.messageReply.senderID} không tồn tại trong admin bot!`, event.threadID, event.messageID);
            global.config.ADMINBOT.splice(index, 1);
            config.ADMINBOT.splice(index, 1);
            const name = (await Users.getData(event.messageReply.senderID)).name || "Người dùng facebook";
            writeFileSync(client.dirConfig , JSON.stringify(config, null, 4), 'utf8');
            return api.sendMessage(`[Admin] Đã xóa người dùng khỏi admin bot:\n- [ ${event.messageReply.senderID} ] » ${name}`, event.threadID, event.messageID);
        }
        else if (event.mentions.length != 0) {
            var listAdd = [];
            const mention = Object.keys(event.mentions);
            for (const id of mention) {
                const index = config.ADMINBOT.findIndex(item => item == id);
                if (index == -1) return api.sendMessage(`[Admin] Người dùng mang id ${id} không tồn tại trong admin bot!`, event.threadID, event.messageID);
                global.config.ADMINBOT.splice(index, 1);
                config.ADMINBOT.splice(index, 1);
                listAdd.push(`- [ ${id} ] » ${event.mentions[id]}`);
            }
            writeFileSync(client.dirConfig , JSON.stringify(config, null, 4), 'utf8');
            return api.sendMessage(`[Admin] Đã xóa người dùng khỏi admin bot:\n${listAdd.join("\n").replace(/\@/g, "")}`, event.threadID, event.messageID);
        }
        else if (!isNaN(content)) {
            const index = config.ADMINBOT.findIndex(item => item == event.messageReply.senderID);
            if (index == -1) return api.sendMessage(`[Admin] Người dùng mang id ${content} không tồn tại trong admin bot!`, event.threadID, event.messageID);
            global.config.ADMINBOT.splice(index, 1);
            config.ADMINBOT.splice(index, 1);
            const name = (await Users.getData(content)).name || "Người dùng facebook";
            writeFileSync(client.dirConfig , JSON.stringify(config, null, 4), 'utf8');
            return api.sendMessage(`[Admin] Đã xóa người dùng khỏi admin bot:\n- [ ${content} ] » ${name}`, event.threadID, event.messageID);
        }
        else return utils.throwError(this.config.name, event.threadID, event.messageID);
    }

    else return utils.throwError(this.config.name, event.threadID, event.messageID);
}