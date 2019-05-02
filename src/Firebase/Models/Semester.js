class Semester {

    constructor(database) {    
        this.database = database;
    }

    create = semester => this.get().push({
        ...semester
    })

    get = (uid = null) => {
        if (uid == null) {
            this.database.ref("semester");
        } else {
            this.database.ref(`semester/${uid}`)
        }
    }

    update = (uid, semester) => this.get(uid).set({
        ...semester
    })

    delete = uid => this.get(uid).remove();

}

export default Semester;