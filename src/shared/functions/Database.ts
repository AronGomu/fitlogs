import { openDB, type DBSchema, deleteDB } from 'idb';
import { Exercice } from '../class/Exercice';
import { Serie } from '../class/Serie';
import { Weight } from '../class/Weight';
import { Workout, getRealWorkout } from '../class/Workout';
import { WorkoutDate } from '../class/WorkoutDate';
import { Settings } from '../class/Settings';

const DB_NAME = "db";

export enum StoreName {
    WORKOUT_STORE = "workout-store",
    SUGGESTION_STORE = "suggestion-store",
    SETTINGS_STORE = "settings-store"
} 

// Define the database schema
interface Database extends DBSchema {
    "workout-store": {
      key: number;
      value: any;
    };
    "suggestion-store": {
      key: number;
      value: any;
    };
    "settings-store": {
      key: number;
      value: any;
    };
}

// GENERIC FUNCTIONS

/**
 * Opens the IndexedDB database and returns a promise of the database instance.
 * @returns {Promise<IDBPDatabase<Database>>} - Promise of the IndexedDB database instance.
 */
async function openDatabase() {
  return openDB<Database>(DB_NAME, 1, {
    upgrade(db) {
      // Create object store(s) and indexes
      if (!db.objectStoreNames.contains(StoreName.WORKOUT_STORE)) {
        db.createObjectStore(StoreName.WORKOUT_STORE, { autoIncrement: true });
      }
      // Create object store(s) and indexes
      if (!db.objectStoreNames.contains(StoreName.SUGGESTION_STORE)) {
        db.createObjectStore(StoreName.SUGGESTION_STORE, { autoIncrement: true });
      }
      // Create object store(s) and indexes
      if (!db.objectStoreNames.contains(StoreName.SETTINGS_STORE)) {
        db.createObjectStore(StoreName.SETTINGS_STORE, { keyPath: 'key' });
      }
    },
  });
}

/**
 * Adds data to the IndexedDB database.
 * @param {number} key - The key for the data.
 * @param {any} value - The data to be added.
 * @returns {Promise<void>} - Promise that resolves when the data is added.
 */
export async function addToDatabase<T>(storeName: StoreName, value: T, key?: number): Promise<T> {
  const db = await openDatabase();
  const tx = db.transaction(storeName, 'readwrite');
  const store = tx.objectStore(storeName);
  const id = await store.add(value, key);
  return store.get(id);
}

/**
 * Retrieves all data from the IndexedDB database.
 * @returns {Promise<any[]>} - Promise that resolves with an array of all data.
 */
export async function getAllFromDatabase<T>(storeName: StoreName): Promise<T[]> {
  const db = await openDatabase();
  const tx = db.transaction(storeName, 'readonly');
  const store = tx.objectStore(storeName);
  return store.getAll();
}

/**
 * Retrieves an object from the IndexedDB database based on its ID.
 * @param {number} id - The ID of the object to retrieve.
 * @returns {Promise<T>} - Promise that resolves with the retrieved object, or undefined if not found.
 */
export async function getObjectById<T>(storeName: StoreName, id: number): Promise<T> {
    const db = await openDatabase();
    const tx = db.transaction(storeName, 'readonly');
    const store = tx.objectStore(storeName);
    return store.get(id);
  }

/**
 * Updates data in the IndexedDB database.
 * @param {number} key - The key of the data to be updated.
 * @param {any} updatedValue - The updated data.
 * @returns {Promise<void>} - Promise that resolves when the data is updated.
 */
export async function updateInDatabase<T>(storeName: StoreName, id: number, updatedValue: any): Promise<T> {
  console.log("updatedValue");
  console.log(updatedValue);
  const db = await openDatabase();
  const tx = db.transaction(storeName, 'readwrite');
  const store = tx.objectStore(storeName);
  await store.put(updatedValue, id);
  return store.get(id);
}

/**
 * Deletes data from the IndexedDB database.
 * @param {number} key - The key of the data to be deleted.
 * @returns {Promise<void>} - Promise that resolves when the data is deleted.
 */
export async function deleteFromDatabase(storeName: StoreName, id: number): Promise<void> {
  const db = await openDatabase();
  const tx = db.transaction(storeName, 'readwrite');
  const store = tx.objectStore(storeName);
  await store.delete(id);
  await tx.done;
}

/**
 * Flushes all values stored in a single store of the IndexedDB database.
 * @param {string} storeName - The name of the store to flush.
 * @returns {Promise<void>} - Promise that resolves once the store is flushed.
 */
export async function flushStore(storeName: StoreName): Promise<void> {
  const db = await openDatabase();
  const tx = db.transaction(storeName, 'readwrite');
  const store = tx.objectStore(storeName);
  store.clear();
  await tx.done;
}

export async function deleteDatabase(): Promise<void> {
  await deleteDB(DB_NAME);
  console.log(`Database '${DB_NAME}' deleted successfully.`);
}

// SPECIFIC DATABASE FUNCTIONS - WORKOUT
/** Fetch the data of all the workouts in the storage and convert the stringify data into real objects. */
export async function fetchWorkoutList(): Promise<Workout[]> {
  /** List of the workouts correctly instanciated to return */  
  let realWl: Workout[] = [];
  /** List of the workout loaded from the database but that are just object without typing or functions. */
  const fakeWl: Workout[] = await getAllFromDatabase<Workout>(StoreName.WORKOUT_STORE);

  // Set the dates of the workouts to be Date and not strings
  if (fakeWl) {
    fakeWl.forEach(w => {
      realWl.push(getRealWorkout(w));
    });
  }

  return realWl;  
}

export async function addNewWorkout(): Promise<Workout> {
  const db = await openDatabase();
  const tx = db.transaction(StoreName.WORKOUT_STORE, 'readwrite');
  const store = tx.objectStore(StoreName.WORKOUT_STORE);
  const newWorkout = <Workout> { createdAt: new WorkoutDate() };
  const id = await store.add(newWorkout);
  const newWorkoutWithId = new Workout(id, newWorkout.createdAt);
  await store.put(newWorkoutWithId, id);
  return newWorkoutWithId;
}


// SPECIFIC DATABASE FUNCTIONS - Settings (Use only those to avoid errors with the settings database errors)

/** Fetch the settings */
export async function fetchSettings(): Promise<Settings> {
  /** Load the only one settings object in the database. */
  const fakeS: Settings = await getObjectById<Settings>(StoreName.SETTINGS_STORE, 0);

  if (!fakeS) return new Settings();

  /** Return correctly instanciated settings. */  
  return new Settings(fakeS.wm);
}

/** Save the settings. If there is no settings already, create the settings in the database. */
export async function saveSettings(s: Settings): Promise<Settings> {
  /** Load the settings from the database to make sure it exists. */
  const fakeS: Settings = await getObjectById<Settings>(StoreName.SETTINGS_STORE, 0);

  if (!fakeS) return addToDatabase<Settings>(StoreName.SETTINGS_STORE, s, 0);

  return updateInDatabase<Settings>(StoreName.SETTINGS_STORE, 0, s);
}