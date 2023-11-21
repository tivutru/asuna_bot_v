module.exports.config = {
    name: "thoitiet",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "Nguyễn Hoàng Quân",
    description: "Xem thời tiết của thành phố",
    commandCategory: "other",
    usages: "thoitiet [tên thành phố]",
    cooldowns: 5
};

module.exports.run = async ({ api, event, args }) => {
    const axios = require("axios");
  
    try {
        if (!args[0]) {
            return api.sendMessage("Vui lòng nhập tên thành phố cần xem thời tiết.", event.threadID);
        }

        const apiKey = '59f9f80c3d242e1b3756309e48690d15';
        const city = encodeURIComponent(args.join(' '));
        const units = 'metric';
        const lang = 'vi';
        const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&lang=${lang}&appid=${apiKey}`;

        const response = await axios.get(url);
        const weatherData = response.data;

        if (weatherData.cod === '404') {
            return api.sendMessage("Không tìm thấy thành phố này. Vui lòng kiểm tra lại tên thành phố.", event.threadID);
        }

        const cityName = weatherData.name;
        const weatherDescription = weatherData.weather[0].description;
        const temperature = weatherData.main.temp;
        const feelsLike = weatherData.main.feels_like; 
        const humidity = weatherData.main.humidity;
        const windSpeed = weatherData.wind.speed;
        const rainVolume = weatherData.rain ? weatherData.rain["1h"] : 0;
        const visibility = weatherData.visibility / 1000; 
        const longitude = weatherData.coord.lon; 
        const latitude = weatherData.coord.lat; 
        const pressure = weatherData.main.pressure; 
        const sunrise = new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString(); 
        const sunset = new Date(weatherData.sys.sunset * 1000).toLocaleTimeString();

        const message = `🌤 Thời tiết tại ${cityName}:\n🌡 Nhiệt độ: ${temperature}°C\n🌡 Cảm nhận: ${feelsLike}°C\n💧 Độ ẩm: ${humidity}%\n💨 Tốc độ gió: ${windSpeed} m/s\n🌧 Lượng mưa (1h): ${rainVolume} mm\n🌫 Tầm nhìn: ${visibility} km\n🌐 Kinh độ: ${longitude}\n🌐 Vĩ độ: ${latitude}\n🌡 Áp suất: ${pressure} hPa\n🌅 Mặt trời mọc: ${sunrise}\n🌇 Mặt trời lặn: ${sunset}\n🌧 Tình trạng: ${weatherDescription}`;

        api.sendMessage(message, event.threadID);
    } catch (error) {
        console.error(error);
        api.sendMessage("Đã có lỗi xảy ra khi xem thời tiết. Vui lòng thử lại sau.", event.threadID);
    }
};

