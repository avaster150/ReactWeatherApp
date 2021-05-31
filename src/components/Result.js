import React from 'react';
import './Result.css';

const Result = (props) => {
    const { date, city, sunrise, sunset, temp, tempMin, tempMax, pressure, wind, err, icon, mess, humidity } = props.weather

    let content = null;
    if (!err && city) {
        const sunriseTime = new Date(sunrise * 1000).toLocaleString()
        const sunsetTime = new Date(sunset * 1000).toLocaleString()
        const temperature = Math.floor(temp)
        content = (
            <div>
                <h3 className="cityName">{city}</h3>

                <div className="img_container">
                <img src={`http://openweathermap.org/img/wn/${icon}@2x.png`} alt="" />
                </div>
                <div className="basic_result">
                <h2>{temperature}&#176;C</h2>
                <h3>{mess}</h3>
                </div>

                <div className="extended_result">
                <h4>Dane dla dnia i godziny: {date}</h4>
                <h4>Minimalna temperatura: {tempMin}&#176;C</h4>
                <h4>Maksymalna temperatura: {tempMax}&#176;C</h4>
                <h4>Wschód słońca o: {sunriseTime}</h4>
                <h4>Zachód słońca o: {sunsetTime}</h4>
                <h4>Aktualna siła wiatru: {wind} m/s</h4>
                <h4>Aktualne ciśnienie: {pressure} hPa</h4>
                <h4>Wilgotnośc powietrza: {humidity}%</h4>
                </div>
            </div>
        )
    }
    return (
            <div className="result">
                {err ? `Nie mamy w bazie ${city}`: content}
            </div>
    )

}

export default Result