var APIKey = "&appid=ade2bb7e46d866c6271ae23428c893bc";

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

          // variables to store cityName, cityTemp, cityHumid, cityWind, cityUV
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
          // var cityUV = $(".cityUV").html("#cityDiv").text("UV Index: " + data.)
          var weatherIcon = $(".weatherIcon").attr(
            "src",
            "https://openweatherapp.org/img/w/" + data.weather[0].icon + ".png"
          );
          // console.log(data.coord.lat, data.coord.lon);
          cityUVIndex(data.coord.lat, data.coord.lon);
        },
      });
    }
    cityWeather(cityInput);
  });

  function cityForecast(city) {
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
  cityForecast(city);
});

$( "#cityInput").change(function() {
    $( "<p>The text has changed.</p>" ).appendTo( "body" );
  });

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
