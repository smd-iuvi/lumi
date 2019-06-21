class User {
  constructor(database, auth) {
    this.database = database;
    this.auth = auth;
  }

  create = ({ name, email, password, role }, callback) => {
    this.auth
      .createUserWithEmailAndPassword(email, password)
      .then(authUser => {
        this.database.ref(`user/${authUser.user.uid}`).set({
          name: name,
          email: email,
          role: role
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

  get = (uid = null) => {
    if (uid == null) {
      return new Promise((resolve, reject) => {
        this.database.ref('user').on('value', snapshot => {
          const users = snapshot.val();

          if (users != null) {
            const usersList = Object.keys(users).map(key => ({
              ...users[key],
              uid: key
            }));

            resolve(usersList);
          } else {
            resolve([]);
          }
        });
      });
    } else {
      return new Promise((resolve, reject) => {
        this.database.ref(`user/${uid}`).on('value', snapshot => {
          const user = snapshot.val();
          resolve(user);
        });
      });
    }
  };

  update = (uid, user) =>
    this.get(uid).set({
      ...user
    });

  delete = uid => this.get(uid).remove();

  addVideoToList = (uid, videoId) => {
    return new Promise((resolve, reject) => {
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
              resolve();
            })
            .catch(error => {
              reject(error);
            });
        });
    });
  };

  getByName = name => {
    return new Promise((resolve, reject) => {
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

            resolve(usersToReturn.lenght == 0 ? null : usersToReturn);
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

export default User;
