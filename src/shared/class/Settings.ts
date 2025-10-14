import { WeightMetric } from "../enum/WeightMetrics";

/** Contains all the settings of the application and functions related to it.  */
export class Settings {
  constructor(
    /** Unit for the weight used. Kilos by default. */
    public wm: WeightMetric = WeightMetric.Kilos,
    public nbDayShow: number = 30,
    public sortActivityList:  "asc" | "desc" = "asc",
    public nbDayAverage: number = 7,
    public typeActivityList: 'normal' | 'average' = 'normal',
  ) {}
}

export function getRealSettings(s: Settings): Settings {
  let realSettings: Settings = new Settings();
  realSettings.nbDayShow = s.nbDayShow;
  realSettings.sortActivityList = s.sortActivityList;
  realSettings.nbDayAverage = s.nbDayAverage;
  realSettings.typeActivityList = s.typeActivityList;
  return realSettings;
}
