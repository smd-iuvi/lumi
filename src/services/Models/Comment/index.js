import * as QueryableFields from './QueryableFields';

import { ENDPOINT } from '../../ApiManager'
import ApiManager from '../../ApiManager'

export { QueryableFields };

class Comment {
  constructor() {
    this.apiManager = new ApiManager();
  }

  create = ({ videoId, userId, comment }, callback) => {
    return new Promise((resolve, reject) => {
      this.apiManager.post(`${ENDPOINT.VIDEOS}/${videoId}/ ${ENDPOINT.COMMENTS}`, {
        text: comment
      })
        .then(() => resolve())
        .catch()
    })
  };

  get = (uid = null) => {
    if (uid == null) {
      this.apiManager.get(ENDPOINT.COMMENTS);
    } else {
      // TODO Implemenet get comment by id
      this.apiManager.get(`${ENDPOINT.COMMENTS}/${uid}`)
    }
  };

  update = (uid, comment) => {
    this.apiManager.put(`${ENDPOINT.COMMENTS}/${uid}`, {
      text: comment
    })
      .then(response => { })
      .catch(err => { })
  }

  delete = (uid, callback) => {
    this.apiManager.delete(`${ENDPOINT.COMMENTS}/${uid}`)
      .then(response => {
        callback(null)
      })
      .catch(err => console.log(err))
  };

  getCommentsBy = (field, value) => {
    return new Promise((resolve, reject) => {
      switch (field) {
        case QueryableFields.USER_ID:
          // TODO Implement user comments endpoint
          this.apiManager.get(`${ENDPOINT.USERS} / ${value} / ${ENDPOINT.COMMENTS}`)
            .then(comments => resolve(comments))
            .catch(err => reject(err))
          break
        case QueryableFields.VIDEO_ID:
          this.apiManager.get(`${ENDPOINT.VIDEOS} / ${value} / ${ENDPOINT.COMMENTS}`)
            .then((comments) => resolve(comments))
            .catch(err => reject(err))
          break
      }
    })
  };
}

export default Comment;
