<script lang="ts">
  import { Route, Router } from "svelte-routing";
  import HamburgerMenu from "./lib/HamburgerMenu.svelte";
  import Home from "./routes/Workout.svelte";

</script>

<div class="relative">
  <HamburgerMenu/>
</div>
  
<div class="relative">
  <Router>
    <Route path="/fitlogs" component={Home} />
  </Router>
</div>