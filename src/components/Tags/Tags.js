import React from 'react';
import './Tags.css';

const Tags = ({ tags = [] }) => {
  return (
    <div>
      <div className="Tags">
        {tags &&
          tags.map(tag => (
            <article className="tag Small-Text-Regular">{tag}</article>
          ))}
      </div>
    </div>
  );
};

export default Tags;
