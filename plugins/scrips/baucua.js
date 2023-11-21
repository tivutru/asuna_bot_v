const { createCanvas, loadImage } = require('canvas');
const fs = require('fs');
const canvas = createCanvas(400, 400);
const ctx = canvas.getContext('2d');

module.exports.config = {
    name: "baucua",
    version: "1.10.0",
    hasPermission: 0,
    credits: "Hoàng Quân",
    description: "Trò chơi",
    commandCategory: "games",
    usages: "baucua tôm 500",
    cooldowns: 5,
};

const slotItems = ["nai", "bầu", "gà", "cá", "cua", "tôm"];
function drawCanvas(winnerNhaCai, coin, winnerNguoiChoi, userWin, nhacai, userChoice, api, threadID, messageID) {
    const slotWidth = 398 / 3; // Width of each slot
    const slotHeight = 411 / 2; // Height of each row (assuming there are 2 rows)
    const imageURL = "https://i.ibb.co/6ZZrLrH/CF225-EDA-E470-4799-AA84-1-EA852-C9-C413.jpg"; // Thay bằng đường dẫn của ảnh của bạn
    loadImage(imageURL).then(img => {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        const rowIndexNguoiChoi = Math.floor(winnerNguoiChoi / 3);
        const colIndexNguoiChoi = winnerNguoiChoi % 3;
        const xNguoiChoi = colIndexNguoiChoi * slotWidth;
        const yNguoiChoi = rowIndexNguoiChoi * slotHeight;
        const widthNguoiChoi = slotWidth;
        const heightNguoiChoi = slotHeight;

        const rowIndexNhaCai = Math.floor(winnerNhaCai / 3);
        const colIndexNhaCai = winnerNhaCai % 3;
        const xNhaCai = colIndexNhaCai * slotWidth;
        const yNhaCai = rowIndexNhaCai * slotHeight;
        const widthNhaCai = slotWidth;
        const heightNhaCai = slotHeight;
             //user
         ctx.strokeStyle = userWin ? "green" : "red"; 
        ctx.lineWidth = 5;
        ctx.strokeRect(xNguoiChoi, yNguoiChoi, widthNguoiChoi, heightNguoiChoi);
           //nhacai
        ctx.strokeStyle = nhacai === userChoice ? "green" : "red";
        ctx.lineWidth = 5;
        ctx.strokeRect(xNhaCai, yNhaCai, widthNhaCai, heightNhaCai);

        const imagePath = __dirname + "/cache/baucua/1.jpg";
        const out = fs.createWriteStream(imagePath);
        const stream = canvas.createPNGStream();
        stream.pipe(out);
        out.on("finish", () => {
            // Check the result and send the corresponding result message
            let resultMessage = '';
            if (nhacai === userChoice) {
                // Nếu người chơi thắng
                resultMessage = `👀Bạn đã thắng 🏆\n💐Bạn nhận được ${coin} đô\🌼nTừ số tiền cược.\n🐸Bạn chọn: ${userChoice}\n🐳Nhà cái về 2 kết quả\n🌈Trong đó có : ${slotItems[winnerNhaCai]}`;
            } else {
                // Nếu nhà cái thắng
                resultMessage = `👀Bạn đã thua 😢\n💐Bạn bị trừ ${coin} đô\n🌼Từ số tiền cược.\n🐸Bạn chọn: ${userChoice}\n🐳Nhà cái về 2 kết quả\n🌈Trong đó có : ${slotItems[winnerNhaCai]}`;
            }      
            api.sendMessage(  { attachment: fs.createReadStream(imagePath), body: resultMessage, }, threadID,
                (error, info) => {
                    if (error) {
                        console.error("Error while sending message:", error);
                    }
                    fs.unlinkSync(imagePath); // Delete the image after it has been sent
                }
            );
        });
    });
}

module.exports.run = async function ({ api, event, args, Currencies }) {
    // Lấy dữ liệu từ người chơi
    let input = args[0]?.toLowerCase(); // Chuyển đổi thành chữ thường để dễ so sánh
    let coin = parseInt(args[1]);
    if (!input || !coin || isNaN(coin) || coin <= 0) {
        return api.sendMessage(
            `Vui lòng nhập lựa chọn (nai, bầu, gà, cá, cua, tôm) và số tiền muốn cược (ví dụ: /baucuaca tôm 2000)`,
            event.threadID,
            event.messageID
        );
    }
    if (!slotItems.includes(input)) {
        return api.sendMessage(`Lựa chọn của bạn không hợp lệ`, event.threadID, event.messageID);
    }
    let data = await Currencies.getData(event.senderID);
    let userBalance = data.money || 0;
    if (coin < 50) {
        return api.sendMessage(`Số tiền đặt cược của bạn quá nhỏ, tối thiểu là 50 đô!`, event.threadID, event.messageID);
    }
    if (coin > userBalance) {
        return api.sendMessage(`Số dư không đủ 50 đô để chơi bầu cua`, event.threadID, event.messageID);
    }
    // Lắc xí ngầu cho nhà cái và người chơi
    let numberNguoiChoi = Math.floor(Math.random() * slotItems.length);
    let numberNhaCai = Math.floor(Math.random() * slotItems.length);
    let nguoichoi = slotItems[numberNguoiChoi];
    let nhacai = slotItems[numberNhaCai];
    // Xử lý kết quả và thực hiện chức năng của trò chơi bầu cua
    let userWin = nguoichoi === input;
    api.sendMessage(`🌟 Vui lòng chờ\nĐang lắc nhé...`, event.threadID, (error, messageInfo) => {
       setTimeout(() => {
            // Gọi hàm vẽ canvas và xử lý kết quả
            drawCanvas(numberNhaCai, coin, numberNguoiChoi, userWin, nhacai, input, api, event.threadID, event.messageID);
            // Trừ tiền của người chơi nếu nhà cái thắng, cộng tiền nếu người chơi thắng
            if (nhacai === input) {
                // Nếu người chơi thua
                userBalance -= coin;
            } else {
                // Nếu người chơi thắng
                userBalance += coin;
            }
            Currencies.setData(event.senderID, { money: userBalance });
        }, 5000); // Đợi 5 giây (5000 millisecond) trước khi thực hiện hành động
    });
};