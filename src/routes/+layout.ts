import { apiPlugin, storyblokInit, useStoryblokApi } from "@storyblok/svelte";
import Grid from "../components/Grid.svelte";
import Page from "../components/Page.svelte"; // Ensure this file exists at the specified path
import Teaser from "../components/Teaser.svelte";
import Feature from "../components/Feature.svelte";
 
/** @type {import('./$types').LayoutLoad} */
export async function load() {
  storyblokInit({
    accessToken: "IlHWKIPy1jMelpJTrv28pgtt",
    use: [apiPlugin],
    components: {
      "grid": Grid,
      "page": Page,
      "teaser": Teaser,
      "feature": Feature,
    },
  });
  let storyblokApi = await useStoryblokApi();
 
  return {
    storyblokApi: storyblokApi,
  };
}