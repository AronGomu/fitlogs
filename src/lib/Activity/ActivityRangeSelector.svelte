<script lang="ts">
    import ActivityRangeSelectorButton from "./ActivityRangeSelectorButton.svelte";
    import { ActivityRangeSelectorData } from "../../shared/class/Activity/ActivityRangeSelectorData";
    import { createEventDispatcher } from "svelte";

    export let nbDaysToShow: number;

    const dispatch = createEventDispatcher();

    const nbDaysChoice = {
        oneWeek: new ActivityRangeSelectorData("1 Week", 7),
        twoWeeks: new ActivityRangeSelectorData("2 Weeks", 15),
        oneMonth: new ActivityRangeSelectorData("1 Month", 30),
        twoMonth: new ActivityRangeSelectorData("2 Months", 60),
        threeMonth: new ActivityRangeSelectorData("3 Months", 90),
        sixMonth: new ActivityRangeSelectorData("6 Months", 180),
        oneYear: new ActivityRangeSelectorData("1 Year", 365),
        twoYears: new ActivityRangeSelectorData("2 Years", 730),
        threeYears: new ActivityRangeSelectorData("3 Years", 1045),
        all: new ActivityRangeSelectorData("All", null),
    } as const;

    // init //
    let isRangeSelected: boolean = false;
    for (const key of Object.keys(nbDaysChoice)) {
        if (nbDaysToShow === nbDaysChoice[key].nbDaysToShow) {
            nbDaysChoice[key].setAsSelected(true);
            isRangeSelected = true;
            break;
        }
        else nbDaysChoice[key].setAsSelected(false);
    }

    if (!isRangeSelected) nbDaysChoice.all.setAsSelected(true);
    // init //

    function dispatchSelection(e) {
        console.log("dispatchSelection ranger selector", e.detail);
        dispatch("click", { input: e.detail.input, value: e.detail.value });
    }
    </script>

<div class="w-full">
    <div class="flex flex-row justify-center overflow-x-auto">
        <ActivityRangeSelectorButton rs={nbDaysChoice.oneWeek} on:click={(e) => dispatchSelection(e)} />
        <ActivityRangeSelectorButton rs={nbDaysChoice.twoWeeks} on:click={(e) => dispatchSelection(e)} />
        <ActivityRangeSelectorButton rs={nbDaysChoice.oneMonth} on:click={(e) => dispatchSelection(e)} />
        <ActivityRangeSelectorButton rs={nbDaysChoice.twoMonth} on:click={(e) => dispatchSelection(e)} />
        <ActivityRangeSelectorButton rs={nbDaysChoice.threeMonth} on:click={(e) => dispatchSelection(e)} />
        <ActivityRangeSelectorButton rs={nbDaysChoice.oneYear} on:click={(e) => dispatchSelection(e)} />
        <ActivityRangeSelectorButton rs={nbDaysChoice.twoYears} on:click={(e) => dispatchSelection(e)} />
        <ActivityRangeSelectorButton rs={nbDaysChoice.threeYears} on:click={(e) => dispatchSelection(e)} />
        <ActivityRangeSelectorButton rs={nbDaysChoice.all} on:click={(e) => dispatchSelection(e)} />
    </div>
</div>
