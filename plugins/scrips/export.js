const fs = require("fs");
const axios = require("axios");

module.exports.config = {
  name: "export",
  version: "1.0.5",
  hasPermssion: 2,
  description: "Xuất module thành link paste.ee",
  commandCategory: "Khác",
  usages: "!exportmodule [nameModule]",
  cooldowns: 5
};

function getModuleContent(moduleName) {
  try {
    const modulePath = `./plugins/scrips/${moduleName}.js`;
    const moduleContent = fs.readFileSync(modulePath, "utf-8");
    return moduleContent;
  } catch (error) {
    console.log(`Error reading module ${moduleName}:`, error);
    return null;
  }
}

async function createPasteEeLink(content) {
  try {
    const apiKey = "aUSAfa7R2Ha8SHcYQ0mVZje5YByJ77pwiTcBtC5wL"; // Thay API key của bạn
    const response = await axios.post("https://api.paste.ee/v1/pastes", {
      sections: [{ contents: content }],
      visibility: "public"
    }, {
      headers: {
        "X-Auth-Token": apiKey
      }
    });

    return response.data.link;
  } catch (error) {
    console.log("Error creating Paste.ee link:", error.message);
    throw new Error("Đã xảy ra lỗi khi tạo link.");
  }
}

module.exports.run = async ({ api, event, args }) => {
  const moduleName = args[0];

  if (!moduleName) {
    return api.sendMessage("Vui lòng nhập tên của module!", event.threadID);
  }

  const moduleContent = getModuleContent(moduleName);
  if (!moduleContent) {
    return api.sendMessage(`Không tìm thấy module ${moduleName}`, event.threadID);
  }

  try {
    const pasteEeLink = await createPasteEeLink(moduleContent);
    api.sendMessage(`Dưới đây là link chứa mã nguồn của module ${moduleName}:\n${pasteEeLink}`, event.threadID);
  } catch (error) {
    api.sendMessage(error.message, event.threadID);
  }
};