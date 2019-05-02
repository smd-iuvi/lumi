class Comment {

    constructor(database) {    
        this.database = database;
    }

    create = comment => this.get().push({
        ...comment
    })

    get = (uid = null) => {
        if (uid == null) {
            this.database.ref("comment");
        } else {
            this.database.ref(`comment/${uid}`)
        }
    }

    update = (uid, comment) => this.get(uid).set({
        ...comment
    })

    delete = uid => this.get(uid).remove();

}

export default Comment;