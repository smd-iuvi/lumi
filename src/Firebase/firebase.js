import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

import Comment from './Models/Comment';
import Event from './Models/Event';
import Gender from './Models/Gender';
import User from './Models/User';
import Video from './Models/Video';
import Discipline from './Models/Discipline';
import Semester from './Models/Semester';

// import * as ROLES from '../constants/roles';

const config = {};

class Firebase {
    constructor() {
        app.initializeApp(config);
        this.auth = app.auth();
        this.db = app.database();

        this.googleProvider = new app.auth.GoogleAuthProvider();
        
        this.event = Event(this.db);
        this.comment = Comment(this.db);
        this.discipline = Discipline(this.db);
        this.semester = Semester(this.db);
        this.gender = Gender(this.db);
        this.user = User(this.db);
        this.video = Video(this.db);
    }

    doSignInWithEmailAndPassword = (email, password) => {
        return this.auth.signInWithEmailAndPassword(email, password);
    }

    doSignInWithGoogle = () => this.auth.signInWithPopup(this.googleProvider);

    doSignOut = () => this.auth.signOut();

    doPasswordReset = email => this.auth.sendPasswordResetEmail(email);
    
    doPasswordUpdate = password => this.auth.currentUser.updatePassword(password);

    doSendEmailVerification = () => {
        this.auth.currentUser.sendEmailVerification({
            url: "http://localhost:3000"
        });
    }
}

export default Firebase;