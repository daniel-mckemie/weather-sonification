import React, { Component } from "react";

class LocFormCity extends Component {
	render() {
		return (
			<form onSubmit={this.props.loadWeather}>
				<div className="row">
					<div className="col">
						<h3>Get Weather by City/Country</h3>
						<input
							type="text"
							className="form-control"
							name="city"
							placeholder="City..."
						/>
						<input
							type="text"
							className="form-control"
							name="country"
							placeholder="Country..."
						/>
					</div>
				</div>
				<button className="btn btn-info">Get Weather</button>
			</form>
		);
	}
}

export default LocFormCity;
