import React from 'react'

import './Thumbnail.css';

import Label from '../Label/Label';

const Thumbnail = () => {
    return (
        <div className="Thumbnail infosContainer">
            <Label>Miniatura</Label>
            <input type="file" />
        </div>
    )
}

export default Thumbnail
