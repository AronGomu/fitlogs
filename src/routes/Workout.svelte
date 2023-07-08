<script lang="ts">
  import WorkoutForm from "../lib/WorkoutForm/WorkoutForm.svelte";
  import { Workout } from "../shared/class/Workout";
  import { formatDateWithSpelledOutMonth } from "../shared/functions/Utilitary";
  import { deleteWorkoutData, saveWorkout, workoutsData } from "../shared/store/saveStore";

// import { Workout } from "../shared/class/Workout";
// import { saveWorkout, workoutsData } from "../shared/store/saveStore";

let workouts: Workout[];
$: { workouts = $workoutsData;}

let selectedWorkout: Workout = null;

function newWorkout() {
    saveWorkout(new Workout());
}

function openWorkout(w: Workout) {
  selectedWorkout = w;
}
</script>


<button class="btn" on:click={newWorkout}>NEW New Workout</button>
<button class="btn" on:click={() => deleteWorkoutData()}>DELETE ALL</button>

{#if workouts}
<div class="collapse bg-base-200">
  {#each workouts as w}
  <div class="exercice-container collapse collapse-arrow bg-base-300 my-2 w-5/6 override-collapse w-full">
    <input type="checkbox" name="exercice" class="cursor-pointer" on:click={() => openWorkout(w)}/>
    <div class="collapse-title text-xl font-medium text-primary w-full mx-2 override-collapse-title">
      <div class="flex flex-row justify-between w-full">
        {formatDateWithSpelledOutMonth(w.creation)}
      </div>
    </div>

    <div class="collapse-content">
      {#if selectedWorkout === w}
      <WorkoutForm w={w} />
      {/if}
    </div>
  </div>
  {/each}

</div>
{/if}