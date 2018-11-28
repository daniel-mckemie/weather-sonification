import React, { Component } from 'react';

import axios from 'axios';
const API_KEY = process.env.REACT_APP_WEATHER_API_KEY

class LocForm extends Component {
	state = {
		weather: []
	}
	componentDidMount() {		
		axios.get(`http://api.openweathermap.org/data/2.5/weather?zip=94612,us&APPID=${API_KEY}`)
		.then(res => {
			const weather = res.data;
			this.setState({ weather });
			console.log(weather)
		}).catch(error => {
			console.log('Error from fetching data', error);
		})
	}

	render() {
		return (
			<div>Weather!</div>
		);
	}
}

export default LocForm
