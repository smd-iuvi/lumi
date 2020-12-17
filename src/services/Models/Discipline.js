import { ENDPOINT } from '../ApiManager'
import ApiManager from '../ApiManager'

import normalizeID from './normalizeID'

class Discipline {
  constructor() {
    this.apiManager = new ApiManager();
  }
  get = (uid = null) => {
    if (uid == null) {
      return new Promise((resolve, reject) => {
        this.apiManager.get(ENDPOINT.COURSER)
          .then(disciplines => resolve(normalizeID(disciplines)))
          .catch(err => reject(err))
      })
    } else {
      return new Promise((resolve, reject) => {
        this.apiManager.get(`${ENDPOINT.COURSER} / ${uid}`)
          .then(disciplines => resolve(normalizeID(disciplines)))
          .catch(err => reject(err))
      })
    }
  };

  getByName = name => {
    return new Promise((resolve, reject) => {
      this.apiManager.get(`${ENDPOINT.COURSER}?name=${name}`)
        .then(disciplines => resolve(normalizeID(disciplines)))
        .catch(err => reject(err))
    });
  };

}

export default Discipline;
