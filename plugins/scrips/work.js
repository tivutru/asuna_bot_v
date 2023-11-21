module.exports.config = {
	name: "work",
	version: "0.0.1",
	hasPermssion: 0,
	credits: "tao tên Gia Quân nhé cái địt mẹ m",
	description: "Có làm thì mới có ăn!",
	commandCategory: "Economy",
	usages: "work",
    cooldowns: 5,
    info: [
        {
            key: 'Text',
            type: 'Văn Bản',
            example: 'work',
            code_by: `Code By Gia Quân`
        }
    ]
   
};

module.exports.run = async ({ event, api, Currencies, global }) => {
    const { threadID, messageID, senderID } = event;
    const data = (await Currencies.getData(event.senderID));

    
        const job = [
            "đi bán vé số",
            "đi sửa xe",
            "làm nhân viên lập trình",
            "đi hack facebook",
            "làm thợ sửa ống nước ( ͡° ͜ʖ ͡°)",
            "làm đầu bếp",
            "làm thợ hồ",
            "fake taxi",
            "đi gangbang người khác",
            "làm re sờ chym mờ",
            "đi bán hàng online",
            "làm nội trợ",
            "đi vả mấy thằng sao đỏ, giun vàng",
            "đi bán hoa",
            "tìm jav/hentai code cho Nghĩa",
            "đi chơi Yasuo trong rank và gánh team"
        ];
        const amount = Math.floor(Math.random() * 10000);
        return api.sendMessage(`Bạn ${job[Math.floor(Math.random() * job.length)]} và đã nhận được số tiền là: ${amount} coins`, threadID, async () => {
            await Currencies.increaseMoney(senderID, parseInt(amount));
            data.workTime = Date.now();
            await Currencies.setData(event.senderID, { data });
            return;
        }, messageID);}
    
