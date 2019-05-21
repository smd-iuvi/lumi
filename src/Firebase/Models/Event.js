class Event {
  constructor(database) {
    this.database = database;
  }

  create = ({ name, description, date, createdBy }) => {
    return new Promise((resolve, reject) => {
      this.database
        .ref('event')
        .push({
          name,
          description,
          date,
          createdBy,
          isAvailable: false
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
      return new Promise((resolve, reject) => {
        this.database
          .ref('event')
          .once('value')
          .then(snapshot => {
            console.log(snapshot.val());
          })
          .catch(error => {
            reject(error);
          });
      });
    } else {
      return new Promise((resolve, reject) => {
        this.database
          .ref(`event/${uid}`)
          .once('value')
          .then(snapshot => {
            console.log(snapshot.val());
          })
          .catch(error => {
            reject(error);
          });
      });
    }
  };

  update = (uid, event) => {
    return new Promise((resolve, reject) => {
      this.database
        .ref(`event/${uid}`)
        .set({
          ...event
        })
        .then(() => {
          resolve();
        })
        .catch(error => {
          reject(error);
        });
    });
  };

  delete = uid => this.database.ref(`event/${uid}`).remove();

  launch = uid => {
    return new Promise((resolve, reject) => {
      this.database
        .ref(`event/${uid}`)
        .once('value')
        .then(snapshot => {
          const newEventState = { ...snapshot.val() };
          newEventState.isAvailable = true;

          this.update(uid, newEventState)
            .then(() => {
              resolve();
            })
            .catch(error => {
              reject(error);
            });
        })
        .catch(error => {
          reject(error);
        });
    });
  };

  addVideo = (eventId, videoId) => {
    return new Promise((resolve, reject) => {
      this.database
        .ref(`event/${eventId}`)
        .once('value')
        .then(snapshot => {
          const newEventState = { ...snapshot.val() };

          if (newEventState.videos && !newEventState.videos.includes(videoId)) {
            newEventState.videos.push(videoId);
          } else {
            newEventState.videos = [videoId];
          }

          this.update(eventId, newEventState)
            .then(() => {
              resolve();
            })
            .catch(error => {
              reject(error);
            });
        })
        .catch(error => {
          reject(error);
        });
    });
  };

  removeVideo = (eventId, videoId) => {
    return new Promise((resolve, reject) => {
      this.database
        .ref(`event/${eventId}`)
        .once('value')
        .then(snapshot => {
          const event = { ...snapshot.val() };
          const videos = event.videos;

          if (videos && videos.includes(videoId)) {
            const newVideos = videos.filter(video => video !== videoId);
            const newEvent = { ...event, videos: newVideos };

            this.update(eventId, newEvent)
              .then(() => resolve())
              .catch(error => reject(error));
          } else {
            resolve();
          }
        })
        .catch(error => {
          reject(error);
        });
    });
  };
}

export default Event;
