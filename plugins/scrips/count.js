module.exports.config = {
	name: "count", 
	version: "1.0.0",
	hasPermssion: 0,
	credits: "Hoangquan", 
	description:"Đếm mọi thứ trong box chat",
	commandCategory: "group",
	usages: "count message/admin/member/male/female/gei/allgroup/alluser", 
	cooldowns: 5, 
    info: [
        {
          key: 'text',
          type: 'Văn Bản',
          example: 'count',
                code_by: `Code By Gia Quân`
        }
      ]
};

module.exports.run = async function({ api,Threads,Users, event, args, client, __GLOBAL }) {
	var input =args.join();
	    var nameMen = [];
    var gendernam = [];
    var gendernu = [];
    var nope = [];
    		let threadInfo = await api.getThreadInfo(event.threadID);
        for (let z in threadInfo.userInfo) {
     	var gioitinhone = threadInfo.userInfo[z].gender;
        if(gioitinhone == "MALE"){gendernam.push(gioitinhone)
        }else{
        		if (gioitinhone=="FEMALE"){gendernu.push(gioitinhone)
        			}else{nope.push(gioitinhone)}}}

		var out = (msg) => api.sendMessage(msg, event.threadID, event.messageID);
	var boxget = await Threads.getAll(['threadID'])
var userget = await Users.getAll(['userID'])
		if (input==""){out(`Bạn chưa nhập thẻ, hãy sử dụng các thẻ sau: tinnhan/admin/thanhvien/nam/nữ/gei/allgroup/alluser`)}
		if (input=="tinnhan") {out(`Nhóm này có ${threadInfo.messageCount} tin nhắn`)}
		if (input=="admin"){out(`Nhóm mày có ${threadInfo.adminIDs.length} quản tri viên`)}
		if (input=="thanhvien"){out(`Nhóm này có ${threadInfo.participantIDs.length} thành viên`)}
		if (input=="nam"){out(`Nhóm này có ${gendernam.length} thành viên là nam`)}
		if (input=="nữ"){out(`Nhóm này có ${gendernu.length} thành viên là nữ`)}
		if (input=="gei"){out(`Nhóm này có ${nope.length} thành viên là Gei`)}
		if (input=="allgroup"){out(`Tổng có ${boxget.length} nhóm chat sử dụng bot`)}
		if (input=="alluser"){out(`Tổng có ${userget.length} người dùng sử dụng bot`)}
}
