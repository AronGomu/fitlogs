<script lang="ts">
  import WorkoutForm from "../lib/WorkoutForm/WorkoutForm.svelte";
  import { Workout } from "../shared/class/Workout";
  import { WorkoutGUI } from "../shared/class/WorkoutGUI";
  import { formatDateWithSpelledOutMonth } from "../shared/functions/Utilitary";
  import { deleteWorkoutData, saveWorkout, workoutsData } from "../shared/store/saveStore";


  let workoutsGUI: WorkoutGUI[] = [];
  
  let selectedWorkout: WorkoutGUI = null;
  
  // load the workouts from the storage
  workoutsData.subscribe((wl: Workout[]) => {
    if (!wl) return;

    for (let i = 0; i < wl.length; i++) {
      if (!workoutsGUI[i]) workoutsGUI.push(new WorkoutGUI(wl[i]));

      switch (workoutsGUI[i].compareWorkout(wl[i])) {
        case -1:
        case 1:
          workoutsGUI.splice(i, 0, new WorkoutGUI(wl[i]));
        break;
        case 0:
          workoutsGUI[i].update(wl[i]);
        break;
        default: throw new Error(`compareWorkout number : ${workoutsGUI[i].compareWorkout(WebGLQuery[i])}`);
      }
    }

    workoutsGUI = workoutsGUI;
  })

  function newWorkout() {
      saveWorkout(new Workout());
  }

  function openWorkout(w: WorkoutGUI) {
    selectedWorkout = w;
  }
</script>

<div class="flex flex-row justify-center mb-4">
  <button class="btn btn-primary" on:click={newWorkout}>New Workout</button>
</div>
<button class="btn" on:click={() => deleteWorkoutData()}>DELETE ALL</button>

{#if workoutsGUI}
<div class="collapse bg-base-200">
  {#each workoutsGUI as w}
  <div class="exercice-container collapse collapse-arrow bg-base-300 my-2 w-5/6 override-collapse w-full">
    <input type="checkbox" name="exercice" class="cursor-pointer" on:click={() => openWorkout(w)}/>
    <div class="collapse-title text-xl font-medium text-primary w-full mx-2 override-collapse-title">
      <div class="flex flex-row justify-between w-full">
        {formatDateWithSpelledOutMonth(w.c)}
      </div>
    </div>

    {#if selectedWorkout === w}
    <div class="collapse-content">
      <WorkoutForm workout={w} />
    </div>
    {/if}
  </div>
  {/each}

</div>
{/if}

<style>
  .override-collapse {
    overflow: initial;
  }
</style>