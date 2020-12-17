import { ENDPOINT } from '../ApiManager'
import ApiManager from '../ApiManager'

import { v4 as uuidv4 } from 'uuid';

import normalizeID from './normalizeID'

class User {
  constructor(auth) {
    this.apiManager = new ApiManager();
    this.auth = auth;
  }

  create = ({ name, lastName, email, password, role }, callback) => {
    this.auth
      .createUserWithEmailAndPassword(email, password)
      .then(authUser => {

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
            callback(normalizeID(response.user), null);
          })
      })

      .catch(error => {
        callback(null, error);
      });
  };

  signIn = (email, password) => {
    return this.auth.signInWithEmailAndPassword(email, password)
  };

  onAuthUserListener = (next, fallback) => {
    this.auth.onAuthStateChanged(authUser => {
      if (authUser) {
        const payload = {
          authID: authUser.uid,
          email: authUser.email
        }

        this.apiManager.post(ENDPOINT.LOGIN, payload)
          .then(response => {
            authUser = {
              uid: response.user._id,
              emailVerified: authUser.emailVerified,
              providerData: authUser.providerData,
              ...response.user
            }

            next(authUser, response.accessToken)
          })
      } else {
        fallback();
      }
    });
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
