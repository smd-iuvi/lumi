import React, { useEffect } from 'react';
import './Sidebar.css';

import logo from './assets/lumi.svg';
import endpoints from '../Endpoints/export';
import Content from '../Content/Content';

function Sidebar(props) {
    useEffect(() => {
        updateBody(endpoints[0]);
    }, []);

    function updateBody(endpoint) {
        props.changeBody(<Content endpoint={endpoint} />)
    }

    return <div className="sidebar SidebarDocumentation">
        <img src={logo} />
        {endpoints.map((item) =>
            <h1 className="buttonsSidebar Medium-Text-Regular"
                onClick={() => updateBody(item)}>
                {item.name}
            </h1>
        )}
    </div>
}

export default Sidebar;