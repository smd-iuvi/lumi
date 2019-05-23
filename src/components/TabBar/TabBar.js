import React, { Component } from 'react';
import './TabBar.css';

import Header from '../Header/Header';

class TabBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            active: 0
        }
        this.handleTab = this.handleTab.bind(this);
    }


    handleTab(event) {
        this.setState({ active: event.target.id });
    }

    render() {
        return (
            <div className="tabBar">
                <div className="titleTabBar">
                    <article><img src={this.props.icon} /></article>
                    <Header>{this.props.title}</Header>
                </div>
                <div className="tabs">
                    {this.props.tabs.map(tb => (
                        <>
                            {this.props.tabs.indexOf(tb) == this.state.active ?
                                <article className="tab active"
                                    onClick={this.handleTab}
                                    id={this.props.tabs.indexOf(tb)}>
                                    {tb}
                                </article>
                                :
                                <article className="tab"
                                    onClick={this.handleTab}
                                    id={this.props.tabs.indexOf(tb)}>
                                    {tb}
                                </article>
                            }
                        </>
                    ))}
                </div>
            </div>
        );
    }
}

export default TabBar;
