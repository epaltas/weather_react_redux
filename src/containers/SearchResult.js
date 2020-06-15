import React, { Component } from 'react';
import { connect } from 'react-redux';
import SearchBar from './Searchbar';
import CurrentDate from '../components/CurrentDate';
import Forecast from '../components/Forecast';
import CurrentWeather from '../components/CurrentWeather';
import History from '../components/History';

class SearchResult extends Component {

	render() {

		const setSearchLocation = (
			this.props.error
				? <h1 className="text-center">Enter a valid location</h1>
				: <h1 className="text-center">{this.props.city} {this.props.country}</h1>
		);

		const showDate = (
			this.props.error
				? null
				: <CurrentDate date={this.props.date} />
		);

		const changeView = (
			this.props.city && this.props.country
				? <CurrentWeather
					error={this.props.error}
					description={this.props.description}
					icon={this.props.icon}
					weatherIcon={this.props.weatherIcon}
					currentTemp={this.props.currentTemp}
					maxTemp={this.props.maxTemp}
					minTemp={this.props.minTemp}
					wind={this.props.wind}
					humidity={this.props.humidity}
					fahrenheit={this.props.fahrenheit}
					currentTempF={this.props.currentTempF}
					minTempF={this.props.minTempF}
					maxTempF={this.props.maxTempF}
				/>
				: null
		);

		return (
			<div><div className="text-center">
				{setSearchLocation}
				<SearchBar />
				<h5 className="text-center">
					<i>{showDate}</i>
				</h5>
				<br />
				{changeView}
				<Forecast
					forecast={this.props.forecast}
					icon={this.props.icon}
					units={this.props.fahrenheit}
					error={this.props.error}
				/>

			</div>
				<h1 style={{ color: 'red' }}>Historical weather data</h1>
				<br />
				<div>
					<History
						history={this.props.history}
						icon={this.props.icon}
						units={this.props.fahrenheit}
						error={this.props.error}
					/>
				</div>
			</div>

		);
	}
}

const mapStateToProps = state => {
	return {
		error: state.loadingError,
		city: state.city,
		country: state.country,
		date: state.date,
		description: state.description,
		icon: state.icon,
		weatherIcon: state.weatherIcon,
		currentTemp: state.currentTemp,
		currentTempF: state.currentTempF,
		minTemp: state.minTemp,
		minTempF: state.minTempF,
		maxTemp: state.maxTemp,
		maxTempF: state.maxTempF,
		wind: state.wind,
		humidity: state.humidity,
		forecast: state.forecast,
		fahrenheit: state.fahrenheit,
		history: state.history
	}
}

export default connect(mapStateToProps)(SearchResult);