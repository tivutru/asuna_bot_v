 envConfig = {
	OPEN_WEATHER: "59f9f80c3d242e1b3756309e48690d15e"
};

module.exports.config = {
	name: "weather",
	version: "1.0.0",
	hasPermission: 0,
	credits: "CatalizCS",
	description: "Xem thông tin thời tiết tại khu vực",
	commandCategory: "other",
	usages: "weather [Location]",
	cooldowns: 5,
	dependencies: ["moment-timezone", "request"],
	info: [
		{
			key: "Location",
			prompt: "Địa điểm, thành phố, khu vực",
			type: 'Văn bản',
			example: 'Hà Nội'
		}
	]
};

module.exports.run = async ({ api, event, args, global, utils }) => {
	const request = require("request");
	const moment = require("moment-timezone");
	
	var city = args.join(" ");
	if (city.length === 0) return utils.throwError("weather", event.threadID, event.messageID);
  
	const apiUrl = encodeURI(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=59f9f80c3d242e1b3756309e48690d15e&units=metric&lang=`);
  
	request(apiUrl, (err, response, body) => {
		if (err) {
			return api.sendMessage("Đã xảy ra lỗi khi truy vấn thông tin thời tiết.", event.threadID, event.messageID);
		}
  
		var weatherData = JSON.parse(body);
		if (weatherData.cod !== 200) {
			if (weatherData.cod === "404") {
				return api.sendMessage(`Địa điểm ${city} không tồn tại!`, event.threadID, event.messageID);
			} else {
				return api.sendMessage(`Đã xảy ra lỗi khi truy vấn thông tin thời tiết.`, event.threadID, event.messageID);
			}
		}
  
		var sunrise_date = moment.unix(weatherData.sys.sunrise).tz("Asia/Ho_Chi_Minh");
		var sunset_date = moment.unix(weatherData.sys.sunset).tz("Asia/Ho_Chi_Minh");
		api.sendMessage({
			body: '🌡 Nhiệt độ: ' + weatherData.main.temp + '°C' + '\n' +
				'🌡 Nhiệt độ cảm nhận: ' + weatherData.main.feels_like + '°C' + '\n' +
				'☁️ Cảnh quan hiện tại: ' + weatherData.weather[0].description + '\n' +
				'💦 Độ ẩm: ' + weatherData.main.humidity + '%' + '\n' +
				'💨 Tốc độ gió: ' + weatherData.wind.speed + 'km/h' + '\n' +
				'🌅 Mặt trời mọc vào lúc: ' + sunrise_date.format('HH:mm:ss') + '\n' +
				'🌄 Mặt trời lặn vào lúc: ' + sunset_date.format('HH:mm:ss') + '\n',
			location: {
				latitude: weatherData.coord.lat,
				longitude: weatherData.coord.lon,
				current: true
			},
		}, event.threadID, event.messageID);
	});
};
