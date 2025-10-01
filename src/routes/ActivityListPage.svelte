<script lang="ts">
  import ActivityForm from "../lib/Activity/ActivityForm.svelte";
  import { ActivityDate } from "../shared/class/Activity/ActivityDate";
  import ActivityHeader from "../lib/Activity/ActivityHeader.svelte";
  import ActivityFooter from "../lib/Activity/ActivityFooter.svelte";
  import type { Activity } from "../shared/class/Activity/Activity";
  import {
    activityListWritable as activityListWritable,
    adToModify,
    setActivityListWritableFromDB,
  } from "../shared/store/activityStore";
  import ActivityRangeSelector from "../lib/Activity/ActivityRangeSelector.svelte";
  import type { Settings as Settings } from "../shared/class/Settings";
  import { settingsWritable } from "../shared/store/settingsStore";
  import { buildAverageActivityList } from "../shared/functions/Activity";

  let si: Settings;
  let isLoadingActivityList: boolean = true;
  let activityShowedList: Activity[] = [];
  let activityAverageList: Activity[] = [];

  let todayYear, todayMonth, todayDay;
  let yesterdayYear, yesterdayMonth, yesterdayDay;

  // init //
  setTodayDataForAddingNewActivity();
  setYesterdayDataForAddingNewActivity();
  settingsWritable.subscribe((s) => {
    si = s;
    subscribeForActivityList(si.nbDaysToShow);
  });
  // init //

  function subscribeForActivityList(nbDaysToShow) {
    activityListWritable.subscribe((ActivityList) => {
      activityShowedList = ActivityList;
      isLoadingActivityList = false;
      updateActivityListShowed(ActivityList, nbDaysToShow);
    });
  }

  function setTodayDataForAddingNewActivity(): void {
    const today = new Date();
    todayYear = today.getFullYear();
    todayMonth = today.getMonth() + 1;
    todayDay = today.getDate();
  }

  function setYesterdayDataForAddingNewActivity(): void {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    yesterdayYear = yesterday.getFullYear();
    yesterdayMonth = yesterday.getMonth() + 1;
    yesterdayDay = yesterday.getDate();
  }

  async function updateActivityListShowed(activityList: Activity[], nbDaysToShow: number) {
    console.log("got to updateActivityListShowed !");
    isLoadingActivityList = false;
    activityShowedList = activityList;
    activityAverageList = buildAverageActivityList(activityList, nbDaysToShow);
    isLoadingActivityList = false;
  }

  // UI Stuff //
  let activityFormDialog: HTMLElement;
  function showActivityFormDialog(year: number, month: number, day: number, asModal = true) {
    try {
      adToModify.set(new ActivityDate(year, month, day));
      activityFormDialog[asModal ? "showModal" : "show"]();
    } catch (e) { throw new Error(e); }
  }
</script>

<div class="h-full w-full flex flex-col justify-between">
    <div class="flex-1 w-full flex flex-col">
        <ActivityHeader selectedTab="list" />

        <div class="h-full overflow-y-auto">
            <div class="w-full flex items-center justify-center mb-2">
                <button class="btn btn-primary"
                    on:click={() => showActivityFormDialog(todayYear, todayMonth, todayDay)}
                > Log Today's weigth </button>

                <button class="btn btn-secondary"
                    on:click={() => showActivityFormDialog(yesterdayYear, yesterdayMonth, yesterdayDay)}
                > Log Yesterday's Activity </button>
            </div>

            {#if !isLoadingActivityList && activityShowedList}
                <ActivityRangeSelector defaultNbDays={si.nbDaysToShow} 
                on:click={(e) => updateActivityListShowed(activityShowedList, e.detail.value)} />

        <div class="h-0 w-full flex flex-col">
          <table class="table table-zebra table-pin-row table-lg">
            <thead>
              <tr>
                <th><span class="font-bold">Date</span></th>
                <th><span class="font-bold">Weight</span></th>
                <th><span class="font-bold">Calories</span></th>
                <th><span class="font-bold">Steps</span></th>
              </tr>
            </thead>

            <tbody>
              {#each activityShowedList as a}
                <tr class="cursor-pointer" on:click={() => showActivityFormDialog(a.year, a.month, a.day)} >
                  <td>{a.year}-{a.month}-{a.day}</td>
                  <td>{a.weight}</td>
                  <td>{a.calories}</td>
                  <td>{a.steps}</td>
                </tr>
              {/each}
            </tbody>
          </table>
        </div>
      {:else}
        <div class="flex items-center justify-center">
          <span class="loading loading-spinner loading-xl"></span>
        </div>
      {/if}
    </div>
  </div>

  <ActivityFooter />
</div>

<dialog id="modal" class="modal" bind:this={activityFormDialog}>
  <form method="dialog" class="modal-box">
    <ActivityForm />
  </form>
  <form method="dialog" class="modal-backdrop">
    <button>close</button>
  </form>
</dialog>
