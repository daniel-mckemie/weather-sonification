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
			<ROscillator
				start={1}
				key={1}
				frequency={0}
				type="sine"
				detune={0}
			/>,
			<RBiquadFilter
				key={2}
				frequency={0}
				type="lowpass"
				detune={0}
				transitionDuration={0.8}
			/>,
			<RStereoPanner key={3} />
		];

		this.state = {
			nodes: this.nodeCache,
			toggle: true,
			freq: 440,
		};

		this.change = () => {
      const changed = this.nodeCache.slice();      
      changed.splice(1, 1, <ROscillator start={0} key={4} frequency={this.state.humidity} />);
      changed.splice(2, 1, <ROscillator start={0} key={5} frequency={this.state.temperature} />);
      // changed.splice(3, 1, <RBiquadFilter start={0} key={6} frequency={100} />);
      this.setState({ nodes: changed });
    };
	}

	state = {
		temperature: undefined,
		city: undefined,
		country: undefined,
		humidity: undefined,
		description: undefined,
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
		if (city && country) {
			this.setState({
				temperature: response.main.temp,
				city: response.name,
				country: response.sys.country,
				humidity: response.main.humidity,
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
          <RGain />
        </RPipeline>
      </RAudioContext>
			</div>
		);
	}
}
export default App;
