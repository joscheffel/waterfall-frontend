<script>
    import {createEventDispatcher, getContext} from "svelte";

    export let waterfallid;

    let unique;
    let fileinput;
    let errorMessage;

    const waterfallService = getContext("WaterfallService");

    let images = [];
    const dispatch = createEventDispatcher();

    const onFileSelected = (e) => {
        let image = e.target.files[0];
        let reader = new FileReader();
        reader.readAsDataURL(image);
        reader.onload = e => {
            unique = {};
            images.push({name: "", data: image, src: e.target.result});
        }
    };

    function uploadPic() {
        //validate no errors
        let errors = false;
        for (let image of images) {
            if (!image.name) {
                image.error = "Picture needs a name";
                errors = true;
            }
        }
        if (errors) {
            unique = {};
            return;
        }

        let errorUploads = [];
        for (let image of images) {
            let response = waterfallService.uploadPicture(image.name, waterfallid, image.data);
            if (response.error) {
                image.error = response.message;
                errorUploads.push(image);
            }
        }
        images = [];
        images = errorUploads;
        unique = {};

        dispatch("imageUploaded", {});
    }

    function remove(index) {
        if (images.length > 0) {
            const removed = images.splice(index, 1);
            unique = {};
        }
    }
</script>

{#if waterfallid}
    <div class="box">
        <h1 class="subtitle is-4">Upload Images</h1>

        {#key unique}
            {#each images as image, index}
                <div class="box">
                    <div class="level">
                        <img class="image is-128x128 m-2 littleRounded" src="{image.src}" alt="d"/>
                        <input class="input is-primary" type="text" placeholder="Enter a name/short description"
                               bind:value={image.name}>
                        <button class="button is-primary m-2" on:click={() => remove(index)}>Remove</button>
                    </div>

                    {#if image.error}
                        <div class="message is-danger m-2">
                            <div class="message-header">
                                <p>Error</p>
                            </div>
                            <div class="message-body">
                                <p>{image.error}</p>
                            </div>
                        </div>
                    {/if}
                </div>
            {/each}
        {/key}

        <input style="display:none" type="file" accept=".jpg, .jpeg, .png" on:change={(e)=>onFileSelected(e)}
               bind:this={fileinput}>
        <div class="level">
            <div class="level-item level-left">
                <label class="file-label" on:click={()=>{fileinput.click();}}>
                <span class="file-cta">
                    <span class="file-icon">
                        <i class="fas fa-upload"></i>
                    </span>
                    <span class="file-label">
                        Choose a file…
                    </span>
                </span>
                </label>
            </div>
        </div>

        <button class="button is-primary is-light m-2" on:click={uploadPic}>Upload Picture</button>
    </div>
{/if}

<style>
    .littleRounded {
        border-radius: 10px;
    }
</style>