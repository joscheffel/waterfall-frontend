<script>
    import Image from "./Image.svelte";
    import {getContext, onMount} from "svelte";

    export let waterfallId;
    export let title = "Click on picture for deletion";

    let delImage;
    let modalErrorMessage;
    let unique = {};

    export function setWaterfallId(id) {
        waterfallId = id;
    }

    export function reload() {
        waterfallIdChanged();
        unique = {};
    }

    $:waterfallId, waterfallIdChanged();

    let images = [];

    const waterfallService = getContext("WaterfallService");

    onMount(async () => {
        await waterfallIdChanged();
    });

    async function waterfallIdChanged() {
        if (waterfallId) {
            images = await waterfallService.getAllImagesForWaterfall(waterfallId);
        }
    }

    function del(image) {
        delImage = image;
    }

    function close() {
        delImage = "";
    }

    async function deleteImage(image) {
        const response = waterfallService.deleteImage(image._id);
        if (response.error) {
            modalErrorMessage = response.message;
            return;
        }
        images = [];
        await waterfallIdChanged();
        unique = {};
        close();
    }
</script>
{#if delImage}
    <div class="modal is-active">
        <div class="modal-background"></div>
        <div class="modal-content">
            <div class="box">
                <h2 class="title is-3">Do you really want to delete the image <span
                        class="is-italic"> {delImage.name}</span></h2>
                <button class="button is-danger" on:click={deleteImage(delImage)}>Delete Image</button>
                <button class="button is-success" on:click={close}>No, please cancel.</button>
                {#if modalErrorMessage}
                    <div class="message is-danger">
                        <div class="message-header">
                            <p>Error</p>
                        </div>
                        <div class="message-body">
                            {modalErrorMessage}
                        </div>
                    </div>
                {/if}
            </div>
        </div>
        <button class="modal-close is-large" aria-label="close" on:click={close}></button>
    </div>
{/if}

{#if images.length > 0}
    <div class="box">
        <h2 class="subtitle is-3">{title}</h2>
        {#key unique}
            {#each images as image}
                <Image image={image} on:click={del(image)}/>
            {/each}
        {/key}
    </div>
{/if}
