import { getRealExercice, type Exercice } from "../Workout/Exercice";

export class Superset {
	constructor(
		/** List of exercices supersetted. */ public exercices: Exercice[]
	) {}
}

export function getRealSuperset(s: Superset) {
	let realExercices: Exercice[] = [];
	for (const e of s.exercices) {
		realExercices.push(getRealExercice(e));
	}
	return new Superset(realExercices);
}
