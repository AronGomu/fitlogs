<script lang="ts">
    import { generateRandomActivityList } from '../shared/data/ActivityBase';
    import { loadActivityList } from '../shared/database/ActivityDatabase';
</script>

<div class="flex flex-col items-center">
    <!-- <button
        class="btn btn-error m-4 w-40"
        on:click={() => { deleteDatabase(); location.reload(); }}
    > DELETE ALL DBS </button> -->

    <button class="btn btn-warning m-4 w-40"
        on:click={() => loadActivityList(generateRandomActivityList(10, 80), true) }
    > POPULATE ActivityList </button>

    <!-- <button class="btn btn-warning m-4 w-40"
        on:click={async () => {
            await loadLifts(baseLifts, true);
            navigate(`/fitlogs/activity`);
        }}
    > POPULATE LIFTS </button> -->
</div>
