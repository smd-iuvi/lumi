import React, { Component } from 'react';

import './SelectBox.css';

class SelectBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      options: []
    };
  }

  onChange = e => {
    const { onChange } = this.props;
    e.preventDefault();
    onChange(e);
  };

  render() {
    const { onChange, name, value, isValid, dataSource = [] } = this.props;

    let classes = '';
    if (isValid || isValid == null) {
      classes = 'SelectBox infosContainer valid';
    } else {
      classes = 'SelectBox infosContainer invalid';
    }

    return (
      <div className={classes}>
        <select
          name={name}
          onChange={onChange}
          value={value}
          className="Medium-Text-Regular"
        >
          <option value="" disabled selected hidden>
            {this.props.placeholder}
          </option>
          {dataSource.map(op => (
            <option value={op}>{op}</option>
          ))}
        </select>
      </div>
    );
  }
}

export default SelectBox;
