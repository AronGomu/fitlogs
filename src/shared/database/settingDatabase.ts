import { getRealSettings, Setting } from "../../class/Settings";
import { getObjectByIdInDatabase, openDatabase, updateInDatabase, type StoreName } from "../Database";

/** Fetch the setting */
export async function getSettingFromDatabase(): Promise<Setting> {
	const store = (await openDatabase()).transaction('setting-store', 'readwrite').store;
	let setting = await store.get(1);
	if (!setting) {
		setting = new Setting();
		await store.put(setting, 1);
	} else {
		setting = getRealSettings(setting)
	}
	console.log(setting);
	
	return setting;
}

/** Save the setting. If there is no setting already, create the setting in the database. */
export async function saveSettings(setting: Setting): Promise<Setting> {

	const storeName: StoreName = 'setting-store';
	const db = await openDatabase();
	const tx = db.transaction(storeName, "readwrite");
	const store = tx.objectStore(storeName);

	return setting;
}