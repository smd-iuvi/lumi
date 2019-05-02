class Discipline {

    constructor(database) {    
        this.database = database;
    }

    create = discipline => this.get().push({
        ...discipline
    })

    get = (uid = null) => {
        if (uid == null) {
            this.database.ref("discipline");
        } else {
            this.database.ref(`discipline/${uid}`)
        }
    }

    update = (uid, discipline) => this.get(uid).set({
        ...discipline
    })

    delete = uid => this.get(uid).remove();

}

export default Discipline;