import { SQLite } from 'expo-sqlite';

const db = SQLite.openDatabase('RGLocation')

export const init = () => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql('CREATE TABLE IF NOT EXISTS places (id INTEGER PRIMARY KEY NOT NULL, title TEXT, imageUri TEXT, address TEXT, lat REAL, lng REAL)',
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

export const insertPlace = (title, imageUri, address, lat, lng) => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql('INSERT INTO places (title, imageUri, address, lat, lng) VALUES (?,?,?,?,?)',
                [title, imageUri, address, lat, lng],
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