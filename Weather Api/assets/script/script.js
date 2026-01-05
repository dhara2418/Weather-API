const apiKey = "2521ccd504aa8c15a389dcf530423968";

function getWeather() {
  const city = document.getElementById("city").value.trim();

  if (city === "") {
    alert("Please enter city name");
    return;
  }

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
  )
    .then(res => res.json())
    .then(data => {

      // ❌ City not found
      if (data.cod !== 200) {
        alert("City not found ❌");
        clearData();
        return;
      }

      /* ================= CURRENT WEATHER ================= */

      const temp = Math.round(data.main.temp);
      const condition = data.weather[0].main;       // Mist, Rain, Clear
      const description = data.weather[0].description;

      document.getElementById("name").innerText = data.name;
      document.getElementById("temp").innerText = temp + "°C";
      document.getElementById("temp2").innerText = temp + "°C";
      document.getElementById("humidity").innerText = data.main.humidity + "%";
      document.getElementById("wind").innerText = data.wind.speed + " km/h";
      document.getElementById("condition").innerText = description;

      document.getElementById("icon").src =
        `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

      /* ================= DATE ================= */

      const today = new Date();
      document.getElementById("day").innerText =
        today.toLocaleDateString("en-US", { weekday: "long" });

      document.getElementById("date").innerText =
        today.toLocaleDateString("en-US", {
          day: "numeric",
          month: "long",
          year: "numeric"
        });

      /* ================= WEATHER BASED UI ================= */
      changeBackground(condition);

      /* ================= FORECAST ================= */
      getForecast(city);
    })
    .catch(() => {
      alert("Something went wrong ❌");
      clearData();
    });
}

/* ================= WEATHER BASED BACKGROUND ================= */
function changeBackground(condition) {
  const leftCard = document.querySelector(".left-card");

  switch (condition) {
    case "Clear":
      leftCard.style.background =
        "linear-gradient(180deg, #fbc531, #e84118)";
      break;

    case "Clouds":
      leftCard.style.background =
        "linear-gradient(180deg, #8e9eab, #485563)";
      break;

    case "Rain":
    case "Drizzle":
      leftCard.style.background =
        "linear-gradient(180deg, #4b79a1, #283e51)";
      break;

    case "Mist":
    case "Haze":
    case "Fog":
      leftCard.style.background =
        "linear-gradient(180deg, #bdc3c7, #2c3e50)";
      break;

    case "Snow":
      leftCard.style.background =
        "linear-gradient(180deg, #e6dada, #274046)";
      break;

    case "Thunderstorm":
      leftCard.style.background =
        "linear-gradient(180deg, #141e30, #243b55)";
      break;

    default:
      leftCard.style.background =
        "linear-gradient(180deg, #3a86ff, #1b263b)";
  }
}

/* ================= 5 DAY FORECAST ================= */
function getForecast(city) {
  fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`
  )
    .then(res => res.json())
    .then(data => {

      if (data.cod !== "200") return;

      let forecastHTML = "";

      for (let i = 0; i < data.list.length; i += 8) {
        const day = new Date(data.list[i].dt_txt)
          .toLocaleDateString("en-US", { weekday: "short" });

        forecastHTML += `
          <div class="forecast-card">
            <p>${day}</p>
            <img src="https://openweathermap.org/img/wn/${data.list[i].weather[0].icon}.png">
            <span>${Math.round(data.list[i].main.temp)}°C</span>
          </div>
        `;
      }

      document.getElementById("forecast").innerHTML = forecastHTML;
    });
}

/* ================= CLEAR UI ================= */
function clearData() {
  document.getElementById("name").innerText = "---";
  document.getElementById("temp").innerText = "--°C";
  document.getElementById("temp2").innerText = "--°C";
  document.getElementById("humidity").innerText = "--%";
  document.getElementById("wind").innerText = "-- km/h";
  document.getElementById("condition").innerText = "---";
  document.getElementById("icon").src = "";
  document.getElementById("forecast").innerHTML = "";
}


