import * as QueryableFields from './QueryableFields';

import { ENDPOINT } from '../../ApiManager'
import ApiManager from '../../ApiManager'

import normalizeID from '../normalizeID'

export { QueryableFields };

class Video {
  constructor() {
    this.apiManager = new ApiManager();
  }

  create = video => {
    return new Promise((resolve, reject) => {
      console.log(video)
      this.apiManager.post(`${ENDPOINT.VIDEOS}`, video)
        .then(() => resolve())
        .catch((err) => {
          reject(err)
        })
    })
  };

  get = (uid = null) => {
    if (uid == null) {
      return new Promise((resolve, reject) => {
        this.apiManager.get(ENDPOINT.VIDEOS)
          .then(videos => resolve(normalizeID(videos)))
          .catch(err => reject(err))
      })
    } else {
      return new Promise((resolve, reject) => {
        const url = `${ENDPOINT.VIDEOS}/${uid}`
        console.log(url)
        this.apiManager.get(url)
          .then(videos => resolve(normalizeID(videos)))
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
          resolve(normalizeID(nextVideo));
        })
        .catch(error => {
          reject(error);
        });
    });
  };

  update = (uid, video) => {
    return new Promise((resolve, reject) => {
      this.apiManager.put(`${ENDPOINT.VIDEOS}/${uid}`, video)
        .then(response => resolve())
        .catch(err => reject())
    })

  }

  delete = uid => {
    return new Promise((resolve, reject) => {
      this.apiManager.delete(`${ENDPOINT.VIDEOS}/${uid}`)
        .then(response => {
          resolve()
        })
        .catch(err => reject())
    })
  }

  clap = uid => {
    return new Promise((resolve, reject) => {
      reject()
    });
  };

  view = uid => {
    return new Promise((resolve, reject) => {
      reject()
    });
  };

  turnOff = () => {
    // Implement turn off video on API
    // this.database.ref('video').off();
  };

  getPopulars = num => {
    return new Promise((resolve, reject) => {
      this.apiManager.get(ENDPOINT.VIDEOS)
        .then(videos => resolve(normalizeID(videos.splice(0, num))))
        .catch(err => reject(err))
    })
  };

  getVideosBy = (field, value) => {
    return new Promise((resolve, reject) => {
      switch (field) {
        case QueryableFields.CREATED_BY:
          this.apiManager.get(`${ENDPOINT.USERS}/${value} / ${ENDPOINT.VIDEOS}`)
            .then(videos => resolve(normalizeID(videos)))
            .catch(err => reject(err))
          break
        case QueryableFields.DISCIPLINE:
          this.apiManager.get(`${ENDPOINT.COURSER}/${value} / ${ENDPOINT.VIDEOS}`)
            .then(videos => resolve(normalizeID(videos)))
            .catch(err => reject(err))
          break
        case QueryableFields.GENRE:
          this.apiManager.get(`${ENDPOINT.EVENTS}/${value} / ${ENDPOINT.VIDEOS}`)
            .then(videos => resolve(normalizeID(videos)))
            .catch(err => reject(err))
          break
        case QueryableFields.SEMESTER:
          this.apiManager.get(`${ENDPOINT.SEMESTER}/${value} / ${ENDPOINT.VIDEOS}`)
            .then(videos => resolve(normalizeID(videos)))
            .catch(err => reject(err))
          break
        case QueryableFields.TITLE:
          this.apiManager.get(`${ENDPOINT.VIDEOS}?title=${value}`)
            .then(videos => resolve(normalizeID(videos)))
            .catch(err => reject(err))
          break
        default:
          reject()
          break
      }
    })

  };
}

export default Video;
