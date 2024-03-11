<script lang="ts">
	import { baseActivities } from "../shared/data/ActivityBase";
    import { baseLifts } from "../shared/data/LiftsBase";
	import {
		deleteDatabase,
		loadActivities,
	} from "../shared/functions/Database";
    import { loadLifts } from "../shared/functions/database/lift";
	import { deleteDatabasePlan } from "../shared/functions/database/plan";
    import { deleteDatabaseWorkout } from "../shared/functions/database/workout";
</script>

<div class="flex flex-col items-center">
	<button
		class="btn btn-error"
		on:click={() => {
			deleteDatabase();
			location.reload();
		}}>DELETE ALL</button
	>

	<button
		class="btn btn-error"
		on:click={() => {
			deleteDatabasePlan();
			location.reload();
		}}>DELETE PLAN DB</button
	>

	<button
		class="btn btn-error"
		on:click={() => {
			deleteDatabaseWorkout();
			location.reload();
		}}>DELETE WORKOUT DB</button
	>

	<button
		class="btn btn-warning"
		on:click={() => {
			loadActivities(baseActivities, true);
			location.reload();
		}}>POPULATE ACTIVITIES</button
	>

	<button
		class="btn btn-warning"
		on:click={() => {
			loadLifts(baseLifts, true);
			location.reload();
		}}>POPULATE LIFTS</button
	>
</div>
