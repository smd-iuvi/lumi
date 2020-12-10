import React, { useState } from 'react';

import './AddTags.css';

import Tag from './Tag/Tag';

function AddTags(props) {
  const [inputValue, setInputValue] = useState('')
  const [users, setUsers] = useState([
    'Gleislla Monteiro',
    'Mateus Santos',
    'Paulo José',
    'Rebecca Dantas'
  ]);

  const { value } = props

  function keyPress(e) {
    const { onChange, name, value } = props;
    if (e.keyCode == 13) {
      if (
        e.target.value != null &&
        e.target.value != '' &&
        e.target.value != ' '
      ) {
        const getTags = [...value];
        getTags.push(e.target.value);
        const event = {
          target: {
            name: name,
            value: getTags
          }
        };
        onChange(event);
        setInputValue('')
      }
    }
  }

  function deleteTag(e) {
    const { onChange, name, value } = props;
    let aux = value;
    for (let i = 0; i < aux.length; i++) {
      if (aux[i] == e) {
        const newTags = [...aux.splice(i, 1)];
        const event = {
          target: {
            name: name,
            value: newTags
          }
        };
        onChange(event);
      }
    }
  };

  return (
    <div className="AddTags infosContainer">
      {props.list && (
        <datalist id="users">
          {users.map(user => (
            <option>{user}</option>
          ))}
        </datalist>
      )}
      <input
        type="text"
        list="users"
        placeholder={props.placeholder}
        value={inputValue}
        onKeyDown={keyPress}
        onChange={e => setInputValue(e.target.value)}
        className="Small-Text-Regular"
      />
      {
        <div className="tags">
          {value.map(tag => (
            <Tag deleteTag={deleteTag}>{tag}</Tag>
          ))}
        </div>
      }
    </div>
  );
}

export default AddTags;
