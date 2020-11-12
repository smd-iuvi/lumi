import { ENDPOINT } from '../ApiManager'
import ApiManager from '../ApiManager'

class Semester {
  constructor() {
    this.apiManager = new ApiManager();
  }

  create = semester => {
    return new Promise((resolve, reject) => {
      this.apiManager.post(`${ENDPOINT.SEMESTER}`, semester)
        .then(() => resolve())
        .catch((err) => reject(err))
    })
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

  update = (uid, semester) => {
    this.apiManager.put(`${ENDPOINT.SEMESTER}/${uid}`, semester)
      .then(response => { })
      .catch(err => { })
  }

  delete = uid => {
    this.apiManager.delete(`${ENDPOINT.SEMESTER}/${uid}`)
      .then(response => {
        callback(null)
      })
      .catch(err => console.log(err))
  }

}

export default Semester;
