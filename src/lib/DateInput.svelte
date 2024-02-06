<script lang="ts">
	import dayjs from "dayjs";
	import { createEventDispatcher } from "svelte";

	const dispatch = createEventDispatcher();

	export let format = "YYYY-MM-DD";
	export let date = new Date();

	let internal;

	const input = (x) => (internal = dayjs(x).format(format));
	const output = (x) => (date = dayjs(x, format).toDate());

	$: input(date);
	$: output(internal);

	function handleInput(event: any) {
		console.log(`\n\nhandleInput InputDate`);
		dispatch("input", {
			input: event.data,
			value: event.target.value,
		});
	}
</script>

<input
	type="date"
	class="input"
	bind:value={internal}
	on:input={(event) => {
		handleInput(event);
	}}
/>
