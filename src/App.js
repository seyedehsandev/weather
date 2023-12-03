import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./App.css"

function App() {
  const [city, setCity] = useState('');
  const [weatherPic, setWeatherPic] = useState('');
  const [temp, setTemp] = useState('');
  const [cityName, setCityName] = useState('');
  const [speed, setSpeed] = useState('');
  const [humidity, setHumidity] = useState('');
  const [country, setCountry] = useState('');

  const updateWeatherIcon = (weatherStatus) => {
    switch (weatherStatus) {
      case "Clear":
        setWeatherPic('images/clear.png');
        break;
      case "Clouds":
        setWeatherPic('images/clouds.png');
        break;
      case "Rain":
        setWeatherPic('images/rain.png');
        break;
      case "Mist":
        setWeatherPic('images/mist.png');
        break;
      case "Drizzle":
        setWeatherPic('images/drizzle.png');
        break;
      case "Snow":
        setWeatherPic('images/snow.png');
        break;
      default:
        break;
    }
  };

  const handleFetchError = (err, source) => {
    console.error(`${err} خطا در ${source}!`);
  };

  const searchHandler = () => {
    console.log("searchHandler")
  };

  const mycity = (event) => {
    setCity(event.target.value);
  };

  const fetchIp = async () => {
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

  useEffect(() => {
    fetchIp();
    console.log("use ip", city);
  }, []); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=46a48945a3e004e2af6f58705a2465ec`);
        const weatherData = response.data;

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

    fetchData();
    console.log("use effect", city);
  }, [city]);

  return (
    <div className="container">
      <div className="weather">
        <div className="searchbox">
          <input type="text" placeholder="City" value={city} onChange={mycity} />
          <span className="searchbtn" onClick={searchHandler}><img src="images/search.png" alt="search" /></span>
        </div>
        <div className="weatherpic">
          <img className="temppic" src={weatherPic} alt="weather" />
        </div>
        <div className="weathernum">
          {temp}
        </div>
        <div className="city">
          {cityName},{country}
        </div>
        <div className="lastbox">
          <div className="humidity">
            <div className="left">
              <img src="images/humidity.png" alt="humidity" />
            </div>
            <div className="right">
              <p><span className="hvalue">{humidity}</span></p>
              <p className="labelh">Humidity</p>
            </div>
          </div>
          <div className="wind">
            <div className="left">
              <img src="images/wind.png" alt="wind" />
            </div>
            <div className="right">
              <p><span className="wvalue">{speed}</span></p>
              <p className="labelw">Wind speed</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
