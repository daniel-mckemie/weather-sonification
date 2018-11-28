import React, { Component } from "react";
import "./style.css";

import {
	RAudioContext,
	RBiquadFilter,
	RGain,
	ROscillator,
	RPipeline,
	RSplit,
	RStereoPanner
} from "r-audio";

// import axios from "axios";
import Weather from "../Weather";

import LocForm from "../LocForm/";

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

class App extends Component {
	constructor() {
		super();
		this.nodeCache = [
		];

		this.state = {
			nodes: this.nodeCache,
			toggle: true,		
		};

		this.change = () => {
      const changed = this.nodeCache.slice();
      // Figure out feedback!!!!  Has to do with rain/humidity!      
      changed.splice(1, 1, <ROscillator start={0} key={0} frequency={this.state.temperature} type="sine" />);
      changed.splice(2, 1, <ROscillator start={0} key={1} frequency={this.state.clouds} type="sawtooth" />);
      changed.splice(3, 1, <ROscillator start={0} key={2} frequency={this.state.lat} type="triangle" />);
      changed.splice(4, 1, <ROscillator start={0} key={3} frequency={this.state.lon} type="square" />);
      // Change the Filter settings to match something with Conditions
      changed.splice(5, 1, <RBiquadFilter start={0} key={4} type="lowpass" frequency={this.state.pressure} Q={this.state.humidity}/>);
      this.setState({ nodes: changed });
    };
	}

	state = {
		temperature: undefined,		
		city: undefined,
		country: undefined,
		lat: undefined,
		lon: undefined,
		visibility: undefined,
		humidity: undefined,
		clouds: undefined,
		description: undefined,
		pressure: undefined,
		wind: undefined,
		error: undefined,
	};

	//getWeather is a method we'll use to make the api call
	getWeather = async e => {
		const city = e.target.elements.city.value;
		const country = e.target.elements.country.value;
		e.preventDefault();
		const api_call = await fetch(
			`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}`
		);
		const response = await api_call.json();	
		console.log(response.main.pressure)
		if (city && country) {
			this.setState({
				temperature: response.main.temp,
				city: response.name,
				country: response.sys.country,
				lon: response.coord.lon,
				lat: response.coord.lat,
				visibility: response.visibility,
				humidity: response.main.humidity,				
				pressure: response.main.pressure,
				clouds: response.clouds.all,
				wind: response.wind.speed,				
				description: response.weather[0].description,
				error: ""
			});
		} else {
			this.setState({
				error: "Please input search values..."
			});
		}
	};

	render() {
		return (
			<div>
				<div className="wrapper">
					<div className="main">
						<div className="container">
							<div className="row">
								<div className="col-xs-5 title-container" />
								<div className="col-xs-7 form-container">
									<LocForm loadWeather={this.getWeather} />
									<Weather
										temperature={this.state.temperature}
										city={this.state.city}
										country={this.state.country}
										humidity={this.state.humidity}
										pressure={this.state.pressure}
										clouds={this.state.clouds}
										description={this.state.description}
										error={this.state.error}
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
				<RAudioContext debug={true}>        
        <RPipeline>
          <button onClick={this.change}>Mutate audio graph</button>          
          {this.state.nodes}
          <RGain gain={0.1}/>
        </RPipeline>
      </RAudioContext>
			</div>
		);
	}
}
export default App;
