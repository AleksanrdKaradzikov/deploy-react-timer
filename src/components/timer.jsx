import React from 'react';
import { Button } from 'antd';

export default class Timer extends React.Component {
  constructor() {
    super();
    this.state = {
      hours: 0,
      minutes: 0,
      seconds: 0,
      msSeconds: 0,
      play: 'Старт',
    };
    this.clockTimer = null;
    this.init = 0;
    this.startDate = null;
  }

  clearFields() {
    this.setState({
      play: 'Старт',
    });
    clearTimeout(this.clockTimer);
  }

  clearALL = () => {
    this.init = 0;
    clearTimeout(this.clockTimer);
    this.setState({
      hours: 0,
      minutes: 0,
      seconds: 0,
      msSeconds: 0,
      play: 'Старт',
    });
  };

  startTime(startDate) {
    const thisDate = new Date();
    let t = thisDate.getTime() - startDate.getTime();
    let ms = t % 1000;
    t -= ms;
    ms = Math.floor(ms / 10);
    t = Math.floor(t / 1000);
    const s = t % 60;
    t -= s;
    t = Math.floor(t / 60);
    const m = t % 60;
    t -= m;
    t = Math.floor(t / 60);
    const h = t % 60;
    if (this.init === 1) {
      this.setState({
        hours: h,
        minutes: m,
        seconds: s,
        msSeconds: ms,
      });
    }
    this.clockTimer = setTimeout(() => this.startTime(startDate), 10);
  }

  findTIME = () => {
    if (this.state.play === 'Старт' && this.init === 0) {
      this.startDate = new Date();
      this.startTime(this.startDate);
      this.setState({
        play: 'Пауза',
      });
      this.init = 1;
    } else if (this.state.play === 'Старт' && this.init === 1) {
      this.startTime(this.startDate);
      this.setState({
        play: 'Пауза',
      });
    } else {
      this.clearFields();
    }
  };

  render() {
    let { hours, minutes, seconds, msSeconds } = this.state;

    hours = hours < 10 ? `0${hours}` : hours;
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    seconds = seconds < 10 ? `0${seconds}` : seconds;
    msSeconds = msSeconds < 10 ? `0${msSeconds}` : msSeconds;

    return (
      <div className="timer-container">
        <div id="countdown" className="countdown">
          <div className="countdown-number">
            <span className="hours countdown-time">{hours}</span>
            <span className="countdown-text">Часы</span>
          </div>
          <div className="countdown-number">
            <span className="minutes countdown-time">{minutes}</span>
            <span className="countdown-text">Минуты</span>
          </div>
          <div className="countdown-number">
            <span className="seconds countdown-time">{seconds}</span>
            <span className="countdown-text">Секунды</span>
          </div>
          <div className="countdown-number">
            <span className="msseconds countdown-time">{msSeconds}</span>
            <span className="countdown-text">Милисекунды</span>
          </div>
        </div>
        <div className="btn-block">
          <Button onClick={this.findTIME} className="btn-clock" size="large" type="primary">
            {this.state.play}
          </Button>
          <Button onClick={this.clearALL} className="btn-clock" size="large" type="danger">
            Сбросить
          </Button>
        </div>
      </div>
    );
  }
}
