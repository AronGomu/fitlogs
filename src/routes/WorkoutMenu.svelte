<script lang="ts">
  import { navigate } from "svelte-routing/src/history";
import { Workout } from "../shared/class/Workout";
import { deleteWorkoutData, saveWorkout, workoutData } from "../shared/store/saveStore";

let workouts: Workout[];
$: { workouts = $workoutData;}

function newWorkout() {
    saveWorkout(new Workout());
    // navigate("WorkoutForm")
}

console.log(workouts);
</script>


<button class="btn" on:click={newWorkout}>NEW New Workout</button>
<button class="btn" on:click={() => deleteWorkoutData()}>DELETE ALL</button>

{#if workouts}
<div id="workout" class="flex flex-col items-center">
{#each workouts as workout}
    <div>{workout.lastModification}</div>
{/each}
</div>
{/if}