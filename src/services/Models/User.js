import { ENDPOINT } from '../ApiManager'
import ApiManager from '../ApiManager'

import { v4 as uuidv4 } from 'uuid';

import normalizeID from './normalizeID'

class User {
  constructor(auth) {
    this.apiManager = new ApiManager();
    this.auth = auth;

    this.authListeners = []
  }

  create = ({ name, email, password, role }) => {
    return new Promise((resolve, reject) => {
      this.auth
        .createUserWithEmailAndPassword(email, password)
        .then(authUser => {
          console.log(authUser.user)

          const payload = {
            authID: authUser.user.uid,
            lastName: 'lastname',
            firstName: name,
            email: email,
            registrationNumber: uuidv4(),
            role: role
          }

          this.apiManager.post(ENDPOINT.REGISTER, payload)
            .then(response => {
              const userToSaveToLocal = {
                uid: response.user._id,
                emailVerified: authUser.emailVerified,
                providerData: authUser.providerData,
                accessToken: response.accessToken,
                ...response.user
              }

              console.log(userToSaveToLocal)
              this.notifyListeners(userToSaveToLocal)
              resolve()
            })
            .catch(err => reject(err))
        })
        .catch(error => {
          reject(error)
        });
    })
  };

  signIn = (email, password) => {
    return new Promise((resolve, reject) => {
      this.auth.signInWithEmailAndPassword(email, password)
        .then(authUser => {
          console.log(authUser.user)

          const payload = {
            authID: authUser.user.uid,
            email: email
          }

          this.apiManager.post(ENDPOINT.LOGIN, payload)
            .then(response => {
              console.log(response)
              const userToSaveToLocal = {
                uid: response.user._id,
                emailVerified: authUser.emailVerified,
                providerData: authUser.providerData,
                accessToken: response.accessToken,
                ...response.user
              }

              console.log(response)

              this.notifyListeners(userToSaveToLocal)
              resolve()
            })
            .catch(err => {
              console.log(err)
              reject(err)
            })
        })
        .catch(error => {
          reject(error)
        });
    })
  };

  signOut = () => {
    return new Promise((resolve, reject) => {
      this.auth.signOut().then(authUser => {
        console.log(authUser)
        this.notifyListeners(null)
      })
    })
  }

  addListener = (listener) => {
    this.authListeners = [...this.authListeners, listener]
  }

  removeListener = (listener) => {
    this.authListeners = this.authListeners.filter(l => l != listener)
  }

  notifyListeners = (authUser) => {
    this.authListeners.forEach(listener => listener(authUser))
  }


  get = (uid = null) => {
    if (uid == null) {
      return new Promise((resolve, reject) => {
        this.apiManager.get(ENDPOINT.USERS)
          .then(users => resolve(normalizeID(users)))
          .catch(err => reject(err))
      })
    } else {
      return new Promise((resolve, reject) => {
        this.apiManager.get(`${ENDPOINT.USERS} / ${uid}`)
          .then(users => resolve(normalizeID(users)))
          .catch(err => reject(err))
      })
    }
  };

  update = (uid, user) => {
    return new Promise((resolve, reject) => {
      this.apiManager.put(`${ENDPOINT.USERS}/${uid}`, user)
        .then(response => resolve())
        .catch(err => reject())
    })

  }

  delete = uid => {
    return new Promise((resolve, reject) => {
      this.apiManager.delete(`${ENDPOINT.USERS}/${uid}`)
        .then(response => {
          resolve()
        })
        .catch(err => reject())
    })
  }

  addVideoToList = (uid, videoId) => {
    return new Promise((resolve, reject) => {
      this.apiManager.post(`${ENDPOINT.VIDEOS}/${videoId}/favorite`)
        .then(response => resolve())
        .catch(err => reject(err))
    });
  };

  getByName = name => {
    return new Promise((resolve, reject) => {
      this.apiManager.get(`${ENDPOINT.USERS}?name=${name}`)
        .then(users => resolve(normalizeID(users)))
        .catch(err => reject(err))
    });
  };
}

export default User;
