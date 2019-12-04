/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import PropTypes from 'prop-types';

const TimerDisplay = ({ minutes, seconds }) => {
  return (
    <div id="countdown" className="countdown">
      <div className="countdown-number">
        <span className="minutes countdown-time">{`${
          minutes < 10 ? `0${minutes}` : minutes
        }`}</span>
      </div>
      <div className="countdown-number">
        <span className="seconsd countdown-time">{`${
          seconds < 10 ? `0${seconds}` : seconds
        }`}</span>
      </div>
    </div>
  );
};

TimerDisplay.propTypes = {
  seconds: PropTypes.number,
  minutes: PropTypes.number,
};

export default TimerDisplay;
