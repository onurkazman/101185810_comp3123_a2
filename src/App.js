import "./App.css";
import React, { Component } from "react";
import axios from "axios";
class App extends Component {
  state = {
    icon: "",
    data: [],
    temp: "",
    desc: "",
    feels_like: "",
    humidity: "",
    temp_min: "",
    temp_max: "",
  };

  componentDidMount() {
    axios
      .get(
        "http://api.openweathermap.org/data/2.5/weather?q=Toronto&units=metric&appid=bcf267f6645307ffe94391c3f812ca81"
      )
      .then((res) => {
        this.setState({
          data: res.data,
          icon: res.data.weather[0].icon,
          temp: res.data.main.temp,
          desc: res.data.weather[0].description,
          feels_like: res.data.main.feels_like,
          humidity: res.data.main.humidity,
          temp_min: res.data.main.temp_min,
          temp_max: res.data.main.temp_max,
          date: new Date().toLocaleString(),
        });
      });
  }

  render() {
    console.log(this.state.data);
    return (
      <div
        className={
          typeof this.state.data.main != "undefined"
            ? this.state.temp > 18
              ? "App hot"
              : "App cold"
            : "App cold"
        }
      >
        <main>
          {typeof this.state.data.main != "undefined" ? (
            <div>
              <div className="location-container">
                <div className="location">
                  {this.state.data.name}, {this.state.data.sys.country}
                </div>
                <div className="date"> {this.state.date}</div>
              </div>
              <div className="weather-container">
                <img
                  src={`http://openweathermap.org/img/wn/${this.state.icon}@2x.png`}
                />
                <br />
                <div className="temperature">
                  {Math.round(this.state.temp)}°C
                </div>
                <br />
                <text
                  className="weather"
                  style={{ textTransform: "capitalize" }}
                >
                  {this.state.desc}{" "}
                </text>
                <p className="weather1">
                  {" "}
                  H:{Math.round(this.state.temp_max)} L:
                  {Math.round(this.state.temp_min)}
                </p>
                <br />
                <p className="weather2">
                  Feels Like: {Math.round(this.state.feels_like)}
                </p>
                <br />
                <sup className="weather2">
                  Humidity: &#37;{this.state.humidity}
                </sup>
              </div>
            </div>
          ) : (
            ""
          )}
        </main>
      </div>
    );
  }
}

export default App;
