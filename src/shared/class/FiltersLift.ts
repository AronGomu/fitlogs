import { Muscle } from "../enum/Muscle";
import { enumToList, getAllEnums } from "../functions/Utilitary";
import { CheckboxFilter } from "./CheckboxFilter";

export class FiltersLift {
	public name: string;
	public variation: string;
	public muscles: CheckboxFilter[] = [];

	constructor() {
		// Loop through all enums
		Object.values(Muscle).forEach((m) => {
			this.muscles.push(new CheckboxFilter(m));
		});
	}
}
