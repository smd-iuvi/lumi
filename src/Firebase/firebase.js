import app, { auth } from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';

import Comment from './Models/Comment';
import Event from './Models/Event';
import Gender from './Models/Gender';
import User from './Models/User';
import Video from './Models/Video';
import Discipline from './Models/Discipline';
import Semester from './Models/Semester';

import * as ROLES from '../constants/roles';

const config = {
  apiKey: 'AIzaSyA66a2Non3h0q-zDstvhpp4I6U7bOfL7eE',
  authDomain: 'lumi-b8b4e.firebaseapp.com',
  databaseURL: 'https://lumi-b8b4e.firebaseio.com',
  projectId: 'lumi-b8b4e',
  storageBucket: 'lumi-b8b4e.appspot.com',
  messagingSenderId: '337072262344',
  appId: '1:337072262344:web:4c8f73e8ad2e8e3a'
};

console.log(config);

class Firebase {
  constructor() {
    app.initializeApp(config);
    this.auth = app.auth();
    this.db = app.database();
    this.storage = app.storage();

    this.googleProvider = new app.auth.GoogleAuthProvider();

    this.event = new Event(this.db);
    this.comment = new Comment(this.db);
    this.discipline = new Discipline(this.db);
    this.semester = new Semester(this.db);
    this.gender = new Gender(this.db);
    this.user = new User(this.db, this.auth);
    this.video = new Video(this.db);
  }

  doSignInWithEmailAndPassword = (email, password) => {
    return this.auth.signInWithEmailAndPassword(email, password);
  };

  doSignInWithGoogle = () => this.auth.signInWithPopup(this.googleProvider);

  doSignOut = () => this.auth.signOut();

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = password => this.auth.currentUser.updatePassword(password);

  doSendEmailVerification = () => {
    this.auth.currentUser.sendEmailVerification({
      url: 'http://localhost:3000'
    });
  };

  doGeneralSearch = (term, callback) => {
    const result = {};

    this.user.getByName(term, (users, error) => {
      result.users = users;

      this.video.getByTitle(term, (videos, error) => {
        result.videos = videos;

        this.discipline.getByName(term, (disciplines, error) => {
          result.disciplines = disciplines;

          callback(result, error);
        });
      });
    });
  };

  onAuthUserListener = (next, fallback) =>
    this.auth.onAuthStateChanged(authUser => {
      if (authUser) {
        this.db
          .ref(`user/${authUser.uid}`)
          .once('value')
          .then(snapshot => {
            const dbUser = snapshot.val();

            if (!dbUser.role) {
              dbUser.role = ROLES.STUDENT;
            }

            authUser = {
              uid: authUser.uid,
              email: authUser.email,
              emailVerified: authUser.emailVerified,
              providerData: authUser.providerData,
              ...dbUser
            };

            next(authUser);
          });
      } else {
        fallback();
      }
    });
}

export default Firebase;
