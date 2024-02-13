import { openDB, type DBSchema, type IDBPDatabase, deleteDB } from "idb";
import { getRealPlan, type Plan } from "../../class/Plan/Plan";
import { StoreName } from "../Database";

const DB_NAME = "db_plan";
const KEY = 0;

interface Database extends DBSchema {
	"plan-store": {
		key: number;
		value: any;
	};
}

async function openDatabasePlan(): Promise<IDBPDatabase<Database>> {
	return openDB<Database>(DB_NAME, 1, {
		upgrade(db) {
			if (!db.objectStoreNames.contains(StoreName.PLAN)) {
				db.createObjectStore(StoreName.PLAN);
			}
		},
	});
}

export async function getPlanFromDatabase(): Promise<Plan> {
	const db = await openDatabasePlan();
	const tx = db.transaction(StoreName.PLAN, "readonly");
	const store = tx.objectStore(StoreName.PLAN);
	const plan = await store.get(KEY);
	if (!plan) return null;
	return getRealPlan(plan);

}

export async function updatePlanInDatabase(plan: Plan): Promise<Plan> {
	const db = await openDatabasePlan();

	const tx = db.transaction(StoreName.PLAN, "readwrite");
	const store = tx.objectStore(StoreName.PLAN);

	const storedPlan = await store.get(KEY);
	if (!storedPlan) {
		await store.add(plan, KEY);
		const createdPlan = await store.get(KEY);
		return getRealPlan(createdPlan);
	}

	await store.put(plan, KEY);
	return await store.get(KEY);


}

export async function deleteDatabasePlan(): Promise<void> {
	await deleteDB(DB_NAME);
	console.log(`Database '${DB_NAME}' deleted successfully.`);
}


