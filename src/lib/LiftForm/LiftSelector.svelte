<script lang="ts">
    import { Lift } from "../../shared/class/Lift/Lift";
    import { getLiftsFromDatabase } from "../../shared/functions/database/lift";
    import TextInput from "../WorkoutForm/inputs/TextInput.svelte";
    import LiftTable from "./LiftTable.svelte";
    

    export let selectedLift: Lift = null;
    let lifts: Lift[] = [];

    init()

    function init() {
	fetchLifts();
	setLift();
    }

    async function fetchLifts() {
	lifts = await getLiftsFromDatabase();
    }

    function setLift() {
	if (!selectedLift) {
	    selectedLift = new Lift()
	}

	if (!selectedLift.name) {
	    selectedLift.name = ""
	}
    }
</script>

<div class="flex flex-col">
    <TextInput placeholder="Search Lift..." value={selectedLift.name}/>
    {#if lifts }
	<LiftTable lifts={lifts}/>
    {:else}
	<span class="text-center loading loading-spinner loading-lg"></span>
    {/if}
</div>
