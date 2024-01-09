import type { Lift } from "../../class/Lift/Lift";
import { StoreName, openDatabase } from "../Database";

export async function getLiftByName(
	name: string
): Promise<Lift> {
	const db = await openDatabase();
	const tx = db.transaction(StoreName.LIFT, "readonly");
	const store = tx.objectStore(StoreName.LIFT);

	let cursor = await store.openCursor();
	while (cursor) {
		if (cursor.value.name === name) {
			return cursor.value;
		}
		cursor = await cursor.continue();
	}

	return null
}
