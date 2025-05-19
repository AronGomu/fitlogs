<script lang="ts">
	import ActivityHeader from "../lib/Activity/ActivityHeader.svelte";
	import ActivityFooter from "../lib/Activity/ActivityFooter.svelte";
	import type { Activity } from "../shared/class/Activity/Activity";
	import { activities, loadActivitiesStore } from "../shared/store/activityStore";
	import ActivityRangeSelector from "../lib/Activity/ActivityRangeSelector.svelte";
	import ActivityCharts from "./ActivityCharts.svelte";
  	import type Chart from "chart.js/auto";
	import { onMount } from "svelte";
	import type { ChartItem } from "chart.js/auto";

	let loadingActivities: boolean = true;
	let loadingActivitiesChart: boolean = true;
	let isMountingChart: boolean = true;
	let lineChart: Chart = undefined;
	let chartItem: ChartItem = undefined;
	let activitiesShowed: Activity[];

	function loadData() {
		activities.subscribe((activities) => {
			if (!activities) return;
			if (activities.length < 1) return;
			loadingActivities = true;
			activitiesShowed = activities;
			loadingActivities = false;
		});
	}

	onMount(() => {
		loadData();
	});
</script>

<div class="h-full w-full flex flex-col justify-between">

	<div class="flex-1 w-full flex flex-col">

		<ActivityHeader selectedTab="list"/>

		<div class="h-full overflow-y-auto">

			{#if !loadingActivities && activitiesShowed}
				<ActivityRangeSelector 
					on:click={ async (e) => {
						if (lineChart) lineChart.destroy();
						isMountingChart = true;
						loadingActivitiesChart = true;
						loadingActivities = true;
						activitiesShowed = null;
						loadActivitiesStore(e.detail.value);
					}}
				/>
				<ActivityCharts {activitiesShowed} {loadingActivitiesChart} {isMountingChart} {lineChart} {chartItem}/>
			{:else}
				<div class="flex items-center justify-center">
					<span class="loading loading-spinner loading-xl"></span>
				</div>
			{/if}

		</div>
	</div>

	<ActivityFooter/>

</div>