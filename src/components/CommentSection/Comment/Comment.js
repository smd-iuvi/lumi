import React, { Component } from 'react';
import './Comment.css';
import Person from '../assets/user-placeholder.svg';
import { withServiceManager } from '../../../services';

class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: 'Carregando...',
      userPhoto: null
    };
  }

  componentDidMount() {
    const { serviceManager, comment } = this.props;
    serviceManager.user
      .get(comment.userId)
      .then(user =>
        this.setState({ userName: user.name, userPhoto: user.photo_url })
      );
  }

  render() {
    const { children, comment } = this.props;
    const { userName, userPhoto } = this.state;
    const style = {
      backgroundImage: `url(${userPhoto ? userPhoto : Person})`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover'
    };
    return (
      <div className="Comment">
        <div className="infosUser">
          <article
            className="imgUserComment"
            style={style}
          />
          <h1 className="Small-Text-Bold">{userName}</h1>
          <h1 className="Small-Text-Regular">
            {comment.createdAt ? comment.createdAt : '3 dias atrás'}
          </h1>
        </div>
        <h1 className="Small-Text-Regular contentComment">{children}</h1>
      </div>
    );
  }
}

export default withServiceManager(Comment);
