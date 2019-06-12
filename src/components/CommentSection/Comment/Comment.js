import React, { Component } from 'react';
import './Comment.css';
import Person from '../../Sidebar/assets/profile.jpg';
import { withFirebase } from '../../../Firebase';

class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: 'Carregando...',
      userPhoto: null
    };
  }

  componentDidMount() {
    const { firebase, comment } = this.props;
    firebase.user
      .get(comment.userId)
      .then(user =>
        this.setState({ userName: user.name, userPhoto: user.photo_url })
      );
  }

  render() {
    const { children, comment } = this.props;
    const { userName, userPhoto } = this.state;
    return (
      <div className="Comment">
        <div className="infosUser">
          <img
            src={userPhoto ? userPhoto : Person}
            className="imgUserComment"
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

export default withFirebase(Comment);
