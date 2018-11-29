import React, { Component } from "react";

class LocFormZip extends Component {
	render() {
		return (			
				<form onSubmit={this.props.loadWeather}>
					<input type="text" name="zip" placeholder="Zip Code" />
					<button>Get Weather</button>
				</form>			
		);
	}
}

export default LocFormZip;
