<script lang="ts">
  import ActivityRangeSelector from "../lib/Activity/ActivityRangeSelector.svelte";
  import type { Activity } from "../shared/class/Activity/Activity";
  import type { Settings } from "../shared/class/Settings";
  import { activityListWritable } from "../shared/store/activityStore";
  import { settingsWritable } from "../shared/store/settingsStore";

  let nbDays: number | null = 7;

  let si: Settings;
  settingsWritable.subscribe((s) => {
    si = s;
  });

  let loadingActivityList: boolean = true;
  let ActivityListShowed: Activity[];
  activityListWritable.subscribe((ActivityList) => {
    ActivityListShowed = ActivityList;
    loadingActivityList = false;
  });

  let activityList;
  // let averagesData = new AveragesData();

  function onClickRange(e) {
    console.log(e);
  }
</script>

<div class="h-full w-full">
  <div class="flex flex-row overflow-x-auto content-center">
    <ActivityRangeSelector on:click={(e) => onClickRange(e)} />
  </div>

  <div class="w-full flex flex-row items-center mt-6 mb-4">
    <span class="text-3xl text-secondary">Averages on Last {nbDays} Days</span>
  </div>

  <div class="w-full justify-left">
    <!-- <StatLabel data={String(averageWeight)} label={si.wm.toLowerCase()} />
		<StatLabel data={String(averageCalories)} label="cals eaten" />
		<StatLabel data={String(averageCaloriesBurned)} label="cals burned" />
		<StatLabel data={String(averageTDEE)} label="cals total / TDEE" />
		<StatLabel data={String(averageSteps)} label="steps" /> -->
  </div>

  <div class="w-full flex items-center mt-12 mb-4">
    <span class="text-3xl text-secondary">Totals</span>
  </div>

  <div class="w-full justify-left">
    <!-- {#if totalAverageCaloriesBurned && totalAverageWeightLoss}
			<StatLabel data={String(totalAverageCaloriesBurned)} label="cals burned" />
			<StatLabel data={String(totalAverageWeightLoss)} label={determineWeightLossLabel()} />
			<StatLabel data={String(totalAverageSteps)} label="steps" />
		{/if} -->
  </div>

  <div class="w-full flex items-center justify-center mt-12 mb-4">
    <span class="text-3xl text-secondary">All the Averages</span>
  </div>

  <div class="h-full flex flex-col overflow-hidden">
    <div class="flex-1">
      <table class="table">
        <!-- head -->
        <thead>
          <tr>
            <th>
              <span class="font-bold">Date</span>
            </th>
            <th>
              <span class="font-bold">Weight</span>
            </th>
            <th>
              <span class="font-bold">Calories</span>
            </th>
            <th>
              <span class="font-bold">Steps</span>
            </th>
          </tr>
        </thead>
        <tbody>
          <!-- {#each averageActivityList as a}
            <tr>
              <td>{a.year}-{a.month}-{a.day}</td>
              <td>{a.weight}</td>
              <td>{a.calories}</td>
              <td>{a.steps}</td>
            </tr>
          {/each} -->
        </tbody>
      </table>
    </div>
  </div>

  <div class="h-full w-full flex items-center justify-center">
    <span class="text-error"
      >You have no Activity on the last {nbDays} days</span
    >
  </div>
</div>
