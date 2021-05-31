import React, { Component } from 'react'
import './App.css';
import Form from './Form';
import Result from './Result';
import City from './City';

class App extends Component {
  constructor (props) {
    super(props);
  this.state = {
    value: "",
    date: "",
    city: "",
    sunrise: "",
    sunset: "",
    temp: "",
    tempMin: "",
    tempMax: "",
    pressure: "",
    humidity: "",
    wind: "",
    id: "",
    icon: "",
    mess: "",
    err: false,
    suggestions: [],
  }
}




  handleInputChange = (e) => {
this.setState({
  value: e.target.value
})

let suggestions = [];
if(e.target.value.length > 1) {
  const regex = new RegExp(`^${e.target.value}`, "i");
  suggestions = City.sort().filter(v => regex.test(v))
}
this.setState(() => ({
  suggestions,
  date: "",
  city: "",
  sunrise: "",
  sunset: "",
  temp: "",
  tempMin: "",
  tempMax: "",
  pressure: "",
  humidity: "",
  wind: "",
  id: "",
  icon: "",
  mess: "",
}))
}

suggestionSelected(value) {
  this.setState(() => ({
    value,
    suggestions: [],
  }))
}


renderSuggestions() {
  const { suggestions } = this.state
  let num = 0

  if(suggestions.length === 0){
    return null;
  }
  return (
    <ul className="auto_complete">
      {suggestions.map((item) => <li key={City[num++]} onClick={() => this.suggestionSelected(item)}>{item}</li>)}
    </ul>
  )
}


handleCitySubmit = (e) => {
  e.preventDefault()
  const API = `https://api.openweathermap.org/data/2.5/weather?q=${this.state.value}&appid=964dd6287c68efa3b88a44b68d5bc514&units=metric`;

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
      suggestions: [],
      value: "",
      date: date,
      city: data.name,
      sunrise: data.sys.sunrise,
      sunset: data.sys.sunset,
      temp: data.main.temp,
      tempMin: data.main.temp_min,
      tempMax: data.main.temp_max,
      pressure: data.main.pressure,
      humidity: data.main.humidity,
      wind: data.wind.speed,
      id: data.weather[0].id,
      icon: data.weather[0].icon,
      err: false,
    })
    
const weatherID = this.state.id
if(weatherID >=200 && weatherID <=232){
  this.setState({mess: "Burza z piorunami"})
} else if(weatherID >= 300 && weatherID <=321){
  this.setState({mess: "Mżawka"})
} else if(weatherID >= 500 && weatherID <=531){
  this.setState({mess: "Deszcz"})
} else if(weatherID >= 600 && weatherID <=622){
  this.setState({mess: "Śnieg"})
} else if(weatherID >= 701 && weatherID <=781){
  this.setState({mess: "Mgła"})
}  else if(weatherID >= 801 && weatherID <=804){
  this.setState({mess: "Zachmurzenie"})
} else if(weatherID === 800){
  this.setState({mess: "Czyste niebo"})
}

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
      <h1>React Weather App</h1>
        <Form value={this.state.value} onChange={this.handleInputChange}
        submit={this.handleCitySubmit}/>

        {this.renderSuggestions()}

        <Result weather={this.state}/>
      </div>
    )
  }
}

export default App;
