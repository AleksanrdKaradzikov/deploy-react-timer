/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import PropTypes from 'prop-types';
import { Progress } from 'antd';
import TimerDisplay from './timer-display';

// eslint-disable-next-line react/prop-types
const BoxResult = ({ minutes, seconds, persent }) => {
  return (
    <div className="result-box">
      <div className="result-box__progress">
        <Progress
          type="circle"
          width={210}
          format={() => {
            return <TimerDisplay seconds={seconds} minutes={minutes} />;
          }}
          percent={persent}
        />
      </div>
    </div>
  );
};

BoxResult.propTypes = {
  minutes: PropTypes.number,
  seconds: PropTypes.number,
  percent: PropTypes.number,
};

export default BoxResult;
