module.exports.config = {
    name: "emojimix",
    version: "1.0.0",
    hasPermission: 0,
    credits: "Hoàng Quân",
    description: "",
    commandCategory: "Game",
    usages: "[reply]",
    cooldowns: 0,
    dependencies: [
        "axios",
        "fs",
        "path"
    ],
    info: [
        {
            key: 'Text',
            type: 'Văn Bản',
            example: 'gái',
            code_by: `Code By Gia Quân`
        }
    ]
};

module.exports.run = async ({ api, event }) => {
    const axios = require('axios');
    const fs = require('fs');
    const path = require('path');
    
    try {
        const emoji1 = encodeURIComponent(event.args[0]);
        const emoji2 = encodeURIComponent(event.args[1]);
        
        const url = `https://emoji-api.com/emojis?search=${emoji1}+${emoji2}&access_key=15825ee6c66757bb95138406c966ef974bdf51e0`;
        const response = await axios.get(url);
        
        if (response.data && response.data.length > 0) {
            const emojiImageUrl = response.data[0].image;
            
            const responseImage = await axios.get(emojiImageUrl, { responseType: 'arraybuffer' });
            
            const filePath = path.join(__dirname, "cache", "emojimix.png");
            fs.writeFileSync(filePath, Buffer.from(responseImage.data, 'binary'));
            
            return api.sendMessage({ body: "Đây là biểu tượng hỗn hợp của bạn", attachment: fs.createReadStream(filePath) }, event.threadID, event.messageID);
        } else {
            return api.sendMessage("Không tìm thấy biểu tượng. Vui lòng thử lại với biểu tượng khác.", event.threadID, event.messageID);
        }
    } catch (error) {
        return api.sendMessage("Đã xảy ra lỗi! Vui lòng thử với biểu tượng khác.", event.threadID, event.messageID);
    }
}
