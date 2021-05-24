import React, { Component } from 'react'
import './App.css';
import Form from './Form';
import Result from './Result';

class App extends Component {
  state = {
    value: "",
    date: "",
    city: "",
    sunrise: "",
    sunset: "",
    temp: "",
    tempMin: "",
    tempMax: "",
    pressure: "",
    wind: "",
    err: false,
  }

  handleInputChange = (e) => {
this.setState({
  value: e.target.value
}
)}

handleCitySubmit = (e) => {
  e.preventDefault()
  const API = `http://api.openweathermap.org/data/2.5/weather?q=${this.state.value}&appid=964dd6287c68efa3b88a44b68d5bc514&units=metric`;

  fetch(API)
  .then(response => {
    if(response.ok) {
      return response
    }
    throw Error("Nie udało się")
  })
  .then(response => response.json()) 
  .then (data => {
    const date = new Date().toLocaleString()
    this.setState({
      date: date,
      city: data.name,
      sunrise: data.sys.sunrise,
      sunset: data.sys.sunset,
      temp: data.main.temp,
      tempMin: data.main.temp_min,
      tempMax: data.main.temp_max,
      pressure: data.main.pressure,
      wind: data.wind.speed,
      err: false,
    })
  })
  .catch(err => {
    this.setState({
      city: this.state.value,
      err:true
    })
  })
}


  render() {
    // console.log(this.state.value)
    return (
      <div className="App">
      <h2>React Weather App</h2>
        <Form value={this.state.value} onChange={this.handleInputChange}
        submit={this.handleCitySubmit}/>
        <Result weather={this.state}/>
      </div>
    )
  }
}

export default App;
