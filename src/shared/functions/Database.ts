import { deleteDB, openDB, type DBSchema, type IDBPDatabase } from "idb";
import { Activity } from "../class/Activity/Activity";
import type { Settings } from "../class/Settings";

const DB_NAME = "db";

export type All = Settings | Activity;
export type StoreName = "settings-store" | "activity-store";

export type databaseObject = Activity;

export interface Database extends DBSchema {
  "settings-store": { key: number; value: Settings};
  "activity-store": { key: number; value: Activity};
}

export async function openDatabase(): Promise<IDBPDatabase<Database>> {
  if (typeof indexedDB === "undefined") {
    console.error("indexedDB is UNDEFINED");
    return null;
  }

  return openDB<Database>(DB_NAME, 1, {
    upgrade(db) {

      if (!db.objectStoreNames.contains("settings-store")) {
        db.createObjectStore("settings-store", { keyPath: "key" });
      }

      if (!db.objectStoreNames.contains("activity-store")) {
        db.createObjectStore("activity-store", { keyPath: "date" });
      }
    },
  });
}

export async function addToDatabase(
  storeName: StoreName,
  value: All,
  key?: number
): Promise<All> {
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


export async function getAllFromDatabase(
  storeName: StoreName
): Promise<All[]> {
  const db = await openDatabase();
  const tx = db.transaction(storeName, "readonly");
  const store = tx.objectStore(storeName);
  return store.getAll();
}


export async function getObjectByIdInDatabase(
  storeName: StoreName,
  id: number
): Promise<All> {
  const db = await openDatabase();
  if (!db) return null;
  const tx = db.transaction(storeName, "readonly");
  const store = tx.objectStore(storeName);

  let cursor = await store.openCursor();
  while (cursor) cursor = await cursor.continue();

  return store.get(id);
}


export async function updateInDatabase(
  storeName: StoreName,
  id: number,
  updatedValue: All,
  ifNotInDatabaseCreate: boolean
): Promise<All> {
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


export async function flushStore(storeName: StoreName) {
  const db = await openDatabase();
  const tx = db.transaction(storeName, "readwrite");
  const store = tx.objectStore(storeName);
  store.clear();
  await tx.done;
}

export async function deleteDatabase() {
  await deleteDB(DB_NAME);
  console.log(`Database '${DB_NAME}' deleted successfully.`);
}
