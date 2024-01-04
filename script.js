const apiKey = "48396e1b1e2fc15375752201423a0e29";
const cities = [];

function addCity() {
  const cityName = document.getElementById("cityInput").value.trim();
  document.getElementById("cityInput").value = "";
  if (
    !cityName ||
    cities.some((city) => city.name.toLowerCase() === cityName.toLowerCase())
  ) {
    alert("Please enter a valid city name.");
    return;
  }

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      cities.push({ name: data.name, data: data });
      cities.sort((a, b) => a.data.main.temp - b.data.main.temp);
      updateDashboard();
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      alert("Enter valid city Name");
    });
}

function updateDashboard() {
  const dashboard = document.getElementById("dashboard");
  dashboard.innerHTML = "";

  cities.forEach((city) => {
    let Temp = Math.round(city.data.main.temp);
    let h_temp = Math.round(city.data.main.temp_max);
    let l_temp = Math.round(city.data.main.temp_min);

    let weatherCondition = city.data.weather[0].main.toLowerCase();
    let imgUrl;

    // Set image source based on weather condition
    if (weatherCondition === "clear")
    {
      imgUrl = "assets/clear.png";
    } 
    else if (weatherCondition === "clouds") 
    {
      imgUrl = "assets/clouds.png";
    } 
    else if (weatherCondition === "rain") 
    {
      imgUrl ="assets/rain.png";
    } 
    else if (weatherCondition === "haze") {
      imgUrl = "assets/haze.png"
    } 
    else if (weatherCondition === "fog") {
      imgUrl = "assets/haze.png";
    }
    else if (weatherCondition === "smoke") {
      imgUrl = "assets/smoke.png";
    }
    else if (weatherCondition === "mist") {
      imgUrl = "assets/mist.png";
    }
    else{
      imgUrl = "assets/default1.png";
    }
    console.log(imgUrl);
    dashboard.innerHTML += `
    <div class="weather-card">
    <img src="${imgUrl}"  alt="img">   
      <p class="temp">${Temp} °C</p>  
      <p class="HL-temp">H: ${h_temp}° L: ${l_temp}°</p>
      <div class="city-name">
        <h3>${city.data.name}</h3>
        <p>${city.data.weather[0].description}</p>
      </div>
  </div>
   `;
  });
}
