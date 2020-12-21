export const ENDPOINT = {
    COMMENTS: "comments",
    COURSER: "courses",
    EVENTS: "events",
    GENRE: "genres",
    SEMESTER: "semesters",
    STUDENT: "students",
    TAG: "tag",
    TEACHER: "teachers",
    VIDEOS: "videos",
    USERS: "users",
    REGISTER: 'auth/register',
    LOGIN: 'auth/login'
}

export default class ApiManager {
    constructor() {
        // this.url = "http://lumibox.centralus.cloudapp.azure.com/api/"
        this.url = 'http://localhost:8080/api/'
    }

    get = (endpoint) => {
        const authUser = JSON.parse(localStorage.getItem('authUser'))

        console.log(authUser.accessToken)

        return new Promise((resolve, reject) => {
            fetch(this.url + endpoint, {
                method: 'GET', // *GET, POST, PUT, DELETE, etc.
                mode: 'cors', // no-cors, *cors, same-origin
                cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authUser && authUser.accessToken ? authUser.accessToken : ''}`
                },
                referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            })
                .then(response => {
                    if (response.status < 200 && response >= 300) {
                        reject(response.json())
                    } else {
                        return response.json()
                    }
                })
                .then(data => resolve(data))
                .catch(err => reject(err))
        })
    }

    post = (endpoint, data) => {

        return new Promise((resolve, reject) => {
            const authUser = JSON.parse(localStorage.getItem('authUser'))
            console.log(authUser)

            fetch(this.url + endpoint, {
                method: 'POST', // *GET, POST, PUT, DELETE, etc.
                mode: 'cors', // no-cors, *cors, same-origin
                cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authUser && authUser.accessToken ? authUser.accessToken : ''}`
                },
                referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
                body: JSON.stringify(data) // body data type must match "Content-Type" header
            })
                .then(response => {
                    console.log(response)
                    if (response.status < 200 && response >= 300) {
                        reject(response.json())
                    } else {
                        return response.json()
                    }
                })
                .then(data => resolve(data))
                .catch(err => reject(err))
        })
    }

    put = (endpoint, data) => {
        const authUser = JSON.parse(localStorage.getItem('authUser'))

        return new Promise((resolve, reject) => {
            fetch(this.url + endpoint, {
                method: 'PUT', // *GET, POST, PUT, DELETE, etc.
                mode: 'cors', // no-cors, *cors, same-origin
                cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authUser && authUser.accessToken ? authUser.accessToken : ''}`
                },
                referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
                body: JSON.stringify(data) // body data type must match "Content-Type" header
            })
                .then(response => {
                    if (response.status < 200 && response >= 300) {
                        reject(response.json())
                    } else {
                        return response.json()
                    }
                })
                .then(data => resolve(data))
                .catch(err => reject(err))
        })
    }

    delete = (endpoint) => {
        const authUser = JSON.parse(localStorage.getItem('authUser'))

        return new Promise((resolve, reject) => {
            fetch(this.url + endpoint, {
                method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
                mode: 'cors', // no-cors, *cors, same-origin
                cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authUser && authUser.accessToken ? authUser.accessToken : ''}`
                },
                referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            })
                .then(response => {
                    if (response.status < 200 && response >= 300) {
                        reject(response.json())
                    } else {
                        return response.json()
                    }
                })
                .then(data => resolve(data))
                .catch(err => reject(err))
        })
    }

}