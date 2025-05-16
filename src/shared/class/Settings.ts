import { WeightMetric } from "../enum/WeightMetrics";

/** Contains all the settings of the application and functions related to it.  */
export class Setting {
    constructor(
        /** Unit for the weight used. Kilos by default. */
        public wm: WeightMetric = WeightMetric.Kilos) { }
}

export function getRealSettings(s: Setting): Setting {
    let realSettings: Setting = new Setting();
    realSettings.wm = s.wm;
    return realSettings;
}
