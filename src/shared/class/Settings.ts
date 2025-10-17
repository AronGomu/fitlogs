import type { ActivityType } from "../enum/types";
import { WeightMetric } from "../enum/WeightMetrics";

export class Settings {
  constructor(
    public wm: WeightMetric = WeightMetric.Kilos,
    public nbDayShow: number = 30,
    public sortActivityList:  "asc" | "desc" = "asc",
    public nbDayAverage: number = 7,
    public typeActivityList: ActivityType = 'normal',
    public typeActivityStats: ActivityType = 'normal',
  ) {}
}

export function getRealSettings(settings: Settings): Settings {
  let realSettings: Settings = new Settings();
  if (!settings) return realSettings;

  realSettings.wm = settings.wm;
  realSettings.nbDayShow = settings.nbDayShow;
  realSettings.sortActivityList = settings.sortActivityList;
  realSettings.nbDayAverage = settings.nbDayAverage;
  realSettings.typeActivityList = settings.typeActivityList;

  return realSettings;
}
