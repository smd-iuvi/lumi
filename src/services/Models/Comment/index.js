import * as QueryableFields from './QueryableFields';

export { QueryableFields };

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
          comment: comment,
          createdAt: new Date().toLocaleDateString()
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

  getCommentsBy = (field, value) => {
    return new Promise((resolve, reject) => {
      this.database
        .ref('comment')
        .orderByChild(field)
        .equalTo(`${value}`)
        .once('value')
        .then(snapshot => {
          const val = snapshot.val();

          if (val) {
            const list = Object.keys(val).map(key => ({
              ...val[key],
              uid: key
            }));

            resolve(list);
          } else {
            resolve(null);
          }
        })
        .catch(error => {
          reject(error);
        });
    });
  };
}

export default Comment;
