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

  get = (uid, callback) => {
    if (uid == null) {
      this.database.ref('video').on('value', snapshot => {
        const videos = snapshot.val();

        const videosList = Object.keys(videos).map(key => ({
          ...videos[key],
          uid: key
        }));

        callback(videosList);
      });
    } else {
      this.database.ref(`video/${uid}`).on('value', snapshot => {
        const video = snapshot.val();

        // const video = Object.keys(videoObject).map(key => ({
        //   ...videoObject[key],
        //   uid: key
        // }));

        callback(video, null);
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
}

export default Video;
