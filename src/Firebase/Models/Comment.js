class Comment {
  constructor(database) {
    this.database = database;
  }

  create = ({ videoId, userId, comment }, callback) => {
    return new Promise((resolve, reject) => {
      this.database
        .ref('comment')
        .push({
          videoId: videoId,
          userId: userId,
          comment: comment
        })
        .then(() => {
          resolve();
        })
        .catch(error => {
          reject(error);
        });
    });
  };

  get = (uid = null) => {
    if (uid == null) {
      this.database.ref('comment');
    } else {
      this.database.ref(`comment/${uid}`);
    }
  };

  update = (uid, comment) =>
    this.get(uid).set({
      ...comment
    });

  delete = (uid, callback) => {
    this.database
      .ref(`comment/${uid}`)
      .remove()
      .then(() => {
        callback(null);
      })
      .catch(error => {
        console.log(error);
      });
  };
}

export default Comment;
