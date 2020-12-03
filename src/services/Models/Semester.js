import { ENDPOINT } from '../ApiManager'
import ApiManager from '../ApiManager'

class Semester {
  constructor() {
    this.apiManager = new ApiManager();
  }

  get = (uid = null) => {
    if (uid == null) {
      return new Promise((resolve, reject) => {
        this.apiManager.get(ENDPOINT.SEMESTER)
          .then(semesters => resolve(semesters))
          .catch(err => reject(err))
      })
    } else {
      return new Promise((resolve, reject) => {
        this.apiManager.get(`${ENDPOINT.SEMESTER} / ${uid}`)
          .then(semesters => resolve(semesters))
          .catch(err => reject(err))
      })
    }
  };

}

export default Semester;
