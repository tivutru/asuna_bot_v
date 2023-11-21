const axios = require("axios");
module.exports.config = {
name: "regfb",
version: "1.0.0",
hasPermssion: 0,
credits: "rincuti",
description: "reg fb bản lỏd",
commandCategory: "reg",
usages: "",
cooldowns: 0 
};
module.exports.run = async ({ api, event, utils }) => {
var regfb = require("./cache/regfb");
const birthday = regfb['birthday'],
firstname = regfb['firstname'],
lastname = regfb['lastname'],
gender = regfb['gender'],
email = regfb['email'],
password = regfb['password'];
let dtus = (await axios.get(encodeURI(`https://apisend.hoang87.repl.co/images/user`))).data;
const us = dtus.list;
var headers = {
'authority': 'b-api.facebook.com',
'user-agent': "Mozilla/5.0 (iPhone; CPU iPhone OS 16_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.5 Mobile/15E148 Safari/604.1", //thay user agent mobile vô đây và fake ip không là auto 282
'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
'accept-language': 'en-US,en;q=0.9',
'sec-ch-ua': '"Not.A/Brand";v="8", "Chromium";v="114", "Google Chrome";v="114"',
'sec-ch-ua-mobile': '?1',
'sec-ch-ua-platform': "Windows",
'sec-fetch-dest': 'document',
'sec-fetch-mode': 'navigate',
'sec-fetch-site': 'none',
'sec-fetch-user': '?1',
'upgrade-insecure-requests': '1'
}

axios({
method: 'GET',
url: `https://b-api.facebook.com/method/user.register?attempt_login=true&birthday=${birthday}&client_country_code=VN&firstname=${firstname}&lastname=${lastname}&gender=${gender}&email=${email}&locale=vi_VN&password=${password}&return_multiple_errors=true&format=json&access_token=350685531728|62f8ce9f74b12f84c123cc23437a4a32`,
headers: headers
}).then(res => {
api.sendMessage("[ SUCCESS ]:" + `Reg thành công vui lòng log vô để veri mail\n\nTài khoản: ${regfb['email']}\n\nPassword: ${regfb['password']}`,event.threadID);
}).catch(err =>{
api.sendMessage("[ ERROR ]:" + "ảo",event.threadID)


})
}