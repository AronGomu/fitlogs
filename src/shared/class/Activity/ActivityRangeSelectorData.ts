export class ActivityRangeSelectorData {
    constructor(
        /** Text of the button. */
        public label: string = "",
        /** Number of days selected to show in the activity. */
        public nbDaysToShow: number = null,
        /** needed for highlighting the button. */
        public className: string = "",
    ) {}

    public setAsSelected(v: boolean) {
        if (v) this.className = "btn-primary";
        else this.className = "";
    }
}