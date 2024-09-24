<script lang="ts">
	import { navigate } from "svelte-routing";
</script>


Hi, thank you for using Fitlogs ! :) 

This app is for easily logging all your workouts with your smartphone while retaining full control of your data. All the data is saved on your device and can be exported.
For now, Fitlogs works entirely offline. If you are using a chrome based browser, you can even install the app on your device.

This app is being developped by me, AronGomu. If you have any request, you can message me at nathan.flachaire@outlook.fr

Here's a bit of the future features I want to implements in order of importance :
* imports (being able to imports data from other user or device)
* statistics (looking at the amount of sets on weeks, months for each muscles, see progress, etc...)
* program (creating programs that will preset your days but still allow modifications)
* export as csv
* online saving (adding a server that will autosave the data probably making this a paying feature for the server maintenance cost)

<div class="flex flex-col items-center mt-10">
	
</div>


<div class="flex justify-center">
  <button class="btn btn-warning w-30 m-10" on:click={() => {navigate("/fitlogs/");}}>Back To Menu</button>
</div>

