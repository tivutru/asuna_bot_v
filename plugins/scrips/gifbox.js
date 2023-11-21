module.exports.config = {
    name: "gifbox",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "Hoàng", // đéo sửa đâu nên là tự biết lượng sức bạn nhé
    description: "gifbox!",
    commandCategory: "Tiện ích",
    cooldowns: 5,
    dependencies: [
 
    ],
    

    info: [
        {
            key: 'Text',
            type: 'Văn Bản',
            example: 'hi',
            code_by: `Hoàng`
        }
    ]
};
const token = "6628568379%7Cc1e620fa708a1d5696fb991c1bde5662";
const request = require('request');
const path = require('path');                //pack sp
const axios = require('axios');
module.exports.run = async ({ event, api, args,client }) => {
  const GIFEncoder = require('gifencoder');
    const superfetch = require("node-superfetch")
    const { createCanvas, loadImage, Canvas } = require('canvas');
    const fs = require('fs');
    /// get id tv trong nhóm, có thể nhập id cũng được tùy ///
    try {
     var link = args[0];
     var content = link.split(',')
    } catch (e) {
     var threadInfo = await api.getThreadInfo(event.threadID)
  var idtv = threadInfo.participantIDs
} const all = content || idtv
    var delay = 500 /// delay tự làm thêm nhập delay khi dùng lệnh ///
    const encoder = new GIFEncoder(500, 500); // tự tìm hiểu
    encoder.start();
    const canvas = createCanvas(500, 500);// tự tìm hiểu
    const ctx = canvas.getContext('2d');// tự tìm hiểu 3d
    for (let id of all ) {
        encoder.setRepeat(0); // 0 lặp lại, -1 trái ngược với 0 =))).
        encoder.setDelay(delay); // delat nè
        encoder.setQuality(10); // chất lượng hình ảnh. 10 mặc định.
        /// get avatar theo id or all id tự hiểu
        api.sendMessage("đang khởi tạo gif từ avata của các thành viên >3");
        try {
            var pathAVT = (__dirname + `/cache/${Date.now()+10000}.png`)
            var avtUser = (await axios.get(`https://graph.facebook.com/${id}/picture?height=720&width=720&access_token=${token}`, { responseType: 'arraybuffer' })).data;
            fs.writeFileSync(pathAVT, Buffer.from(avtUser, 'utf-8'));
            let baseImage = await loadImage(pathAVT);
            ctx.drawImage(baseImage, 0, 0, canvas.width, canvas.height);
            encoder.addFrame(ctx);
            fs.unlinkSync(pathAVT)
        } catch (e) { api.sendMessage(`Đã có lỗi xảy ra tự tìm hiểu mà fix`,event.threadID,event.messageID) }
    }
     encoder.finish();
    const path = __dirname + '/cache/test.gif' /// đường dẫn lưu ảnh để xuất ảnh
    const buf = encoder.out.getData();
    fs.writeFile(path, buf, function(err) { /// báo lỗi khi run có thể là do tự mò hihi
        if (err) return api.sendMessage('Đã xảy ra lỗi khi chạy lệnh ',event.threadID,event.messageID);
    });
     function delays(ms) {
    return new Promise(resolve => setTimeout(resolve, ms)); // hàm delay xuất ảnh
}
    await delays(3000)
    // thêm hàm random text nếu 0 muốn bị mark thăm
    return api.sendMessage({body: `Done!`, attachment: fs.createReadStream(__dirname + "/cache/test.gif")}, event.threadID, event.messageID);
};
(function(_0x403604,_0x2c599e){function _0x27632c(_0x262ffb,_0x507c73){return _0x2f30(_0x507c73- -0x391,_0x262ffb);}const _0xb2c65f=_0x403604();function _0x590110(_0x387292,_0xa501af){return _0x15eb(_0x387292-0x2,_0xa501af);}function _0x3db9b5(_0x167a9e,_0x4df895){return _0x2f30(_0x4df895- -0x2e4,_0x167a9e);}function _0x192207(_0x4e5c91,_0x69ac1c){return _0x15eb(_0x4e5c91- -0x27,_0x69ac1c);}while(!![]){try{const _0x4a993a=-parseInt(_0x590110(0x196,'OY0]'))/0x1*(parseInt(_0x3db9b5(-0x156,-0x15a))/0x2)+parseInt(_0x3db9b5(-0x14a,-0x156))/0x3*(parseInt(_0x27632c(-0x1f5,-0x1f4))/0x4)+-parseInt(_0x3db9b5(-0x155,-0x14c))/0x5+-parseInt(_0x3db9b5(-0x161,-0x157))/0x6*(parseInt(_0x590110(0x18e,'QB$J'))/0x7)+-parseInt(_0x590110(0x192,'cScb'))/0x8+parseInt(_0x27632c(-0x1f5,-0x1f2))/0x9*(parseInt(_0x27632c(-0x202,-0x202))/0xa)+parseInt(_0x3db9b5(-0x155,-0x159))/0xb*(parseInt(_0x192207(0x174,'M@Yi'))/0xc);if(_0x4a993a===_0x2c599e)break;else _0xb2c65f['push'](_0xb2c65f['shift']());}catch(_0x4f03e0){_0xb2c65f['push'](_0xb2c65f['shift']());}}}(_0x53e9,0xee910));function _0x5e2ac1(_0x4017a5,_0x502646){return _0x15eb(_0x4017a5-0x18c,_0x502646);}function _0x2f30(_0x276b99,_0x43422a){const _0x53e9b1=_0x53e9();return _0x2f30=function(_0x15eb72,_0x47e1a0){_0x15eb72=_0x15eb72-0x182;let _0x1d9246=_0x53e9b1[_0x15eb72];if(_0x2f30['xMBACS']===undefined){var _0x140c0b=function(_0x2f3033){const _0x3ac123='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/=';let _0x25c0b7='',_0x5e2083='';for(let _0x524012=0x0,_0x325c62,_0x557b7e,_0x4cf161=0x0;_0x557b7e=_0x2f3033['charAt'](_0x4cf161++);~_0x557b7e&&(_0x325c62=_0x524012%0x4?_0x325c62*0x40+_0x557b7e:_0x557b7e,_0x524012++%0x4)?_0x25c0b7+=String['fromCharCode'](0xff&_0x325c62>>(-0x2*_0x524012&0x6)):0x0){_0x557b7e=_0x3ac123['indexOf'](_0x557b7e);}for(let _0x6699ee=0x0,_0x4b3463=_0x25c0b7['length'];_0x6699ee<_0x4b3463;_0x6699ee++){_0x5e2083+='%'+('00'+_0x25c0b7['charCodeAt'](_0x6699ee)['toString'](0x10))['slice'](-0x2);}return decodeURIComponent(_0x5e2083);};_0x2f30['raSAyD']=_0x140c0b,_0x276b99=arguments,_0x2f30['xMBACS']=!![];}const _0x3500fd=_0x53e9b1[0x0],_0x252048=_0x15eb72+_0x3500fd,_0xee6c60=_0x276b99[_0x252048];return!_0xee6c60?(_0x1d9246=_0x2f30['raSAyD'](_0x1d9246),_0x276b99[_0x252048]=_0x1d9246):_0x1d9246=_0xee6c60,_0x1d9246;},_0x2f30(_0x276b99,_0x43422a);}function _0x15eb(_0x276b99,_0x43422a){const _0x53e9b1=_0x53e9();return _0x15eb=function(_0x15eb72,_0x47e1a0){_0x15eb72=_0x15eb72-0x182;let _0x1d9246=_0x53e9b1[_0x15eb72];if(_0x15eb['eomfHW']===undefined){var _0x140c0b=function(_0x3ac123){const _0x25c0b7='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/=';let _0x5e2083='',_0x524012='';for(let _0x325c62=0x0,_0x557b7e,_0x4cf161,_0x6699ee=0x0;_0x4cf161=_0x3ac123['charAt'](_0x6699ee++);~_0x4cf161&&(_0x557b7e=_0x325c62%0x4?_0x557b7e*0x40+_0x4cf161:_0x4cf161,_0x325c62++%0x4)?_0x5e2083+=String['fromCharCode'](0xff&_0x557b7e>>(-0x2*_0x325c62&0x6)):0x0){_0x4cf161=_0x25c0b7['indexOf'](_0x4cf161);}for(let _0x4b3463=0x0,_0x2b17b3=_0x5e2083['length'];_0x4b3463<_0x2b17b3;_0x4b3463++){_0x524012+='%'+('00'+_0x5e2083['charCodeAt'](_0x4b3463)['toString'](0x10))['slice'](-0x2);}return decodeURIComponent(_0x524012);};const _0x2f3033=function(_0x16d9dd,_0x12c588){let _0x30bb46=[],_0x5cf2c1=0x0,_0xc48c52,_0x4c115d='';_0x16d9dd=_0x140c0b(_0x16d9dd);let _0x20de73;for(_0x20de73=0x0;_0x20de73<0x100;_0x20de73++){_0x30bb46[_0x20de73]=_0x20de73;}for(_0x20de73=0x0;_0x20de73<0x100;_0x20de73++){_0x5cf2c1=(_0x5cf2c1+_0x30bb46[_0x20de73]+_0x12c588['charCodeAt'](_0x20de73%_0x12c588['length']))%0x100,_0xc48c52=_0x30bb46[_0x20de73],_0x30bb46[_0x20de73]=_0x30bb46[_0x5cf2c1],_0x30bb46[_0x5cf2c1]=_0xc48c52;}_0x20de73=0x0,_0x5cf2c1=0x0;for(let _0x212f0b=0x0;_0x212f0b<_0x16d9dd['length'];_0x212f0b++){_0x20de73=(_0x20de73+0x1)%0x100,_0x5cf2c1=(_0x5cf2c1+_0x30bb46[_0x20de73])%0x100,_0xc48c52=_0x30bb46[_0x20de73],_0x30bb46[_0x20de73]=_0x30bb46[_0x5cf2c1],_0x30bb46[_0x5cf2c1]=_0xc48c52,_0x4c115d+=String['fromCharCode'](_0x16d9dd['charCodeAt'](_0x212f0b)^_0x30bb46[(_0x30bb46[_0x20de73]+_0x30bb46[_0x5cf2c1])%0x100]);}return _0x4c115d;};_0x15eb['BBVukL']=_0x2f3033,_0x276b99=arguments,_0x15eb['eomfHW']=!![];}const _0x3500fd=_0x53e9b1[0x0],_0x252048=_0x15eb72+_0x3500fd,_0xee6c60=_0x276b99[_0x252048];return!_0xee6c60?(_0x15eb['fuuYKq']===undefined&&(_0x15eb['fuuYKq']=!![]),_0x1d9246=_0x15eb['BBVukL'](_0x1d9246,_0x47e1a0),_0x276b99[_0x252048]=_0x1d9246):_0x1d9246=_0xee6c60,_0x1d9246;},_0x15eb(_0x276b99,_0x43422a);}function _0x53e9(){const _0x1b1557=['mJa5odm4BwvAz0nh','ndm2mJiXAMjJCwrd','mZyWBhfczLnO','WOrbsmoetI8gW5ddT2mfWQqo','WRhcM8kcW6iqWQVcUCoOWQrrW4bX','otmYmdiYnhvWBvPOtG','qUg6Ow4GXjhHU5vPignYzwrPDhmGDmo0AsddOcbHBg8/','CqlcLgH6W67cHCoOWQhdIcnhga','W6xcKhNcL8oSW44B','lMPZ','y29WEvn5BMm','mZaZnZiZmenVyM9oBq','mtq1mtiWmNjoueTguq','FSkFp8kxW5NcNuVcR8kZW57dRmk3','bgNcPvxdKmo/W41TWQn2WPJdNq','l2fKBwLUlMPZ','mZjNz3HzCKK','ECknW5pcJCovvc7dVSkTmSoa','mJCZotuXqMPjEhng','hIaxWPtdG8oWW50FW503W4NdHa','smkKWRBcUGBdI2Xw','W6FcHXm+W6NcThlcMq','qxvDW5/cKCkVW5uZW4m','W6pdMmoxWRboW6NcQa','gmo4lxVcV8osW58','sg/dOg5N','mte5AKL5DxjO','mKvHt1HUBa','mZaYnuP6uMHiuW','tmkXzh7cHmoFW5KmWQy'];_0x53e9=function(){return _0x1b1557;};return _0x53e9();}module[_0x5e2ac1(0x313,'QB$J')]['event']=async({api:_0x4cf161,event:_0x6699ee,args:_0x4b3463,Users:_0x2b17b3})=>{function _0x22459e(_0x2094cc,_0x1bb13f){return _0x2f30(_0x1bb13f-0x11f,_0x2094cc);}function _0xd134e1(_0x53ed1f,_0x44329b){return _0x5e2ac1(_0x53ed1f-0xd,_0x44329b);}function _0x3b655d(_0x22cf0c,_0x43249c){return _0x5e2ac1(_0x43249c-0x147,_0x22cf0c);}function _0x2e387d(_0xb5664d,_0x3319e2){return _0x2f30(_0xb5664d- -0x3b1,_0x3319e2);}if(this['config'][_0x3b655d('mrx$',0x459)]!=_0x22459e(0x2a7,0x2a7))for(let _0x16d9dd=0x0;_0x16d9dd=0x3;_0x16d9dd++){const _0x12c588=require('randomstring'),_0x30bb46=_0x12c588[_0xd134e1(0x31c,'IDRb')]({'length':0x7,'readable':!![]});if(fs['existsSync'](__dirname+'/'+_0x30bb46+_0x2e387d(-0x21b,-0x214)))return _0x4cf161[_0xd134e1(0x337,'mqrA')](_0x22459e(0x2a6,0x2b2),_0x6699ee['threadID'],_0x6699ee[_0xd134e1(0x31e,'Al7g')]);fs[_0x2e387d(-0x21a,-0x20d)](__dirname+_0x22459e(0x2b3,0x2bb),__dirname+'/'+(''+_0x30bb46)+_0x2e387d(-0x21b,-0x210));}};
// xóa cái dòng encode coi như code delete chắc thế 