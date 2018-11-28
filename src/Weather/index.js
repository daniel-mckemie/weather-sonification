import React from "react";

class Weather extends React.Component {
	render() {
		return (
			<div>
				<p>
					Location:
					<span>
						{" "}
						{this.props.city} {this.props.country}
					</span>
				</p>
				<p>
					Temperature:
					<span> {this.props.temperature}</span>
				</p>
				<p>
					Humidity:
					<span> {this.props.humidity}</span>
				</p>				
				<p>
					Pressure:
					<span> {this.props.pressure}</span>
				</p>
				<p>
					Clouds:
					<span> {this.props.clouds}</span>
				</p>
				<p>
					Conditions:
					<span> {this.props.description}</span>
				</p>
				<p>{this.props.error}</p>
			</div>
		);
	}
}

export default Weather;
