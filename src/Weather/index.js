import React from "react";

class Weather extends React.Component {
	render() {
		return (
			<div>
				{
				this.props.country && this.props.city && <p>
					Location:
					<span>
						{" "}
						{this.props.city} {this.props.country}
					</span>
				</p>
				}
				{
				this.props.lat && this.props.lon && <p>
					Latitude/Longitude:
					<span>
						{" "}
						{this.props.lat}, {this.props.lon}
					</span>
				</p>
				}			
				{
				this.props.temperature &&	<p>
					Temperature:
					<span> {Math.round(((this.props.temperature) - 273.15) * 10) / 10}° C</span>
				</p>
				}
				{
				this.props.humidity && <p>
					Humidity:
					<span> {this.props.humidity}%</span>
				</p>				
				}
				{
				this.props.pressure && <p>
					Air pressure:
					<span> {Math.round(((this.props.pressure * 0.750062) / 25.4) * 100) / 100} mmHg</span>
				</p>
				}
				{
				this.props.clouds && <p>
					Clouds:
					<span> {this.props.clouds}% coverage</span>
				</p>
				}
				{
				this.props.wind && <p>
					Wind:
					<span>
						{" "}
						{this.props.wind} MPH
					</span>
				</p>
				}				
				{
				this.props.description && <p>
					Conditions:
					<span> {this.props.description}</span>
				</p>
				}
				{
				this.props.error && <p>{this.props.error}</p>
				}
			</div>
		);
	}
}

export default Weather;
