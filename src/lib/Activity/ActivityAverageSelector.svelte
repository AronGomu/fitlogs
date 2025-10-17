<script lang="ts">
    import type { Settings } from "../../shared/class/Settings";
    import { saveSettings } from "../../shared/database/SettingsDatabase";

    // const dispatch = createEventDispatcher();

    export let settings: Settings;


</script>

{#if settings.typeActivityStats === 'normal' }
    <div class="flex w-full">
        <button class="w-1/2 btn btn-primary btn-xl" on:click={(e) => {
            // dispatch("graphSelect", { input: e, value: "normal" });
            settings.typeActivityStats = 'normal';
            saveSettings(settings);
        }}>
            Normal 
        </button>

        <button class="w-1/2 btn btn-neutral btn-xl" on:click={(e) => {
            // dispatch("graphSelect", { input: e, value: "average" });
            settings.typeActivityStats = 'normal';
            saveSettings(settings);
        }}>
            Average
        </button>
    </div>
{:else if settings.typeActivityStats = 'average'}
    <div class="flex w-full">
        <button class="w-1/2 btn btn-neutral btn-xl" on:click={(e) => {
            // dispatch("graphSelect", { input: e, value: "normal" });
            settings.typeActivityStats = 'average';
            saveSettings(settings);
        }}>
            Normal 
        </button>

        <button class="w-1/2 btn btn-primary btn-xl" on:click={(e) => {
            // dispatch("graphSelect", { input: e, value: "average" });
            // gtTab = 'average';
            settings.typeActivityStats = 'average';
            saveSettings(settings);
        }}>
            Average
        </button>
    </div>
{/if}