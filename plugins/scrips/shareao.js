module.exports.config = {
    name: "shareao",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "hoàng",
    description: "share ảo cookie",
    commandCategory: "share",
    usages: "thêm cookie riêng or dùng cookie acc bot\n\nsửa id share or cookie ở trong phần cache/config.js",
    cooldowns: 0 
    };
    const appState = require("../../appstate.json");
    const ck = appState.map(item => item = item.key + "=" + item.value).join(";");
    
    ////get cookie by appstate/////
    
    module.exports.run = async ({ api, event, utils }) => {
    var axios = require("axios");
    var config = require("./cache/config")
    api.sendMessage(" đang tiến hành buff share ảo",event.threadID)// text cho biết là có hoạt động hay không
    var headers = {
    'authority': 'business.facebook.com',
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36',
    'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
    'accept-language': 'en-US,en;q=0.9',
    'sec-ch-ua': '"Google Chrome";v="107", "Chromium";v="107", "Not=A?Brand";v="24"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': "Windows",
    'sec-fetch-dest': 'document',
    'sec-fetch-mode': 'navigate',
    'sec-fetch-site': 'none',
    'sec-fetch-user': '?1',
    'upgrade-insecure-requests': '1'
    }
    class Share {
    getToken() {
    return new Promise((resolve, reject) => {
    headers['cookie'] = config['cookies'] || ck// phần cookie acc bot or riêng
    axios.get('https://business.facebook.com/content_management', {
    headers: headers
    }).then(res => {
    var accessToken = 'EAAG' + res.data.split('EAAG')[1].split('","')[0]//get token từ cookie
    resolve({
    accessToken: accessToken,
    cookie: headers['cookie']
    })
    }).catch(err => {
    reject(err)
    })
    })
    }
    share(token, cookie) {
    delete headers.authority;
    delete headers.accept;
    delete headers['accept-language'];
    headers['accept-encoding'] = 'gzip, deflate';
    headers['host'] = 'graph.facebook.com'
    headers['cookie'] = cookie
    const run = setInterval(function () {
    axios({
    method: 'POST',
    url: `https://graph.facebook.com/me/feed?link=https://m.facebook.com/${config['id']}&published=0&access_token=${token}`,
    headers: headers
    }).then(res => {
    console.log('[ SUCCESS ]: ' + `${res.data.id}`,event.threadID)// xóa này đi cũng được nếu thấy phiền
    }).catch(err =>{
    api.sendMessage("[ ERROR ]:" + "Bị block tính năng hoặc lỗi gì đó vui lòng xem lại",event.threadID)// báo lỗi
    return clearTimeout(run)// dừng run nếu bị lỗi sảy ra burh
    
    
    })
    }, 1000)
    }
    }
    
    const test = new Share();
    test.getToken().then(res => {
    var access_token = res['accessToken'], cookie = res['cookie'];
    test.share(access_token, cookie)
    })
    }