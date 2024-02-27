import { openDB, type DBSchema, type IDBPDatabase, deleteDB } from "idb";
import { StoreName } from "../Database";
import { getRealWorkout, type Workout } from "../../class/Workout/Workout";
import { formatDateToYYYYMMDD } from "../Utilitary";

const DB_NAME = "db_workout";

interface Database extends DBSchema {
	"workout-store": {
		key: number;
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

export async function getWorkoutFromDatabase(workout: Workout): Promise<Workout> {
	const db = await openDatabaseWorkout();

	const tx = db.transaction(StoreName.WORKOUT, "readonly");
	const store = tx.objectStore(StoreName.WORKOUT);

	let cursor = await store.openCursor();
	while (cursor) {
		let wc: Workout = cursor.value;
		if (wc.compareWorkout(workout)) {
			return cursor.value;
		}
		cursor = await cursor.continue();
	}

	return null;
}

export async function updateWorkoutInDatabase(workout: Workout): Promise<Workout> {
	const db = await openDatabaseWorkout();

	const tx = db.transaction(StoreName.WORKOUT, "readwrite");
	const store = tx.objectStore(StoreName.WORKOUT);

	let cursor = await store.openCursor();
	while (cursor) {
		let wc: Workout = cursor.value;
		if (wc.compareWorkout(workout)) {
			cursor.update(workout);
			return cursor.value;
		}
		cursor = await cursor.continue();
	}

	const id = await store.add(workout);
	return await store.get(id);
}

export async function deleteDatabaseWorkout(): Promise<void> {
	await deleteDB(DB_NAME);
	console.log(`Database '${DB_NAME}' deleted successfully.`);
}


