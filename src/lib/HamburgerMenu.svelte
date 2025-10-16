<script lang="ts">
	import { navigate } from "svelte-routing";
	import { menuPath } from "../shared/store/menuPath";
    import { pageTitleWritable } from "../shared/store/pageTitleStore";

	let showMenu: boolean = false;

	let mp: string = null;
	menuPath.subscribe((newMenuPath) => (mp = newMenuPath));

	let pageTitle: string = "HomePage";
	pageTitleWritable.subscribe(pt => {
		console.log("pageTitleWritable");
		pageTitle = pt;
	});

	function goto(path: string) {
		navigate(path);
		showMenu = false;
	}

	function toggleMenu() {
		showMenu = !showMenu;
	}
</script>


<div class="navbar bg-primary navbar-override">

  <div class="flex-none">
    <button class="btn btn-xl btn-square btn-ghost" on:click={toggleMenu}>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block h-5 w-5 stroke-current"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path> </svg>
    </button>
  </div>

  <div class="flex">
    <a href="/" class="text-xl mr-2">FitLogs</a>
	{#if mp}
		<a class="text-xl mr-2">-</a>
		<a class="text-xl">{mp}</a>
	{/if}
  </div>

  <div class="text-xl ml-4">{ pageTitle }</div>
</div>


<ul class={`z-20 fixed left-0 h-full menu bg-base-200 p-0 w-4/5 [&_li>*]:rounded-none menu`}
	class:menu-expanded={showMenu}
>
	<li>
		<button class="btn btn-xl" on:click={ () => { goto("/fitlogs/activity") }} >
			<span>Activity List</span>
		</button>
	</li>

	<li>
		<button class="btn btn-xl" on:click={ () => { goto("/fitlogs/settings") }} >
			<span>Settings</span>
		</button>
	</li>
</ul>

<style>
	.navbar-override {
		padding: 0px;
	}

	.menu {
		transition: transform 0.3s ease;
		transform: translateX(-100%);
	}

	.menu-expanded {
		transform: translateX(0%);
	}
</style>
