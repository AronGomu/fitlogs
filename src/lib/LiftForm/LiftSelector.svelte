<script lang="ts">
    import type { Lift } from "../../shared/class/Lift/Lift";
    import { getLiftsFromDatabase } from "../../shared/functions/database/lift";
    import LiftTable from "./LiftTable.svelte";

    let lifts: Lift[] = [];

    init()

    function init() {
	fetchLifts();
    }

    async function fetchLifts() {
	lifts = await getLiftsFromDatabase();
	console.log(lifts)
    }
</script>

<div class="flex flex-col">
    {#if lifts }
	<LiftTable lifts={lifts}/>
    {/if}
</div>
