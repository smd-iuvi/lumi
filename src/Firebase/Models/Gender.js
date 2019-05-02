class Gender {

    constructor(database) {    
        this.database = database;
    }

    create = gender => this.get().push({
        ...gender
    })

    get = (uid = null) => {
        if (uid == null) {
            this.database.ref("gender");
        } else {
            this.database.ref(`gender/${uid}`)
        }
    }

    update = (uid, gender) => this.get(uid).set({
        ...gender
    })

    delete = uid => this.get(uid).remove();

}

export default Gender;