

<script lang="ts">
    import { createEventDispatcher, onMount } from 'svelte';
    import { getReducedStringMetric, type WeightMetric } from '../../../shared/enum/WeightMetrics';
    import { selectWholeText } from '../../../shared/functions/Utils';

    const dispatch = createEventDispatcher();

    export let label: string = null;
    export let placeholder: string = '';
    export let className: string = '';
    export let metric: WeightMetric = null;
    export let value: number;

    let inputHTMLElement: HTMLInputElement;

    function handleFocus(e) {
        console.log(e)
        selectWholeText(e);
    }

    function handleKeyPress(e) {
        if (e.key === 'Enter') dispatch('enterKey');

        if (e.type === 'paste') key = e.clipboardData.getData('text/plain');
        else {
            var key = e.keyCode || e.which;
            key = String.fromCharCode(key);
        }

        var regex = /^[0-9.]+$/;

        if (!regex.test(key)) {
            e.returnValue = false;
            if (e.preventDefault) e.preventDefault();
        }
    }

    function handleInput(e: any) {
        // todo : check why reseting value then inputing again prevent new characters to be inputed
        console.log(`handleInput`, e, e.data, e.target.value);
        dispatch('input', { input: e.data, value: e.target.value });
    }
</script>

<div class="form-control">
    {#if label}
        <span class="label-text">{label}</span>
    {/if}
    {#if !metric}
        <input
            type="text"
            {placeholder}
            class={className}
            bind:value
            bind:this={inputHTMLElement}
            on:focus={handleFocus}
            on:keypress={handleKeyPress}
            on:input={handleInput}
        />
    {:else if metric}
        <div class="relative">
            <input
                type="text"
                {placeholder}
                class={className}
                bind:value
                bind:this={inputHTMLElement}
                on:focus={handleFocus}
                on:keypress={handleKeyPress}
                on:input={handleInput}
            />
            {#if value || value == 0}
                <div
                    class="absolute top-0 right-0 bottom-0 left-1/2 bg-base-200 ml-0 rounded-r-lg px-2 flex items-center"
                >
                    {getReducedStringMetric(metric)}
                </div>
            {/if}
        </div>
    {/if}
</div>

<style>
    /** Style to add for the base input. */
    .base-override {
        height: 2rem;
        padding-left: 0.5rem !important;
        padding-right: 0.5rem !important;
    }
</style>
