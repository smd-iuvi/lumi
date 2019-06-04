class Gender {
  constructor(database) {
    this.database = database;
  }

  create = gender =>
    this.get().push({
      ...gender
    });

  get = (uid = null) => {
    if (uid == null) {
      return new Promise((resolve, reject) => {
        this.database
          .ref('genre')
          .once('value')
          .then(snapshot => {
            const value = snapshot.val();

            if (value != null) {
              const valueList = Object.keys(value).map(key => ({
                ...value[key],
                uid: key
              }));

              resolve(valueList);
            } else {
              resolve(null);
            }
          })
          .catch(error => {
            reject(error);
          });
      });
    } else {
      return new Promise((resolve, reject) => {
        this.database
          .ref('genre')
          .once('value')
          .then(snapshot => {
            resolve(snapshot.val());
          })
          .catch(error => {
            reject(error);
          });
      });
    }
  };

  update = (uid, gender) =>
    this.get(uid).set({
      ...gender
    });

  delete = uid => this.get(uid).remove();
}

export default Gender;
