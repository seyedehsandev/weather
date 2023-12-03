export const fetchData = async () => {
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=46a48945a3e004e2af6f58705a2465ec`);
      const weatherData =await response.data;

      if (weatherData.cod === 404) {
        alert("نام شهر را به درستی وارد کنید!");
      } else {
        const weatherStatus = weatherData.weather[0].main;
        const updatedTemp = Math.round(weatherData.main.temp - 273.15) + "°C";
        const updatedCityName = weatherData.name;
        const updatedSpeed = weatherData.wind.speed + " km/h";
        const updatedHumidity = weatherData.main.humidity + "%";
        const updatedCountry = weatherData.sys.country;

        setTemp(updatedTemp);
        setCityName(updatedCityName);
        setSpeed(updatedSpeed);
        setHumidity(updatedHumidity);
        setCountry(updatedCountry)

        updateWeatherIcon(weatherStatus);
      }
    } catch (error) {
      handleFetchError(error, 'fetchData');
    }
  };


  export const fetchIp = async () => {
    try {
      const ipResponse = await axios.get('https://api64.ipify.org?format=json');
      const ipAddress = ipResponse.data.ip;
      const locResponse = await axios.get(`http://ip-api.com/json/${ipAddress}?fields=status,city,query`);
      const locData = locResponse.data;
      if (locData.status === "success") {
        setCity(locData.city);
      }
    } catch (error) {
      handleFetchError(error, 'fetchIp');
    }
  };