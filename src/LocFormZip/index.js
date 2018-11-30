import React, { Component } from 'react';
import './style.css'

class LocFormZip extends Component {
	render() {
		return (
			<form onSubmit={this.props.loadWeather}>
				<div className="row">
					<div className="col">
					<h4 className="info-header">Get Weather by Zip Code <br /><i className="subtitle">(US Only)</i></h4>
						<input type="text" className="form-control" name="zip" placeholder="Zip Code" />
					</div>
				</div>
				<button className="btn btn-primary">Get Weather</button>
			</form>
		);
	}
}

export default LocFormZip;
