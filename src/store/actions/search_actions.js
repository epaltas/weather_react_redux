import * as actionTypes from './actionTypes';
import axios from 'axios';

const API_KEY = process.env.REACT_APP_OPENWEATHERMAP_API;

export const locationWeather = (cityName) => {
    
     const SEARCH_URL = `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}`;

    return dispatch => {
        axios.get(SEARCH_URL)
            .then(location => {
                dispatch(fetchWeather(location));
                dispatch(searchForecast(location));
                dispatch(searchHistory(location));
            })
            .catch(error => {
                dispatch({ type: actionTypes.LOCATION_ERROR_MESSAGE, error });
            });
    };
}

export const fetchWeather = (location) => {
    const lat = location.data.coord.lat;
    const lon = location.data.coord.lon;

    const SEARCH_URL =`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`;

    return dispatch => {
        axios.get(SEARCH_URL)
            .then(weather => {
                dispatch({ type: actionTypes.GET_WEATHER_SUCCESS, weather });
            })
            .catch(error => {
                dispatch({ type: actionTypes.GET_WEATHER_ERROR, error });
            });
    };
};

export const searchForecast = (location) => {

    const lat = location.data.coord.lat;
    const lon = location.data.coord.lon;

    const SEARCH_FORECAST_URL = `http://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minute&appid=${API_KEY}`;

    return dispatch => {
        axios.get(SEARCH_FORECAST_URL)
            .then(forecast => {
                dispatch({ type: actionTypes.GET_FORECAST_SUCCESS, forecast });
            })
            .catch(error => {
                dispatch({ type: actionTypes.GET_FORECAST_ERROR, error });
            });
    };
}

export const searchHistory = (location) => {
    const lat = location.data.coord.lat;
    const lon = location.data.coord.lon;

    function sumarDias(fecha, dias) {
        fecha.setDate(fecha.getDate() + dias);
        return fecha;
    }

    const currentDate = new Date();
    const newDate = sumarDias(currentDate, -1)
    const ts = Math.round(newDate.getTime() / 1000);
    const dt = ts;

    const SEARCH_HISTORY_URL = `http://api.openweathermap.org/data/2.5/onecall/timemachine?lat=${lat}&lon=${lon}&dt=${dt}&appid=${API_KEY}`;


    return dispatch => {
        axios.get(SEARCH_HISTORY_URL)
            .then(history => {
                dispatch({ type: actionTypes.GET_HISTORY_SUCCESS, history });
            })
            .catch(error => {
                dispatch({ type: actionTypes.GET_HISTORY_ERROR, error });
            });
    };
}


