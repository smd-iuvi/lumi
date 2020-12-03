import * as QueryableFields from './QueryableFields';

import { ENDPOINT } from '../../ApiManager'
import ApiManager from '../../ApiManager'

export { QueryableFields };

class Comment {
  constructor() {
    this.apiManager = new ApiManager();
  }

  create = ({ videoId, userId, comment }) => {
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
      return new Promise((resolve, reject) => {
        this.apiManager.get(ENDPOINT.COMMENTS)
          .then(comments => resolve(comments))
          .catch(err => reject(err))
      })
    } else {
      //Implement get comment by ID
      return new Promise((resolve, reject) => {
        this.apiManager.get(`${ENDPOINT.COMMENTS} / ${uid}`)
          .then(comments => resolve(comments))
          .catch(err => reject(err))
      })
    }
  };

  update = (uid, comment) => {
    return new Promise((resolve, reject) => {
      this.apiManager.put(`${ENDPOINT.COMMENTS}/${uid}`, {
        text: comment
      })
        .then(response => resolve())
        .catch(err => reject(err))
    })
  }

  delete = (uid) => {
    return new Promise((resolve, reject) =>  {
      this.apiManager.delete(`${ENDPOINT.COMMENTS}/${uid}`)
      .then(response => {
        resolve()
      })
      .catch(err => reject(err))
    })
  };

  getCommentsBy = (field, value) => {
    return new Promise((resolve, reject) => {
      switch (field) {
        case QueryableFields.USER_ID:
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
