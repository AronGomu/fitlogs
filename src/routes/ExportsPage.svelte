<script lang="ts">
    import { Settings } from '../shared/class/Settings';
    import { downloadAsJson } from '../shared/functions/Utils';
    import { getWorkoutsFromDatabase } from '../shared/database/workout';
    import { navigate } from 'svelte-routing';
    import { exportActivityList } from '../shared/class/Activity/Activity';
    import { settingsWritable } from '../shared/store/settingStore';

    let settings: Settings = new Settings();
    settingsWritable.subscribe((s) => (settings = s));
</script>

<div class="flex flex-col items-center mt-10">
    <button class="btn btn-primary w-40"
        on:click={() => getWorkoutsFromDatabase().then(wl => downloadAsJson(wl, 'data')) }
    > Export All Workouts </button>

    <button class="btn btn-primary w-40 mt-4"
        on:click={() => exportActivityList(settings.nbDayAverage) }
	> Export ActivityList Data </button>
</div>

<div class="flex justify-center">
    <button
        class="btn btn-warning w-30 m-10"
        on:click={() => { navigate('/fitlogs/') }}
    >Back To Menu</button>
</div>
