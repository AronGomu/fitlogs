<div class="form-control w-full max-w-xs">
    <label class="label">
        <span class="label-text">{label}</span>
    </label>
    <input type="text" placeholder="Type here" class="input input-bordered w-full max-w-xs"
    bind:this={inputElement} bind:value={exerciceName} on:input={enHandleInput} on:focus={() => isFocused = true} on:blur={() => setTimeout(() => isFocused = false, 50) } />
    
    {#if isFocused && validSuggestions.length > 0}
    <ul class="menu bg-base-200 w-56 rounded-box">
        {#each validSuggestions as suggestion}
            <li><button on:click={() => {
                console.log(suggestion);
                exerciceName = suggestion;}}>{suggestion}</button></li>
        {/each}
    </ul>
    {/if}
</div>

<script lang="ts">
    import { onMount } from "svelte";
    import { LocalStorageKeys } from "../shared/enums/LocalStorageKeys";

    /** Text for the label of the input. */
    export let label: string;
    /** All the exercices stored that can be shown as suggestions. */
    export let suggestions: string[] = [];
    export let focusOnMount: boolean = false;

    let exerciceName: string;
    /** All the exercices that match what's inputed in the Exercice Name input. */
    let validSuggestions: string[];
    /** Input Element for Exercice Name*/
    let inputElement: HTMLInputElement;
    /** Input Exercice Name Focus boolean flag */
    let isFocused: boolean = false;

    onMount(() => {
        validSuggestions = suggestions;
        if (focusOnMount) inputElement.focus();
    })

    /** Handle Input function for the Exercice Name Input. */
    function enHandleInput() {
        validSuggestions = getValidSuggestions(suggestions);
    }


    function getValidSuggestions(allSuggestions: string[]) {
        let validSuggestions: string[] = [];
        for (const suggestion of allSuggestions) {
            if (suggestion.toLowerCase().includes(exerciceName.toLowerCase())) {
                validSuggestions.push(suggestion);
            }
        }
        return validSuggestions;
    }
</script>