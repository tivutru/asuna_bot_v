module.exports.config = {
    name: "daily",
    version: "0.0.1",
    hasPermssion: 0,
    credits: "bố m mang name Gia Quân",
    description: "Nhận 200 coins mỗi ngày!",
    commandCategory: "economy",
    usages: "daily",
    cooldowns: 5,
    dependencies: ["parse-ms"],
    envConfig: {
       
        rewardCoin:1000
    },
    info: [
      {
         key: 'Text',
         type: 'Văn Bản',
         example: 'daily',
         code_by: `Code By Gia Quân`
      }
   ]
};

module.exports.run = async({ event, api, Currencies, global }) => {
   let coinReward = global.daily.rewardCoin;
    let data = (await Currencies.getData(event.senderID));
    
     return api.sendMessage(`Bạn đã nhận ${coinReward} coins`, event.threadID, async () => {
        await Currencies.increaseMoney(event.senderID, coinReward);
        await Currencies.setData(event.senderID);
    })
}