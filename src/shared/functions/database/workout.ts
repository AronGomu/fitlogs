import { openDB, type DBSchema, type IDBPDatabase, deleteDB } from "idb";
import { StoreName } from "../Database";
import { getRealWorkout, type Workout } from "../../class/Workout/Workout";
import { formatDateToYYYYMMDD } from "../Utilitary";

const DB_NAME = "db_plan";
const KEY = 0;

interface Database extends DBSchema {
	"workout-store": {
		key: number;
		value: any;
	};
}

function getKey(d: Date): string {
	return formatDateToYYYYMMDD(d);
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
realWorkouts.push(await getRealWorkout(fakeWorkout));
	}
	return realWorkouts;
}

export async function updateWorkoutInDatabase(workout: Workout): Promise<Workout> {
	const key =  getKey(workout.createdAt.)
	const db = await openDatabaseWorkout();

	const tx = db.transaction(StoreName.WORKOUT, "readwrite");
	const store = tx.objectStore(StoreName.WORKOUT);


	const storedWorkout= await store.get(KEY);
	if (!storedWorkout) {
		await store.add(workout, KEY);
		const createdPlan = await store.get(KEY);
		return getRealPlan(createdPlan);
	}

	await store.put(workout, KEY);
	return await store.get(KEY);


}

export async function deleteDatabasePlan(): Promise<void> {
	await deleteDB(DB_NAME);
	console.log(`Database '${DB_NAME}' deleted successfully.`);
}


