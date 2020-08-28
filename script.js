var APIKey = "&appid=ade2bb7e46d866c6271ae23428c893bc";
var searchCities = [];
$(document).ready(function () {
  $("#citySearch").on("click", function () {
    event.preventDefault();
    var cityInput = $("#cityInput").val().trim();
    $("#cityInput").val("");

    function cityWeather(city) {
      var queryURL =
        "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        ",us" +
        APIKey;
      $.ajax({
        type: "GET",
        url: queryURL,
        dataType: "json",
        success: function (data) {
          $("#cityInput").empty();

          console.log(searchCities.indexOf(city));
          if (searchCities.indexOf(city) == -1) {
            searchCities.unshift(city);
          }
          console.log(searchCities);
          printCitiesList(searchCities);

          var cityName = $(".cityName").html("#cityDiv").text(city);
          var cityTemp = $(".cityTemp")
            .html("#cityDiv")
            .text(
              "Temperature: " +
                ((data.main.temp - 273.15) * 1.8 + 32).toFixed(2) +
                " F"
            );
          var cityWind = $(".cityWind")
            .html("#cityDiv")
            .text("Wind speed: " + data.wind.speed + "mph");
          var cityHumid = $(".cityHum")
            .html("#cityDiv")
            .text("Humidity: " + data.main.humidity + "%");

          var weatherIcon = $(".weatherIcon").attr(
            "src",
            "https://openweatherapp.org/img/w/" + data.weather[0].icon + ".png"
          );

          cityUVIndex(data.coord.lat, data.coord.lon);
        },
      });
    }
    $(document).on("click", ".history-item", function () {
      var liCity = $(this).text().trim();
      cityWeather(liCity);
    });
    cityWeather(cityInput);
  });

  function weatherForecast(city) {
    var queryURL =
      "https://api.openweathermap.org/data/2.5/forecast?q=" + city + APIKey;
    $.ajax({
      type: "GET",
      url: queryURL,
      dataType: "json",
      success: function (data) {
        console.log(data);
      },
    });
  }
  weatherForecast(city);
});

// $(“#cityInput”).change(function() {
//     $( “<p>The text has changed.</p>” ).appendTo( “body” );
//   });

function cityUVIndex(lat, lon) {
  $.ajax({
    type: "GET",
    url: `https://api.openweathermap.org/data/2.5/uvi/forecast?lat=${lat}&lon=${lon}${APIKey}`,
    dataType: "json",
    success: function (data) {
      var uv = data[0].value;
      var cityUV = $(".cityUV").text("UV Index: " + uv);

      if (data.value <= 3) {
        cityUV.addClass("btn-success");
        $("#infoCity").append(cityUV.append(cityUV));
      } else if (data.value <= 6) {
        cityUV.addClass("btn-warning");
        $("#infoCity").append(cityUV.append(cityUV));
      } else if (data.value <= 11) {
        cityUV.addClass("btn-danger");
        $("#infoCity").append(cityUV.append(cityUV));
      } else {
        cityUV.addClass("btn-info");
        $("#infoCity").append(cityUV.append(cityUV));
      }
    },
  });
}
{
  /* <li class='history-item'>City 1</li> */
}
function printCitiesList(cities) {
  $(".searchHistory").empty();
  for (let index = 0; index < cities.length; index++) {
    var liEl = $("<li>");
    liEl.addClass("history-item");
    liEl.text(cities[index]);

    $(".searchHistory").append(liEl);
  }
}
