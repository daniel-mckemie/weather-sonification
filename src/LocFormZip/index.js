import React, { Component } from "react";

class LocFormZip extends Component {
	render() {
		return (
			<form onSubmit={this.props.loadWeather}>
				<div className="row">
					<div className="col">
					<h3>Get Weather by Zip Code (US Only)</h3>
						<input type="text" className="form-control" name="zip" placeholder="Zip Code" />
					</div>
				</div>
				<button className="btn btn-primary">Get Weather</button>
			</form>
		);
	}
}

export default LocFormZip;
