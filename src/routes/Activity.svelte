<script lang="ts">
  import InputNumber from "../lib/WorkoutForm/inputs/InputNumber.svelte";
  import type { Settings } from "../shared/class/Settings";
  import { settings } from "../shared/store/settingsStore";

  let si: Settings;
  settings.subscribe((s) => (si = s));

  let date: Date = new Date();
  console.log(date);
  let weight: number;
  let calories: number;
  let steps: number;

  function saveActivity(): void {
    console.log(
      `TO SAVE : ${date.getFullYear()}-${date.getMonth()}-${date.getDay()}, ${weight}${
        si.wm
      }, ${calories}, ${steps}`,
    );
  }
</script>

<div class="flex flex-col">
  <input class="input" type="date" bind:value={date} />

  <InputNumber
    label="Weight"
    placeholder="Weight"
    className="input w-24 mr-0 text-left"
    initValue={weight}
    metric={si.wm}
    on:input={(event) => {
      weight = event.detail.value;
    }}
  />

  <InputNumber
    label="Calories"
    placeholder="Calories"
    className="input w-24 mr-0 text-left"
    initValue={calories}
    on:input={(event) => {
      calories = event.detail.value;
    }}
  />

  <InputNumber
    label="Steps"
    placeholder="Steps"
    className="input w-24 mr-0 text-left"
    initValue={steps}
    on:input={(event) => {
      steps = event.detail.value;
    }}
  />
</div>

<button class="btn" on:click={() => saveActivity()}>Save Today Activity</button>
