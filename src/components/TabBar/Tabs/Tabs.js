import React, { Component } from 'react';
import './Tabs.css';

class Tabs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            active: 0
        };
    }

    handleTab = event => {
        const { onTabChange } = this.props;
        onTabChange(event.target.id);
        this.setState({ active: event.target.id });
    };

    render() {
        return (
            <div className="tabs">
                {this.props.tabs.map(tb => (
                    <>
                        {this.props.tabs.indexOf(tb) == this.state.active ? (
                            <article
                                className="tab active"
                                onClick={this.handleTab}
                                id={this.props.tabs.indexOf(tb)}
                            >
                                {tb}
                            </article>
                        ) : (
                                <article
                                    className="tab"
                                    onClick={this.handleTab}
                                    id={this.props.tabs.indexOf(tb)}
                                >
                                    {tb}
                                </article>
                            )}
                    </>
                ))}
            </div>
        );
    }
}

export default Tabs;
