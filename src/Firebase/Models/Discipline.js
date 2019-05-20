class Discipline {
  constructor(database) {
    this.database = database;
  }

  create = discipline =>
    this.get().push({
      ...discipline
    });

  get = (uid = null) => {
    if (uid == null) {
      this.database.ref('discipline');
    } else {
      this.database.ref(`discipline/${uid}`);
    }
  };

  update = (uid, discipline) =>
    this.get(uid).set({
      ...discipline
    });

  delete = uid => this.get(uid).remove();

  getByName = (name, callback) => {
    this.database
      .ref('discipline')
      .once('value')
      .then(snapshot => {
        const disciplines = snapshot.val();

        if (disciplines != null) {
          const disciplinesList = Object.keys(disciplines).map(key => ({
            ...disciplines[key],
            uid: key
          }));

          const disciplinesToReturn = disciplinesList.filter(user => {
            return user.title.toLowerCase().includes(name.toLowerCase());
          });

          callback(disciplinesToReturn, null);
        } else {
          callback([], null);
        }
      })
      .catch(error => {
        callback([], error);
      });
  };
}

export default Discipline;
