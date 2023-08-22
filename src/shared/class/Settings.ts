import { WeightMetric } from "../enum/WeightMetrics";

/** Contains all the settings of the application and functions related to it.  */
export class Settings {
    constructor(
        /** Unit for the weight used. Kilos by default. */
        public wm: WeightMetric = WeightMetric.Kilos) 
    { }
}

export function getRealSettings(s: Settings): Settings {
    let realSettings: Settings = new Settings();
    realSettings.wm = s.wm;
    return realSettings;
}