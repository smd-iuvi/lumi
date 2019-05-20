import { Thumbs } from 'react-responsive-carousel';

class Video {
  constructor(database) {
    this.database = database;
  }

  create = (
    {
      title,
      description,
      genre,
      tags,
      url,
      parentalRating,
      discipline,
      semester,
      content,
      professor,
      about,
      userId
    },
    callback
  ) => {
    this.database
      .ref('video')
      .push({
        title,
        description,
        genre,
        tags,
        url,
        parentalRating,
        discipline,
        semester,
        content,
        professor,
        about,
        createdBy: userId,
        claps: 0,
        views: 0
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
            resolve([]);
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
    let currentClaps = null;

    this.get(uid, (video, error) => {
      if (error) {
        return;
      }

      if (video != null) {
        currentClaps = video.claps;
      }
    });

    this.database
      .ref(`video/${uid}`)
      .update({
        claps: currentClaps + 1
      })
      .then(() => {
        console.log('Sucess');
      })
      .catch(err => {
        console.log(err);
      });
    // this.get(uid, (v, err) => {
    //   this.database.ref(`video/${uid}`).update({
    //     claps: v.claps + 1
    //   });
    //   this.turnOff();
    // });
  };

  turnOff = () => {
    this.database.ref('video').off();
  };

  getVideosByUser = (userId, callback) => {
    this.database
      .ref('video')
      .orderByChild('createdBy')
      .equalTo(`${userId}`)
      .once('value')
      .then(snapshot => {
        const videos = snapshot.val();

        if (videos) {
          const videoList = Object.keys(videos).map(key => ({
            ...videos[key],
            uid: key
          }));

          callback(videoList, null);
        } else {
          callback([], null);
        }
      })
      .catch(error => {
        callback([], error);
      });
  };

  getByTitle = (title, callback) => {
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

          callback(videosToReturn, null);
        } else {
          callback([], null);
        }
      })
      .catch(error => {
        callback([], error);
      });
  };
}

export default Video;
