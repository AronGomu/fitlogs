<script lang="ts">
    import Fuse from "fuse.js";
    import { Lift } from "../../shared/class/Lift/Lift";
    import { getLiftsFromDatabase } from "../../shared/functions/database/lift";
    import TextInput from "../WorkoutForm/inputs/TextInput.svelte";
    import LiftTable from "./LiftTable.svelte";
    
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();


    export let selectedLift: Lift = null;
    let lifts: Lift[] = [];
    let selectableLifts: Lift[] = [];
    let fuse;
    let fuseOptions = {
	// isCaseSensitive: false,
	// includeScore: false,
	// shouldSort: true,
	// includeMatches: false,
	// findAllMatches: false,
	// minMatchCharLength: 1,
	// location: 0,
	// threshold: 0.6,
	// distance: 0,
	// useExtendedSearch: false,
	// ignoreLocation: false,
	// ignoreFieldNorm: false,
	// fieldNormWeight: 1,
	keys: [
	    "name",
	    "variation"
	]
    }

    init()

    function init() {
	fetchLifts();
	setLift();
    }

    async function fetchLifts() {
	lifts = await getLiftsFromDatabase();
	selectableLifts = lifts;
	fuse = new Fuse(lifts, fuseOptions);
    }

    function setLift() {
	if (!selectedLift) {
	    selectedLift = new Lift()
	}

	if (!selectedLift.name) {
	    selectedLift.name = ""
	}
    }

    function filterLifts(value: string) {
	const fuseResult = fuse.search(value);
	let fuzeLifts = []
	for (const fr of fuseResult) {
		fuzeLifts.push(fr.item)
	}
	selectableLifts = fuzeLifts
    }
</script>

<div class="flex flex-col">
    <TextInput placeholder="Search Lift..." value={selectedLift.name} hasAutofocus={true} on:input={(e) => filterLifts(e.detail.value)}/>
    {#if selectableLifts }
	<div class="h-80 overflow-y-scroll mt-4">
	    <LiftTable bind:lifts={selectableLifts}/>
	</div>
	<button class="btn btn-warning mt-4" on:click={() => dispatch("openLiftForm")}>Lift Missing ?</button>
    {:else}
	<span class="text-center loading loading-spinner loading-lg"></span>
    {/if}
</div>


