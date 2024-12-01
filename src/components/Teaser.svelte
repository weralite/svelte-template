<script lang="ts">
    import { storyblokEditable } from "@storyblok/svelte";
    import { onMount } from 'svelte';
    
    let data: ReleaseData = { releases: [] };

    
  async function get() {
      try {
          const response = await fetch('/api/github', {
              method: 'GET',
              headers: {
                  'content-type': 'application/json'
              }
          });
          if (!response.ok) {
              throw new Error(`Failed to fetch: ${response.statusText}`);
          }

          data = await response.json();
          console.log("DAAAAATAAAAAAAAA", data);
      } catch (err) {
          console.error('Error fetching data:', err);
      }
  }
    
    onMount(() => {
        get();
    });


    export let blok;
</script>

<h3 
    use:storyblokEditable={blok} 
    class="py-6 mb-4 text-4xl font-semibold text-center text-gray-800 dark:text-gray-100 leading-tight tracking-wide border-b-2 border-gray-200 dark:border-gray-700 hover:text-indigo-500 transition-all duration-300 ease-in-out"
>
    {blok.headline}
</h3>

{#if data.releases.length > 0}
  <ul>
    {#each data.releases as release}
      <li>
        <h4>{release.name}</h4>
        <!-- <p>{release.date}</p>
        <p>{release.notes}</p> -->
      </li>
    {/each}
  </ul>
{:else}
  <p>Loading releases...</p>
{/if}