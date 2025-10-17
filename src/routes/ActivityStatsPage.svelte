<script lang="ts">
    import type { Chart, ChartItem } from 'chart.js';
    import type { Settings } from '../shared/class/Settings';
    import type { Activity } from '../shared/class/Activity/Activity';
    import type { ActivityType } from '../shared/enum/types';
    import {
        activityAverageListWritable,
        activityNormalListWritable,
        updateActivityListWritable,
    } from '../shared/store/activityStore';
    import ActivityAverageSelector from '../lib/Activity/ActivityAverageSelector.svelte';
    import ActivityRangeSelector from '../lib/Activity/ActivityRangeSelector.svelte';
    import { saveSettings } from '../shared/database/SettingsDatabase';
    import { settingsWritable } from '../shared/store/settingsStore';
    import ActivityCharts from './ActivityCharts.svelte';

    let settings: Settings;

    let loadingActivities: boolean = true;
    let loadingActivitiesChart: boolean = true;
    let isMountingChart: boolean = true;
    let lineChart: Chart = undefined;
    let chartItem: ChartItem = undefined;
    let activityListShowed: Activity[];
    let averageActivityListLoaded: Activity[];

    let loadingActivityList: boolean = true;
	let activityNormalList: Activity[] = []
	let activityAverageList: Activity[] = []
    let ActivityListShowed: Activity[];
    activityNormalListWritable.subscribe((activityNormalList) => {
        ActivityListShowed = activityNormalList;
        loadingActivityList = false;
    });

    // init //
    settingsWritable.subscribe(s => {
        if (s) {
            settings = s;
            loadData(s);
        }
    });
    // init //

    function loadData(s: Settings) {
        activityNormalListWritable.subscribe(activityNormalList => {
            loadingActivities = true;
            activityNormalList  = activityNormalList;
            loadingActivities = false;
            setActivityListToShow(s, activityNormalList)
        });

        activityAverageListWritable.subscribe(activityAverageList => {
            loadingActivities = true;
            activityAverageList = activityAverageList;
            loadingActivities = false;
            setActivityListToShow(s, activityAverageList)
        });
    }

    function setActivityListToShow(s: Settings, activityList: Activity[]) {
        console.log(s);
        console.log(activityList);
        
        if (s.typeActivityList === 'normal') activityListShowed = activityList;
        else if (s.typeActivityList === 'average') activityListShowed = activityAverageList;
    }

    async function updateActivityListShowed(s: Settings, nbDaysToShow: number) {
        s.nbDayShow = nbDaysToShow;
        saveSettings(s);
        loadingActivities = true;
        await updateActivityListWritable(s);
        loadingActivities = false;
    }

    function swapToNormalActivityList() {
        activityListShowed = activityNormalList;
    }

    function swapToAverageActivityList() {
        activityListShowed = activityAverageList;
    }

    
</script>

<div class="h-full w-full flex flex-col justify-between">
    <div class="flex-1 w-full flex flex-col">
        <div class="h-full overflow-y-auto">
            {#if !loadingActivities && activityListShowed && settings && settings.nbDayShow}

                <ActivityRangeSelector nbDayShow={settings.nbDayShow}
                    on:click={async (e) => {
                        const statsRangeSelected = e.detail.value;
                        settings.nbDayShow = statsRangeSelected;
                        await saveSettings(settings);

                        if (lineChart) lineChart.destroy();
                        isMountingChart = true;
                        loadingActivitiesChart = true;
                        loadingActivities = true;
                        activityListShowed = undefined;
                        averageActivityListLoaded = undefined;
                        await updateActivityListWritable(settings);
                    }}
                />

				<ActivityCharts
					activityListShowed={activityListShowed}
					{loadingActivitiesChart}
					{isMountingChart}
					{lineChart}
					{chartItem}
				/>
            {:else}
                <div class="flex items-center justify-center">
                    <span class="loading loading-spinner loading-xl"></span>
                </div>
            {/if}
        </div>
    </div>

    <ActivityAverageSelector settings={settings}
        on:graphSelect={(e) => {
            if (e.detail.value === 'normal') swapToNormalActivityList() 
            if (e.detail.value === 'average') swapToAverageActivityList() 
        }}
    />
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

<!-- 
let averageCalories: number;
let averageWeight: number;
let averageSteps: number;
let averageCaloriesBurned: number;
let averageTDEE: number;

let totalAverageCaloriesBurned: number;
let totalAverageWeightLoss: number;
let totalAverageSteps: number; 
-->
