<script lang="ts">
  import { Route, Router } from "svelte-routing";
  import HamburgerMenu from "./lib/HamburgerMenu.svelte";
  import Home from "./routes/Home.svelte";

</script>

<span>TEXT FROM APP.svelte</span>

<div class="relative">
  <HamburgerMenu/>
</div>
  
<div class="relative">
  <Router>
    <Route path="/" component={Home} />
  </Router>
</div>