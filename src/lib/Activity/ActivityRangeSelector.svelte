<script lang="ts">
	import { settings } from "../../shared/store/settingsStore";
	import type { Settings } from "../../shared/class/Settings";
  	import ActivityRangeSelectorButton from "./ActivityRangeSelectorButton.svelte";
  	import { ActivityRangeSelectorData } from "../../shared/class/Activity/ActivityRangeSelectorData";

	// STORES // 
	let si: Settings;
	settings.subscribe((s) => (si = s));
	// STORES // 

	// PARAMETERS //
	export let nbDays: number | null = 7;
	// PARAMETERS //


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
	};

	init();

	function init() {
		setNbDays(nbDays);
	}

	function setNbDays(nb: number): void {
		nbDays = nb;
		for (const key of Object.keys(nbDaysChoice)) {
			nbDaysChoice[key].class = "";
			if (nbDaysChoice[key].value === nb) nbDaysChoice[key].class = "btn-primary";
		}
	}
</script>

<div class="h-full w-full">
	<div class="flex flex-row overflow-x-auto">
		<ActivityRangeSelectorButton rs="{nbDaysChoice.oneWeek}"/>
		<ActivityRangeSelectorButton rs="{nbDaysChoice.twoWeeks}"/>
		<ActivityRangeSelectorButton rs="{nbDaysChoice.oneMonth}"/>
		<ActivityRangeSelectorButton rs="{nbDaysChoice.twoMonth}"/>
		<ActivityRangeSelectorButton rs="{nbDaysChoice.threeMonth}"/>
		<ActivityRangeSelectorButton rs="{nbDaysChoice.oneYear}"/>
		<ActivityRangeSelectorButton rs="{nbDaysChoice.twoYears}"/>
		<ActivityRangeSelectorButton rs="{nbDaysChoice.threeYears}"/>
		<ActivityRangeSelectorButton rs="{nbDaysChoice.all}"/>
	</div>

	<div class="w-full flex items-center justify-center mt-6 mb-4">
		<span class="text-3xl text-secondary">Averages on Last {nbDays} Days</span>
	</div>
</div>
	
