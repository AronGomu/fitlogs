import { openDB, type DBSchema, type IDBPDatabase, deleteDB } from "idb";
import { getRealLift, type Lift } from "../class/Lift/Lift";

const DB_NAME = "db_lift";

interface Database extends DBSchema {
	"lift-store": {
		key: string;
		value: any;
	};
}

async function openDatabaseLift(): Promise<IDBPDatabase<Database>> {
	return openDB<Database>(DB_NAME, 1, {
		upgrade(db) {
			if (!db.objectStoreNames.contains("lift-store")) {
				db.createObjectStore("lift-store");
			}
		},
	});
}

export async function getLiftsFromDatabase(): Promise<Lift[]> {
	const db = await openDatabaseLift();
	const tx = db.transaction("lift-store", "readonly");
	const store = tx.objectStore("lift-store");
	const fakeLifts = await store.getAll()
	const realLifts: Lift[] = [];
	for (let i = 0; i < fakeLifts.length; i++) {
		const fakeLift = fakeLifts[i];
		realLifts.push(getRealLift(fakeLift));
	}
	return realLifts;
}

export async function getLiftFromDatabase(exerciceName: string): Promise<Lift> {
	const db = await openDatabaseLift();

	const tx = db.transaction("lift-store", "readonly");
	const store = tx.objectStore("lift-store");

	const fakeLift =  await store.get(exerciceName)
	if (fakeLift) {
		return getRealLift(fakeLift);
	} 
	return null;	
}


export async function putLiftInDatabase(l: Lift): Promise<Lift> {
	console.log(l)
	const db = await openDatabaseLift();

	const tx = db.transaction("lift-store", "readwrite");
	const store = tx.objectStore("lift-store");

	const fakeLift =  await store.get(l.getFullName())
	if (fakeLift) {
		return getRealLift(fakeLift);
	}

	const id = await store.add(l, l.getFullName());
	return await store.get(id);
}

// export async function deleteDatabaseLift(): Promise<void> {
// 	await deleteDB(DB_NAME);
// 	console.log(`Database '${DB_NAME}' deleted successfully.`);
// }
//
//
export async function loadLifts(lifts: Lift[], resetDB: boolean): Promise<void> {

	console.log(`Populating lifts with resetDB=${resetDB}\nLifts :\n`, lifts)

	const db = await openDatabaseLift();
	const tx = db.transaction("lift-store", "readwrite");
	const store = tx.objectStore("lift-store");

	if (resetDB) {
		console.log(`Deleting whole Lift database content...`)
		let cursor = await store.openCursor();
		while (cursor) {
			cursor.delete();
			cursor = await cursor.continue();
		}
		console.log(`Done`)

	}

	console.log(`Adding Lifts from baseLifts to database`)
	for (let i = 0; i < lifts.length; i++) {
		const a = lifts[i];
		console.log(`Adding ${a.getFullName()}`);
		await store.add(a, a.getFullName());
	}

	const fakeLifts = await store.getAll();
	let realLifts = [];
	for (let i = 0; i < fakeLifts.length; i++) {
		const fakeLift = fakeLifts[i];
		realLifts.push(getRealLift(fakeLift))
	}


	console.log(`New Database Content :`, realLifts)
	console.log(`Refresh the app for getting the lifts`)
}
