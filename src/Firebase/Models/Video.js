class Video {

    constructor(database) {    
        this.database = database;
    }

    create = ({ title, description, duration, tags, platform, userId}) => {
        this.db.ref("video").set({
            title,
            description,
            duration, tags,
            platform,
            createdBy: userId,
            applauses: 0,
        })
    };

    get = (uid = null) => {
        if (uid == null) {
            this.database.ref("video");
        } else {
            this.database.ref(`video/${uid}`)
        }
    }

    update = (uid, video) => this.get(uid).set({
        ...video
    })

    delete = uid => this.get(uid).remove();

}

export default Video;