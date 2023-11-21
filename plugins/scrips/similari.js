module.exports.config = {
    name: "similari",
    version: "4.3.6",
    hasPermssion: 0,
    credits: "burh",
    description: "Similari",
    commandCategory: "Chat cùng sim",
    usages: "[args]",
    cooldowns: 5,
    dependencies: [
    "axios"
    ]
    }
    const fs = require("fs");
    const path = require("path");
    const axios = require("axios");
    
    const getRandomImageFromDirectory = () => {
      const directoryPath = path.join(__dirname, "cache", "similari");
      const files = fs.readdirSync(directoryPath);
      const imageFiles = files.filter((file) => /\.(jpg|jpeg|png|gif)$/i.test(file));
    
      if (imageFiles.length === 0) {
        return null; // Không có tệp tin ảnh trong thư mục
      }
    
      const randomIndex = Math.floor(Math.random() * imageFiles.length);
      const randomImageFile = imageFiles[randomIndex];
      const imagePath = path.join(directoryPath, randomImageFile);
      return imagePath;
    };
    
    const similari = async (a, b, c) => {
      const g = (a) => encodeURIComponent(a);
      try {
        const { data: j } = await axios({
          url: `https://lol.tamtrinh3.repl.co/sim?type=ask&&ask=${g(a)}`,
          method: "GET",
        });
        return { error: false, data: j };
      } catch (p) {
        return { error: true, data: {} };
      }
    };
    
    module.exports.onLoad = async function () {
      if (typeof global.sim === "undefined") {
        global.sim = {};
      }
      if (typeof global.sim.similari === "undefined") {
        global.sim.similari = new Map();
      }
    };
    
    module.exports.event = async function ({ api: b, event: a }) {
      const { threadID: c, messageID: d, senderID: e, body: f } = a;
      const g = (e) => b.sendMessage(e, c, d);
    
      if (global.sim.similari.has(c)) {
        if (e === b.getCurrentUserID() || f === "" || d === global.sim.similari.get(c)) {
          return;
        }
        var { data: h, error: i } = await similari(f, b, a);
        if (i === true) {
          return;
        }
        if (h.success === false) {
          g(h.error);
          return;
        }
        if (h.simsay) {
          const imagePath = getRandomImageFromDirectory();
          if (imagePath) {
            const message = `Sim said\n[ ${h.simsay} ]\n    ❤️🐥Similari🐣💚`;
            b.sendMessage(
              {
                body: message,
                attachment: fs.createReadStream(imagePath),
              },
              c,
              d
            );
          } else {
            g(h.simsay);
          }
        }
      }
    };
    
    module.exports.run = async function ({ api: b, event: a, args: c }) {
      const { threadID: d, messageID: e } = a;
      const f = (c) => b.sendMessage(c, d, e);
    
      if (c.length === 0) {
        return f("Nói gì đi :))");
      }
    
      switch (c[0]) {
        case "on":
          return global.sim.similari.has(d)
            ? f("Chưa tắt similari kìa :))")
            : (global.sim.similari.set(d, e), f("Similari on."));
        case "off":
          return global.sim.similari.has(d)
            ? (global.sim.similari.delete(d), f("Similari off."))
            : f("Chưa bật similari kìa :))");
        default:
          axios
            .get(encodeURI(`https://lol.tamtrinh3.repl.co/sim?type=ask&&ask=${c.join(" ")}`))
            .then((res) => {
              if (res.data.simsay === "Em Không Biết Nó Là Gì!" || res.data.simsay === "Em Không Biết Nó Là Gì!") {
                b.sendMessage("Em không biết đó là gì", d, e);
              } else {
                const imagePath = getRandomImageFromDirectory();
                if (imagePath) {
                  const message = `Sim said\n[ ${res.data.simsay} ]\n    ❤️🐥Similari🐣💚`;
                  b.sendMessage(
                    {
                      body: message,
                      attachment: fs.createReadStream(imagePath),
                    },
                    d
                  );
                } else {
                  b.sendMessage(res.data.simsay, d, e);
                }
              }
            });
      }
    };
    