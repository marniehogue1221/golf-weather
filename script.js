const API_KEY = "7a7a38f62b2d3224161e640210fc6f89";

const cities = [
  { name: "Tucson,US", tempEl: "temp-tucson", windEl: "wind-tucson", rainEl: "rain-tucson", verdictEl: "verdict-tucson" },
  { name: "Seattle,US", tempEl: "temp-seattle", windEl: "wind-seattle", rainEl: "rain-seattle", verdictEl: "verdict-seattle" }
];

cities.forEach(city => {
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city.name}&units=imperial&appid=${API_KEY}`)
    .then(res => res.json())
    .then(data => {
      const temp = data.main.temp;
      const wind = data.wind.speed;
      // OpenWeatherMap doesn’t always return rain % so we approximate 0 if none
      const rainChance = data.rain ? data.rain["1h"] * 10 : 0;

      document.getElementById(city.tempEl).textContent = `🌡 Temp: ${temp}°F`;
      document.getElementById(city.windEl).textContent = `💨 Wind: ${wind} mph`;
      document.getElementById(city.rainEl).textContent = `🌧 Rain: ${rainChance}%`;

      // ideal temp is between 65 and 75 F and ideal wind <= 5 mph
      let verdict = "🏌️ GREAT DAY"; 
      if (rainChance > 30 || wind > 12 || temp < 55) verdict = "😐 PLAYABLE";
      if (rainChance > 50 || wind > 18 || temp < 45) verdict = "🚫 SKIP IT";

      document.getElementById(city.verdictEl).textContent = verdict;
    });
});
