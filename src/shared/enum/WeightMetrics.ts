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
				`From getReducedStringMetric: "${metric}" is not a valid metric`
			);
	}
}
