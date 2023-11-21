const fs = require("fs");
const path = require("path");
var stripBom = require("strip-bom");
var originalconfig = {
    botname: "Con Cu",
    prefix: "/"
}
function getCF(){
    if (fs.existsSync("./config.json")) {
        console.log('Đã Tìm Thấy File Config!');
        try{
            var rt = JSON.parse(stripBom(fs.readFileSync(path.join(__dirname, "config.json"), {encoding: "utf8"})));
            return rt;
        } catch (err){
            console.log(err);
            console.log("Có lỗi sảy ra vui lòng thử lại sau");
            process.exit(100);
        }
    } else if (!fs.existsSync("./config.json")) {
        console.log('Chưa Tìm Thấy Config!')
        console.log('Khởi tạo Config File...');
        try{
            fs.writeFileSync(path.join(__dirname, "config.json"), JSON.stringify(originalconfig, null, 4)); 
            console.log('Tạo File Config Thành Công!')
        } catch (_) {
            console.log("Lỗi Khi Tạo Config!");
        }
        try{
            var rt = JSON.parse(stripBom(fs.readFileSync(path.join(__dirname, "config.json"), {encoding: "utf8"})));
            return rt;
        } catch (err){
            console.log(err);
            console.log("Có lỗi sảy ra vui lòng thử lại sau");
            process.exit(100);
        }
    }
}

module.exports = getCF;
