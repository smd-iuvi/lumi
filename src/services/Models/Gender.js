import { ENDPOINT } from '../ApiManager'
import ApiManager from '../ApiManager'

class Gender {
  constructor() {
    this.apiManager = new ApiManager();
  }

  // create = gender => {
  //   return new Promise((resolve, reject) => {
  //     this.apiManager.post(`${ENDPOINT.GENRE}`, gender)
  //       .then(() => resolve())
  //       .catch((err) => reject(err))
  //   })
  // }

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

  // update = (uid, genre) => {
  //   this.apiManager.put(`${ENDPOINT.GENRE}/${uid}`, genre)
  //     .then(response => { })
  //     .catch(err => { })
  // }

  // delete = uid => {
  //   this.apiManager.delete(`${ENDPOINT.GENRE}/${uid}`)
  //     .then(response => {
  //       callback(null)
  //     })
  //     .catch(err => console.log(err))
  // }

}

export default Gender;
