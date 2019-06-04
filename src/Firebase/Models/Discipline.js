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
      return new Promise((resolve, reject) => {
        this.database
          .ref('discipline')
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
          .ref('discipline')
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

  update = (uid, discipline) =>
    this.get(uid).set({
      ...discipline
    });

  delete = uid => this.get(uid).remove();

  getByName = name => {
    return new Promise((resolve, reject) => {
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

            const disciplinesToReturn = disciplinesList.filter(discipline => {
              return discipline.name.toLowerCase().includes(name.toLowerCase());
            });

            resolve(
              disciplinesToReturn.length == 0 ? null : disciplinesToReturn
            );
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

export default Discipline;
