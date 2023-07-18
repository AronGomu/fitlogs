<script lang="ts">
  import plusIcon from '@iconify/icons-mdi/plus';
  import trashCanOutline from '@iconify/icons-mdi/trash-can-outline';
  import Icon from '@iconify/svelte';
  import { createEventDispatcher, onMount } from "svelte";
  import type { ExerciceGUI } from '../../shared/class/ExerciceGUI';
  import { SerieGUI } from '../../shared/class/SerieGUI';
  import type { Settings } from '../../shared/class/Settings';
  import { settings } from '../../shared/store/settingsStore';
  import InputNumber from "./inputs/InputNumber.svelte";

  const dispatch = createEventDispatcher();

  /** Settings Imported form the store. */
  let si: Settings;
  settings.subscribe(s => si = s);

  // defining values
  let isMounted: boolean = false;
  let deleteDialog: HTMLElement;
  let setToBeDeleted: SerieGUI = null;

  /** Exercice that must be passed in argument. */
  export let e: ExerciceGUI;

  onMount(() => {
    isMounted = true;
  });

  /** Add a new empty set to an exercice object and signal to the parent to update the database. */
  function addSet() {
    e.addSet(si.wm);
    dispatch('update', e);
  }

  /** Delete a set and signal to the parent to update the database.*/
  function deleteSet(sGUI: SerieGUI) {
    if (!sGUI) throw new Error("There is no set to be deleted !");
    
    for (let i = 0; i < e.sl.length; i++) {
      if (e.slGUI[i] === sGUI) {
        e.sl.splice(i,1);
        e.slGUI.splice(i,1);
        e.slGUI = e.slGUI;
        dispatch('update', e);
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



{#if isMounted && e && e.slGUI}
{#each e.slGUI as set, i}
<div class="flex justify-between items-center bg-base-300 p-2 rounded-xl">
  <div class="flex flex-row items-center">
    <InputNumber placeholder="Weight" className="input w-24 mr-0 text-left" metric={set.weigth.metric} value={set.weigth.weight}
    on:keyPress={() => dispatch('update', e)}
    on:input={(event) => {set.weigth.weight = event.detail['value']; dispatch('update', e);}}/>
    
    <span class="font-bold mx-2">X</span>
    
    <InputNumber placeholder="Reps" className="input w-14 ml-0 text-center" value={set.rn} 
    on:keyPress={() => dispatch('update', e)} 
    on:input={(event) => {set.rn = event.detail['value']; dispatch('update', e);}}/>
  </div>
  <button class="btn btn-ghost btn-xs" on:click={() => {setToBeDeleted = set; showDeleteDialog(set, true)}}>
    <Icon icon={trashCanOutline} color="red" width="15" height="15" class="cursor-pointer" />
  </button>
</div>
{/each}

<div class="flex justify-center w-full mt-2">
  <button class="btn btn-secondary w-36" on:click={addSet} >
    <Icon icon={plusIcon} color="white" width="25" height="25"/>
    Add Set
  </button>
</div>

{#if e.isExtraOpen}
<div class="mt-2">
  <textarea class="textarea textarea-bordered w-full"
  placeholder="Add additionnal notes..."
  bind:value={e.notes}
  on:input={() => dispatch('update', e)}
  ></textarea>
</div>
{/if}

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