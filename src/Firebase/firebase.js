import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

// import * as ROLES from '../constants/roles';

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

    updateUser = (uid, user) => this.user(uid).set({
        ...user
    })

    deleteUser = uid => this.user(uid).remove();

    // VIDEO API

    createVideo = ({ title, description, duration, tags, platform, userId}) => {
        this.db.ref("video").set({
            title,
            description,
            duration, tags,
            platform,
            createdBy: userId,
            applauses: 0,
        })
    };

    video = uid => this.db.ref(`video/${uid}`);

    videos = () => this.db.ref("video");

    updateVideo = (uid, video) => {
        this.video(uid).set({
            ...video
        })
    };

    deleteVideo = uid => this.video(uid).remove();

    // COMMENT API 

    createCommentWith = ({ text, videoUid }) => {
        this.db.ref("comments").push({
            text,
            videoUid,
            createdBy: this.auth.currentUser.uid
        })
    }

    comment = uid => this.db.ref(`comment/${uid}`);

    comments = () => this.db.ref("comment");

    updateComment = (uid, comment) => {
        this.comment(uid).set({
            ...comment
        })
    }

    deleteComment = uid => this.comment(uid).remove();

    // EVENT API

    createEventWith = ({ name, description, data }) => {
        this.db.ref("event").set({
            name,
            description,
            data,
            createdBy: this.auth.currentUser.uid
        })
    }

    event = uid => this.db.ref(`event/${uid}`);

    events = () => this.db.ref("event");

    updateEvent = (uid, event) => {
        this.event(uid).set({
            ...event
        })
    }

    deleteEvent = uid => this.event(uid).remove();

    // SEMESTER API

    createSemester = ({ semester }) => {
        this.db.ref("semester").set({
            semester
        })
    }

    semester = uid => this.db.ref(`semester/${uid}`);

    semesters = () => this.db.ref("semester");

    updateSemester = (uid, semester) => {
        this.semester(uid).set({
            ...semester
        })
    }

    deleteSemester = uid => this.semester(uid).remove();

    // GENDER API

    createGender = gender => this.genders().push({
        ...gender
    })

    gender = uid => this.db.ref(`gender/${uid}`);

    genders = () => this.db.ref("gender");

    updateGender = (uid, gender) => {
        this.gender(uid).set({
            ...gender
        })
    }

    deleteGender = uid => this.gender(uid).remove();

    // DISCIPLINE API

    createDiscipline = discipline => {
        this.disciplines().push({
            ...discipline
        })
    }

    discipline = uid => this.db.ref(`discipline/${uid}`);

    disciplines = () => this.db.ref("discipline");

    updateDiscipline = (uid, discipline) => {
        this.discipline(uid).set({
            ...discipline
        })
    }

    deleteDiscipline = uid => this.discipline(uid).remove();

}

export default Firebase;