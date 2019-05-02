class Event {

    constructor(database) {    
        this.database = database;
    }

    create = event => this.get().push({
        ...event
    })

    get = (uid = null) => {
        if (uid == null) {
            this.database.ref("event");
        } else {
            this.database.ref(`event/${uid}`)
        }
    }

    update = (uid, event) => this.get(uid).set({
        ...event
    })

    delete = uid => this.get(uid).remove();

}

export default Event;