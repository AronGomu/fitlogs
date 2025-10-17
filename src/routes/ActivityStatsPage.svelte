<script lang="ts">
    import type { Chart, ChartItem } from "chart.js";
    import type { Settings } from "../shared/class/Settings";
    import type { Activity } from "../shared/class/Activity/Activity";
    import type { GraphType } from "../shared/enum/types";
    import { activityAverageListWritable, activityNormalListWritable, updateActivityListWritable } from "../shared/store/activityStore";
    import { onMount } from "svelte";
    import ActivityAverageSelector from "../lib/Activity/ActivityAverageSelector.svelte";
    import ActivityRangeSelector from "../lib/Activity/ActivityRangeSelector.svelte";
    import { saveSettings } from "../shared/database/SettingsDatabase";
    import { menuPath } from "../shared/store/menuPath";
    import { loadSetting, settingsWritable } from "../shared/store/settingsStore";
    import ActivityCharts from "./ActivityCharts.svelte";

	let settings: Settings;

	let loadingActivities: boolean = true;
	let loadingActivitiesChart: boolean = true;
	let isMountingChart: boolean = true;
	let lineChart: Chart = undefined;
	let chartItem: ChartItem = undefined;
	let activitiesShowed: Activity[];
	let averageActivitiesShowed: Activity[];

	let gtTab: GraphType = 'average';


  let loadingActivityList: boolean = true;
  let ActivityListShowed: Activity[];
  activityNormalListWritable.subscribe((activityNormalList) => {
    ActivityListShowed = activityNormalList;
    loadingActivityList = false;
  });


	// info to show
	let averageCalories: number;
	let averageWeight: number;
	let averageSteps: number;
	let averageCaloriesBurned: number;
	let averageTDEE: number;

	let totalAverageCaloriesBurned: number;
	let totalAverageWeightLoss: number;
	let totalAverageSteps: number;

	onMount(async () => {
		menuPath.set("Statistics")
		loadData();
		loadSetting();
	})

	function loadData() {
		activityNormalListWritable.subscribe((activityNormalList) => {
			loadingActivities = true;
			activitiesShowed = activityNormalList;
			loadingActivities = false;
		});

		activityAverageListWritable.subscribe((activityAverageList) => {
			loadingActivities = true;
			averageActivitiesShowed = activityAverageList;
			loadingActivities = false;
		});

		settingsWritable.subscribe((s) => {
			if (s) settings = s;
			else return;
		});

	}

	function convertWeightIntoCalories(weight: number): number {
		return weight * 7700;
	}

	function determineWeightLossLabel(): string {
		if (!totalAverageWeightLoss) return "";
		if (totalAverageWeightLoss < 0) return "gained";
		if (totalAverageWeightLoss > 0) return "losed";
		else return "";
	}
</script>

<div class="h-full w-full flex flex-col justify-between">

	<div class="flex-1 w-full flex flex-col">

		<div class="h-full overflow-y-auto">

			{#if !loadingActivities && activitiesShowed && settings.nbDayShow}
				<ActivityRangeSelector nbDayShow={settings.nbDayShow}
					on:click={ async (e) => {
						const statsRangeSelected = e.detail.value
						settings.nbDayShow = statsRangeSelected;
						await saveSettings(settings);
						
						if (lineChart) lineChart.destroy();
						isMountingChart = true;
						loadingActivitiesChart = true;
						loadingActivities = true;
						activitiesShowed = undefined;
						averageActivitiesShowed = undefined
						await updateActivityListWritable(settings);
					}}
				/>
				{#if gtTab === 'normal'}
					<ActivityCharts {activitiesShowed} {loadingActivitiesChart} {isMountingChart} {lineChart} {chartItem}/>
				{:else if gtTab === 'average'}
					<ActivityCharts activitiesShowed={averageActivitiesShowed} {loadingActivitiesChart} {isMountingChart} {lineChart} {chartItem}/>
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

<!-- <div>
	<div class="flex flex-row overflow-x-auto content-center">
		<ActivityRangeSelector nbDayShow={settings.nbDayShow} on:click={(e) => test(e)}/>
	</div>

  <div class="w-full flex flex-row items-center mt-6 mb-4">
    <span class="text-3xl text-secondary">Averages on Last {nbDays} Days</span>
  </div>

  <div class="w-full justify-left">
     <StatLabel data={String(averageWeight)} label={si.wm.toLowerCase()} />
		<StatLabel data={String(averageCalories)} label="cals eaten" />
		<StatLabel data={String(averageCaloriesBurned)} label="cals burned" />
		<StatLabel data={String(averageTDEE)} label="cals total / TDEE" />
		<StatLabel data={String(averageSteps)} label="steps" /> 
  </div>

  <div class="w-full flex items-center mt-12 mb-4">
    <span class="text-3xl text-secondary">Totals</span>
  </div>

  <div class="w-full justify-left">
     {#if totalAverageCaloriesBurned && totalAverageWeightLoss}
			<StatLabel data={String(totalAverageCaloriesBurned)} label="cals burned" />
			<StatLabel data={String(totalAverageWeightLoss)} label={determineWeightLossLabel()} />
			<StatLabel data={String(totalAverageSteps)} label="steps" />
		{/if} 
  </div>

  <div class="w-full flex items-center justify-center mt-12 mb-4">
    <span class="text-3xl text-secondary">All the Averages</span>
  </div>

	{#if averageActivities}
		<div class="h-full flex flex-col overflow-hidden">
			<div class="flex-1">
				<table class="table">
					<thead>
						<tr>
							<th>
								<span
									class="font-bold"
									>Date</span
								>
							</th>
							<th>
								<span
									class="font-bold"
									>Weight</span
								>
							</th>
							<th>
								<span
									class="font-bold"
									>Calories</span
								>
							</th>
							<th>
								<span
									class="font-bold"
									>Steps</span
								>
							</th>
						</tr>
					</thead>
					<tbody>
						{#each averageActivities as a}
							<tr>
								<td
									>{a.year}-{a.month}-{a.day}</td
								>
								<td
									>{a.weight}</td
								>
								<td
									>{a.calories}</td
								>
								<td
									>{a.steps}</td
								>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		</div>
	{/if} 

	{#if !activities}
		<div class="h-full w-full flex items-center justify-center">
			<span class="text-error"
				>You have no Activity on the last {nbDays} days</span
			>
		</div>
	{/if}
</div> 
-->

