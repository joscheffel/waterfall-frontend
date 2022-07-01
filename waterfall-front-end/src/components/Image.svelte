<script>
    import {getContext, onMount} from "svelte";

    export let image;

    let imageObject;

    const waterfallService = getContext("WaterfallService");

    onMount(async () => {
        const reader = new FileReader();
        const imageData = await waterfallService.retrieveImage(image.imagePath);
        reader.readAsDataURL(imageData);
        reader.onload = function () {
            const imageDataUrl = reader.result;
            imageObject.src = imageDataUrl;
        }
    });
</script>

<div class="card m-5">
    <div class="card-image">
        <figure class="image is-4by3">
            <img bind:this={imageObject} alt="{image.name}"/>
        </figure>
    </div>
    <div class="card-content">
        <div class="content">
            {image.name}
        </div>
    </div>
</div>