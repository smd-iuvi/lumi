import { ENDPOINT } from '../ApiManager'
import ApiManager from '../ApiManager'

class Gender {
  constructor() {
    this.apiManager = new ApiManager();
  }

  get = (uid = null) => {
    if (uid == null) {
      return new Promise((resolve, reject) => {
        this.apiManager.get(ENDPOINT.GENRE)
          .then(genres => resolve(genres))
          .catch(err => reject(err))
      })
    } else {
      return new Promise((resolve, reject) => {
        this.apiManager.get(`${ENDPOINT.GENRE} / ${uid}`)
          .then(genres => resolve(genres))
          .catch(err => reject(err))
      })
    }
  };

}

export default Gender;
