import { WeightMetric } from "../enum/WeightMetrics";

export const WEIGHT_METRIC_DEFAULT = WeightMetric.Kilos;
export const NB_DAYS_FOR_AVERAGING_DEFAULT = 7;

/** Contains all the setting of the application and functions related to it.  */
export class Setting {
    constructor(
        /** Unit for the weight used. Kilos by default. */
        public wm: WeightMetric = WEIGHT_METRIC_DEFAULT,
        /** How many days is the average of any value. */
        public nbDaysForAveraging: number = NB_DAYS_FOR_AVERAGING_DEFAULT,
    ) { }
}

export function getRealSettings(s: Setting): Setting {
    let realSettings: Setting = new Setting();
    realSettings.wm = s.wm;
    if (!s.wm) s.wm = WEIGHT_METRIC_DEFAULT;
    realSettings.nbDaysForAveraging = s.nbDaysForAveraging;
    if (!s.nbDaysForAveraging) s.nbDaysForAveraging = NB_DAYS_FOR_AVERAGING_DEFAULT;
    return realSettings;
}
