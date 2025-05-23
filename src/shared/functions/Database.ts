import { deleteDB, openDB, type DBSchema, type IDBPDatabase } from "idb";
import { Setting } from "../class/Settings";
import { Workout } from "../class/Workout/Workout";
import type { Lift } from "../class/Lift/Lift";
import type { Program } from "../class/Program/Program";
import { getRealActivity, Activity } from "../class/Activity/Activity";

const DB_NAME = "db";

export type StoreName =	"workout-store" | "lift-store" | "program-store" | "setting-store" | "activity-store";

export type databaseObject = Workout | Lift | Program | Activity;

// Define the database schema
export interface Database extends DBSchema {
	"workout-store": { key: number; value: any; };
	"lift-store": { key: number; value: any; };
	"program-store": { key: number; value: any; };
	"setting-store": { key: number; value: any; };
	"activity-store": { key: number; value: any; };
}

// GENERIC FUNCTIONS

/**
 * Opens the IndexedDB database and returns a promise of the database instance.
 * @returns {Promise<IDBPDatabase<Database>>} - Promise of the IndexedDB database instance.
 */
export async function openDatabase(): Promise<IDBPDatabase<Database>> {
	if (typeof indexedDB === 'undefined') { 
		console.error("indexedDB is UNDEFINED");
		return null;
	}

	return openDB<Database>(DB_NAME, 1, {

		upgrade(db) {
			if (!db.objectStoreNames.contains("setting-store")) {
				db.createObjectStore("setting-store", {keyPath: 'id'});
			}

			if (!db.objectStoreNames.contains("workout-store")) {
				db.createObjectStore("workout-store", { autoIncrement: true, }); 
			}

			if (!db.objectStoreNames.contains("lift-store")) {
				db.createObjectStore("lift-store", { autoIncrement: true });
			}

			if (!db.objectStoreNames.contains("program-store")) {
				db.createObjectStore("program-store", { autoIncrement: true });
			}
			

			if (!db.objectStoreNames.contains("activity-store")) {
				db.createObjectStore("activity-store", { autoIncrement: true });
			}
		},
	});
}

export async function addToDatabase<T>(
	storeName: StoreName,
	value: T,
	key?: number,
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
export async function getObjectByIdInDatabase<T>(storeName: StoreName, id: number): Promise<T> {
	const db = await openDatabase();
	if (!db) return null;
	const tx = db.transaction(storeName, "readonly");
	const store = tx.objectStore(storeName);
	return await store.get(id);
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
	const db = await openDatabase();
	const tx = db.transaction(storeName, "readwrite");
	const store = tx.objectStore(storeName);
	id = await store.put(updatedValue, id);
	return await store.get(id);
}

/**
 * Deletes data from the IndexedDB database.
 * @param {number} key - The key of the data to be deleted.
 * @returns {Promise<void>} - Promise that resolves when the data is deleted.
 */
export async function deleteFromDatabase(storeName: StoreName, id: number): Promise<void> {
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





// SPECIFIC DATABASE FUNCTIONS - ACTIVITY 
export async function getActivitiesFromDatabase(
	/** How many to load */
	n: number | null = null,
	/** asc : From older to newer
	 * desc : from newer to older
	 */
	sort: 'asc' | 'desc' = 'desc'
): Promise<Activity[]> {
	const db = await openDatabase();
	if (!db) return null;

	const tx = db.transaction("activity-store", "readonly");
	const store = tx.objectStore("activity-store");

	let activities: Activity[] = [];
	let cursor;
	if (sort === 'asc') cursor = await store.openCursor(undefined, 'prev');
	else if (sort === 'desc') cursor = await store.openCursor();
	
	while (cursor) {
		const activity = cursor.value as Activity;
		activities.push(getRealActivity(activity));

		cursor = await cursor.continue();

		if (n && activities.length >= n) break;
	}

	return activities.reverse();
}

export async function getActivityFromDatabase(year: number, month: number, day: number): Promise<Activity> {
	const db = await openDatabase();
	if (!db) return null;
	const tx = db.transaction("activity-store", "readonly");
	const store = tx.objectStore("activity-store");

	let cursor = await store.openCursor();
	while (cursor) {
		let activity: Activity = cursor.value as Activity;

		if (activity.year == year && activity.month == month && activity.day == day) {
			return getRealActivity(activity);
		}

		cursor = await cursor.continue();
	}

	return null;
}


export async function putActivityInDatabase(activity: Activity): Promise<Activity> {
	const db = await openDatabase();
	const tx = db.transaction("activity-store", "readwrite");
	const store = tx.objectStore("activity-store");

	let cursor = await store.openCursor();
	while (cursor) {
		let activityDB: Activity = cursor.value as Activity;

		if (activityDB.year == activity.year && activityDB.month == activity.month && activityDB.day == activity.day) {
			cursor.update(activity)
			return;
		}

		cursor = await cursor.continue();
	}

	const id = await store.add(activity);
	const savedActivity = await store.get(id);

	return getRealActivity(savedActivity);
}

export async function deleteActivityFromDatabase(year: number, month: number, day: number): Promise<Activity> {
	console.log(`delete Activity ${year}-${month}-${day}`);
	const db = await openDatabase();

	const tx = db.transaction("activity-store", "readwrite");

	const store = tx.objectStore("activity-store");

	let cursor = await store.openCursor();
	while (cursor) {
		let activity: Activity = cursor.value as Activity;

		if (activity.year == year && activity.month == month && activity.day == day) {
			const activity = getRealActivity(cursor.value);
			cursor.delete();

			return activity;
		}

		cursor = await cursor.continue();
	}

	return null;
}

export async function loadActivities(activities: Activity[], resetDB: boolean): Promise<void> {
	const db = await openDatabase();
	const tx = db.transaction("activity-store", "readwrite");
	const store = tx.objectStore("activity-store");

	if (resetDB) {
		let cursor = await store.openCursor();
		while (cursor) {
			cursor.delete();
			cursor = await cursor.continue();
		}
	}

	for (let i = 0; i < activities.length; i++) {
		const a = activities[i];
		store.add(a);
	}
}


