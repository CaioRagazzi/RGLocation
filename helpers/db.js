import { SQLite } from 'expo-sqlite';

const db = SQLite.openDatabase('RGLocation')

export const drop = () => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql('DROP TABLE IF EXISTS places',
                [],
                () => {
                    resolve()
                },
                (_, err) => {
                    reject(err)
                })
        })

        db.transaction((tx) => {
            tx.executeSql('DROP TABLE IF EXISTS roadTrips',
                [],
                () => {
                    resolve()
                },
                (_, err) => {
                    reject(err)
                })
        })
    })
    return promise
}

export const init = () => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql('CREATE TABLE IF NOT EXISTS places (id INTEGER PRIMARY KEY NOT NULL, address TEXT, locationNotes TEXT, hotelName TEXT, hotelPrice TEXT, hotelNotes TEXT, img TEXT, roadTrip INTEGER, lat REAL, lng REAL)',
                [],
                () => {
                    resolve()
                },
                (_, err) => {
                    reject(err)
                })
        })

        db.transaction((tx) => {
            tx.executeSql('CREATE TABLE IF NOT EXISTS roadTrips (id INTEGER PRIMARY KEY NOT NULL, name TEXT, color TEXT)',
                [],
                () => {
                    resolve()
                },
                (_, err) => {
                    reject(err)
                })
        })
    })
    return promise
}

export const insertPlace = (address, locationNotes, hotelName, hotelPrice, hotelNotes, img, roadTrip, lat, lng) => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql('INSERT INTO places (address, locationNotes, hotelName, hotelPrice, hotelNotes, img, roadTrip, lat, lng) VALUES (?,?,?,?,?,?,?,?,?)',
                [address, locationNotes, hotelName, hotelPrice, hotelNotes, img, roadTrip, lat, lng],
                (_, result) => {
                    resolve(result)
                },
                (_, err) => {
                    reject(err)
                })
        })
    })
    return promise
}

export const insertRoadTrip = (name, color) => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql('INSERT INTO roadTrips (name, color) VALUES (?, ?)',
                [name, color],
                (_, result) => {
                    resolve(result)
                },
                (_, err) => {
                    reject(err)
                })
        })
    })
    return promise
}

export const fetchPlaces = () => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql('SELECT a.*, b.id as idRoad, b.name, b.color FROM places a LEFT JOIN roadTrips b ON a.roadTrip = b.id',
                [],
                (_, result) => {
                    resolve(result)
                },
                (_, err) => {
                    reject(err)
                })
        })
    })
    return promise
}

export const fetchRoadTrips = () => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql('SELECT * FROM roadTrips',
                [],
                (_, result) => {
                    resolve(result)
                },
                (_, err) => {
                    reject(err)
                })
        })
    })
    return promise
}

export const deleteRoadTrips = (id) => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql('DELETE FROM roadTrips WHERE id = ?;',
                [id],
                (_, result) => {
                    resolve(result)
                },
                (_, err) => {
                    reject(err)
                })
        })
    })
    return promise
}