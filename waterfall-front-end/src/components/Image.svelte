<script>
    import {createEventDispatcher, getContext, onMount} from "svelte";

    export let image;

    let imageObject;

    $: image, loadImage();

    const waterfallService = getContext("WaterfallService");
    const dispatch = createEventDispatcher();

    onMount(async () => {
        loadImage();
    });

    async function loadImage(){
        const reader = new FileReader();
        const imageData = await waterfallService.retrieveImage(image.imagePath);
        reader.readAsDataURL(imageData);
        reader.onload = function () {
            const imageDataUrl = reader.result;
            imageObject.src = imageDataUrl;
        }
    }

    function click(){
        dispatch("click", {});
    }
</script>

<div class="card m-2" on:click={click}>
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