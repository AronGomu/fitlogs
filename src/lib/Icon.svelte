<svg
  class={$$props.class}
  {focusable}
  {width}
  {height}
  viewBox="0 0 {displayIcon['box']} {displayIcon['box']}">
  {@html displayIcon['svg']}
</svg>


<script lang="ts">

    export let name: string;
    export let width: string = "1rem";
    export let height: string = "1rem";
    export let focusable: string = "false";


    import DownChevron from './../assets/icons/down-chevron.svg';


    let icons: {box: number, name: string, svg: string }[] = [
        {box: 24, name: "down-chevron", svg: DownChevron}
    ]

    let displayIcon = icons.find((e) => e['name'] === name);

    console.log(displayIcon);
    

</script>

