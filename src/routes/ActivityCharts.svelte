<script lang="ts">
  	import { onMount } from "svelte";
	import { createAxesForChart, type Activity } from "../shared/class/Activity/Activity";
  	import { buildLineChart } from "../shared/functions/Chart";
  	import type Chart from "chart.js/auto";
  	import type { ChartItem } from "chart.js/auto";

	export let activityListShowed: Activity[] = null;
	export let loadingActivitiesChart: boolean = true;
	export let isMountingChart: boolean = true;
	export let lineChart: Chart = undefined;
	export let chartItem: ChartItem = undefined;

	onMount(() => {
		loadData();
		isMountingChart = false;
	});

	function loadData() {
		if (!chartItem) chartItem = document.getElementById('myChart').getContext('2d');
		const cp = createAxesForChart(chartItem, activityListShowed);
		lineChart = buildLineChart(cp);
		loadingActivitiesChart = false;
	}

</script>

<canvas id="myChart"></canvas>

{#if isMountingChart || loadingActivitiesChart || !activityListShowed}
	<div class="flex items-center justify-center">
		<span class="loading loading-spinner loading-xl"></span>
	</div>
{/if}