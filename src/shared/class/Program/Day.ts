import { getRealSuperset, type Superset } from "./Superset";

export class Day {
	constructor(
		/** Name of the day */ public name: string,
		/** List of Exercices and Supersets */ public supersets: Superset[]
	) {}
}

export function getRealDay(d: Day) {
	let realSupersets: Superset[] = [];
	for (const s of d.supersets) {
		realSupersets.push(getRealSuperset(s));
	}
	return new Day(d.name, realSupersets);
}
