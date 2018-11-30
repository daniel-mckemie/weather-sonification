import React, { Component } from "react";
import './style.css';

import {
	RAudioContext,
	RBiquadFilter,
	RGain,
	ROscillator,
	RPipeline
} from "r-audio";

import Info from "../Info";
import InfoFoot from "../InfoFoot";
import Instructions from "../Instructions";
import Weather from "../Weather";
import LocFormCity from "../LocFormCity";
import LocFormZip from "../LocFormZip";

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
      changed.splice(1, 1, <ROscillator start={0} key={0} frequency={Math.round((((this.state.temperature) - 273.15) * 9/5 + 32) * 10) / 10} type="triangle" />);
      changed.splice(2, 1, <ROscillator start={0} key={1} frequency={this.state.humidity} type="triangle" />);
      changed.splice(3, 1, <ROscillator start={0} key={2} frequency={this.state.lat} type="triangle" />);
      changed.splice(4, 1, <ROscillator start={0} key={3} frequency={this.state.lon} type="triangle" />);
      changed.splice(5, 1, <ROscillator start={0} key={4} frequency={(this.state.wind) * 10} type="triangle" />);            
      changed.splice(6, 1, <RBiquadFilter start={0} key={5} type="lowpass" frequency={Math.round((this.state.pressure * 0.750062) * 100) / 100} Q={(this.state.clouds * 5) / 10}/>);
      changed.splice(7, 1, <RGain start={0} key={6} gain={0.2}/>);
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
			`https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}`
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
				clouds: response.clouds.all || 50,
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
				<Info />
				<div className="wrapper">
					<div className="main">
						<div className="container">						
							<div className="row">
								<div className="col-6 form-container">
									<LocFormCity loadWeather={this.getWeatherByCity} />
									<hr />
									<LocFormZip loadWeather={this.getWeatherByZip} />
									<hr />
									<button className="btn btn-danger btn-sonify" onClick={this.change}>SONIFY</button>
									<hr />
									<Instructions />																         
								</div>
								<div className="col-6">
									<Weather
										error={this.state.error}
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
									/>
								</div>								
							</div>							
						</div>
					</div>
				</div>
				<RAudioContext>
					<RPipeline>{this.state.nodes}</RPipeline>
				</RAudioContext>
				<InfoFoot />				
			</div>
		);
	}
}
export default App;
