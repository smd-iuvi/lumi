import * as QueryableFields from './QueryableFields';
import { ENDPOINT } from '../../ApiManager'
import ApiManager from '../../ApiManager'

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
          .then(events => resolve(events))
          .catch(err => reject(err))
      })
    } else {
      return new Promise((resolve, reject) => {
        this.apiManager.get(`${ENDPOINT.EVENTS} / ${uid}`)
          .then(events => resolve(events))
          .catch(err => reject(err))
      })
    }
  };

  update = (uid, eventNewInfo) => {
    this.apiManager.put(`${ENDPOINT.COMMENTS}/${uid}`, eventNewInfo)
      .then(response => { })
      .catch(err => { })
  };

  delete = (uid, callback) => {
    this.apiManager.delete(`${ENDPOINT.EVENTS}/${uid}`)
      .then(response => {
        callback(null)
      })
      .catch(err => console.log(err))
  };

  launch = uid => {
    // TODO Implement endpoint to launch event

    // return new Promise((resolve, reject) => {
    //   this.database
    //     .ref(`event/${uid}`)
    //     .once('value')
    //     .then(snapshot => {
    //       const newEventState = { ...snapshot.val() };
    //       newEventState.isAvailable = true;

    //       this.update(uid, newEventState)
    //         .then(() => {
    //           resolve();
    //         })
    //         .catch(error => {
    //           reject(error);
    //         });
    //     })
    //     .catch(error => {
    //       reject(error);
    //     });
    // });
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
      this.apiManager.delete(`${ENDPOINT.EVENTS}/${eventId}/${ENDPOINT.VIDEOS}/${videoId}`, {})
        .then(() => resolve())
        .catch((err) => reject(err))
    })
  };

  getEventsBy = (field, value) => {
    return new Promise((resolve, reject) => {
      switch (field) {
        case QueryableFields.CREATED_BY:
          // TODO implement endpoint to get events of a teacher
          this.apiManager.get()
      }
    });
  };

  getNext = num => {
    return new Promise((resolve, reject) => {
      //TODO Implement a endpoint to get next event
      // this.database
      //   .ref('event')
      //   .orderByChild('sortableDate')
      //   .startAt(new Date().getTime())
      //   .limitToFirst(num)
      //   .once('value')
      //   .then(snapshot => {
      //     const value = snapshot.val();

      //     if (value) {
      //       const list = Object.keys(value).map(key => ({
      //         ...value[key],
      //         uid: key
      //       }));

      //       resolve(list);
      //     } else {
      //       resolve(null);
      //     }
      //   })
      //   .catch(error => reject(error));
    });
  };
}

export default Event;
