import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from '../store/actions';

const style = {
	width: '300px',
	fontSize: '20px',
 };

class SearchBar extends Component {
	constructor(props) {
		super(props);

		this.state = { term: '' };

		this.onInputChange = this.onInputChange.bind(this);
		this.onFormSubmit = this.onFormSubmit.bind(this);
	}

	onInputChange(event) {
		this.setState({ term: event.target.value });
	}

	onFormSubmit(event) {
		event.preventDefault();
		this.props.locationWeather(this.state.term);
		this.setState({ term: '' });
		this.props.history.push('/results');
	}

	render() {
		return (
			<form onSubmit={this.onFormSubmit} className="form-inline">
				<div className="form-group">
					<label htmlFor="City Name"></label>
					<select
					style={style}
						defaultValue="1"
						className="form-control form-control-lg"
						onChange={this.onInputChange}>
						<option value="1">Select a city</option>
						<option value="quito">Quito</option>
						<option value="guayaquil">Guayaquil</option>
						<option value="cuenca">Cuenca</option>
						<option value="napo">Napo</option>
						<option value="ibarra">Ibarra</option>
						<option value="riobamba">Riobamba</option>
						<option value="ambato">Ambato</option>
						<option value="manta">Manta</option>
						<option value="latacunga">Latacunga</option>
					</select>
				</div>
				<input type="submit" className="btn btn-default btn-lg form-group" />
			</form>
		);
	}
}

const mapDispatchToProps = dispatch => {
	return {
		locationWeather: (cityName) => dispatch(actions.locationWeather(cityName)),
	}
}

export default connect(null, mapDispatchToProps)(withRouter(SearchBar));