import { openDB, type DBSchema, type IDBPDatabase, deleteDB } from "idb";
import { StoreName } from "../Database";
import { getRealWorkout, type Workout } from "../../class/Workout/Workout";
import type { WorkoutDate } from "../../class/Workout/WorkoutDate";

const DB_NAME = "db_workout";

interface Database extends DBSchema {
	"workout-store": {
		key: string;
		value: any;
	};
}

async function openDatabaseWorkout(): Promise<IDBPDatabase<Database>> {
	return openDB<Database>(DB_NAME, 1, {
		upgrade(db) {
			if (!db.objectStoreNames.contains(StoreName.WORKOUT)) {
				db.createObjectStore(StoreName.WORKOUT);
			}
		},
	});
}

export async function getWorkoutsFromDatabase(): Promise<Workout[]> {
	const db = await openDatabaseWorkout();
	const tx = db.transaction(StoreName.WORKOUT, "readonly");
	const store = tx.objectStore(StoreName.WORKOUT);
	const fakeWorkouts = await store.getAll()
	const realWorkouts: Workout[] = [];
	for (let i = 0; i < fakeWorkouts.length; i++) {
		const fakeWorkout = fakeWorkouts[i];
		realWorkouts.push(getRealWorkout(fakeWorkout));
	}
	return realWorkouts;
}

export async function getWorkoutFromDatabase(key: string): Promise<Workout> {
	const db = await openDatabaseWorkout();

	const tx = db.transaction(StoreName.WORKOUT, "readonly");
	const store = tx.objectStore(StoreName.WORKOUT);

	const fakeWorkout =  await store.get(key)
	if (fakeWorkout) {
		return getRealWorkout(fakeWorkout);
	} 
	return null;	
}

export async function putWorkoutInDatabase(w: Workout): Promise<Workout> {
	const db = await openDatabaseWorkout();

	const tx = db.transaction(StoreName.WORKOUT, "readwrite");
	const store = tx.objectStore(StoreName.WORKOUT);

	const fakeWorkout =  await store.get(w.getKey())
	if (fakeWorkout) {
		return getRealWorkout(fakeWorkout);
	}

	const id = await store.add(w, w.getKey());
	return await store.get(id);
}

export async function deleteDatabaseWorkout(): Promise<void> {
	await deleteDB(DB_NAME);
	console.log(`Database '${DB_NAME}' deleted successfully.`);
}
