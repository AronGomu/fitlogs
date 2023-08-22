<script lang="ts">
	import { createEventDispatcher, onMount } from "svelte";
	import type { Lift } from "../../../shared/class/Lift/Lift";
	import { selectWholeTextOnFocus } from "../../../shared/functions/Utilitary";
	import { lifts } from "../../../shared/store/liftStore";

	const dispatch = createEventDispatcher();

	// Store variables
	/** All the exercices stored that can be shown as suggestions. */
	let ll: Lift[] = [];
	lifts.subscribe((exerciceSuggestions) => {
		ll = exerciceSuggestions;
	});

	/** Value of the input. */
	export let type: string = "text";
	/** Value of the input. */
	export let value: any;
	/** Placeholder of the input. */
	export let placeholder: string;
	/** Indicate of the the input will autofocus on initialisation.*/
	export let focusOnMount: boolean = false;

	/** All the exercices that match what's inputed in the Exercice Name input. */
	let validSuggestions: Lift[];
	/** Input Element for Exercice Name*/
	let inputElement: HTMLInputElement;
	/** Input Exercice Name Focus boolean flag */
	let isFocused: boolean = false;
	/** Flag that indicate if the mouse cursor is within the suggestion list of not. */
	let isEntered: boolean = false;

	onMount(() => {
		validSuggestions = ll;
		if (focusOnMount) inputElement.focus();
	});

	function setType(node) {
		node.type = type;
	}

	/** Handle Input function for the Exercice Name Input. */
	function handleInput(event) {
		validSuggestions = getValidSuggestions(ll);
		// const input = event.data // character inputed
		dispatch("input", event.target.value);
	}

	function getValidSuggestions(allSuggestions: Lift[]) {
		if (!allSuggestions) return [];
		validSuggestions = [];

		for (const suggestion of allSuggestions) {
			if (
				suggestion
					.getExerciceName()
					.toLowerCase()
					.includes(value.toLowerCase())
			) {
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
		setTimeout(() => (isFocused = false), 100);
	}

	/** Handle the event when the user select a suggestion from the list by clicking/tapping.*/
	function handleClickSuggestion(l: Lift) {
		value = l.getExerciceName();
		isEntered = false;
		console.log(value);
		dispatch("selectSuggestion", value);
	}

	function handleMouseEnter() {
		isEntered = true;
	}

	function handleMouseLeave() {
		isEntered = false;
	}
</script>

<input
	use:setType
	{placeholder}
	class="{$$restProps.class} override"
	bind:this={inputElement}
	bind:value
	on:input={handleInput}
	on:focus={handleFocus}
	on:blur={handleBlur}
/>

{#if (isFocused || isEntered) && validSuggestions.length > 0}
	<div
		class="absolute top-16 menu bg-base-200 w-56 rounded-box z-20 overflow-y-auto h-36"
	>
		<ul>
			{#each validSuggestions as vs}
				<li>
					<button
						on:mouseenter={handleMouseEnter}
						on:mouseleave={handleMouseLeave}
						on:click={() => handleClickSuggestion(vs)}
					>
						{vs.getExerciceName()}
					</button>
				</li>
			{/each}
		</ul>
	</div>
{/if}

<style>
	.override {
		height: auto;
		width: 80%;
		font-size: larger;
	}

	.override::placeholder {
		font-style: italic;
	}
</style>
