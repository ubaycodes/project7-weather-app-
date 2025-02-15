$(document).ready(function () {
  // const apiKey = " isi dengan api key";

  function loadHistory() {
    const savedWeather =
      JSON.parse(localStorage.getItem("weatherHistory")) || [];
    const historyList = $("#history-list");
    historyList.empty();

    savedWeather.forEach((item) => {
      const card = `
          <div class="history-card card p-3">
            <h5 class="card-title">${item.city}, ${item.country}</h5>
            <p class="card-text">${item.description}</p>
            <p class="card-text">${item.temperature} °C</p>
          </div>`;
      historyList.append(card);
    });
  }

  $("#search-btn").click(function () {
    const city = encodeURIComponent($("#city-input").val().trim());
    console.log("City Input:", city);
    if (city === "") {
      alert("Please enter a city name!");
      return;
    }

    // const apiUrl = `isi dengan api key dan city`;

    $.ajax({
      url: apiUrl,
      type: "GET",
      success: function (data) {
        $("#city-name").text(`${data.name}, ${data.sys.country}`);
        $("#weather-description").text(
          `Weather: ${data.weather[0].description}`
        );
        $("#temperature").text(`Temperature: ${data.main.temp} °C`);
        $("#humidity").text(`Humidity: ${data.main.humidity}%`);
        $("#weather-result").removeClass("d-none");

        const weatherData = {
          city: data.name,
          country: data.sys.country,
          description: data.weather[0].description,
          temperature: data.main.temp,
          humidity: data.main.humidity,
        };

        const savedWeather =
          JSON.parse(localStorage.getItem("weatherHistory")) || [];
        savedWeather.push(weatherData);
        localStorage.setItem("weatherHistory", JSON.stringify(savedWeather));

        loadHistory();
      },
      error: function () {
        alert("City not found! Please try again.");
      },
    });
  });

  $("#clear-history").click(function () {
    localStorage.removeItem("weatherHistory");
    loadHistory();
    alert("History cleared!");
  });

  loadHistory();
});
