module.exports.config = {
    name: "keobuabao",
    version: "1.0.1",
    hasPermssion: 0,
    credits: "Hoàng  Quân",
    description: "game kéo búa bao ",
    commandCategory: "system",
    usages: "keobuabao [kéo / búa / bao]",
    cooldowns: 5,
    info: [
        {
          key: 'Text',
          type: 'Văn Bản',
          example: 'keobuabao',
          code_by: `Code By Gia Quân`
        }
      ]
    };
    
    module.exports.run = async function({ api, event, args }) {
function outMsg(data) {
    api.sendMessage(data, event.threadID, event.messageID);
   }
if(!event.args[0]) {
    outMsg("Vui lòng nhập ✌️ hoặc 👊 hoặc 🖐")
}
var turnbot = ["✌️","👊","🖐"]
      var botturn = turnbot[Math.floor(Math.random() * turnbot.length)] 
      var userturn = event.args.join( " ")
      if (userturn == "✌️"||userturn == "👊"||userturn == "🖐") {
        if (userturn == turnbot) {
          return outMsg(`Hòa\nNgười chơi : ${userturn}\nBot : ${botturn} `)
        } else if (userturn == "✌️") {
          if (botturn == "👊") {
            return outMsg(`Bot win\nNgười chơi : ${userturn}\nBot : ${botturn} `)
          } else if (botturn == "🖐") {
            return outMsg(`Người chơi win\nNgười chơi : ${userturn}\nBot : ${botturn} `)
        }
      } else if (userturn == "👊") {
        if (botturn == "🖐") {
          return outMsg(`Bot win\nNgười chơi : ${userturn}\nBot : ${botturn} `)
        } else if (botturn == "✌️") {
          return outMsg(`User win\nNgười chơi : ${userturn}\nBot : ${botturn} `)
      }
    } else if (userturn == "🖐") {
      if (botturn == "✌️") {
        return outMsg(`Bot win\nNgười chơi : ${userturn}\nBot : ${botturn} `)
      } else if (botturn == "👊") {
        return outMsg(`User win\nNgười chơi : ${userturn}\nBot : ${botturn} `)
    }
  }
    }}