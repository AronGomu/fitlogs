import type { WeightMetric } from "../../enum/WeightMetrics";
import { StoreName, getObjectById } from "../../functions/Database";
import { isArrayWithElements, last } from "../../functions/Utilitary";
import { getLiftByName } from "../../functions/database/lift";
import { Lift, getRealLift } from "../Lift/Lift";
import { getRealRepRange, type RepRange } from "../Program/RepRange";
import { Serie, getRealSerie } from "./Serie";
import { Weight } from "./Weight";

/** An exercice within a workout. Add the GUI properties and those calculable dynamically. */
export class Exercice {
	constructor(
		// EXERCICE VARIABLES
		/** Lift of the exercice. */
		public lift: Lift,
		/** List of series of the exercice. These are the actual value inputed during the workout. */
		public series: Serie[],
		/** Additionnal notes that can be added about the exercice. */
		public notes: string,

		// PROGRAM VARIABLES
		/** Range of the number of repetitions that should be done during the sets. */
		public repRange: RepRange,

		// GUI VARIABLES 
		/** Boolean flag to know if the accordeon is open or not. */
		public isSelfOpen: boolean,
		/** Boolean flag to know if the extra inputs (optionnal ones) are showed or not. */
		public isExtraOpen: boolean,

		// CREATION VARIABLES
		public isNewLift: boolean = false
	) { }

	public async checkIfItsNewLift(name: string): Promise<void> {
		const retrieved = await getLiftByName(
			name
		);

		if (!retrieved || !retrieved.id) {
			this.isNewLift = true;
			return;

		}
		this.isNewLift = false
		this.lift = getRealLift(retrieved)

	}

	addSet(weightMetric: WeightMetric) {
		const lastWeight: Weight = this.getLastWeigth(weightMetric);
		const s: Serie = new Serie(this.series.length, 0, lastWeight);
		this.series.push(s);
	}

	/** Return the maximal weight done in the sets of the exercice. */
	getMaxWeight(metric: WeightMetric): number {
		/** Max Weight to return */
		let mw: number = null;
		for (const set of this.series) {
			if (!mw) mw = set.weight.getWeightByMetric(metric);
			if (mw < set.weight.getWeightByMetric(metric))
				mw = set.weight.getWeightByMetric(metric);
		}
		return mw;
	}

	/** Based on the name of the exercice. Look through the exercice history and fetch the most relevant weigth to set by default. */
	getLastWeigth(weightMetric: WeightMetric): Weight {
		// Initialize the weigth to 0 by default
		let lastWeight: Weight = new Weight(0, weightMetric);
		// Get the last weight used within the same exercice set lists
		if (isArrayWithElements(this.series)) {
			console.log(lastWeight);
			console.log(this.series);

			console.log(last(this.series));


			lastWeight.weight = last(this.series).weight.weight;
		}

		return lastWeight;
	}

}


export function getRealExercice(e: Exercice) {

	for (let i = 0; i < e.series.length; i++) {
		e.series[i] = getRealSerie(e.series[i]);
	}

	return new Exercice(
		getRealLift(e.lift),
		e.series,
		e.notes,
		getRealRepRange(e.repRange),
		e.isSelfOpen,
		e.isExtraOpen
	);
}
