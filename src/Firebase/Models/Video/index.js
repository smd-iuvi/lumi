import * as QueryableFields from './QueryableFields';

export { QueryableFields };

class Video {
  constructor(database) {
    this.database = database;
  }

  create = video => {
    return new Promise((resolve, reject) => {
      this.database
        .ref('video')
        .push(video)
        .then(() => resolve())
        .catch(error => reject(error));
    });
  };

  get = (uid = null) => {
    if (uid == null) {
      return new Promise((resolve, reject) => {
        this.database.ref('video').on('value', snapshot => {
          const videos = snapshot.val();

          if (videos != null) {
            const videosList = Object.keys(videos).map(key => ({
              ...videos[key],
              uid: key
            }));

            resolve(videosList);
          } else {
            resolve(null);
          }
        });
      });
    } else {
      return new Promise((resolve, reject) => {
        this.database
          .ref(`video/${uid}`)
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

  update = (uid, video) =>
    this.get(uid).set({
      ...video
    });

  delete = uid => this.get(uid).remove();

  clap = uid => {
    return new Promise((resolve, reject) => {
      let currentClaps = null;

      this.get(uid)
        .then(video => {
          currentClaps = video.claps;

          this.database
            .ref(`video/${uid}`)
            .update({
              claps: currentClaps + 1
            })
            .then(video => {
              resolve(video);
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

  view = uid => {
    return new Promise((resolve, reject) => {
      let currentViews = null;

      this.get(uid)
        .then(video => {
          currentViews = video.views ? video.views : 0;
          this.database
            .ref(`video/${uid}`)
            .update({
              views: currentViews + 1
            })
            .then(video => {
              resolve(video);
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

  turnOff = () => {
    this.database.ref('video').off();
  };

  getPopulars = num => {
    return new Promise((resolve, reject) => {
      this.database
        .ref('video')
        .orderByChild('views')
        .limitToFirst(num)
        .once('value')
        .then(snapshot => {
          const videos = snapshot.val();

          if (videos) {
            const videoList = Object.keys(videos).map(key => ({
              ...videos[key],
              uid: key
            }));

            resolve(videoList);
          } else {
            resolve(null);
          }
        })
        .catch(error => {
          reject(error);
        });
    });
  };

  getVideosBy = (field, value) => {
    return new Promise((resolve, reject) => {
      this.database
        .ref('video')
        .orderByChild(field)
        .equalTo(`${value}`)
        .once('value')
        .then(snapshot => {
          const videos = snapshot.val();

          if (videos) {
            const videoList = Object.keys(videos).map(key => ({
              ...videos[key],
              uid: key
            }));

            resolve(videoList);
          } else {
            resolve(null);
          }
        })
        .catch(error => {
          reject(error);
        });
    });
  };

  // getVideosByUser = userId => {
  //   return new Promise((resolve, reject) => {
  //     this.database
  //       .ref('video')
  //       .orderByChild('createdBy')
  //       .equalTo(`${userId}`)
  //       .once('value')
  //       .then(snapshot => {
  //         const videos = snapshot.val();

  //         if (videos) {
  //           const videoList = Object.keys(videos).map(key => ({
  //             ...videos[key],
  //             uid: key
  //           }));

  //           resolve(videoList);
  //         } else {
  //           resolve(null);
  //         }
  //       })
  //       .catch(error => {
  //         reject(error);
  //       });
  //   });
  // };

  // getVideosByEvent = uid => {
  //   return new Promise((resolve, reject) => {
  //     this.database
  //       .ref('video')
  //       .orderByChild('createdBy')
  //       .equalTo(`${userId}`)
  //       .once('value')
  //       .then(snapshot => {
  //         const videos = snapshot.val();

  //         if (videos) {
  //           const videoList = Object.keys(videos).map(key => ({
  //             ...videos[key],
  //             uid: key
  //           }));

  //           resolve(videoList);
  //         } else {
  //           resolve(null);
  //         }
  //       })
  //       .catch(error => {
  //         reject(error);
  //       });
  //   });
  // };

  getByTitle = title => {
    return new Promise((resolve, reject) => {
      this.database
        .ref('video')
        .once('value')
        .then(snapshot => {
          const videos = snapshot.val();

          if (videos != null) {
            const videosList = Object.keys(videos).map(key => ({
              ...videos[key],
              uid: key
            }));

            const videosToReturn = videosList.filter(user => {
              return user.title.toLowerCase().includes(title.toLowerCase());
            });

            resolve(videosToReturn.length == 0 ? null : videosToReturn);
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

export default Video;
