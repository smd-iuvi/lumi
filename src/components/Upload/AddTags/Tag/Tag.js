import React from 'react'
import x from '../../assets/x.svg';
import './Tag.css';

function Tag(props) {
    function removeTag() {
        props.deleteTag(props.children);
    }

    return (
        <div className="Tag">
            <article className="tagLabel Small-Text-Regular">{props.children}<img src={x} onClick={removeTag} /></article>
        </div>
    );
}

export default Tag
