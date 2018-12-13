import React, { Component } from 'react';
import './style.css'

class Weather extends Component {
  render() {
    return (
      <div>
				<ul className="list-group">

				{
				this.props.country && this.props.city && <p>
					Location:
					<li className="list-group-item">
						{" "}
						{this.props.city} {this.props.country}
					</li>
				</p>
				}
				{
				this.props.lat && this.props.lon && <p>
					Latitude/Longitude:
					<li className="list-group-item">
						{" "}
						{this.props.lat}, {this.props.lon}
					</li>
				</p>
				}			
				{
				this.props.temperature &&	<p>
					Temperature:
					<li className="list-group-item"> {Math.round(((this.props.temperature) - 273.15) * 10) / 10}° C</li>
				</p>
				}
				{
				this.props.humidity && <p>
					Humidity:
					<li className="list-group-item"> {this.props.humidity}%</li>
				</p>				
				}
				{
				this.props.pressure && <p>
					Air pressure:
					<li className="list-group-item"> {Math.round(((this.props.pressure * 0.750062) / 25.4) * 100) / 100} mmHg</li>
				</p>
				}
				{
				this.props.clouds && <p>
					Clouds:
					<li className="list-group-item"> {this.props.clouds}% coverage</li>
				</p>
				}
				{
				this.props.wind && <p>
					Wind:
					<li className="list-group-item">
						{" "}
						{this.props.wind} MPH
					</li>
				</p>
				}				
				{
				this.props.description && <p>
					Conditions:
					<li className="list-group-item"> {this.props.description}</li>
				</p>
				}
				{
				this.props.error && <p>{this.props.error}</p>
				}
				</ul>
			</div>
    );
  }
}

export default Weather;