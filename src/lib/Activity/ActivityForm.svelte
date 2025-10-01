<script lang="ts">
  import { Activity } from "../../shared/class/Activity/Activity";
  import { ActivityDate } from "../../shared/class/Activity/ActivityDate";
  import type { Settings } from "../../shared/class/Settings";
  import {
    getActivityFromDatabase,
    putActivityInDatabase,
    deleteActivityFromDatabase,
  } from "../../shared/functions/Database";
  import { adToModify } from "../../shared/store/activityStore";
  import { settingsWritable } from "../../shared/store/settingsStore";
  import DateInput from "../DateInput.svelte";
  import InputNumber from "../WorkoutForm/inputs/InputNumber.svelte";

  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  let si: Settings;
  settingsWritable.subscribe((s) => (si = s));

  // Activity form
  let date = new Date();
  let weight: number;
  let calories: number;
  let steps: number;

  // form logic
  let initialLoad: boolean = true;
  let isOverridingData: boolean = false;

  // UI Stuff
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  let doesActivityAlreadyExist: boolean = false;
  let isItYesterday = false;
  let isActivityValid: boolean = false;

  let selectedActivityDate: ActivityDate;
  adToModify.subscribe((adToUpdate) => {
    selectedActivityDate = adToUpdate;
    initialLoad = true;
    checkActivityExistence();
  });

  init();

  function init() {
    checkActivityExistence();
  }

  async function checkActivityExistence() {
    if (selectedActivityDate) {
      date = selectedActivityDate.toDate();
      selectedActivityDate = null;
    }

    const activity = await getActivityFromDatabase(
      date.getFullYear(),
      date.getMonth() + 1,
      date.getDate()
    );

    if (activity) {
      isOverridingData = true;
    } else {
      isOverridingData = false;
    }

    if (!initialLoad) return;

    initialLoad = false;
    assignFetchedData(activity);
    checkIfIsItYesterday();
  }

  function checkIfIsItYesterday(): void {
    if (date.getFullYear() !== yesterday.getFullYear()) {
      isItYesterday = false;
      return;
    }
    if (date.getMonth() !== yesterday.getMonth()) {
      isItYesterday = false;
      return;
    }
    if (date.getDay() !== yesterday.getDay()) {
      isItYesterday = false;
      return;
    }
    isItYesterday = true;
  }

  function assignFetchedData(activity: Activity) {
    if (!activity) {
      doesActivityAlreadyExist = false;
      weight = null;
      calories = null;
      steps = null;
    } else {
      weight = activity.weight;
      calories = activity.calories;
      steps = activity.steps;
      doesActivityAlreadyExist = true;
    }
  }

  function getNumberOrNull(n: any): number | null {
    n = Number(n);
    if (n === 0) return null;
    return n;
  }

  async function saveActivity(): Promise<void> {
    const activity = new Activity(
      date.getFullYear(),
      date.getMonth() + 1, // month start at zero in js
      date.getDate(),
      getNumberOrNull(weight),
      getNumberOrNull(calories),
      getNumberOrNull(steps)
    );
    await putActivityInDatabase(activity);
    checkActivityExistence();
    dispatch("saveActivity");
  }

  async function deleteActivity(): Promise<void> {
    const activity = await deleteActivityFromDatabase(
      date.getFullYear(),
      date.getMonth() + 1,
      date.getDate()
    );

    if (!activity) {
      throw new Error("Activity to delete is not found in the database !");
    }

    checkActivityExistence();
    dispatch("saveActivity");
  }

  function changeActivityDate(e) {
    console.log(e);
    const d = new Date(e.detail.value);
    const value = new ActivityDate(
      d.getFullYear(),
      d.getMonth() + 1,
      d.getDate()
    );
    adToModify.set(value);
  }
</script>

<div class="flex flex-col items-center">
  <DateInput
    bind:date
    on:input={(e) => {
      changeActivityDate(e);
      checkActivityExistence();
      checkIfIsItYesterday();
    }}
  />

  <div class="mt-2">
    <InputNumber
      label="Weight"
      placeholder="Weight"
      className="input w-24  text-left"
      value={weight}
      metric={si.wm}
      on:input={(event) => {
        weight = event.detail.value;
      }}
    />
  </div>

  <div class="mt-2">
    <InputNumber
      label="Calories"
      placeholder="Calories"
      className="input w-24 mt-2 text-left"
      value={calories}
      on:input={(event) => {
        calories = event.detail.value;
      }}
    />
  </div>

  <div class="mt-2">
    <InputNumber
      label="Steps"
      placeholder="Steps"
      className="input w-24 mt-2 text-left"
      value={steps}
      on:input={(event) => {
        steps = event.detail.value;
      }}
    />
  </div>

  {#if doesActivityAlreadyExist}
    <button
      class="btn btn-warning mt-2"
      disabled={isActivityValid}
      on:click={() => saveActivity()}>Update Activity</button
    >
    <button class="btn btn-error mt-2" on:click={() => deleteActivity()}
      >Delete Activity</button
    >
  {:else if isItYesterday}
    <button
      class="btn btn-success mt-2"
      disabled={isActivityValid}
      on:click={() => saveActivity()}>Log Yesterday's Activity</button
    >
  {:else}
    <button
      class="btn btn-warning mt-2"
      disabled={isActivityValid}
      on:click={() => saveActivity()}>Log Activity</button
    >
  {/if}

  {#if isOverridingData}
    <div class="text-warning">
      <span>You are overriding existing data.</span>
    </div>
  {/if}
</div>
