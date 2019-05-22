import React, { Component } from 'react'
import x from '../../assets/x.svg';
import './Tag.css';

class Tag extends Component {
    removeTag = () => {
        this.props.deleteTag(this.props.children);
    }
    render() {
        return (
            <div className="Tag">
                <article className="tagLabel">{this.props.children}<img src={x} onClick={this.removeTag} /></article>
            </div>
        );
    }
}

export default Tag
