import { Setting } from "../../class/Settings";
import { getObjectByIdInDatabase, updateInDatabase } from "../Database";

/** Fetch the setting */
export async function getSettingFromDatabase(): Promise<Setting> {
	const fakeS: Setting = await getObjectByIdInDatabase<Setting>("setting-store", 1);
	return fakeS;
}

/** Save the setting. If there is no setting already, create the setting in the database. */
export async function saveSettings(setting: Setting): Promise<Setting> {
	return await updateInDatabase<Setting>("setting-store", 1, setting, true);
}