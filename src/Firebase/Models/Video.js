class Video {
  constructor(database) {
    this.database = database;
  }

  create = (
    { title, description, duration, tags, platform, url, userId },
    callback
  ) => {
    this.database
      .ref('video')
      .push({
        title,
        description,
        duration,
        tags,
        platform,
        url,
        createdBy: userId,
        applauses: 0
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

  turnOff = () => {
    this.database.ref('video').off();
  };
}

export default Video;
