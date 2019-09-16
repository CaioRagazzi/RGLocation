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
    })
    return promise
}

export const init = () => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql('CREATE TABLE IF NOT EXISTS places (id INTEGER PRIMARY KEY NOT NULL, address TEXT, locationNotes TEXT, hotelName TEXT, hotelPrice TEXT, hotelNotes TEXT, lat REAL, lng REAL)',
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

export const insertPlace = (address, locationNotes, hotelName, hotelPrice, hotelNotes, lat, lng) => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql('INSERT INTO places (address, locationNotes, hotelName, hotelPrice, hotelNotes, lat, lng) VALUES (?,?,?,?,?,?,?)',
                [address, locationNotes, hotelName, hotelPrice, hotelNotes, lat, lng],
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
            tx.executeSql('SELECT * FROM places',
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