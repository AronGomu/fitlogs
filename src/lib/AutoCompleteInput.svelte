<input use:setType placeholder={placeholder} class="{$$restProps.class}"
bind:this={inputElement} bind:value={value} on:input={enHandleInput} on:focus={selectWholeTextOnFocus} on:blur={() => setTimeout(() => isFocused = false, 50) } />

{#if isFocused && validSuggestions.length > 0}
<ul class="menu bg-base-200 w-56 rounded-box">
    {#each validSuggestions as suggestion}
        <li><button on:click={() => {
            console.log(suggestion);
            value = suggestion;}}>{suggestion}</button></li>
    {/each}
</ul>
{/if}


<script lang="ts">
    import { onMount } from "svelte";
    import { selectWholeTextOnFocus } from "../shared/functions/Utilitary";

    /** Value of the input. */
    export let type: string = "text";
    /** Value of the input. */
    export let value: string;
    /** Placeholder of the input. */
    export let placeholder: string;
    /** All the exercices stored that can be shown as suggestions. */
    export let suggestions: string[] = [];
    /** Indicate of the the input will autofocus on initialisation.*/
    export let focusOnMount: boolean = false;

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

    function setType(node) {
        node.type = type;
    }

    /** Handle Input function for the Exercice Name Input. */
    function enHandleInput() {
        validSuggestions = getValidSuggestions(suggestions);
    }


    function getValidSuggestions(allSuggestions: string[]) {
        let validSuggestions: string[] = [];
        for (const suggestion of allSuggestions) {
            if (suggestion.toLowerCase().includes(value.toLowerCase())) {
                validSuggestions.push(suggestion);
            }
        }
        return validSuggestions;
    }
</script>