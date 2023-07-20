<script lang="ts">
import trashCanOutline from "@iconify/icons-mdi/trash-can-outline";
import Icon from "@iconify/svelte";
import { createEventDispatcher } from "svelte";
import { Lift } from "../../shared/class/Lift";
import { MuscleWork } from "../../shared/class/MuscleWork";
import { Muscle } from "../../shared/enum/Muscle";
import { addToDatabase, StoreName } from "../../shared/functions/Database";
import { isPercentage, minLength } from "../../shared/functions/Form";
import { enumToList } from "../../shared/functions/Utilitary";

const dispatch = createEventDispatcher();

export var lift: Lift = null;

var exerciceIsValid: boolean = setExerciceIsValid();

function setExerciceIsValid() {
    if (!minLength(lift.name, 3)) return false;
    if (!minLength(lift.variation, 3)) return false;
    if (!minLength(lift.targets, 1)) return false;
    let totalPercentage: number = 0;
    for (const t of lift.targets) {
        if (!t.muscle) return false;
        if (!t.work) return false;
        if (!isPercentage(t.work)) return false;
        totalPercentage += t.work;
    }

    if (totalPercentage !== 100) return false;

    return true;
}
</script>


<div class="flex flex-col justify-center">
    <input type="text" class="m-2 input input-bordered input-primary" bind:value={lift.name} on:input={() => exerciceIsValid = setExerciceIsValid()} placeholder="Main name of the lift...">
    <input type="text" class="m-2 input input-bordered input-secondary" bind:value={lift.variation} on:input={() => exerciceIsValid = setExerciceIsValid()} placeholder="Name of the variation of lift...">
    {#each lift.targets as t, i}
    <div class="flex flex-row items-center justify-between">
        
        <select class="m-2 select select-bordered w-3/5 max-w-xs" bind:value={t.muscle} on:change={() => exerciceIsValid = setExerciceIsValid()}>
            <option disabled selected>Select Muscle</option>
            {#each enumToList(Muscle) as muscle}
            <option value="{muscle}">{muscle}</option>
            {/each}
        </select>

        <div class="m-2 relative w-24">
        <input type="number" class="input input-bordered w-full" bind:value={t.work} on:input={() => exerciceIsValid = setExerciceIsValid()}/>
        <div class="absolute top-0 right-0 bottom-0 left-1/2 bg-base-200 ml-0 rounded-r-lg px-2 flex items-center">%</div>
        </div>

        <button on:click={() => { lift.targets.splice(i,1); lift.targets = lift.targets;}}>
        <Icon icon={trashCanOutline} color="red" width="15" height="15" class="cursor-pointer"/>
        </button>
        
    </div>
    {/each}

    <div class="flex justify-center">
        <button class="btn btn-secondary btn-sm" on:click={() => {
        console.log(lift.targets);
        lift.targets.push(new MuscleWork(null, 0));
        lift.targets = lift.targets;
        }} >Add Muscle</button>
    </div>

    <div class="m-4 flex justify-center">
        {#if exerciceIsValid}
        <button class="btn btn-primary" on:click={() => {
        addToDatabase(StoreName.LIFT, lift).then(l => {
            dispatch("liftAdded", l);
            lift = new Lift();
        })
        }}>Add Exercice</button>
        {:else}
        <button class="btn btn-disabled">Add Exercice DISABLED</button>
        {/if}
    </div>
</div>