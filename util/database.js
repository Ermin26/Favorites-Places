import * as SQLite from 'expo-sqlite';
import { Place } from '../models/place';

let db;
async function openDatabase() {
    db = await SQLite.openDatabaseAsync('places.db',{
        useNewConnection: true});
  } //? Open db or create new if don't exist.
async function droptable(){
    db = await openDatabase();
    try{
        await db.execAsync('DROP TABLE IF EXISTS places');
        console.log('Table dropped');
    }catch(err){
        console.log("Error: ", err.message);
    }
}

export async function init(){
    try {
        //await droptable();
        //const db = 
        await openDatabase();
        //console.log(db);
        await db.execAsync(`PRAGMA journal_mode = WAL;
            CREATE TABLE IF NOT EXISTS places (
                id INTEGER PRIMARY KEY NOT NULL,
                title TEXT,
                imageUri TEXT NOT NULL,
                address TEXT NOT NULL,
                lat TEXT NOT NULL,
                lng TEXT NOT NULL
            )
        `);
        console.log('Database initialized');
    } catch (error) {
        console.error('Error initializing database:', error);
    }
};

export async function insertPlace(place){
    //const db = 
    await openDatabase();
    let result;
    try{
        const { title,imageUri, address} = place;
        const lat = place.location.lat;
        const lng = place.location.lng;
        result =  await db.runAsync(`INSERT INTO places (title, imageUri, address, lat,lng) VALUES (?, ?, ?, ?, ?)`,
            [title, imageUri, address, lat, lng ]
        )
        console.log('--------------------');
        console.log('Place added to the database', result);
        console.log('--------------------');
    }catch(err){
        console.log('--------------------');
        result = err.message;
        console.log('Error inserting place: ', result);
        console.log('--------------------');
    }
};
export async function getPlaces(){
    //const db = 
    await openDatabase();
    let data;
    const places =[];
    try{
        data = await db.getAllAsync('SELECT * FROM places');
        for(item of data){
            places.push(new Place(
                item.title,
                item.imageUri,
                {
                    address: item.address,
                    lat: item.lat,
                    lng: item.lng
                },
                item.id
            ))
        }
        return places;
    }catch(err){
        data = err.message;
        return data;
    };
}

export async function fetchPlaceDetails(placeId){
    //const db = 
    await openDatabase();
    let data = await db.getFirstAsync(`SELECT * FROM places WHERE id = ?`, placeId);
    return data;
}