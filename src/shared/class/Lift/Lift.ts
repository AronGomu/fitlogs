import { isStringNotEmpty } from "../../functions/Utils";
import { MuscleWork, getRealMuscleWork } from "./MuscleWork";

/** Exercice suggestions that pops out when filling out a auto complete form of the exercice name.  */
export class Lift {
	constructor(
		/** Name of the exercice. */
		public name: string = "",
		/** Name of the variation of the lift (what is between parenthese). */
		public variation: string = "",
		/** List of muscle targeted by the exercice with the estimated average percentage of work for each. */
		public targets: MuscleWork[] = []
	) {}

	/** Return true if they have the same id. False otherwise. */
	compareByName(l: Lift): boolean {
		if (l.getFullName() === this.getFullName()) return true;
		return false;
	}

	/** Return the complete name of the exercice. */
	getFullName(): string {
		// in the case there is the variation specified
		if (isStringNotEmpty(this.variation)) {
			return `${this.name} (${this.variation})`;
		}
		// default
		return this.name;
	}
}

export function getRealLift(l: Lift) {
	let realTargets: MuscleWork[] = []
	for (const t of l.targets) {
		realTargets.push(getRealMuscleWork(t));
	}
	return new Lift(l.name, l.variation, realTargets);
}
