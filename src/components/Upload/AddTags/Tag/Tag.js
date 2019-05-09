import React from 'react'

import './Tag.css';

const Tag = (props) => {
    return (
        <div className="Tag">
            <article className="tagLabel">{props.children}</article>
        </div>
    )
}

export default Tag
