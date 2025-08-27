<script lang="ts">
		import { settings } from "../../shared/store/settingsStore";
		import type { Setting } from "../../shared/class/Settings";
  	import ActivityRangeSelectorButton from "./ActivityRangeSelectorButton.svelte";
  	import { ActivityRangeSelectorData } from "../../shared/class/Activity/ActivityRangeSelectorData";
  	import { createEventDispatcher } from "svelte";
  	import { activities } from "../../shared/store/activityStore";

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
	} as Record<string, ActivityRangeSelectorData>;

	let si: Setting;
	settings.subscribe((s) => (si = s));

	activities.subscribe((activities) => {
		const keys = Object.keys(nbDaysChoice);
		let hasSet1Selected: boolean = false;
		for (let i = 0; i < keys.length; i++) {
			const key = keys[i];
			if (activities.length === nbDaysChoice[key].nbDays) {
				nbDaysChoice[key].setAsSelected(true);
				hasSet1Selected = true;
				break;
			} else nbDaysChoice[key].setAsSelected(false);
		}
		if (!hasSet1Selected) nbDaysChoice.all.setAsSelected(true)
	});

	function dispatchSelection(e): void {
		console.log("dispatchSelection ranger selector", e.detail);
		dispatch("click", { input: e.detail.input, value: e.detail.value});
	}
</script>

<div class="w-full">
	<div class="flex flex-row justify-center overflow-x-auto">
		<ActivityRangeSelectorButton rs="{nbDaysChoice.oneWeek}" on:click="{(e) => dispatchSelection(e)}"/>
		<ActivityRangeSelectorButton rs="{nbDaysChoice.twoWeeks}" on:click="{(e) => dispatchSelection(e)}" />
		<ActivityRangeSelectorButton rs="{nbDaysChoice.oneMonth}" on:click="{(e) => dispatchSelection(e)}"/>
		<ActivityRangeSelectorButton rs="{nbDaysChoice.twoMonth}" on:click="{(e) => dispatchSelection(e)}"/>
		<ActivityRangeSelectorButton rs="{nbDaysChoice.threeMonth}" on:click="{(e) => dispatchSelection(e)}"/>
		<ActivityRangeSelectorButton rs="{nbDaysChoice.oneYear}" on:click="{(e) => dispatchSelection(e)}"/>
		<ActivityRangeSelectorButton rs="{nbDaysChoice.twoYears}" on:click="{(e) => dispatchSelection(e)}"/>
		<ActivityRangeSelectorButton rs="{nbDaysChoice.threeYears}" on:click="{(e) => dispatchSelection(e)}"/>
		<ActivityRangeSelectorButton rs="{nbDaysChoice.all}" on:click="{(e) => dispatchSelection(e)}"/>
	</div>

	<!-- <div class="w-full flex items-center justify-center mt-6 mb-4">
		<span class="text-3xl text-secondary">Averages on Last {nbDays} Days</span>
	</div> -->
</div>

