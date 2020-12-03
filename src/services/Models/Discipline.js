import { ENDPOINT } from '../ApiManager'
import ApiManager from '../ApiManager'

class Discipline {
  constructor() {
    this.apiManager = new ApiManager();
  }

  // create = discipline => {
  //   return new Promise((resolve, reject) => {
  //     this.apiManager.post(`${ENDPOINT.COURSER}`, discipline)
  //       .then(() => resolve())
  //       .catch((err) => reject(err))
  //   })
  // };

  get = (uid = null) => {
    if (uid == null) {
      return new Promise((resolve, reject) => {
        this.apiManager.get(ENDPOINT.COURSER)
          .then(disciplines => resolve(disciplines))
          .catch(err => reject(err))
      })
    } else {
      return new Promise((resolve, reject) => {
        this.apiManager.get(`${ENDPOINT.COURSER} / ${uid}`)
          .then(disciplines => resolve(disciplines))
          .catch(err => reject(err))
      })
    }
  };

  // update = (uid, discipline) => {
  //   this.apiManager.put(`${ENDPOINT.COURSER}/${uid}`, discipline)
  //     .then(response => { })
  //     .catch(err => { })
  // }

  // delete = uid => {
  //   this.apiManager.delete(`${ENDPOINT.COURSER}/${uid}`)
  //     .then(response => {
  //       callback(null)
  //     })
  //     .catch(err => console.log(err))
  // }

  //Implement Promise 
  getByName = name => {
    //TODO implement route to get discipline by name
    return new Promise((resolve, reject) => {
      this.apiManager.get(`${ENDPOINT.COURSER}?name=${name}`)
        .then(discipline => resolve(discipline))
        .catch(err => reject(err))
    });
  };

}

export default Discipline;
