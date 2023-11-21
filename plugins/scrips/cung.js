const proverbs = [
    "Chớp mắt đã là quá khứ, cười lên đã là hiện tại, giữ gìn hiện tại để tươi sáng tương lai.",
  "Khi bạn đạt được mục tiêu nhưng không thấy hạnh phúc, hãy quay đầu lại nhìn chặng đường bạn đã đi.",
  "Thành công không phải là chìa khóa mở cánh cửa hạnh phúc. Hạnh phúc là chìa khóa dẫn đến cánh cửa thành công.",
  "Thay đổi thế giới bằng tình yêu, không bằng sức mạnh.",
  "Cuộc sống là một bản nền nhạc, những gì bạn muốn là do bạn lựa chọn âm nhạc đó ra sao.",
  "Không có gì là không thể. Từ 'không thể' chỉ là một sự hạn chế tạm thời.",
  "Đôi khi bạn phải đứng một mình để thấy ai là người đứng với bạn, ai chỉ đang đứng cạnh bạn.",
   "Hãy sống không tiếc nuối quá khứ, không lo lắng tương lai và không ích kỷ hiện tại.",
  "Đừng chỉ nghe những gì người khác nói về bạn. Hãy nghe những gì lòng bạn đang thầm thì.",
  "Hãy nhớ rằng, người nào có thể khiến bạn rơi vào khó khăn cũng sẽ là người khiến bạn ra khỏi khó khăn.",
  "Không có hạnh phúc nào tự nhiên mà đến. Hãy làm cho hạnh phúc xảy ra với chính mình.",
  "Hãy luôn cười, vì có một điều gì đó đẹp sẽ xảy ra ngay sau đó.",
  "Hãy luôn giữ cho trái tim mình lành lặn và đừng để bất cứ điều gì làm cho nó đau đớn.",
  "Hãy sống từng ngày như thể bạn đang sống cuộc đời của mình.",
  "Hãy tập trung vào những gì bạn có, không phải vào những gì bạn thiếu.",
  "Hãy tin tưởng vào bản thân mình. Nếu bạn không tin tưởng vào mình, thì ai có thể tin tưởng vào bạn?",
  "Hãy nhìn vào người xung quanh và cảm ơn những gì họ đã đem lại cho bạn.",
  "Hãy sống một cuộc sống không tiếc nuối, vì đời ngắn ngủi lắm.",
  "Hãy yêu thương những người thương yêu bạn, và hãy trân trọng những gì bạn có.",
  "Đừng sợ thất bại. Đôi khi, thất bại chính là bước ngoặt để bạn thành công.",
  "Đừng chạy theo những thứ không thuộc về bạn. Hãy để những thứ không thuộc về bạn đi.",
  "Đừng trách cuộc đời. Đôi khi, nó không theo ý bạn, nhưng đó chính là điều tốt nhất cho bạn.",
  "Đừng bỏ lỡ cơ hội. Cuộc sống không đưa đến cơ hội hai lần.",
  "Đừng hối tiếc về những quyết định trong quá khứ. Hãy tập trung vào tương lai.",
  "Hãy đặt mục tiêu cho bản thân và hãy kiên trì theo đuổi mục tiêu đó.",
  "Hãy sống cuộc đời mà bạn muốn, đừng để người khác quyết định thay bạn.",
  // Các câu châm ngôn đã được định nghĩa
];

const zodiacSigns = [
 "Ma Kết",
  "Bảo Bình",
  "Song Ngư",
  "Bạch Dương",
  "Kim Ngưu",
  "Song Tử",
  "Cự Giải",
  "Sư Tử",
  "Xử Nữ",
  "Thiên Bình",
  "Bọ Cạp",
  "Nhân Mã",
];

const badThings = [
  "Hãy cẩn thận trong giao tiếp hôm nay, tránh tranh cãi và xung đột.",
  "Cẩn thận trong công việc và tránh làm việc quá đột xuất.",
  "Hãy tránh các quyết định quan trọng hôm nay, nên suy nghĩ kỹ trước khi đưa ra quyết định.",
  "Điều gì đến sẽ đến, không nên ép buộc điều gì xảy ra.",
  "Cẩn thận với lời nói, tránh gây hiểu lầm và xích mích với người khác.",
  "Hãy cẩn thận trong việc tiêu tiền hôm nay, tránh tiêu tiền không cần thiết.",
  "Hãy tỉnh táo và thận trọng khi tiếp xúc với người mới.",
  "Tránh những cuộc gặp gỡ không cần thiết và tập trung vào công việc.",
  "Hãy giữ tinh thần thoải mái và lạc quan trong mọi tình huống.",
  "Cẩn thận với các sự cố bất ngờ và tình huống không lường trước.",
];

function getRandomProverb() {
  return proverbs[Math.floor(Math.random() * proverbs.length)];
}

function getZodiacSign(birthDay, birthMonth) {
  const zodiacIndex = (birthMonth + (birthDay < 22 ? 11 : 12)) % 12;
  return zodiacSigns[zodiacIndex];
}

module.exports.config = {
  name: "cung",
  version: "1.0.6",
  hasPermssion: 0,
  credits: "bình",
  description: "Tìm hiểu tỉ lệ may mắn của con số bạn chọn, một câu châm ngôn ngẫu nhiên, tử vi và điều xấu của bạn trong ngày hôm nay.",
  commandCategory: "Khác",
  usages: "!random [number] [ngày sinh] [tháng sinh]",
  cooldowns: 5
};

module.exports.run = ({ api, event, args }) => {
  if (!args || args.length !== 3) {
    api.sendMessage("Vui lòng cung cấp số và ngày tháng sinh theo định dạng !random [number] [ngày sinh] [tháng sinh]", event.threadID);
    return;
  }

  const inputNumber = parseInt(args[0]);
  const birthDay = parseInt(args[1]);
  const birthMonth = parseInt(args[2]);

  if (isNaN(inputNumber) || isNaN(birthDay) || isNaN(birthMonth) || birthDay < 1 || birthDay > 31 || birthMonth < 1 || birthMonth > 12) {
    api.sendMessage("Vui lòng cung cấp thông tin hợp lệ!", event.threadID);
    return;
  }

  const randomNumber = Math.floor(Math.random() * 100) + 1;
  let successRate = (inputNumber / randomNumber) * 100;
  successRate = Math.min(Math.max(successRate, 0), 100); // Giới hạn tỉ lệ trong khoảng 0 đến 100
  successRate = successRate.toFixed(2); // Làm tròn tỉ lệ tới 2 chữ số sau dấu phẩy
  const zodiacSign = getZodiacSign(birthDay, birthMonth);
  const badThing = badThings[Math.floor(Math.random() * badThings.length)];

  let response = `➡️Con số bạn chọn: ${inputNumber}\n`;
  response += `➡️Con số ngẫu nhiên: ${randomNumber}\n`;
  response += `🍀Tỉ lệ may mắn của con số bạn chọn là: ${successRate}%\n`;
  response += `🌾Câu châm ngôn: "${getRandomProverb()}"\n`;
  response += `🎎Tử vi của bạn (${birthDay}/${birthMonth}): Bạn thuộc cung ${zodiacSign}.\n`;
  response += `🧿Điều xấu trong ngày hôm nay: ${badThing}`;

  api.sendMessage(response, event.threadID);
};
