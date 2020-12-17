import * as QueryableFields from './QueryableFields';
import { ENDPOINT } from '../../ApiManager'
import ApiManager from '../../ApiManager'

import normalizeID from '../normalizeID'

export { QueryableFields };

class Event {
  constructor() {
    this.apiManager = new ApiManager();
  }

  create = async ({
    name,
    description,
    date,
    course,
  }) => {
    return new Promise((resolve, reject) => {
      this.apiManager.post(`${ENDPOINT.EVENTS}`, {
        name,
        description,
        date,
        course
      })
        .then(() => resolve())
        .catch((err) => reject(err))
    })
  };

  get = (uid = null) => {
    if (uid == null) {
      return new Promise((resolve, reject) => {
        this.apiManager.get(ENDPOINT.EVENTS)
          .then(events => resolve(normalizeID(events)))
          .catch(err => reject(err))
      })
    } else {
      return new Promise((resolve, reject) => {
        this.apiManager.get(`${ENDPOINT.EVENTS} / ${uid}`)
          .then(events => resolve(normalizeID(events)))
          .catch(err => reject(err))
      })
    }
  };

  update = (uid, eventNewInfo) => {
    return new Promise((resolve, reject) => {
      this.apiManager.put(`${ENDPOINT.COMMENTS}/${uid}`, eventNewInfo)
        .then(response => resolve())
        .catch(err => reject(err))
    })
  };

  delete = (uid) => {
    return new Promise((resolve, reject) => {
      this.apiManager.delete(`${ENDPOINT.EVENTS}/${uid}`)
        .then(response => {
          resolve()
        })
        .catch(err => reject(err))
    })
  };

  launch = uid => {
    return new Promise((resolve, reject) => {
      this.apiManager.put(`${ENDPOINT.EVENTS}/${uid}/launch`, {})
        .then(response => {
          resolve()
        })
        .catch(err => reject(err))
    })
  };

  addVideo = (eventId, videoId) => {
    return new Promise((resolve, reject) => {
      this.apiManager.post(`${ENDPOINT.EVENTS}/${eventId}/${ENDPOINT.VIDEOS}/${videoId}`, {})
        .then(() => resolve())
        .catch((err) => reject(err))
    })
  };

  removeVideo = (eventId, videoId) => {
    return new Promise((resolve, reject) => {
      this.apiManager.delete(`${ENDPOINT.EVENTS}/${eventId}/${ENDPOINT.VIDEOS}/${videoId}`)
        .then(() => resolve())
        .catch((err) => reject(err))
    })
  };

  getEventsBy = (field, value) => {
    return new Promise((resolve, reject) => {
      switch (field) {
        case QueryableFields.CREATED_BY:
          this.apiManager.get(ENDPOINT.EVENTS)
            .then(events => {
              const filteredEvents = events.filter(e => e.teacher === value)
              resolve(normalizeID(filteredEvents))
            })
            .catch(err => reject(err))
          break
        default:
          reject()
          break
      }
    });
  };

  getNext = num => {
    return new Promise((resolve, reject) => {
      this.apiManager.get(`${ENDPOINT.EVENTS}`)
        .then(events => resolve(normalizeID(events.slice(0, num))))
        .catch(err => reject(err))
    })
  };
}

export default Event;
