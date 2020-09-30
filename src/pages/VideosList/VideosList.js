import React from 'react';
import './VideosList.css';

import { withRouter } from 'react-router-dom';
import Header from '../../components/Header/Header';
import CardList from '../../components/CardList/CardList';

function VideosList(props) {
    const { title, videos } = props.location.state;
    return (
        <div className="container">
            <Header>{title}</Header>
            <CardList videos={videos} loading={false} />
        </div>
    );
}

export default withRouter(VideosList);
