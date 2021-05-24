import React from 'react';
import './Result.css';

const Result = (props) => {
    const { date, city, sunrise, sunset, temp, tempMin, tempMax, pressure, wind, err } = props.weather

    let content = null;

    if (!err && city) {
        const sunriseTime = new Date(sunrise * 1000).toLocaleString()
        const sunsetTime = new Date(sunset * 1000).toLocaleString()
        content = (
            <div>
                <h3>Wyniki wyszukiwania dla miasta: {city}</h3>
                <h4>Dane dla dnia i godziny: {date}</h4>
                <h4>Aktualna temperatura: {temp}&#176;C</h4>
                <h4>Minimalna temperatura: {tempMin}&#176;C</h4>
                <h4>Maksymalna temperatura: {tempMax}&#176;C</h4>
                <h4>Wschód słońca o: {sunriseTime}</h4>
                <h4>Zachód słońca o: {sunsetTime}</h4>
                <h4>Aktualna siła wiatru: {wind} m/s</h4>
                <h4>Aktualne ciśnienie: {pressure} hPa</h4>

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