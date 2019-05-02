import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

import * as ROLES from '../constants/roles';

const config = {};

class Firebase {
    constructor() {
        app.initializeApp(config);
        this.auth = app.auth();
        this.db = app.database();

        this.googleProvider = new app.auth.GoogleAuthProvider();
    }

    doCreateUserWith = ({ email, password, username, roles, gender, birthday }) => {
        return this.auth
                .createUserWithEmailAndPassword(email, password)
                .then(authUser => {
                    return this.user(authUser.user.uid).set({
                        username,
                        email,
                        gender,
                        birthday,
                        roles
                    });
                })
                .then(() => {
                    return this.doSendEmailVerification();
                })
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

    // USER API

    user = uid => this.db.ref(`user/${uid}`);

    users = () => this.db.ref("user");

    deleteUser = uid => this.user(uid).remove();

    // VIDEO API

    video = uid => this.db.ref(`video/${uid}`);

    videos = () => this.db.ref("video");

    createVideoWith = ({ title, description, duration, tags, platform, userId}) => {
        this.db.ref("video").set({
            title,
            description,
            duration, tags,
            platform,
            createdBy: userId,
            applauses: 0,
        })
    };

    deleteVideo = uid => this.video(uid).remove();

    // COMMENT API 

    comment = uid => this.db.ref(`comment/${uid}`);

    comments = () => this.db.ref("comment");

    createCommentWith = ({ text, videoUid }) => {
        this.db.ref("comment").set({
            text,
            videoUid,
            createdBy: this.auth.currentUser.uid
        })
    }

    // EVENT API

    event = uid => this.db.ref(`event/${uid}`);

    events = () => this.db.ref("event");

    createEventWith = ({ name, description, data }) => {
        this.db.ref("event").set({
            name,
            description,
            data,
            createdBy: this.auth.currentUser.uid
        })
    }

    // SEMESTER API

    semester = uid => this.db.ref(`semester/${uid}`);

    semesters = () => this.db.ref("semester");

    doCreateSemester = ({ semester }) => {
        this.db.ref("semester").set({
            semester
        })
    }

    // GENDER API

    gender = uid => this.db.ref(`gender/${uid}`);

    genders = () => this.db.ref("gender");

    // DISCIPLINE API

    discipline = uid => this.db.ref(`discipline/${uid}`);

    disciplines = () => this.db.ref("discipline");

    doCreateDis



}

export default Firebase;