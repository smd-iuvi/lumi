class Semester {
  constructor(database) {
    this.database = database;
  }

  create = semester =>
    this.get().push({
      ...semester
    });

  get = (uid = null) => {
    if (uid == null) {
      return new Promise((resolve, reject) => {
        this.database
          .ref('semester')
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
          .ref('semester')
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

  update = (uid, semester) =>
    this.get(uid).set({
      ...semester
    });

  delete = uid => this.get(uid).remove();
}

export default Semester;
