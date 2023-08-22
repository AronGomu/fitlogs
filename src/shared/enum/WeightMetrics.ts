export enum WeightMetric {
	Kilos = "Kilos",
	Pounds = "Pounds",
}

export function getReducedStringMetric(metric: WeightMetric): string {
	switch (metric) {
		case WeightMetric.Kilos:
			return "kgs";
		case WeightMetric.Pounds:
			return "lbs";

		default:
			throw new Error(
				`From getWeightByMetric : "${metric}" is not a valid metric`
			);
	}
}
