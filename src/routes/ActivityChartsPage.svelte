<script lang="ts">
	import ActivityHeader from "../lib/Activity/ActivityHeader.svelte";
	import type { Activity } from "../shared/class/Activity/Activity";
	import ActivityRangeSelector from "../lib/Activity/ActivityRangeSelector.svelte";
	import ActivityCharts from "./ActivityCharts.svelte";
  	import type Chart from "chart.js/auto";
	import { onMount } from "svelte";
	import type { ChartItem } from "chart.js/auto";
  	import ActivityAverageSelector from "../lib/Activity/ActivityAverageSelector.svelte";
  	import type { GraphType } from "../shared/enum/types";
    import { activityAverageListWritable, activityNormalListWritable, updateActivityListWritable } from "../shared/store/activityStore";
    import type { Settings } from "../shared/class/Settings";
    import { settingsWritable } from "../shared/store/settingStore";

	let loadingActivities: boolean = true;
	let loadingActivitiesChart: boolean = true;
	let isMountingChart: boolean = true;
	let lineChart: Chart = undefined;
	let chartItem: ChartItem = undefined;

	let settings: Settings;
	let activitiesShowed: Activity[];
	let aaListShowed: Activity[];

	let gtTab: GraphType = 'average';

	function loadData() {
		settingsWritable.subscribe(s => settings = s);

		activityNormalListWritable.subscribe((activities) => {
			if (!activities) return;
			if (activities.length < 1) return;
			loadingActivities = true;
			activitiesShowed = activities;
			loadingActivities = false;
		});

		activityAverageListWritable.subscribe((aaList) => {
			if (!aaList) return;
			if (aaList.length < 1) return;
			loadingActivities = true;
			aaListShowed = aaList;
			loadingActivities = false;
		});
	}

	onMount(() => { loadData() });

</script>

<div class="h-full w-full flex flex-col justify-between">

	<div class="flex-1 w-full flex flex-col">

		<ActivityHeader selectedTab="list"/>

		<div class="h-full overflow-y-auto">

			{#if !loadingActivities && activitiesShowed}
				<ActivityRangeSelector nbDayShow={settings.nbDayShow} 
					on:click={ async (e) => {
						if (lineChart) lineChart.destroy();
						isMountingChart = true;
						loadingActivitiesChart = true;
						loadingActivities = true;
						activitiesShowed = undefined;
						aaListShowed = undefined
						updateActivityListWritable(e.detail.value);
					}}
				/>
				{#if gtTab === 'normal'}
					<ActivityCharts {activitiesShowed} {loadingActivitiesChart} {isMountingChart} {lineChart} {chartItem}/>
				{:else if gtTab === 'average'}
					<ActivityCharts activitiesShowed={aaListShowed} {loadingActivitiesChart} {isMountingChart} {lineChart} {chartItem}/>
				{/if}

			{:else}
				<div class="flex items-center justify-center">
					<span class="loading loading-spinner loading-xl"></span>
				</div>
			{/if}

		</div>
	</div>

	<ActivityAverageSelector on:graphSelect={(e) => {
		if (e.detail.value === 'normal') gtTab = 'normal';
		if (e.detail.value === 'average') gtTab = 'average';
	}} />

</div>