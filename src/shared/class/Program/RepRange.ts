export class RepRange {
	constructor(
		/** Minimum number of repetitions that should be done during a serie. */ public min: number,
		/** Maximum number of repetitions that should be done during a serie. */ public max: number
	) {}
}

export function getRealRepRange(rr: RepRange) {
	return new RepRange(rr.min, rr.max);
}
