const fs = require("fs-extra");
const config = require("../../config.json");
 const axios = require("axios")
module.exports.config = {
  name: "backup",
  version: "1.0.5",
  hasPermssion: 0,
  credits: "credits tùy ",
  description: "auto get ản dùng đi ",
  commandCategory: "Group",
  usages: "auto",
  cooldowns: 1,
  dependencies: ["axios", "fs-extra"]
};
module.exports.onLoad = () => {
   if(!config["data"]) config["data"] = {
  enable: true,
  TIDCollect: [],               ////////////// xóa di thì bố ạ mày luôn////////////////
  TIDSend: [],
  type: "photo"
        };
   } 
 
module.exports.handleReply = async function({ api, args, Users, handleReply, event, Threads, client }) {
 
    if (event.senderID != handleReply.author) return;
 
 switch (handleReply.type) {
            case "buttons":
                switch (event.body) {
            case "1":
           api.sendMessage("1.Thêm box thu thập ảnh\n2.Xóa box thu thập ảnh\n3.Xem danh sách box thu thập ảnh",event.threadID,(error, info) => {
                client.handleReply.push({
                    name: this.config.name,
                    messageID: info.messageID,
                    author: event.senderID,
                    type: 'tidCollect'
                });
            },
            event.messageID
        );
         break;
         case "2":
           api.sendMessage("1.Thêm box nhận ảnh\n2.Xóa box nhận ảnh\n3.Xem danh sách box nhận ảnh",event.threadID,(error, info) => {
                client.handleReply.push({
                    name: this.config.name,
                    messageID: info.messageID,
                    author: event.senderID,
                    type: 'tidSend'
                });
            },
            event.messageID
        );
 
        break;
        case "3":
 
  api.sendMessage(`Trạng thái ${config["data"]["enable"] == true ? "bật" : "tắt"} chức năng tự động thu thập ảnh\n Loại Ảnh: ${config["data"]["type"]}`,event.threadID,event.messageID);
     break;
                    default:
                    api.sendMessage(`Sai Số`,event.threadID,event.messageID);
                }
                break;
                case "tidCollect":
                 switch (event.body) {
                    case "1":
                        var inbox = await api.getThreadList(100, null, ['INBOX']);
                        let list = [...inbox].filter(group => group.isSubscribed && group.isGroup); // Lọc box
                        var arr = [],
                            msg = ``;
                        list.forEach(group => {
                            arr.push({
                                title: group.name,
                                payload: group.threadID
                            });
                        });
                        arr.map((e, i) => msg += `${i + 1}. ${e.title} (${e.payload})\n`);
                        api.sendMessage(msg + "Reply số thứ tự box muốn thêm!",event.threadID,(error, info) => {
                client.handleReply.push({
                    name: this.config.name,
                    messageID: info.messageID,
                    author: event.senderID,
                    type: 'tidCollectAdd',
                    allTID: arr
                });
            },
            event.messageID
        );   
         break;
         case "2":
         api.sendMessage(`${config.data.TIDCollect.join("\n")}` + "\nReply số thứ tự box muốn xóa",event.threadID,(error, info) => {
                client.handleReply.push({
                    name: this.config.name,
                    messageID: info.messageID,
                    author: event.senderID,
                    type: 'tidCollectDelete'
                });
            },
            event.messageID
        );           
  break;
                    case "3":
                    api.sendMessage( config.data.TIDCollect.length ? `${config.data.TIDCollect.join("\n")}` : "Không Có Box");
                     break;
                    default:
                    api.sendMessage(`Lựa chọn không hợp lệ!`,event.threadID,event.messageID);
                }
                  break;
            case "tidCollectAdd":
                if (isNaN(event.body) || event.body > handleReply.allTID.length) return api.sendMessage(`Lựa chọn không hợp lệ!`,event.threadID,event.messageID);
                if (config.data.TIDCollect.includes(handleReply.allTID[event.body - 1].payload)) return api.sendMessage("Box đã tồn tại!",event.threadID,event.messageID);
                 config.data.TIDCollect.push(handleReply.allTID[event.body - 1].payload);
               fs.writeFileSync("./config.json", JSON.stringify(config, null, 4));
 
               api.sendMessage(`Đã thêm box ${handleReply.allTID[event.body - 1].title}!`,event.threadID,event.messageID);
                break;
            case "tidCollectDelete":
               var allTID = config.data.TIDCollect,
                    idDelete = allTID[event.body - 1];
                     if (isNaN(event.body) || event.body > allTID.length) return api.sendMessage("Lựa chọn không hợp lệ!",event.threadID,event.messageID);
                config.data.TIDCollect.splice(event.body - 1, 1);
                 fs.writeFileSync("./config.json", JSON.stringify(config, null, 4));
               api.sendMessage(`Đã xóa box ${idDelete}!`,event.threadID,event.messageID);
                break;
 
 
 case "tidSend":
                switch (event.body) {
                    case "1":
                api.sendMessage("Nhập ID box muốn thêm",event.threadID,(error, info) => {
                client.handleReply.push({
                    name: this.config.name,
                    messageID: info.messageID,
                    author: event.senderID,
                    type: 'tidSendAdd',
                     tidSend: event.body
                });
            },
            event.messageID
        );         
 
  break;
                    case "2":
                        var allIDSend = config.data.TIDSend;
                        allIDSend.map((e, i) => msg += `${i + 1}. ${e} \n`);
 
       api.sendMessage(msg + "Reply số thứ tự box muốn xóa!",event.threadID,(error, info) => {
                  client.handleReply.push({
                    name: this.config.name,
                    messageID: info.messageID,
                    author: event.senderID,
                    type: 'tidSendDelete',
                     allIDSend: allIDSend
                });
            },
            event.messageID
        );         
  break;
                    case "3":
                       api.sendMessage( config.data.TIDSend.length ? `${config.data.TIDSend.join("\n")}` : "Không có box nào!",event.threadID,event.messageID);
                        break;
                    default:
                       api.sendMessage("Lựa chọn không hợp lệ!",event.threadID,event.messageID);
                }
                break;
 case "tidSendAdd":
                if (isNaN(event.body)) return api.sendMessage("ID không hợp lệ!",event.threadID,event.messageID);
                if (config.data.TIDSend.includes(event.body)) return api.sendMessage("Box đã tồn tại!",event.threadID,event.messageID);
                config.data.TIDSend.push(event.body);
                fs.writeFileSync("./config.json", JSON.stringify(config, null, 4));
                api.sendMessage(`Đã thêm box ${event.body}!`,event.threadID,event.messageID);
                break;
            case "tidSendDelete":
                var allIDSend = config.data.TIDSend;
                if (isNaN(event.body) || event.body > allIDSend.length) return api.sendMessage("Lựa chọn không hợp lệ!",event.threadID,event.messageID);
                config.data.TIDSend.splice(event.body - 1, 1);
                fs.writeFileSync("./config.json", JSON.stringify(config, null, 4));
                api.sendMessage(`Thành công!`,event.threadID,event.messageID);
                break;
        }
    };
 
 
module.exports.event = async ({ api, event, args, Users,__GLOBAL,client }) => {
 
  if (config.data.enable && config.data.TIDCollect.includes(event.threadID) && event.type == "message" && event.attachments.length > 0 && event.senderID != api.getCurrentUserID() && config.data.TIDSend.length > 0) {
            var IDAttachment = new Object(),
                getArrayBuffer = [];
            event.attachments.forEach(attachment => attachment.type == config.data.type ? IDAttachment[attachment["ID"]] = attachment.url : "");
            if (Object.keys(IDAttachment).length > 0) {
                for (const [id, url] of Object.entries(IDAttachment)) {
                    axios.get(url, {
                        responseType: 'arraybuffer'
}).then(async res => {
                        var path = __dirname + `/cache/download/${id}.png`;
                        fs.writeFileSync(path, Buffer.from(res.data, 'binary'));
                        getArrayBuffer.push(fs.createReadStream(path));
 if (getArrayBuffer.length == Object.keys(IDAttachment).length) {
                            config.data.TIDSend.forEach(async e => {
                                await api.sendMessage({
                                    body: `Từ Thread: ${event.threadID} \n${event.body}`,
                                    attachment: getArrayBuffer
                                }, e);
                            });
                        }
 
 }).catch(err => console.log(err));
                }
            }
 
    }
};
 
module.exports.run = async ({ api, event, args,client }) => {
 
 if (!args[0]) {
            config.data.enable = !config.data.enable ? true : false;
            fs.writeFileSync("./config.json", JSON.stringify(config, null, 4));
            return api.sendMessage(`Đã ${config.data.enable ? "bật" : "tắt"} chế độ tự động thu thập ảnh!`,event.threadID,event.messageID);
        }
     api.sendMessage("1.Quản lý box thu thập ảnh!\n2.Quản lý box nhận ảnh\n3.Xem trạng thái",event.threadID,(error, info) => {
                client.handleReply.push({
                    name: this.config.name,
                    messageID: info.messageID,
                    author: event.senderID,
                    type: 'buttons'
                });
            },
           event.messageID
        );
}