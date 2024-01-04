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
      <svg xmlns="http://www.w3.org/2000/svg" class="img-bg"  height="175" viewBox="0 0 343 175" fill="none">
      <path d="M0.42749 66.4396C0.42749 31.6455 0.42749 14.2484 11.7535 5.24044C23.0794 -3.76754 40.0301 0.147978 73.9315 7.97901L308.33 62.1238C324.686 65.9018 332.864 67.7909 337.646 73.8031C342.427 79.8154 342.427 88.2086 342.427 104.995V131C342.427 151.742 342.427 162.113 335.984 168.556C329.54 175 319.169 175 298.427 175H44.4275C23.6857 175 13.3148 175 6.87114 168.556C0.42749 162.113 0.42749 151.742 0.42749 131V66.4396Z" fill="url(#paint0_linear_2249_26)"/>
      <defs>
        <linearGradient id="paint0_linear_2249_26" x1="0.42749" y1="128" x2="354.57" y2="128" gradientUnits="userSpaceOnUse">
          <stop stop-color="#5936B4"/>
          <stop offset="1" stop-color="#362A84"/>
        </linearGradient>
      </defs>
    </svg>
  </div>
 
   `;
  });
}
