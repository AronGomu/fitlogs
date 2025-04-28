<script lang="ts">
	import { baseActivities, generateRandomActivities } from "../shared/data/ActivityBase";
    import { baseLifts } from "../shared/data/LiftsBase";
	import {
		deleteDatabase,
		loadActivities,
	} from "../shared/functions/Database";
    import { loadLifts } from "../shared/functions/database/lift";
	import { deleteDatabasePlan } from "../shared/functions/database/plan";
    import { deleteDatabaseWorkout } from "../shared/functions/database/workout";

	const l = generateRandomActivities(1, 80);
	console.log(l);
</script>

<div class="flex flex-col items-center">
	<button
		class="btn btn-error m-4 w-40"
		on:click={() => {
			deleteDatabase();
			location.reload();
		}}>DELETE ALL DBS
	</button>

	<button
		class="btn btn-error m-4 w-40"
		on:click={() => {
			deleteDatabasePlan();
			location.reload();
		}}>DELETE PLAN DB
	</button>

	<button
		class="btn btn-error m-4 w-40"
		on:click={() => {
			deleteDatabaseWorkout();
			location.reload();
		}}>DELETE WORKOUT DB
	</button>

	<button
		class="btn btn-warning m-4 w-40"
		on:click={() => {
			loadActivities(baseActivities, true);
		}}>POPULATE ACTIVITIES
	</button>

	<button
		class="btn btn-warning m-4 w-40"
		on:click={() => {
			loadLifts(baseLifts, true);
		}}>POPULATE LIFTS
	</button>
</div>
