<script lang="ts">
    import { navigate } from 'svelte-routing';
    import { generateRandomActivityList } from '../shared/data/ActivityBase';
    import { baseLifts } from '../shared/data/LiftsBase';
    import { deleteDatabase } from '../shared/functions/Database';
    import { loadLifts } from '../shared/database/lift';
    import { deleteDatabasePlan } from '../shared/database/plan';
    import { deleteDatabaseWorkout } from '../shared/database/workout';

    generateRandomActivityList(10, 80);
</script>

<div class="flex flex-col items-center">
    <button
        class="btn btn-error m-4 w-40"
        on:click={() => {
            deleteDatabase();
            location.reload();
        }}
        >DELETE ALL DBS
    </button>

    <button
        class="btn btn-error m-4 w-40"
        on:click={() => {
            deleteDatabasePlan();
            location.reload();
        }}
        >DELETE PLAN DB
    </button>

    <button
        class="btn btn-error m-4 w-40"
        on:click={() => {
            deleteDatabaseWorkout();
            location.reload();
        }}
        >DELETE WORKOUT DB
    </button>

    <!-- <button class="btn btn-warning m-4 w-40"
        on:click={() => loadActivityList(generateRandomActivityList(10, 80), true) }
    > POPULATE ActivityList </button> -->

    <button class="btn btn-warning m-4 w-40"
        on:click={async () => {
            await loadLifts(baseLifts, true);
            navigate(`/fitlogs/activity`);
        }}
    > POPULATE LIFTS </button>
</div>
