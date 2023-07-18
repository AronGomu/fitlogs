<script lang="ts">
  import trashCanOutline from "@iconify/icons-mdi/trash-can-outline";
  import Icon from "@iconify/svelte";
  import WorkoutForm from "../lib/WorkoutForm/WorkoutForm.svelte";
  import { WorkoutGUI } from "../shared/class/WorkoutGUI";
  import { StoreName, addNewWorkout, deleteDatabase, deleteFromDatabase, fetchWorkoutList } from "../shared/functions/Database";
  import { formatDateWithSpelledOutMonth } from "../shared/functions/Utilitary";

  let workoutsGUI: WorkoutGUI[] = [];

  fetchWorkoutList().then(wl => {
    workoutsGUI = []; // reset then push the ones from database
    for (const w of wl) workoutsGUI.push(new WorkoutGUI(w));
    workoutsGUI = workoutsGUI; // refresh to show on page
  })
  
  let selectedWorkout: WorkoutGUI = null;
  
  // // load the workouts from the storage
  // workoutsData.subscribe((wl: Workout[]) => {

  //   // first we need to match the number of workout from stored data and GUI
  //   let difference: number = wl.length - workoutsGUI.length;
  //   while (difference != 0) {

  //     // means a workoutGUI has been deleted
  //     if (isNegative(difference)) {
  //       for (let i = 0; i < workoutsGUI.length; i++) {
  //         if (!wl.find(w => w.compareWorkout(workoutsGUI[i]) == 0)) {
  //           workoutsGUI.splice(i,1);
  //           break;
  //         }
  //       }
  //     }
  
  //     // means a workout has been added
  //     if (isPositiveNonZero(difference)) {
  //       for (let i = 0; i < wl.length; i++) {
  //         if (!workoutsGUI.find(w => w.compareWorkout(wl[i]) == 0)) {
  //           workoutsGUI.splice(i,0, new WorkoutGUI(wl[i]));
  //           break;
  //         }
  //       }
  //     }

  //     difference = wl.length - workoutsGUI.length;
  //   }

  //   // once the workouts match, we update the data while keeping the GUI state
  //   for (let i = 0; i < wl.length; i++) {
  //     if (!workoutsGUI[i]) workoutsGUI.push(new WorkoutGUI(wl[i]));

  //     switch (workoutsGUI[i].compareWorkout(wl[i])) {
  //       case -1:
  //       case 1:
  //         workoutsGUI.splice(i, 0, new WorkoutGUI(wl[i]));
  //       break;
  //       case 0:
  //         workoutsGUI[i].update(wl[i]);
  //       break;
  //       default: throw new Error(`compareWorkout number : ${workoutsGUI[i].compareWorkout(WebGLQuery[i])}`);
  //     }
  //   }

  //   // refresh the data to show
  //   workoutsGUI = workoutsGUI;
  // })

  /** Creates a new empty workout in the database and add it in the GUI. */
  function onNewWorkout() {
    addNewWorkout().then(fakeW => {
      workoutsGUI.unshift(new WorkoutGUI(fakeW));
      workoutsGUI = workoutsGUI;
    })
  }

  /** Close all of the other workouts open. */
  function onOpenWorkout(w: WorkoutGUI) {
    workoutsGUI.forEach(wGUI => {
      if (w != wGUI) wGUI.isSelfOpen = false;
      else wGUI.isSelfOpen = !wGUI.isSelfOpen;
    });
    workoutsGUI = workoutsGUI;
    selectedWorkout = w;
  }

  /** Delete a workout in the database and remove it in the GUI. */
  function onDeleteWorkout(wGUI: WorkoutGUI) {
    deleteFromDatabase(StoreName.WORKOUT, wGUI.id).then(() => {
      workoutsGUI = workoutsGUI.filter(w => w != wGUI);
    })
  }

</script>

<div class="flex flex-row justify-center mb-4">
  <button class="btn btn-primary" on:click={onNewWorkout}>New Workout</button>
</div>
<button class="btn" on:click={() => {deleteDatabase(); workoutsGUI = workoutsGUI;}}>DELETE ALL</button>

{#if workoutsGUI}
<div class="collapse bg-base-200">
  {#each workoutsGUI as w}
  <div class="exercice-container collapse collapse-arrow bg-base-300 my-2 w-5/6 override-collapse w-full">
    <input type="checkbox" name="exercice" checked={w.isSelfOpen} class="cursor-pointer" on:click={() => onOpenWorkout(w)}/>
    <div class="collapse-title text-xl font-medium text-primary w-full mx-2 override-collapse-title">
      <div class="flex flex-row justify-between w-full">
        {formatDateWithSpelledOutMonth(w.createdAt.getDate())} {w.isSelfOpen}
      </div>creation
    </div>

    {#if selectedWorkout === w && selectedWorkout.isSelfOpen}
    <div class="collapse-content">
      <WorkoutForm workoutGUI={w} />
      <div class="w-full flex justify-end">
        <button class="btn btn-xs" on:click={() => onDeleteWorkout(w)}><Icon icon={trashCanOutline} color="red" width="10" height="10" /></button>
      </div>
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