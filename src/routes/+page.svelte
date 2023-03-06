<script lang="ts">
  import type { PageData } from './$types';

  export let data: PageData;

  $: console.log(data);
</script>


<div class="hello-world min-h-[2000px]">Hello world!</div>

<style lang="scss">
	.hello-world {
		color: red;
	}
</style>
