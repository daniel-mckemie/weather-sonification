import React, { Component } from "react";

class LocForm extends React.Component {
	render() {
		return (
			<form onSubmit={this.props.loadWeather}>
				<input type="text" name="city" placeholder="City..." />
				<input type="text" name="country" placeholder="Country..." />
				<button>Get Weather</button>
			</form>
		);
	}
}

export default LocForm;
