import React, { Component } from 'react';

import './AddTags.css';

import Tag from './Tag/Tag';

class AddTags extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      users: [
        'Gleislla Monteiro',
        'Mateus Santos',
        'Paulo José',
        'Rebecca Dantas'
      ]
    };
    this.handleChange = this.handleChange.bind(this);
    this.keyPress = this.keyPress.bind(this);
  }

  handleChange(e) {
    this.setState({ value: e.target.value });
  }

  keyPress(e) {
    const { onChange, name, value } = this.props;
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
        this.setState({ value: '' });
      }
    }
  }

  deleteTag = e => {
    const { onChange, name, value } = this.props;
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

  render() {
    const { value } = this.props;
    return (
      <div className="AddTags infosContainer">
        {this.props.list && (
          <datalist id="users">
            {this.state.users.map(user => (
              <option>{user}</option>
            ))}
          </datalist>
        )}
        <input
          type="text"
          list="users"
          placeholder={this.props.placeholder}
          value={this.state.value}
          onKeyDown={this.keyPress}
          onChange={this.handleChange}
          className="Small-Text-Regular"
        />
        {
          <div className="tags">
            {value.map(tag => (
              <Tag deleteTag={this.deleteTag}>{tag}</Tag>
            ))}
          </div>
        }
      </div>
    );
  }
}

export default AddTags;
