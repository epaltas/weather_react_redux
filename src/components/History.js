import React from 'react';

const style = {
	fontSize: '20px',
 };

const History = (props) => {
  return (

    props.error
      ? <div className="row">
        <div className="col-12 text-center">
          <p>Can't retrieve history data at the moment.</p>
        </div>
      </div>
      : <div className="row">
          
        {props.history.slice(1).map((value, index) => {
          return (
            <div className="col-md-2 text-center" key={1}>
              <div>
                <strong style={style}>{(new Date(value.dt * 1000)).toDateString().substring(0, 3)}</strong>
              </div>
              <div>
                <strong style={style}>{(new Date(value.dt * 1000)).getHours()}:{(new Date(value.dt * 1000)).getMinutes()}:{(new Date(value.dt * 1000)).getSeconds()}</strong>
              </div>
              <div>
                <img className="forecastIcon" alt='weather icon' src={props.icon[value.weather[0].icon]} />
              </div>
              <div className="temps">
                <div>
                  <span className="highTemp">{Math.round((value.temp) * (9 / 5) - 459.67)}&#8457;</span>
                  <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                  <span className="highTemp">{Math.round(value.temp - 273)}&#8451;</span>
                  <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                </div>
              </div>
            </div>
          )
        })}
      </div>
  );
}

export default History;