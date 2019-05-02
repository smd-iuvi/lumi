class User {

    constructor(database) {    
        this.database = database;
    }

    create = ({ email, password, username, roles, gender, birthday }) => {
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

    get = (uid = null) => {
        if (uid == null) {
            this.database.ref("user");
        } else {
            this.database.ref(`user/${uid}`)
        }
    }

    update = (uid, user) => this.get(uid).set({
        ...user
    })

    delete = uid => this.get(uid).remove();

}

export default User;