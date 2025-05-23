<script lang="ts">
    import { createEventDispatcher, onMount } from "svelte";
    import type { GraphType } from "../../shared/enum/types";

    const dispatch = createEventDispatcher();

    export let gtTab: GraphType = 'average';

</script>

{#if gtTab === 'normal'}
    <div class="flex w-full">
        <button class="w-1/2 btn btn-primary btn-xl" on:click={(e) => {
            dispatch("graphSelect", { input: e, value: "normal" });
            gtTab = 'normal';
        }}>
            Normal 
        </button>

        <button class="w-1/2 btn btn-neutral btn-xl" on:click={(e) => {
            dispatch("graphSelect", { input: e, value: "average" });
            gtTab = 'average';
        }}>
            Average
        </button>
    </div>
{:else if gtTab === 'average'}
    <div class="flex w-full">
        <button class="w-1/2 btn btn-neutral btn-xl" on:click={(e) => {
            dispatch("graphSelect", { input: e, value: "normal" });
            gtTab = 'normal';
        }}>
            Normal 
        </button>

        <button class="w-1/2 btn btn-primary btn-xl" on:click={(e) => {
            dispatch("graphSelect", { input: e, value: "average" });
            gtTab = 'average';
        }}>
            Average
        </button>
    </div>
{/if}