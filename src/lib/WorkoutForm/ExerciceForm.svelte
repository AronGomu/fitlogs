<script lang="ts">
  import plusIcon from '@iconify/icons-mdi/plus';
  import trashCanOutline from '@iconify/icons-mdi/trash-can-outline';
  import Icon from '@iconify/svelte';
  import { onMount } from "svelte";
  import type { ExerciceGUI } from '../../shared/class/ExerciceGUI';
  import { SerieGUI } from '../../shared/class/SerieGUI';
  import { Weight } from "../../shared/class/Weight";
  import type { WorkoutGUI } from '../../shared/class/WorkoutGUI';
  import type { WeightMetrics } from "../../shared/enum/WeightMetrics";
  import { saveWorkout } from '../../shared/store/saveStore';
  import { wm } from '../../shared/store/settingsStore';
  import InputNumber from "./inputs/InputNumber.svelte";

  // import store
  let weightMetric: WeightMetrics;
  $: { weightMetric = $wm; }

  // defining values
  let isMounted: boolean = false;
  let deleteDialog: HTMLElement;
  let setToBeDeleted: SerieGUI = null;

  /** Allow to update the datas when updating the exercices. */
  export let w: WorkoutGUI = null;
  /** Exercice that must be passed in argument. */
  export let e: ExerciceGUI;

  onMount(() => {
    isMounted = true;
  })

  function addSet() {
    let lastWeight: Weight = new Weight(0, weightMetric);
    if (e.sl && e.sl.length > 0) lastWeight.weight = e.sl[e.sl.length-1].w.weight;
    e.sl.push(new SerieGUI(e.sl.length, 0, lastWeight, true));
    e.sl = e.sl;
    saveWorkout(w.convertToWorkout());
  }

  function deleteSet(set: SerieGUI) {
    if (!set) throw new Error("There is no set to be deleted !");
    
    for (let i = 0; i < e.sl.length; i++) {
      if (e.sl[i] === set) {
        e.sl.splice(i,1);
        e.sl = e.sl;
        saveWorkout(w.convertToWorkout());
        return;
      }
    }
  }

  /** Show the dialog for trying to delete a set. */
	function showDeleteDialog(set: SerieGUI, asModal = true) {
    setToBeDeleted = set;
    try {
			deleteDialog[asModal ? 'showModal' : 'show']();
		} catch(e) {
      throw new Error(e);
    }
	};

</script>



{#if isMounted && e && e.sl}
{#each e.slGUI as set, i}
<div class="collapse bg-base-300 mb-1" >
  <div class="absolute bg-red-400 z-0 w-full h-full opacity-0 flex justify-center items-center" >
    <Icon icon={trashCanOutline} color="white" width="30" height="30"/>
  </div>
  <input type="checkbox" checked={set.isOpen} class="override-collapse-title"/> 
  <div class="collapse-title font-medium bg-base-200 override-collapse-title cursor-pointer">
      {`Set ${i+1}`}
  </div>
  <div class="collapse-content bg-base-200 override-collapse-content z-10">
    <div class="flex justify-between items-center">
      <div class="flex flex-row items-center">
        <InputNumber placeholder="Weight" className="input w-24 mr-0 text-left" metric={set.w.metric} value={set.w.weight}
        on:keyPress={() => saveWorkout(w.convertToWorkout())}
        on:input={(event) => {set.w.weight = event.detail['value']; saveWorkout(w.convertToWorkout());}}/>
        
        <span class="font-bold mx-2">X</span>
        
        <InputNumber placeholder="Reps" className="input w-14 ml-0 text-center" value={set.rn} 
        on:keyPress={() => saveWorkout(w.convertToWorkout())} 
        on:input={(event) => {set.rn = event.detail['value']; saveWorkout(w.convertToWorkout());}}/>
      </div>
      <button class="btn btn-ghost btn-xs" on:click={() => {setToBeDeleted = set; showDeleteDialog(set, true)}}>
        <Icon icon={trashCanOutline} color="red" width="15" height="15" class="cursor-pointer" />
      </button>
    </div>
  </div>
</div>
{/each}

<div class="flex justify-center w-full mt-2">
  <button class="btn btn-secondary w-36" on:click={addSet} >
    <Icon icon={plusIcon} color="white" width="25" height="25"/>
    Add Set
  </button>
</div>
{/if}


<dialog id="modal" class="modal" bind:this={deleteDialog}>
  <form method="dialog" class="modal-box">
    <div class="flex flex-col justify-center items-center">
      <h3 class="font-bold text-lg mb-10">Delete Set ?</h3>
      <button class="btn btn-error" on:click={() => deleteSet(setToBeDeleted)}>CONFIRM</button>
    </div>
  </form>
  <form method="dialog" class="modal-backdrop">
    <button>close</button>
  </form>
</dialog>





<style>

  .override-collapse-title {
    padding: 0.5rem 0.5rem 0.5rem 1rem;
    min-height: 1rem;
  }

  .override-collapse-content {
    padding: 0.5;
  }
</style>