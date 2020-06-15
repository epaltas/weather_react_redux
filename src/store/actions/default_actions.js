import * as actionTypes from './actionTypes';
import axios from 'axios';

const API_KEY = process.env.REACT_APP_API_ID;

export const currentLocation = () => {
    return dispatch => {
        axios.get('http://ip-api.com/json')
            .then(location => {
                dispatch(currentWeather(location));
                dispatch(localForecast(location));
                dispatch(localHistory(location));
            })
            .catch(error => {
                dispatch({ type: actionTypes.LOCATION_ERROR_MESSAGE, error });
            });
    };
};

export const currentWeather = (location) => {
    const lat = location.data.lat;
    const lon = location.data.lon;
    const CURRENT_URL = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`;

    return dispatch => {
        axios.get(CURRENT_URL)
            .then(weather => {
                dispatch({ type: actionTypes.GET_WEATHER_SUCCESS, weather });
            })
            .catch(error => {
                dispatch({ type: actionTypes.GET_WEATHER_ERROR, error });
            });
    };
};


export const localForecast = (location) => {
    const lat = location.data.lat;
    const lon = location.data.lon;

    const FORECAST_URL = `http://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely&appid=${API_KEY}`;

    return dispatch => {
        axios.get(FORECAST_URL)
            .then(forecast => {
                dispatch({ type: actionTypes.GET_FORECAST_SUCCESS, forecast });
            })
            .catch(error => {
                dispatch({ type: actionTypes.GET_FORECAST_ERROR, error });
            });
    };
}

export const localHistory = (location) => {
    const lat = location.data.lat;
    const lon = location.data.lon;

    function sumarDias(fecha, dias) {
        fecha.setDate(fecha.getDate() + dias);
        return fecha;
    }

    const currentDate = new Date();
    const newDate = sumarDias(currentDate, -1)
    const ts = Math.round(newDate.getTime() / 1000);
    const dt = ts;

    const HISTORY_URL = `http://api.openweathermap.org/data/2.5/onecall/timemachine?lat=${lat}&lon=${lon}&dt=${dt}&appid=${API_KEY}`;


    return dispatch => {
        axios.get(HISTORY_URL)
            .then(history => {
                dispatch({ type: actionTypes.GET_HISTORY_SUCCESS, history });
            })
            .catch(error => {
                dispatch({ type: actionTypes.GET_HISTORY_ERROR, error });
            });
    };
}


