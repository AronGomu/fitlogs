import { getRealSettings, Settings } from "../class/Settings";
import { openDatabase, type StoreName } from "../functions/Database";

/** Fetch the setting */
export async function getSettingFromDatabase(): Promise<Settings> {
	const store = (await openDatabase()).transaction('settings-store', 'readwrite').store;
	let setting = await store.get(1);
	if (!setting) {
		setting = new Settings();
		await store.put(setting, 1);
	} else {
		setting = getRealSettings(setting)
	}
	console.log(setting);
	
	return setting;
}

/** Save the setting. If there is no setting already, create the setting in the database. */
export async function saveSettings(setting: Settings): Promise<Settings> {

	const storeName: StoreName = 'settings-store';
	const db = await openDatabase();
	const tx = db.transaction(storeName, "readwrite");
	const store = tx.objectStore(storeName);

	return setting;
}