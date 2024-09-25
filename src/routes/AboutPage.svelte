<script lang="ts">
	import { navigate } from "svelte-routing";
</script>



<div class="flex flex-col mt-10">
  <p>Hi, thank you for using Fitlogs ! :)</p>
  <p>This app is for easily logging all your workouts with your smartphone while retaining full control of your data. All the data is saved on your device and can be exported.</p>
  <p>For now, Fitlogs works entirely offline. If you are using a chrome based browser, you can even install the app on your device.</p>

  <p>This app is being developped by me, AronGomu. If you have any request, you can message me at nathan.flachaire@outlook.fr</p>

  <div class="paragraph">Here's a bit of the future features I want to implements in order of importance :
    <ul>
      <li>imports (being able to imports data from other user or device)</li>
      <li>statistics (looking at the amount of sets on weeks, months for each muscles, see progress, etc...)</li>
      <li>program (creating programs that will preset your days but still allow modifications)</li>
      <li>export as csv</li>
      <li>online saving (adding a server that will autosave the data probably making this a paying feature for the server maintenance cost)</li>
    </ul>
  </div>
</div>


<div class="flex justify-center">
  <button class="btn btn-warning w-30 m-10" on:click={() => {navigate("/fitlogs/");}}>Back To Menu</button>
</div>

<style>
p, .paragraph {
  margin-bottom: 20px;
}
</style>

