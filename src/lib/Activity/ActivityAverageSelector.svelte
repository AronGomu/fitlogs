<script lang="ts">
    import { createEventDispatcher, onMount } from "svelte";
    import type { GraphType } from "../../shared/enum/types";

    const dispatch = createEventDispatcher();

    export let gtTab: GraphType = 'average';

</script>

{#if gtTab === 'normal'}
    <div role="tablist" class="tabs tabs-boxed mb-2">
        <button role="tab" class="tab tab-active" on:click={(e) => {
            dispatch("graphSelect", { input: e, value: "normal" });
            gtTab = 'normal';
        }}>
            Normal 
        </button>

        <button role="tab" class="tab" on:click={(e) => {
            dispatch("graphSelect", { input: e, value: "average" });
            gtTab = 'average';
        }}>
            Average
        </button>
    </div>
{:else if gtTab === 'average'}
    <div role="tablist" class="tabs tabs-boxed mb-2">
        <button role="tab" class="tab" on:click={(e) => {
            dispatch("graphSelect", { input: e, value: "normal" });
            gtTab = 'normal';
        }}>
            Normal 
        </button>

        <button role="tab" class="tab tab-active" on:click={(e) => {
            dispatch("graphSelect", { input: e, value: "average" });
            gtTab = 'average';
        }}>
            Average
        </button>
    </div>
{/if}