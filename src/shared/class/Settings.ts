import { WeightMetric } from "../enum/WeightMetrics";

export const WEIGHT_METRIC_DEFAULT = WeightMetric.Kilos;
export const NB_DAYS_FOR_AVERAGING_DEFAULT = 7;
export const STATS_RANGE_SELECTED_DEFAULT = 15;

/** Contains all the setting of the application and functions related to it.  */
export class Setting {
    constructor(
        /** Unit for the weight used. Kilos by default. */
        public wm: WeightMetric = WEIGHT_METRIC_DEFAULT,
        /** How many days is the average of any value. */
        public nbDaysForAveraging: number = NB_DAYS_FOR_AVERAGING_DEFAULT,
        /** How many days to show for activities list and stats. */
        public statsRangeSelected: number = STATS_RANGE_SELECTED_DEFAULT,
    ) { }
}

export function getRealSettings(s: Setting): Setting {
    return new Setting(s.wm, s.nbDaysForAveraging, s.statsRangeSelected);
}
