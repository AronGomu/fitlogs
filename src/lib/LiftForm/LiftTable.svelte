<script lang="ts">
	export let lifts = [];
</script>

SHWOGIN

	<div class="overflow-x-auto">
<table class="table">

	    <thead>
	      <tr>
		<th>Name</th>
		<th>Variation</th>
	      </tr>
	    </thead>


	    <tbody>
		{#each lifts as l}
			<tr class="hover">
				<td>{l.name}</td>
				<td>{l.variation}</td>
			</tr>	 <!-- content here -->
		{/each}
		</tbody>
	  </table>
	</div>
