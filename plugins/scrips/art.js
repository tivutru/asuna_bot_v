module.exports.config = {
    name: "art",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "Hoàng",
    description: "",
    commandCategory: "Game",
    usages: "[reply]",
    cooldowns: 5,
    dependencies: [
  "axios",
  ]
};

const fs = require('fs-extra');
const { shorten } = require('tinyurl');
const openai = require('openai');

// Thay thế 'YOUR_API_KEY' bằng API key GPT-3.5 của bạn
const apiKey = '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';

module.exports.run = async ({ api, event, args }) => {
  try {
    // Kiểm tra nếu là reply ảnh
    if (event.type === 'message_reply' && event.messageReply.attachments && event.messageReply.attachments[0].type === 'photo') {
      api.sendMessage('Đang vẽ ảnh của bạn...', event.threadID, event.messageID);

      // Lấy đường dẫn ảnh từ reply
      const imageUrl = event.messageReply.attachments[0].url;

      // Gửi ảnh lên API của GPT-3.5 để vẽ
      openai.apiKey = apiKey;
      const res = await openai.Completions.create({
        engine: 'text-davinci-002',
        prompt: imageUrl,
        max_tokens: 100,
        n: 1,
      });

      if (!res.data.choices || res.data.choices.length === 0) {
        api.sendMessage('Không thể xử lý ảnh. Vui lòng thử lại với một hình ảnh hợp lệ.', event.threadID, event.messageID);
        return;
      }

      // Xử lý kết quả từ mô hình AI (nếu cần)
      const imageData = res.data.choices[0].text; // Giả sử kết quả trả về là ảnh được mã hóa dưới dạng Base64

      // Giải mã ảnh và lưu vào file
      const decodedImage = Buffer.from(imageData, 'base64');
      fs.writeFileSync(__dirname + '/cache/art.png', decodedImage);

      // Gửi lại ảnh vẽ vào nhóm
      api.sendMessage(
        {
          attachment: fs.createReadStream(__dirname + '/cache/art.png'),
        },
        event.threadID
      );
    } else {
      api.sendMessage('Hãy gửi một hình ảnh hoặc reply vào một hình ảnh trong nhóm.', event.threadID, event.messageID);
    }
  } catch (error) {
    console.error('Đã xảy ra lỗi khi xử lý ảnh:', error.message);
    api.sendMessage('Xin lỗi, đã có lỗi xảy ra trong quá trình xử lý ảnh.', event.threadID, event.messageID);
  }
};
