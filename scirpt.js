function getWeatherForCity(city) {

    var weatherUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=' + city + '&units=imperial&appid=' + kuhnApiKey;

    fetch(weatherUrl)
        .then(function (response) {
            if (!response.ok) {
                throw response.json();
            }
            return response.json();
        })
        .then(function (weatherRes) {
            var weatherArray = weatherRes.list;

            var oldDate = weatherArray[0].dt_txt.split(" ")[0];
            var newDate;
            var weatherHTML = "<table><tr><td colspan='5'>";
            weatherHTML += "<table border='1'>";
            weatherHTML += "<tr><td>" + city + " (" + oldDate + ")<img src='http://openweathermap.org/img/wn/" + weatherArray[0].weather[0].icon + ".png'></img></td></tr>";
            weatherHTML += "<tr><td>Temp: " + weatherArray[0].main.temp + "&#176;F</td></tr>";
            weatherHTML += "<tr><td>Wind: " + weatherArray[0].wind.speed + " MPH </td></tr>";
            weatherHTML += "<tr><td>Humidity: " + weatherArray[0].main.humidity + "%</td></tr>";
            weatherHTML += "</table>";
            weatherHTML += "</td></tr><tr><td colspan='5'>5-Day Forecast:</td></tr><tr>";

            for (let i = 0; i < weatherArray.length; i++) {

                newDate = weatherArray[i].dt_txt.split(" ")[0];

                if (oldDate != newDate) {
                    weatherHTML += "<td><table border='1'>";
                    weatherHTML += "<tr><td>" + newDate + "</td></tr>";
                    weatherHTML += "<tr><td><img src='http://openweathermap.org/img/wn/" + weatherArray[i].weather[0].icon + ".png'></img></td></tr>";
                    weatherHTML += "<tr><td>Temp: " + weatherArray[i].main.temp + "&#176;F</td></tr>";
                    weatherHTML += "<tr><td>Wind: " + weatherArray[i].wind.speed + " MPH </td></tr>";
                    weatherHTML += "<tr><td>Humidity: " + weatherArray[i].main.humidity + "%</td></tr>";
                    weatherHTML += "</table></td>";

                    oldDate = newDate;
                }
            }
            document.getElementById("weatherDiv").innerHTML = weatherHTML;

            /* write query to page so user knows what they are viewing
            resultTextEl.textContent = locRes.search.query;
      
            console.log(locRes);
      
            if (!locRes.results.length) {
              console.log('No results found!');
              resultContentEl.innerHTML = '<h3>No results found, search again!</h3>';
            } else {
              resultContentEl.textContent = '';
              for (var i = 0; i < locRes.results.length; i++) {
                printResults(locRes.results[i]);
              }
            }*/
        })
        .catch(function (error) {
            console.error(error);
        });
}