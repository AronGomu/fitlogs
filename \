import { openDB, type DBSchema, type IDBPDatabase, deleteDB } from "idb";
import { getRealPlan, type Plan } from "../../class/Plan/Plan";
import { StoreName } from "../Database";

const DB_NAME = "db_plan";

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
				db.createObjectStore(StoreName.PLAN, { autoIncrement: true });
			}

		},
	});
}

export async function getCurrentPlanFromDatabase(): Promise<Plan> {
	const db = await openDatabasePlan();
	const tx = db.transaction(StoreName.PLAN, "readonly");
	const store = tx.objectStore(StoreName.PLAN);

	let cursor = await store.openCursor();
	while (cursor) {
		let plan: Plan = cursor.value as Plan;

		if (plan.isCurrent) {
			return getRealPlan(plan);
		}

		cursor = await cursor.continue();
	}

	return null;
}

export async function getAllPlansFromDatabase(): Promise<Plan[]> {
	const db = await openDatabasePlan();
	const tx = db.transaction(StoreName.PLAN, "readonly");
	const store = tx.objectStore(StoreName.PLAN);
	let plans = await store.getAll();
	for (let i = 0; i < plans.length; i++) {
		plans[i] = getRealPlan(plans[i]);
	}
	return plans;
}

export async function putPlanInDatabase(plan: Plan): Promise<Plan> {
	const db = await openDatabasePlan();
	console.log(db);

	const tx = db.transaction(StoreName.PLAN, "readwrite");
	const store = tx.objectStore(StoreName.PLAN);

	let cursor = await store.openCursor();
	while (cursor) {
		let planDB: Plan = cursor.value as Plan;

		if (plan.id === planDB.id) {
			cursor.update(plan)
			return;
		}

		cursor = await cursor.continue();
	}

	// console.log(store);
	console.log(plan)
	plan.isCurrent = true;
	const id = await store.add(plan);
	console.log(id);

	plan.id = id;
	await store.add(plan, id);
	const savedPlan = await store.get(id);
	console.log(savedPlan)
	return getRealPlan(savedPlan);
}

export async function deletePlanFromDatabase(id: number): Promise<Plan> {
	const db = await openDatabasePlan();

	const tx = db.transaction(StoreName.PLAN, "readwrite");

	const store = tx.objectStore(StoreName.PLAN);

	let cursor = await store.openCursor();
	while (cursor) {
		let plan: Plan = cursor.value as Plan;

		if (plan.id === id) {
			const plan = getRealPlan(cursor.value);
			cursor.delete();

			return plan;
		}

		cursor = await cursor.continue();
	}

	return null;
}

export async function deleteDatabasePlan(): Promise<void> {
	await deleteDB(DB_NAME);
	console.log(`Database '${DB_NAME}' deleted successfully.`);
}


