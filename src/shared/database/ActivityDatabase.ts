import { Activity, getRealActivity } from "../class/Activity/Activity";
import { openDatabase } from "../functions/Database";
import { getPreviousDayYYYYMMDD } from "../functions/UtilsDate";

type SortDirection = "asc" | "desc";
export async function getActivityListFromDB(
	arraySize = null,
	sort: SortDirection = "desc"
) {
	const db = await openDatabase();
	if (!db) return null;

	const tx = db.transaction("activity-store", "readonly");
	const store = tx.objectStore("activity-store");

	let ActivityList: Activity[] = [];
	let cursor;
	if (sort === "asc") cursor = await store.openCursor(undefined, "prev");
	else if (sort === "desc") cursor = await store.openCursor();

	while (cursor) {
		const activity = cursor.value as Activity;
		ActivityList.push(getRealActivity(activity));

		cursor = await cursor.continue();

		if (arraySize && ActivityList.length >= arraySize) break;
	}

	return ActivityList;
}

export async function insertOrUpdateActivityInDatabase(activity) {
	console.log(`Processing activity for date: ${activity.date}`);
	const db = await openDatabase();
	// Use a single transaction for all operations
	const tx = db.transaction("activity-store", "readwrite");
	const store = tx.objectStore("activity-store");

	const currentActivityDate = activity.date;

	await store.put(activity);
	console.log(`Inserted or updated activity for ${currentActivityDate}`);

	await fillGap(store);

	await tx.done;
}

async function fillGap(store) {
	let cursor = await store.openCursor();
	let previousCursorDate = 0;

	while (cursor) {
		const activityDB: Activity = cursor.value as Activity;
		const currentCursorDate = activityDB.date;

		if (previousCursorDate > 0) {
			// Check for a gap between the current record and the previous one
			let expectedPreviousDay = getPreviousDayYYYYMMDD(currentCursorDate);

			// If the gap is found (the record before the current one is not the expected day)
			if (previousCursorDate !== expectedPreviousDay) {
				let fillDate = expectedPreviousDay;

				// Fill the gap backwards until we hit the actual previous record
				while (fillDate > previousCursorDate) {
					// IMPORTANT: We use store.add here for the new records only.
					await store.add(new Activity(fillDate));
					console.log(`Gap fill: ${fillDate}`);
					fillDate = getPreviousDayYYYYMMDD(fillDate);
				}
			}
		}

		previousCursorDate = currentCursorDate;
		cursor = await cursor.continue();
	}
}

export async function deleteActivityFromDatabase(date: number) {
	console.log(`delete Activity ${date}`);
	const db = await openDatabase();
	const tx = db.transaction("activity-store", "readwrite");
	const store = tx.objectStore("activity-store");

	let cursor = await store.openCursor();
	while (cursor) {
		let activity: Activity = cursor.value as Activity;

		if (activity.date === date) {
			const activity = getRealActivity(cursor.value);
			cursor.delete();
			return activity;
		}

		cursor = await cursor.continue();
	}

	return null;
}

// export async function loadActivityList(ActivityList: Activity[], resetDB: boolean): Promise<void> {
// 	const db = await openDatabase();
// 	const tx = db.transaction("activity-store", "readwrite");
// 	const store = tx.objectStore("activity-store");

// 	if (resetDB) {
// 		let cursor = await store.openCursor();
// 		while (cursor) {
// 			cursor.delete();
// 			cursor = await cursor.continue();
// 		}
// 	}

// 	for (let i = 0; i < ActivityList.length; i++) {
// 		const a = ActivityList[i];
// 		store.add(a);
// 	}
// }

export async function getActivityFromDatabase(date: number) {
  const db = await openDatabase();
  if (!db) return null;
  const tx = db.transaction("activity-store", "readonly");
  const store = tx.objectStore("activity-store");

  let cursor = await store.openCursor();
  while (cursor) {
    let activity: Activity = cursor.value as Activity;

    if (activity.date === date) return getRealActivity(activity);

    cursor = await cursor.continue();
  }

  return null;
}
