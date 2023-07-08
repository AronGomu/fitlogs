<script lang="ts">
    import { createEventDispatcher, onMount } from "svelte";
    import { selectWholeTextOnFocus } from "../shared/functions/Utilitary";
    import { exerciceSuggestions } from "../shared/store/suggestionsStore";
    
    const dispatch = createEventDispatcher();

    // Store variables
    /** All the exercices stored that can be shown as suggestions. */
    let suggestions: string[];
    $: { suggestions = $exerciceSuggestions;}
    
    /** Value of the input. */
    export let type: string = "text";
    /** Value of the input. */
    export let value: string;
    /** Placeholder of the input. */
    export let placeholder: string;
    /** Indicate of the the input will autofocus on initialisation.*/
    export let focusOnMount: boolean = false;
    
    /** All the exercices that match what's inputed in the Exercice Name input. */
    let validSuggestions: string[];
    /** Input Element for Exercice Name*/
    let inputElement: HTMLInputElement;
    /** Input Exercice Name Focus boolean flag */
    let isFocused: boolean = false;
    /** Flag that indicate if the mouse cursor is within the suggestion list of not. */
    let isEntered: boolean = false;

    onMount(() => {
        validSuggestions = suggestions;
        if (focusOnMount) inputElement.focus();
    })


    function setType(node) {
        node.type = type;
    }

    /** Handle Input function for the Exercice Name Input. */
    function handleInput(event) {
        validSuggestions = getValidSuggestions(suggestions);
        // addSuggestion(value);
        
        dispatch('input', {'input': event.data, 'value': event.target.value});
    }


    function getValidSuggestions(allSuggestions: string[]) {
        

        if (!allSuggestions) return [];
        validSuggestions = [];
        for (const suggestion of allSuggestions) {
            if (suggestion.includes(value.toLowerCase())) {
                validSuggestions.push(suggestion);
            }
        }

        return validSuggestions;
    }

    function handleFocus(event) {
        selectWholeTextOnFocus(event);
        isFocused = true;
    }

    function handleBlur(event) {
        setTimeout(() => isFocused = false, 100);
    }

    function handleClickSuggestion(vs) {
        value = vs;
        isEntered = false;
    }

    function handleMouseEnter() {
        isEntered = true;
    }

    function handleMouseLeave() {
        isEntered = false;
    }
</script>

<input use:setType placeholder={placeholder} class="{$$restProps.class}"
bind:this={inputElement} bind:value={value} on:input={handleInput} on:focus={handleFocus} on:blur={handleBlur} />

{#if (isFocused || isEntered) && validSuggestions.length > 0}
<ul class="absolute top-16 menu bg-base-200 w-56 rounded-box z-20">
    {#each validSuggestions as vs}
        <li><button on:mouseenter={handleMouseEnter} on:mouseleave={handleMouseLeave} on:click={() => handleClickSuggestion(vs)}>{vs}</button></li>
    {/each}
</ul>
{/if}
