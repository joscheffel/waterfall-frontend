<script>
    import Image from "./Image.svelte";
    import {getContext, onMount} from "svelte";

    export let waterfallId;
    export let title = "Images";

    export function setWaterfallId(id){
        waterfallId = id;
    }

    $:waterfallId, waterfallIdChanged();

    let images = [];

    const waterfallService = getContext("WaterfallService");

    onMount(async () => {
        await waterfallIdChanged();
    });

    async function waterfallIdChanged() {
        if(waterfallId) {
            images = await waterfallService.getAllImagesForWaterfall(waterfallId);
        }
    }
</script>

{#if images.length > 0}
    <div class="box">
        <h2 class="subtitle is-3">{title}</h2>
        {#each images as image}
            <Image image={image}/>
        {/each}
    </div>
{/if}
