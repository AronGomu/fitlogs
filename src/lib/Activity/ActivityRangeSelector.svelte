<script lang="ts">
    import ActivityRangeSelectorButton from "./ActivityRangeSelectorButton.svelte";
    import { ActivityRangeSelectorData } from "../../shared/class/Activity/ActivityRangeSelectorData";
    import { createEventDispatcher } from "svelte";

    export let nbDayShow: number;
    const dispatch = createEventDispatcher();

    const nbDaysChoice = {
        oneMonth: new ActivityRangeSelectorData("1 Month", 30),
        oneYear: new ActivityRangeSelectorData("1 Year", 365),
        all: new ActivityRangeSelectorData("All", null),
    } as const;

    // init //
    let isRangeSelected: boolean = false;
    for (const key of Object.keys(nbDaysChoice)) {
        if (nbDayShow === nbDaysChoice[key].nbDaysToShow) {
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
        <ActivityRangeSelectorButton rs={nbDaysChoice.oneMonth} on:click={(e) => dispatchSelection(e)} />
        <ActivityRangeSelectorButton rs={nbDaysChoice.oneYear} on:click={(e) => dispatchSelection(e)} />
        <ActivityRangeSelectorButton rs={nbDaysChoice.all} on:click={(e) => dispatchSelection(e)} />
    </div>
</div>
