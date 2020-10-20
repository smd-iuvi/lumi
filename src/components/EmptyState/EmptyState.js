import React from 'react';
import './EmptyState.css';

const EmptyState = ({ image, description }) => {
    return (
        <div className="EmptyState">
            <img src={image} />
            {description}
        </div>
    );
};

export default EmptyState;
