import { getRealLift } from "../Lift/Lift";
import { Exercice } from "../Workout/Exercice";
import { Day, getRealDay } from "./Day";
import type { Superset } from "./Superset";

/** Program defining a list of day and exercice to do in a specific order. */
export class Program {
	constructor(
		/** Id of the program from the database */ public id: number,
		/** Name of the program */ public name: string,
		/** List of all the days */ public days: Day[]
	) {}
}

export function getRealProgram(p: Program) {
	let realDays: Day[] = [];
	for (const d of p.days) {
		realDays.push(getRealDay(d));
	}
	return new Program(p.id, p.name, p.days);
}
