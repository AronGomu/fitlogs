import { Day, getRealDay } from "./Day";
import { ProgramType } from "./../../enum/ProgramType"

/** Program defining a list of day and exercice to do in a specific order. */
export class Program {
	constructor(
		/** Id of the program from the database. */ public id: number,
		/** Name of the program. */ public name: string,
		/** Type of the program. */ public type: ProgramType,
		/** Description of the program. */ public description: string,
		/** List of all the days. */ public days: Day[]
	) { }
}

export function getRealProgram(p: Program) {
	let realDays: Day[] = [];
	for (const d of p.days) {
		realDays.push(getRealDay(d));
	}
	return new Program(p.id, p.name, p.type, p.description, p.days);
}
