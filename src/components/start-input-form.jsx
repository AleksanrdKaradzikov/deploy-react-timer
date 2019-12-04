/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import PropTypes from 'prop-types';
import { Icon, Input, Button, Slider, Checkbox } from 'antd';

const isInValid = (valid, touched, showldValidate) => {
  if (valid === false && showldValidate && touched) {
    return true;
  }
  return false;
};

export default class StartInputForm extends React.Component {
  renderInputs(formControl, setInput) {
    return Object.keys(formControl).map((controlName, index) => {
      const control = formControl[controlName];
      const htmlFor = `${control.type}-${Math.random()}`;
      const inputClass = isInValid(control.valid, control.touched, !!control.validation)
        ? 'input invalid-input'
        : 'input';
      const labelClass = isInValid(control.valid, control.touched, !!control.validation)
        ? 'label invalid-label'
        : 'label';
      return (
        <div key={controlName + index} className="input-box">
          <label className={labelClass} htmlFor={htmlFor}>
            {control.label}
          </label>
          <Slider
            id={htmlFor}
            min={control.min}
            max={control.max}
            onChange={value => this.props.onChangeText(value, controlName, 'slider')}
            disabled={setInput}
            value={control.value === '' ? 0 : +control.value}
          />
          <Input
            min={control.min}
            max={control.max}
            className={inputClass}
            id={htmlFor}
            prefix={<Icon type="arrow-right" style={{ color: 'rgba(0,0,0,.25)' }} />}
            type={control.type || 'text'}
            disabled={setInput}
            required={control.validation.required}
            value={control.value}
            onChange={e => this.props.onChangeText(e.target.value, controlName)}
          />

          {isInValid(control.valid, control.touched, !!control.validation) ? (
            <span className="error-message">
              {control.errorMessage || 'Введите корректное значение'}
            </span>
          ) : null}
        </div>
      );
    });
  }

  renderSlider() {
    const { onChangeSlider, slider, setInput } = this.props;
    return (
      <div className="form-control__slider-block">
        <p className="form-control__slider-text">Секунды:</p>
        <Slider
          disabled={setInput}
          min={0}
          max={3600}
          onChange={value => onChangeSlider(value)}
          value={slider.value}
          step={15}
        />
      </div>
    );
  }

  handleSubmitForm = e => {
    e.preventDefault();
  };

  render() {
    const {
      isStartValid,
      findTIME,
      play,
      reset,
      formControl,
      setInput,
      visible,
      checkVisible,
    } = this.props;
    return (
      <form className="form-control" onSubmit={this.handleSubmitForm}>
        <div className="form-control__checked-block">
          <label className="form-control__check-text" htmlFor="checkText">
            Задать время через текстовые поля:
            <Checkbox
              checked={visible}
              className="form-control__check-input"
              id="checkText"
              onChange={() => checkVisible()}
            />
          </label>
        </div>
        {visible ? (
          <div className="form-control__inputs-block">
            {this.renderInputs(formControl, setInput)}
          </div>
        ) : (
          this.renderSlider()
        )}
        <div className="form-control__buttons-block">
          <Button
            onClick={() => findTIME()}
            disabled={!isStartValid}
            className="control-btn"
            size="large"
            type="primary"
            htmlType="submit"
          >
            {play}
          </Button>
          <Button
            onClick={() => reset()}
            className="control-btn"
            size="large"
            type="danger"
            htmlType="submit"
          >
            Сбросить
          </Button>
        </div>
      </form>
    );
  }
}

StartInputForm.propTypes = {
  formControl: PropTypes.object,
  findTIME: PropTypes.func,
  play: PropTypes.string,
  reset: PropTypes.func,
  setInput: PropTypes.bool,
  visible: PropTypes.bool,
  checkVisible: PropTypes.func,
  isStartValid: PropTypes.bool,
  onChangeSlider: PropTypes.func,
  onChangeText: PropTypes.func,
  slider: PropTypes.object,
};
