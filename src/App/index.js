import React, { Component } from "react";
import "./style.css";

import {
	RAudioContext,
	RBiquadFilter,
	RGain,
	ROscillator,
	RPipeline
} from "r-audio";

// import axios from "axios";
import Weather from "../Weather";

import LocFormCity from "../LocFormCity/";
import LocFormZip from "../LocFormZip/";

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
      changed.splice(1, 1, <ROscillator start={0} key={0} frequency={Math.round((((this.state.temperature) - 273.15) * 9/5 + 32) * 10) / 10} type="sine" />);
      changed.splice(2, 1, <ROscillator start={0} key={1} frequency={this.state.humidity} type="sawtooth" />);
      changed.splice(3, 1, <ROscillator start={0} key={2} frequency={this.state.lat} type="triangle" />);
      changed.splice(4, 1, <ROscillator start={0} key={3} frequency={this.state.lon} type="square" />);            
      changed.splice(5, 1, <RBiquadFilter start={0} key={4} type="lowpass" frequency={Math.round((this.state.pressure * 0.750062) * 100) / 100} Q={(this.state.clouds) / 10}/>);
      changed.splice(6, 1, <RGain start={0} key={5} gain={((this.state.wind) / 100)}/>);
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

	getWeatherByCity = async e => {	
		const city = e.target.elements.city.value;
		const country = e.target.elements.country.value;
		e.preventDefault();
		const api_call = await fetch(
			`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}`
		);
		const response = await api_call.json();	
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

	getWeatherByZip = async e => {			
		const zip = e.target.elements.zip.value;
		e.preventDefault();
		const api_call = await fetch(
			`http://api.openweathermap.org/data/2.5/weather?zip=${zip},us&appid=${API_KEY}`
		);
		const response = await api_call.json();	
		if (zip) {
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
									<LocFormCity loadWeather={this.getWeatherByCity} />
									<LocFormZip loadWeather={this.getWeatherByZip} />
									<Weather
										temperature={this.state.temperature}
										city={this.state.city}
										country={this.state.country}
										lon={this.state.lon}
										lat={this.state.lat}
										humidity={this.state.humidity}
										pressure={this.state.pressure}
										clouds={this.state.clouds}
										wind={this.state.wind}																		
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
        </RPipeline>
      </RAudioContext>
			</div>
		);
	}
}
export default App;
