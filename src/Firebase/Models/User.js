class User {
  constructor(database, auth) {
    this.database = database;
    this.auth = auth;
  }

  create = (
    { name, email, password, username, role, birthday, photo_url },
    callback
  ) => {
    this.auth
      .createUserWithEmailAndPassword(email, password)
      .then(authUser => {
        this.database.ref(`user/${authUser.user.uid}`).set({
          name: name,
          email: email,
          username: username,
          role: role,
          birthday: birthday,
          photo_url: photo_url
        });
      })
      .then(user => {
        console.log('Created');
        callback(user, null);
      })
      .catch(error => {
        callback(null, error);
      });
  };

  get = (uid = null, callback) => {
    if (uid == null) {
      this.database.ref('user').on('value', snapshot => {
        const users = snapshot.val();

        if (users != null) {
          const usersList = Object.keys(users).map(key => ({
            ...users[key],
            uid: key
          }));

          callback(usersList);
        } else {
          callback(null);
        }
      });
    } else {
      this.database.ref(`user/${uid}`).on('value', snapshot => {
        const user = snapshot.val();
        callback(user);
      });
    }
  };

  update = (uid, user) =>
    this.get(uid).set({
      ...user
    });

  delete = uid => this.get(uid).remove();

  addVideoToList = (uid, videoId, callback) => {
    this.database
      .ref(`user/${uid}`)
      .once('value')
      .then(snapshot => {
        const user = snapshot.val();

        let newList = [];

        if (user.watchList == null || user.watchList.length === 0) {
          newList.push(videoId);
        } else {
          if (user.watchList.includes(videoId)) {
            newList = user.watchList.filter(item => item !== videoId);
          } else {
            newList = [...user.watchList, videoId];
          }
        }

        this.database
          .ref(`user/${uid}`)
          .update({
            watchList: newList
          })
          .then(user => {
            callback(null);
          })
          .catch(error => {
            callback(error);
          });
      });
  };

  getByName = (name, callback) => {
    this.database
      .ref('user')
      .once('value')
      .then(snapshot => {
        const users = snapshot.val();

        if (users != null) {
          const usersList = Object.keys(users).map(key => ({
            ...users[key],
            uid: key
          }));

          const usersToReturn = usersList.filter(user => {
            return user.name.includes(name);
          });

          callback(usersToReturn, null);
        } else {
          callback([], null);
        }
      })
      .catch(error => {
        callback([], error);
      });
  };
}

export default User;
