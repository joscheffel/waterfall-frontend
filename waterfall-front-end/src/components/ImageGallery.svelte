<script>
    import Image from "./Image.svelte";
    import {getContext, onMount} from "svelte";

    export let waterfallId;
    export let title = "Images";

    export function setWaterfallId(id) {
        waterfallId = id;
    }

    $:waterfallId, waterfallIdChanged();

    let images = [];
    let selectedImage;
    let imageIndex = 0;
    let progressValue = 0;

    const waterfallService = getContext("WaterfallService");

    onMount(async () => {
        await waterfallIdChanged();
    });

    async function waterfallIdChanged() {
        if (waterfallId) {
            images = await waterfallService.getAllImagesForWaterfall(waterfallId);
            updateData();
        }
    }

    function goRight() {
        imageIndex = (imageIndex + 1) % images.length;
        updateData();
    }

    function goLeft() {
        if (imageIndex < 1) {
            imageIndex = images.length;
        }
        imageIndex = (imageIndex - 1) % images.length;
        updateData();
    }

    function updateData() {
        selectedImage = images[imageIndex];
        progressValue = ((imageIndex + 1) / images.length) * 100;
    }
</script>


{#if images.length > 0}
    <div class="box">
        <h2 class="subtitle is-3">{title}</h2>

        <Image image={selectedImage} on:click={goRight}/>
        <div class="columns is-vcentered">
            <div class="column">
                <button class="button is-primary is-light" on:click={goLeft}><i class="fas fa-caret-left"></i></button>
            </div>
            <div class="column is-8">
                <progress class="progress is-primary" value={progressValue} max="100"></progress>
            </div>
            <div class="column">
                <button class="button is-primary is-light" on:click={goRight}><i class="fas fa-caret-right"></i>
                </button>
            </div>
        </div>
    </div>
{/if}
