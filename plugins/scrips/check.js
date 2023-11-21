const fs = require('fs');
const path = __dirname + '/../../strick/';
const groupFilePath = path + 'group.json';

const countMess = {};
let dailyRanking = {};
let groupData = {}; // Biến lưu trữ tạm thời dữ liệu nhóm, ban đầu để trống (empty object)

const eventMutex = {}; // Mutex để giữ cho các event không bị nhảy tin nhắn

module.exports.config = {
    name: "check",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "Hoàng Quân",
    description: "check tương tác",
    commandCategory: "Tiện ích",
    usages: "checktt",
    cooldowns: 5,
    dependencies: ["fs-extra"]
};

// Hàm load dữ liệu nhóm
const loadGroupData = () => {
    groupData = JSON.parse(fs.readFileSync(groupFilePath, 'utf-8')) || {};
    Object.keys(groupData).forEach(threadID => {
        countMess[threadID] = Object.values(groupData[threadID]).reduce((total, count) => total + count, 0);
    });
};

module.exports.onLoad = async function () {
    if (!fs.existsSync(path) || !fs.statSync(path).isDirectory()) {
        fs.mkdirSync(path, { recursive: true });
    }

    if (!fs.existsSync(groupFilePath) || fs.statSync(groupFilePath).isDirectory()) {
        fs.writeFileSync(groupFilePath, JSON.stringify({}, null, 4));
    }

    const dailyRankingFilePath = path + 'dailyRanking.json';
    if (fs.existsSync(dailyRankingFilePath)) {
        dailyRanking = JSON.parse(fs.readFileSync(dailyRankingFilePath, 'utf-8'));
    }

    // Khởi tạo groupData là một object trống thay vì null
    groupData = {};

    // Load dữ liệu nhóm khi khởi động module
    loadGroupData();
};

module.exports.event = async function ({ event, api, client }) {
    const { threadID, senderID } = event;
    if (!client.allThread.some(tid => tid == threadID)) return;

    if (!groupData.hasOwnProperty(threadID)) {
        groupData[threadID] = {};
    }

    if (!eventMutex[threadID]) eventMutex[threadID] = true; // Lock event
    else return; // If event is already being processed, skip

    groupData[threadID][senderID] = (groupData[threadID][senderID] || 0) + 1;

    await fs.promises.writeFile(groupFilePath, JSON.stringify(groupData, null, 4));

    if (senderID === api.getCurrentUserID()) {
        countMess[threadID] = (countMess[threadID] || 0) + 1;
    }

    eventMutex[threadID] = false; // Unlock event
};

module.exports.run = async function ({ api, event, args, Users }) {
    const { threadID, senderID, mentions } = event;
    const query = args[0] ? args[0].toLowerCase() : '';

    // Function to load group data
    const loadGroupData = () => {
        groupData = JSON.parse(fs.readFileSync(groupFilePath, 'utf-8')) || {};
        Object.keys(groupData).forEach(threadID => {
            countMess[threadID] = Object.values(groupData[threadID]).reduce((total, count) => total + count, 0);
        });
    };

    const handleUserTag = async (userID) => {
        if (groupData === null) {
            loadGroupData();
        }

        const userData = groupData[threadID][userID];
        if (userData === undefined) {
            return 'Người dùng không tồn tại trong nhóm!';
        } else {
            const userInfo = await Users.getInfo(userID);
            return `${userID == senderID ? '💠Bạn' : userInfo.name} có ${userData} tin nhắn trong nhóm`;
        }
    };

    const handleAllTag = async () => {
        if (groupData === null) {
            loadGroupData();
        }

        const allThread = await api.getThreadInfo(threadID) || { participantIDs: [] };
        const storage = [];
        for (const id of allThread.participantIDs) {
            if (!groupData[threadID].hasOwnProperty(id)) {
                groupData[threadID][id] = 0;
            }
            const userInfo = await Users.getInfo(id);
            storage.push({ id, name: userInfo.name, count: groupData[threadID][id] });
        }

        storage.sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));

        const itemsPerPage = 10;
        const totalPages = Math.ceil(storage.length / itemsPerPage);
        const page = parseInt(args[1]) || 1;

        let count = (page - 1) * itemsPerPage + 1;
        let msg = '===CHECK ALL===\n';
        for (let i = (page - 1) * itemsPerPage; i < page * itemsPerPage && i < storage.length; i++) {
            const user = storage[i];
            msg += `${count++}. ${user.name} - ${user.count} tin nhắn\n============\n`;
        }
        msg += `Trang ${page}/${totalPages}`;
        return msg;
    };

    const handleXepHangTag = async () => {
        if (groupData === null) {
            loadGroupData();
        }

        const mem = Object.keys(groupData[threadID]);
        const rank = [];
        for (const id of mem) {
            rank.push({
                id: id,
                count: groupData[threadID][id],
                name: (await Users.getInfo(id)).name
            });
        }

        rank.push({
            id: api.getCurrentUserID(),
            count: countMess[threadID] || 0,
            name: "💠Bot"
        });

        rank.sort((a, b) => b.count - a.count);

        let msg = '===XẾP HẠNG===\n';
        const maxShow = Math.min(rank.length, 10);
        for (let i = 0; i < maxShow; i++) {
            msg += `${i + 1}. ${rank[i].name}: ${rank[i].count} tin nhắn\n`;
        }

        return msg;
    };
    const handleOtherTag = () => {
        // Handle other tags if needed
        return 'Bạn có thể dùng:\n/check user\n/check all\n/check xephang\nBạn muốn sử dụng tag nào?';
    };

    // Process the different tags
    let msg = '';
    switch (query) {
        case 'user':
            const userID = mentions.length > 0 ? mentions[0] : senderID;
            msg = await handleUserTag(userID);
            break;
        case 'all':
            msg = await handleAllTag();
            break;
        case 'xephang':
            msg = await handleXepHangTag();
            break;
        default:
            msg = handleOtherTag();
            break;
    }

    api.sendMessage(msg, threadID);
};