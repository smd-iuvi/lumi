import React, { useState } from 'react';

import './AddTags.css';

import Tag from './Tag/Tag';

function AddTags(props) {
  const [value, setValue] = useState([]);
  const [users, setUsers] = useState([
    'Gleislla Monteiro',
    'Mateus Santos',
    'Paulo José',
    'Rebecca Dantas'
  ]);

  function keyPress(e) {
    const { onChange, name, value } = props;
    if (e.keyCode == 13) {
      if (
        e.target.value != null &&
        e.target.value != '' &&
        e.target.value != ' '
      ) {
        const getTags = value;
        getTags.push(e.target.value);
        const event = {
          target: {
            name: name,
            value: getTags
          }
        };
        onChange(event);
        setValue([]);
      }
    }
  }

  function deleteTag(e) {
    const { onChange, name, value } = props;
    let aux = value;
    for (let i = 0; i < aux.length; i++) {
      if (aux[i] == e) {
        aux.splice(i, 1);
        const event = {
          target: {
            name: name,
            value: aux
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
        value={value}
        onKeyDown={keyPress}
        onChange={e => setValue(e.target.value)}
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
