import React from 'react';
import './Sidebar.css';

import endpoints from '../Endpoints/export';

function Sidebar(props) {
    return <div className="SidebarDocumentation">
        {endpoints.map((item) =>
            <button onClick={() => props.changeBody("OLAAAA")}>{item.name.toString()}</button>
        )}
    </div>
}

export default Sidebar;