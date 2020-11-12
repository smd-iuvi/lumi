import * as QueryableFields from './QueryableFields';

import { ENDPOINT } from '../../ApiManager'
import ApiManager from '../../ApiManager'

export { QueryableFields };

class Video {
  constructor(database) {
    this.database = database;
  }

  create = video => {
    return new Promise((resolve, reject) => {
      this.apiManager.post(`${ENDPOINT.VIDEOS}`, video)
        .then(() => resolve())
        .catch((err) => reject(err))
    })
  };

  get = (uid = null) => {
    if (uid == null) {
      return new Promise((resolve, reject) => {
        this.apiManager.get(ENDPOINT.VIDEOS)
          .then(videos => resolve(videos))
          .catch(err => reject(err))
      })
    } else {
      return new Promise((resolve, reject) => {
        this.apiManager.get(`${ENDPOINT.VIDEOS} / ${uid}`)
          .then(videos => resolve(videos))
          .catch(err => reject(err))
      })
    }
  };

  getNextVideo = uid => {
    return new Promise((resolve, reject) => {
      this.apiManager.get(ENDPOINT.VIDEOS)
        .then(videos => {
          const filteredVideos = videos.filter(video => video.uid !== uid);
          const nextVideo =
            filteredVideos[Math.floor(Math.random() * filteredVideos.length)];
          resolve(nextVideo);
        })
        .catch(error => {
          reject(error);
        });
    });
  };

  update = (uid, video) => {
    this.apiManager.put(`${ENDPOINT.VIDEOS}/${uid}`, video)
      .then(response => { })
      .catch(err => { })
  }

  delete = uid => {
    this.apiManager.delete(`${ENDPOINT.VIDEOS}/${uid}`)
      .then(response => {
        callback(null)
      })
      .catch(err => console.log(err))
  }

  clap = uid => {
    // TODO implement claps
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
    // TODO implements video view on API
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
    // Implement turn off video on API
    // this.database.ref('video').off();
  };

  getPopulars = num => {
    // Implement get populars on API

    return new Promise((resolve, reject) => {
      // this.database
      //   .ref('video')
      //   .orderByChild('views')
      //   .limitToFirst(num)
      //   .once('value')
      //   .then(snapshot => {
      //     const videos = snapshot.val();

      //     if (videos) {
      //       const videoList = Object.keys(videos).map(key => ({
      //         ...videos[key],
      //         uid: key
      //       }));

      //       resolve(videoList);
      //     } else {
      //       resolve(null);
      //     }
      //   })
      //   .catch(error => {
      //     reject(error);
      //   });
    });
  };

  getVideosBy = (field, value) => {
    // TODO Refactor these URLs to match the url to search for title using query params
    return new Promise((resolve, reject) => {
      switch (field) {
        case QueryableFields.CREATED_BY:
          //TODO implement get videos of user on API
          this.apiManager.get(`${ENDPOINT.USERS}/${value} / ${ENDPOINT.VIDEOS}`)
            .then(videos => resolve(videos))
            .catch(err => reject(err))
          break
        case QueryableFields.DISCIPLINE:
          this.apiManager.get(`${ENDPOINT.COURSER}/${value} / ${ENDPOINT.VIDEOS}`)
            .then(videos => resolve(videos))
            .catch(err => reject(err))
          break
        case QueryableFields.GENRE:
          this.apiManager.get(`${ENDPOINT.EVENTS}/${value} / ${ENDPOINT.VIDEOS}`)
            .then(videos => resolve(videos))
            .catch(err => reject(err))
          break
        case QueryableFields.SEMESTER:
          //TODO implement get videos of semester on API
          this.apiManager.get(`${ENDPOINT.SEMESTER}/${value} / ${ENDPOINT.VIDEOS}`)
            .then(videos => resolve(videos))
            .catch(err => reject(err))
          break
      }
    })

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
      this.apiManager.get(`${ENDPOINT.VIDEOS} / ${uid}?title=${title}`)
        .then(videos => resolve(videos))
        .catch(err => reject(err))
    })
  };
}

export default Video;
