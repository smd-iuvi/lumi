class Event {
  constructor(database) {
    this.database = database;
  }

  create = ({ name, description, date, createdBy }, callback) => {
    this.database
      .ref('event')
      .push({
        name,
        description,
        date,
        createdBy
      })
      .then(() => {
        callback(null);
      })
      .catch(error => {
        callback(error);
      });
  };

  get = (uid = null) => {
    if (uid == null) {
      this.database.ref('event');
    } else {
      this.database.ref(`event/${uid}`);
    }
  };

  update = (uid, event) =>
    this.get(uid).set({
      ...event
    });

  delete = uid => this.get(uid).remove();
}

export default Event;
