import React, { useState } from 'react';
import './Tabs.css';

function Tabs(props) {
  const [active, setActive] = useState();

  function handleTab(event) {
    const { onTabChange } = props;
    onTabChange(event.target.id);
    setActive(event.target.id);
  }

  const { selected } = props;
  return (
    <div className="tabs">
      {props.tabs.map(tb => (
        <>
          {props.tabs.indexOf(tb) == selected ? (
            <article
              className="Small-Text-Regular tab active"
              onClick={handleTab}
              id={props.tabs.indexOf(tb)}
            >
              {tb}
            </article>
          ) : (
              <article
                className="Small-Text-Regular tab"
                onClick={handleTab}
                id={props.tabs.indexOf(tb)}
              >
                {tb}
              </article>
            )}
        </>
      ))}
    </div>
  );
}

export default Tabs;
