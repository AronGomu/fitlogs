import { deleteDB, openDB, type DBSchema, type IDBPDatabase } from "idb";
import { Workout } from "../class/Workout/Workout";
import type { Lift } from "../class/Lift/Lift";
import type { Program } from "../class/Program/Program";
import { Activity } from "../class/Activity/Activity";
import type { Settings } from "../class/Settings";

const DB_NAME = "db";

export type StoreName =
  | "workout-store"
  | "lift-store"
  | "program-store"
  | "settings-store"
  | "activity-store";

export type databaseObject = Workout | Lift | Program | Activity;

// Define the database schema
export interface Database extends DBSchema {
  "workout-store": { key: number; value: any };
  "lift-store": { key: number; value: any };
  "program-store": { key: number; value: any };
  "settings-store": { key: number; value: Settings};
  "activity-store": { key: number; value: Activity};
}

// GENERIC FUNCTIONS

/**
 * Opens the IndexedDB database and returns a promise of the database instance.
 * @returns {Promise<IDBPDatabase<Database>>} - Promise of the IndexedDB database instance.
 */
export async function openDatabase(): Promise<IDBPDatabase<Database>> {
  if (typeof indexedDB === "undefined") {
    console.error("indexedDB is UNDEFINED");
    return null;
  }

  return openDB<Database>(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains("workout-store")) {
        db.createObjectStore("workout-store", { autoIncrement: true });
      }

      if (!db.objectStoreNames.contains("lift-store")) {
        db.createObjectStore("lift-store", { autoIncrement: true });
      }

      if (!db.objectStoreNames.contains("program-store")) {
        db.createObjectStore("program-store", { autoIncrement: true });
      }

      if (!db.objectStoreNames.contains("settings-store")) {
        db.createObjectStore("settings-store", { keyPath: "key" });
      }

      if (!db.objectStoreNames.contains("activity-store")) {
        db.createObjectStore("activity-store", { keyPath: "date" });
      }
    },
  });
}

export async function addToDatabase<T>(
  storeName: StoreName,
  value: T,
  key?: number
): Promise<T> {
  const db = await openDatabase();
  if (!db) return null;
  const tx = db.transaction(storeName, "readwrite");
  const store = tx.objectStore(storeName);
  const id = await store.add(value, key);

  if (!key) {
    let objectAdded = await store.get(id);
    objectAdded["id"] = id;
    return updateInDatabase(storeName, id, objectAdded, true);
  }

  return store.get(id);
}

// export async function doesObjectExist<T>(storeName: StoreName, o: any): Promise<boolean> {
// 	const db = await openDatabase();
// 	const tx = db.transaction(storeName, "readonly");
// 	const store = tx.objectStore(storeName);
// 	const doesObjectExist = store.get(o)
//
// }

/**
 * Retrieves all data from the IndexedDB database.
 * @returns {Promise<any[]>} - Promise that resolves with an array of all data.
 */
export async function getAllFromDatabase<T>(
  storeName: StoreName
): Promise<T[]> {
  const db = await openDatabase();
  const tx = db.transaction(storeName, "readonly");
  const store = tx.objectStore(storeName);
  return store.getAll();
}

/**
 * Retrieves an object from the IndexedDB database based on its ID.
 * @param {number} id - The ID of the object to retrieve.
 * @returns {Promise<T>} - Promise that resolves with the retrieved object, or undefined if not found.
 */
export async function getObjectByIdInDatabase<T>(
  storeName: StoreName,
  id: number
): Promise<T> {
  const db = await openDatabase();
  if (!db) return null;
  const tx = db.transaction(storeName, "readonly");
  const store = tx.objectStore(storeName);

  let cursor = await store.openCursor();
  while (cursor) {
    cursor = await cursor.continue();
  }

  return store.get(id);
}

/**
 * Updates data in the IndexedDB database.
 * @param {any} updatedValue - The updated data.
 * @returns {Promise<void>} - Promise that resolves when the data is updated.
 */
export async function updateInDatabase<T>(
  storeName: StoreName,
  id: number,
  updatedValue: T,
  ifNotInDatabaseCreate: boolean
): Promise<T> {
  console.log("updatedValue");
  console.log(updatedValue);
  const db = await openDatabase();
  const tx = db.transaction(storeName, "readwrite");
  const store = tx.objectStore(storeName);

  if (!id && ifNotInDatabaseCreate) {
    id = await store.add(updatedValue);
  }

  if (!id && !ifNotInDatabaseCreate) {
    throw new Error("Id given is null !");
  }

  if (id) {
    id = await store.put(updatedValue, id);

    if (!id) {
      throw new Error(
        `Object from StoreName ${storeName} of id=${id} was not found !`
      );
    }
  }

  return store.get(id);
}

/**
 * Deletes data from the IndexedDB database.
 * @param {number} key - The key of the data to be deleted.
 * @returns {Promise<void>} - Promise that resolves when the data is deleted.
 */
export async function deleteFromDatabase(
  storeName: StoreName,
  id: number
): Promise<void> {
  const db = await openDatabase();
  const tx = db.transaction(storeName, "readwrite");
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
  const tx = db.transaction(storeName, "readwrite");
  const store = tx.objectStore(storeName);
  store.clear();
  await tx.done;
}

export async function deleteDatabase(): Promise<void> {
  await deleteDB(DB_NAME);
  console.log(`Database '${DB_NAME}' deleted successfully.`);
}
