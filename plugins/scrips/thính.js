module.exports.config = {
    name: "thính",
    version: "1.0.1",
    hasPermssion: 0,
    credits: "Hoàng  Quân",
    description: "thính hờ hờ ",
    commandCategory: "game",
    usages: "thính []",
    cooldowns: 5,
    info: [
        {
          key: 'Text',
          type: 'Văn Bản',
          example: 'thính',
          code_by: `Code By Gia Quân`
        }
      ]
    };
    
    module.exports.run = async function({ api, event, args }) {
    var thinh = [ 
        '1. Cái gì đầy trong mắt em đó?\nHình như là anh.', 
        '2. Bão to, cây đổ.\nSao em chưa đổ anh?', 
        '3. Em xinh đẹp ơi!!!\nlàm con dâu mẹ anh không?',
        '4. Này em ơi, mẹ anh đang gọi con dâu kìa.',
        '5. Đông về tay anh lạnh lắm\nnhưng anh vẫn sẵn lòng sưởi ấm tay em.',
        '6. Với thế giới thì em chỉ là một người\nCòn với anh, em là cả thế giới.'
        
    ];
    api.sendMessage(`[ Thính❤️ ]\n` + thinh[Math.floor(Math.random() * thinh.length)] , event.threadID, event.messageID);
  };

 