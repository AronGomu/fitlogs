<script lang="ts">
  import plusIcon from '@iconify/icons-mdi/plus';
  import trashCanOutline from '@iconify/icons-mdi/trash-can-outline';
  import Icon from '@iconify/svelte';
  import { onMount } from "svelte";
  import { Exercice } from "../../shared/class/Exercice";
  import { Serie } from "../../shared/class/Serie";
  import { Weight } from "../../shared/class/Weight";
  import type { Workout } from '../../shared/class/Workout';
  import type { WeightMetrics } from "../../shared/enum/WeightMetrics";
  import { wm } from '../../shared/store/settingsStore';
  import InputNumber from "./inputs/InputNumber.svelte";
  import { saveWorkout } from '../../shared/store/saveStore';

  // import store
  let weightMetric: WeightMetrics;
  $: { weightMetric = $wm; }

  // defining values
  let isMounted: boolean = false;
  let deleteDialog: HTMLElement;
  let setToBeDeleted: Serie = null;

  /** Allow to update the datas when updating the exercices. */
  export let w: Workout = null;
  /** Exercice that must be passed in argument. */
  export let e: Exercice;

  onMount(() => {
    isMounted = true;
  })

  function addSet(): void {
    let lastWeight: Weight = new Weight(0, weightMetric);
    if (e.sets && e.sets.length > 0) lastWeight.weight = e.sets[e.sets.length-1].weight.weight;
    e.sets.push(new Serie(e.sets.length, 0, lastWeight, true));
    e.sets = e.sets;
    saveWorkout(w);
  }

  function deleteSet(set: Serie): void {
    if (!set) throw new Error("There is no set to be deleted !");
    
    for (let i = 0; i < e.sets.length; i++) {
      if (e.sets[i] === set) {
        e.sets.splice(i,1);
        e.sets = e.sets;
        saveWorkout(w);
        return;
      }
    }
  }

  /** Show the dialog for trying to delete a set. */
	function showDeleteDialog(set: Serie, asModal = true): void {
    setToBeDeleted = set;
    try {
			deleteDialog[asModal ? 'showModal' : 'show']();
		} catch(e) {
      throw new Error(e);
    }
	};

</script>



{#if isMounted && e && e.sets}
{#each e.sets as set, i}
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
        <InputNumber placeholder="Weight" className="input w-24 mr-0 text-left" metric={set.weight.metric} value={set.weight.weight}
        on:keyPress={() => saveWorkout(w)}
        on:input={(event) => {set.weight.weight = event.detail['value']; saveWorkout(w);}}/>
        
        <span class="font-bold mx-2">X</span>
        
        <InputNumber placeholder="Reps" className="input w-14 ml-0 text-center" value={set.repetitions} 
        on:keyPress={() => saveWorkout(w)} 
        on:input={(event) => {set.repetitions = event.detail['value']; saveWorkout(w);}}/>
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