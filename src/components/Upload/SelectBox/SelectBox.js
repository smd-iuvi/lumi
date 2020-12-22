import React, { useState } from 'react';

import './SelectBox.css';

function SelectBox(props) {
  // const [name, setName] = useState('');
  const [options, setOptions] = useState([]);

  function onChange(e) {
    const { onChange } = props;
    e.preventDefault();
    onChange(e);
  };

  const { name, value, isValid, dataSource = [] } = props;

  let classes = '';
  if (isValid || isValid == null) {
    classes = 'SelectBox infosContainer valid';
  } else {
    classes = 'SelectBox infosContainer invalid';
  }

  console.log(dataSource)

  return (
    <div className={classes}>
      <select
        name={name}
        onChange={onChange}
        value={value}
        className="Medium-Text-Regular"
      >
        <option value="" disabled selected hidden>
          {props.placeholder}
        </option>
        {dataSource.map(op => {
          if (op.name && op.uid) {
            return < option value={op.uid}>{op.name}</option>
          } else {
            return <option value={op}>{op}</option>
          }
        })
        }
      </select>
    </div >
  );
}

export default SelectBox;
