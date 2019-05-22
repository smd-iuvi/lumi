import React, { Component } from 'react';

import './AddTags.css';

import Tag from './Tag/Tag';

class AddTags extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            tags: [],
            users: ["Gleislla Monteiro", "Mateus Santos", "Paulo José", "Rebecca Dantas"]
        };
        this.handleChange = this.handleChange.bind(this);
        this.keyPress = this.keyPress.bind(this);
    }

    handleChange(e) {
        this.setState({ value: e.target.value });
    }

    keyPress(e) {
        if (e.keyCode == 13) {
            if (e.target.value != null && e.target.value != '' && e.target.value != ' ') {
                const getTags = this.state.tags;
                getTags.push(e.target.value);
                this.setState({ tags: getTags, value: '' });
            }
        }
    }

    deleteTag = (e) => {
        let aux = this.state.tags;
        for (let i = 0; i < aux.length; i++) {
            if (aux[i] == e) {
                aux.splice(i, 1);
                this.setState({ tags: aux });
            }
        }
    }

    render() {
        return (
            <div className="AddTags infosContainer">
                {this.props.list &&
                    <datalist id="users">
                        {this.state.users.map((user) =>
                            <option>{user}</option>
                        )}
                    </datalist>
                }
                <input type="text" list="users" placeholder={this.props.placeholder} value={this.state.value} onKeyDown={this.keyPress} onChange={this.handleChange} />
                {
                    <div className="tags">
                        {this.state.tags.map((tag) =>
                            <Tag deleteTag={this.deleteTag}>{tag}</Tag>
                        )}
                    </div>
                }
            </div>
        )
    }
}

export default AddTags
