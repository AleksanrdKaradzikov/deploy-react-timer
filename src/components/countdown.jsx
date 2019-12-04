import React from 'react';
import BoxResult from './box-result';
import StartInputForm from './start-input-form';
import finishedSound from '../media/audio/finish-sound.mp3';

function validateControl(value, validation, slider) {
  if (!validation || value === '0' || slider) {
    return true;
  }

  let isValid = true;

  if (validation.required) {
    isValid = value.trim() !== '' && isValid;
  }

  if (validation.minMinuts) {
    isValid = value >= validation.minMinuts && isValid;
  }

  if (validation.maxMin) {
    isValid = value <= validation.maxMin && isValid;
  }

  if (validation.minSeconds) {
    isValid = value >= validation.minSeconds && isValid;
  }

  if (validation.maxSecond) {
    isValid = value <= validation.maxSecond && isValid;
  }

  return isValid;
}

function returnFormattedToSeconds(time) {
  const minutes = Math.floor(time / 60);
  const seconds = Math.round(time - minutes * 60);

  return {
    minutes,
    seconds,
  };
}

export default class Countdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      setInput: false,
      isStartValid: true,
      visible: true,
      formControl: {
        min: {
          value: 0,
          type: 'number',
          label: 'Минуты:',
          errorMessage: 'Введите корректное время в минутах',
          valid: true,
          min: 0,
          max: 720,
          touched: false,
          validation: {
            required: true,
            maxMin: 720,
            minMinuts: '0',
            number: true,
            firstWord: true,
          },
        },
        seconds: {
          value: 0,
          type: 'number',
          label: 'Cекунды:',
          errorMessage: 'Введите корректное время в секундах',
          valid: true,
          min: 0,
          max: 59,
          touched: false,
          validation: {
            required: true,
            maxSecond: 59,
            minSeconds: '0',
            number: true,
            firstWord: true,
          },
        },
      },
      slider: {
        value: 0,
      },
      timerData: {
        minutes: 0,
        seconds: 0,
        play: 'Старт',
        init: 0,
        timerId: null,
        persent: 0,
        step: 0,
        totalTime: 0,
      },
    };
  }

  onChangeSlider = value => {
    const time = returnFormattedToSeconds(value);
    const second = time.seconds;
    const { minutes } = time;
    const newTimerData = { ...this.state.timerData };
    newTimerData.seconds = second;
    newTimerData.minutes = minutes;
    newTimerData.step = 100 / (minutes * 60 + second);
    newTimerData.totalTime = time.minutes * 60 + time.seconds;
    newTimerData.persent = 0;

    this.setState(({ slider, timerData }) => {
      slider.value = value;
      timerData = newTimerData;
      return {
        slider,
        timerData,
      };
    });
  };

  checkVisible = () => {
    this.setState(({ visible }) => {
      return {
        visible: !visible,
      };
    });
  };

  onChangeText = (value, controlName = null, slider = null) => {
    if (controlName) {
      const formControl = { ...this.state.formControl };
      const control = { ...formControl[controlName] };
      const timerData = { ...this.state.timerData };

      control.value = value;
      control.touched = value > 0 || value === '' || value < 0;
      control.valid = validateControl(control.value, control.validation, slider);
      formControl[controlName] = control;

      let isStartValid = true;

      Object.keys(formControl).forEach(name => {
        isStartValid = formControl[name].valid && isStartValid;
      });

      if (controlName === 'min' && control.valid) {
        timerData.minutes = +control.value;
      }

      if (controlName === 'seconds' && control.valid) {
        timerData.seconds = +control.value;
      }

      timerData.step = 100 / (timerData.minutes * 60 + timerData.seconds);
      timerData.totalTime = timerData.minutes * 60 + timerData.seconds;
      timerData.persent = 0;

      this.setState({
        formControl,
        isStartValid,
        timerData,
      });
    }
  };

  clearALL = () => {
    clearTimeout(this.state.timerData.timerId);
    this.setState(({ formControl }) => {
      formControl.min.value = 0;
      formControl.min.valid = true;
      formControl.min.touched = false;
      formControl.seconds.value = 0;
      formControl.seconds.valid = true;
      formControl.seconds.touched = false;
      const isStartValid = true;
      const newTimerData = {
        minutes: 0,
        seconds: 0,
        play: 'Старт',
        init: 0,
        step: 0,
        timerId: null,
        totalTime: 0,
      };
      return {
        setInput: false,
        isStartValid,
        timerData: newTimerData,
        formControl,
      };
    });
  };

  clearFields() {
    clearTimeout(this.state.timerData.timerId);
    this.setState(({ timerData }) => {
      timerData.play = 'Старт';
      return {
        timerData,
      };
    });
  }

  startTime() {
    const { totalTime, step } = this.state.timerData;
    const time = returnFormattedToSeconds(totalTime);
    const timerData = { ...this.state.timerData };

    const timerId = setTimeout(() => this.startTime(), 1000);

    timerData.totalTime = totalTime - 1;
    timerData.seconds = time.seconds;
    timerData.minutes = time.minutes;
    timerData.persent += step;
    timerData.timerId = timerId;

    this.setState({
      timerData,
    });

    if (totalTime === 0) {
      const finishedAudio = new Audio(finishedSound);
      finishedAudio.play();
      this.clearALL();
      this.setState(({ timerData: t }) => {
        t.persent = 100;
        return {
          timerData: t,
        };
      });
    }
  }

  findTIME = () => {
    if (
      this.state.timerData.play === 'Старт' &&
      this.state.timerData.init === 0 &&
      (this.state.timerData.minutes > 0 || this.state.timerData.seconds > 0)
    ) {
      this.startTime();
      this.setState(({ formControl, timerData, slider }) => {
        const newTimerData = { ...timerData };
        newTimerData.init = 1;
        newTimerData.play = 'Пауза';
        newTimerData.persent = 0;
        formControl.min.value = 0;
        formControl.seconds.value = 0;
        slider.value = 0;
        return {
          setInput: true,
          formControl,
          timerData: newTimerData,
          slider,
        };
      });
    } else if (this.state.timerData.play === 'Старт' && this.state.timerData.init === 1) {
      this.startTime();
      this.setState(({ timerData }) => {
        timerData.play = 'Пауза';
        return {
          timerData,
        };
      });
    } else {
      this.clearFields();
    }
  };

  render() {
    return (
      <div className="wrapper-timer">
        <BoxResult
          minutes={this.state.timerData.minutes}
          seconds={this.state.timerData.seconds}
          persent={Math.round(this.state.timerData.persent)}
        />
        <StartInputForm
          onChangeText={this.onChangeText}
          onChangeSlider={this.onChangeSlider}
          checkVisible={this.checkVisible}
          visible={this.state.visible}
          slider={this.state.slider}
          formControl={this.state.formControl}
          findTIME={this.findTIME}
          play={this.state.timerData.play}
          isStartValid={this.state.isStartValid}
          reset={this.clearALL}
          setInput={this.state.setInput}
        />
      </div>
    );
  }
}
