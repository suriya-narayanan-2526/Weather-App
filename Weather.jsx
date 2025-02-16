import { useEffect, useState} from 'react';
import "./Weather.css";
import clearIcon from"./assets/clear.png";
import cloudIcon from"./assets/cloud.png";
import humidityIcon from"./assets/humidity.png";
import rainIcon from"./assets/rain.webp";
import searchIcon from"./assets/search.png";
import snowIcon from"./assets/snow.png";
import windIcon from"./assets/wind.png";
import drizzleIcon from"./assets/drizzle.png";
const WeatherDerails = ({temp,icon,city,country,lat,log,humidity,wind}) => {
  // const {icon} =props;
  // const {temp} =props;
  return (
    <>
      <div className="image">
        <img src={icon} alt="Image" className='info-img' />
      </div>
      <div className="temp">{temp}°C</div>
      <div className="location">{city}</div>
      <div className="country">{country}</div>
      <div className="cord">
        <div>
          <span className="lat">Lattitude</span>
          <span>{lat}</span>
        </div>
        <div>
          <span className="log">Longitude</span>
          <span>{log}</span>
        </div>
        </div>
        <div className="data-container">
          <div className="element">
            <img src={humidityIcon} alt="Humidity" className='icon'/>
            <div className="data">
              <div className="humidity-percentage">{humidity}%</div>
              <div className="text">Humidity</div>
            </div>
          </div>
          <div className="element">
            <img src={windIcon} alt="Humidity" className='icon'/>
            <div className="data">
              <div className="wind-percentage">{wind} km/h</div>
              <div className="text">Wind Speed</div>
            </div>
          </div>
        </div>
      
    </>
  );
};

export const Weather = () => {
let api_key = "ba94b7bedc262786c0056b26951afb29";
const [icon,setIcon]= useState(clearIcon);
const [temp,setTemp]=useState(0)
const [city,setCity]=useState("Chennai");
const [country,setCountry]=useState("IN");
const [lat,setLattitude]=useState(0)
const [log,setLogitude]=useState(0)
const [humidity,setHumidity]=useState(0)
const [wind,setwind]=useState(0)
const [text,setText]=useState("Chennai");
const [loading,setLoading]=useState(false)
const[cityNotFound,setCityNotFound]=useState(false)
const [error,setError]=useState(null);
const weatherIconMap = {
  "01d" : clearIcon,
  "01n" : clearIcon,
  "02d" : cloudIcon,
  "02n" :cloudIcon,
  "03d" :drizzleIcon,
  "03n" :drizzleIcon,
  "04d" :drizzleIcon,
  "04n" :drizzleIcon,
  "09d" :rainIcon,
  "09n" :rainIcon,
  "10d" :rainIcon,
  "10n" :rainIcon,
  "13d" :snowIcon,
  "13n" :snowIcon,

}
const search =async () =>
  {
    setLoading(true);
    let url=`https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${api_key}&unit=metric`;
    try
    {
      let res = await fetch(url);
      let data = await res.json();
      if(data.cod === "404")
      {
        console.error("City not found");
        setCityNotFound(true)
        setLoading(true)
        return;
      }
      //setting data
      setHumidity(data.main.humidity)
      setwind(data.wind.speed)
      setTemp(Math.floor(data.main.temp - 273.15))
      setCity(data.name)
      setCountry(data.sys.country)
      setLattitude(data.coord.lat)
      setLogitude(data.coord.lon)
      const weatherIconCode = data.weather[0].icon;
      setIcon(weatherIconMap[weatherIconCode] || clearIcon);
      setCityNotFound(false)
    }
    catch(error){
      console.error("An error occured",error.message);
      setError("An error occur while fetching weather data")
    }
    finally
    {
       setLoading(false);
    }
  }
  const handleCity = (e) =>
  {
     setText(e.target.value);
  }
  const handleKeyDown = (e) =>
    {
       if (e.key === "Enter")
       {
        search();
       }
    }
  useEffect(function ()
{
  search();
},[])
  return (
    <>
         <div className="container">
            <div className="input-container">
                <input type="text"  className="cityInput" placeholder='Search City' name="" id="" onChange={handleCity} value={text} onKeyDown={handleKeyDown}/>
                <div className="search-icon">
                    <img src={searchIcon} alt="Search" className='Search-icon' onClick={() =>search()}/>
                </div>
            </div>
            {!loading && !cityNotFound && <WeatherDerails icon={icon} temp={temp} city={city} country={country} lat={lat} log={log} humidity={humidity} wind={wind} />}
            {loading && <div className="loading-message">
              Loading...
            </div>}
            {error && <div className="error-message">
              {error}
            </div>}
           {cityNotFound && <div className="city-notfound">City 
              Not Found
            </div>}
            <p className="copy-right">
              Designed by <span>Suriya</span>
            </p>
         </div>
    </>
  )
}
