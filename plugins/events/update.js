module.exports.config = {
    name: "update",
    eventType: ["log:thread-admins", "log:user-nickname", "log:thread-name"],
    version: "1.0.1",
    credits: "Asuna Team",
    description: "Update group information quickly.",
};

module.exports.run = async function ({ event, api, Threads, Users }) {
    const { threadID, logMessageType, logMessageData, author } = event;
    const { setData, getData } = Threads;

    try {
        let dataThread = (await getData(threadID)).threadInfo;

        switch (logMessageType) {
            case "log:thread-admins": {
                if (dataThread && dataThread.adminIDs) {
                    if (logMessageData?.ADMIN_EVENT === "add_admin") {
                        dataThread.adminIDs.push({ id: logMessageData.TARGET_ID });
                        const targetUser = await Users.getNameUser(logMessageData.TARGET_ID);
                        api.sendMessage(`» [ GROUP UPDATE ]\n» Added user [ ${targetUser} ] as an administrator.`, threadID);
                    } else if (logMessageData?.ADMIN_EVENT === "remove_admin") {
                        dataThread.adminIDs = dataThread.adminIDs.filter(item => item.id != logMessageData.TARGET_ID);
                        const targetUser = await Users.getNameUser(logMessageData.TARGET_ID);
                        api.sendMessage(`» [ GROUP UPDATE ]\n» Removed administrator of ${targetUser}.`, threadID);
                    }
                } else {
                    api.sendMessage("» [ GROUP UPDATE ]\n» Error occurred while updating group administrators.", threadID);
                }
                break;
            }
            

            case "log:user-nickname": {
                if (logMessageData && logMessageData.nickname !== undefined) {
                    dataThread.nicknames[logMessageData.participant_id] = logMessageData.nickname;
                    const participantName = await Users.getNameUser(logMessageData.participant_id);
                    const nicknameMessage = (logMessageData.nickname?.length === 0) ?
                        `Removed nickname of ${participantName}` :
                        `Updated nickname of ${participantName} to: ${logMessageData.nickname}`;
                    api.sendMessage(`» [ GROUP UPDATE ]\n» ${nicknameMessage}.`, threadID);
                }
                break;
            }
            

            case "log:thread-name": {
                dataThread.threadName = logMessageData?.name || null;
                const threadNameMessage = (dataThread.threadName) ?
                    `Updated group name to: ${dataThread.threadName}` :
                    'Group name has been removed';
                api.sendMessage(`» [ GROUP UPDATE ]\n» ${threadNameMessage}.`, threadID);
                break;
            }
        }

        await setData(threadID, { threadInfo: dataThread });
    } catch (e) {
        console.log(e);
    }
};


