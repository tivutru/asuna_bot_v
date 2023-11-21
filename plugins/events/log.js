module.exports.config = {
    name: "log",
    eventType: ["log:unsubscribe", "log:subscribe", "log:thread-name", "log:member-join", "log:thread-unadmin", "log:thread-leave"],
    version: "1.0.0",
    credits: "Hoàng Quân",
    description: "Ghi lại thông báo các hoạt động của bot!",
    envConfig: {
        enable: true
    }
};

module.exports.run = async function({ api, event, Threads, global }) {
    if (global[this.config.name].enable !== true) return;

    var formReport = "=== Thông báo từ Bot ===" +
        "\n» 🐸Group ID: " + event.threadID +
        "\n» 🌺Action: {task}" +
        "\n» 🐳Action Created By: " + event.author +
        "\n» 🌟log complete🌟 «",
        task = ""

    switch (event.logMessageType) {
        case "log:thread-name": {
            const oldName = (await Threads.getData(event.threadID)).name || "Tên không tồn tại",
                newName = event.logMessageData.name || "Tên không tồn tại";
            task = "Người dùng thay đổi tên nhóm từ: '" + oldName + "' thành '" + newName + "'";
            await Threads.setData(event.threadID, { name: newName });
            break;
        }
        case "log:subscribe": {
            if (event.logMessageData.addedParticipants.some(i => i.userFbId == api.getCurrentUserID())) {
                task = "Người dùng đã thêm bot vào một nhóm mới!";
            }
            break;
        }
        case "log:unsubscribe": {
            if (event.logMessageData.leftParticipantFbId == api.getCurrentUserID()) {
                task = "Người dùng đã kick bot ra khỏi nhóm!";
            }
            break;
        }
        case "log:member-join": {
            const addedMemberId = event.logMessageData.addedParticipants[0].userFbId;
              getUserInfo(addedMemberId)
              .then((userInfo) => {
                const addedMemberName = userInfo.name; 
                task = `Người dùng đã thêm thành viên có tên: ${addedMemberName} vào nhóm.`;
              })
            break;
          }
          
        case "log:thread-leave": {
            if (event.logMessageData.leftParticipantFbId == api.getCurrentUserID()) {
                task = "Người dùng đã tự rời khỏi nhóm.";
            } else {
                const leftUserId = event.logMessageData.leftParticipantFbId;
                task = `Người dùng có ID: ${leftUserId} đã rời khỏi nhóm.`;
            }
            break;
        }
        case "log:thread-unadmin": {
            if (event.logMessageData.unadminedParticipantFbId == api.getCurrentUserID()) {
                task = "Bot đã bị mất quyền quản trị viên trong nhóm!";
            } else {
                const unadminUserId = event.logMessageData.unadminedParticipantFbId;
                task = `Người dùng có ID: ${unadminUserId} đã bị mất quyền quản trị viên trong nhóm.`;
            }
            break;
        }
        default:
            break;
    }

    formReport = formReport.replace(/\{task}/g, task);

    // Gửi thông báo dù có hoạt động ghi lại hay không
    api.sendMessage(formReport, global.config.ADMINBOT[0], (error, info) => {
        if (error) console.log("[ Logging Event ]", formReport);
    });
}