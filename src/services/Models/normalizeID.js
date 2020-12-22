const normalizeID = (collection) => {
    if (Array.isArray(collection)) {
        const newCollection = collection.map(c => {
            const item = { ...c, uid: c._id }
            delete item._id
            return item
        })
        return newCollection
    } else {
        const item = { ...collection, uid: collection._id }
        delete item._id
        return item
    }
}

export default normalizeID 