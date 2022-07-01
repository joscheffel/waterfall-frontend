<script>
    import {createEventDispatcher, getContext, onMount} from "svelte";
    import {isUserItselfOrAdmin} from "../services/userUtils.js";
    import {push} from "svelte-spa-router";
    import Coordinates from "./Coordinates.svelte";
    import ImageUpload from "./ImageUpload.svelte";
    import ImageDeletionList from "./ImageDeletionList.svelte";

    export let waterfallid = false;
    export let title = null;

    let buttonName = "Create";
    if (waterfallid) {
        buttonName = "Update";
    }

    let waterfall;

    const waterfallService = getContext("WaterfallService");
    const dispatch = createEventDispatcher();

    let name;
    let description;
    let lat;
    let lng;

    const continents = ["Choose", "Europe", "North America", "South America", "Africa", "Asia", "Australia"];
    const sizes = ["Choose", "Small", "Medium", "Large"];
    let continentsSelect;
    let sizeSelect;

    let errorMessages = [];

    let privileged;
    let imageDeletionList;

    async function checkWhetherAdminOrWaterfallCreatingUser() {
        privileged = await isUserItselfOrAdmin(waterfall.userid);
        if (!privileged) {
            await push("/error/forbidden");
        }
    }

    onMount(async () => {
        if (waterfallid) {
            waterfall = await waterfallService.getWaterfallDetails(waterfallid);
            await checkWhetherAdminOrWaterfallCreatingUser();
            await setValues();
        }
    });

    function setValues() {
        name.value = waterfall.name;
        description.value = waterfall.description;
        lat = waterfall.location.lat;
        lng = waterfall.location.long;

        const continentIndex = continents.indexOf(waterfall.categories.continent);
        continentsSelect.selectedIndex = continentIndex;
        const sizeIndex = sizes.indexOf(waterfall.categories.size);
        sizeSelect.selectedIndex = sizeIndex;

    }

    async function onSubmit() {
        errorMessages = [];

        let selectedContinent = continentsSelect.options[continentsSelect.selectedIndex].value;
        let selectedSize = sizeSelect.options[sizeSelect.selectedIndex].value;

        if (selectedContinent.toUpperCase() === "Choose".toUpperCase()) {
            errorMessages.push("You need to select a continent!");
        }
        if (selectedSize.toUpperCase() === "Choose".toUpperCase()) {
            errorMessages.push("You need to select a size!");
        }

        if (errorMessages.length > 0) {
            return;
        }

        let response;
        if (waterfall) {
            response = await waterfallService.updateWaterfall(waterfall._id, waterfall.userid, waterfall.__v, name.value, description.value, selectedContinent, selectedSize, lat, lng);
        } else {
            response = await waterfallService.createWaterfall(name.value, description.value, selectedContinent, selectedSize, lat, lng);
        }
        if (response.error) {
            errorMessages = [];
            errorMessages.push(response.message);
        }

        if (response._id) {
            waterfallid = response._id;
            dispatch("message", {waterfall: response});
        }
    }

    function moveTo() {
        dispatch("moveToLocation", {lat: lat, lng: lng});
    }

    export function setCurrentCenter(location) {
        lat = location.lat;
        lng = location.lng;
    }

    function askForCenter() {
        dispatch("getCenter");
    }
</script>

<div class="box has-text-left">
    {#if title}
        <h1 class="title">{title}</h1>
    {/if}
    <div class="field">
        <label class="label">Waterfall Name</label>
        <div class="control">
            <input class="input" type="text" bind:this={name} placeholder="waterfall name">
        </div>
    </div>

    <div class="field">
        <label class="label">Description</label>
        <div class="control">
            <textarea class="textarea" placeholder="Textarea" bind:this={description}></textarea>
        </div>
    </div>

    <div class="columns">
        <div class="column">
            <div class="field">
                <label class="label">Continents</label>
                <div class="control has-icons-left">
                    <div class="select is-primary">
                        <select bind:this={continentsSelect}>
                            {#each continents as continent}
                                <option>{continent}</option>
                            {/each}
                        </select>

                        <span class="icon is-small is-left">
                    <i class="fas fa-globe"></i>
                </span>
                    </div>
                </div>
            </div>
        </div>

        <div class="column">
            <div class="field">
                <label class="label">Sizes</label>
            </div>
            <div class="control has-icons-left">
                <div class="select is-primary">
                    <select bind:this={sizeSelect}>
                        {#each sizes as size}
                            <option>{size}</option>
                        {/each}
                    </select>
                </div>
                <span class="icon is-small is-left">
                    <i class="far fa-window-maximize"></i>
                </span>
            </div>
        </div>
    </div>

    <div class="box">
        <Coordinates bind:lat={lat} bind:lng={lng}/>
        <button class="button is-primary is-light is-2" on:click={moveTo}>Check Coordinates</button>
        <button class="button is-info is-light is-2" on:click={askForCenter}>Set Coordinates of Map Center</button>
    </div>

    {#if errorMessages.length > 0}
        <div class="message is-danger">
            <div class="message-header">
                <p>Error</p>
            </div>
            <div class="message-body">
                {#each errorMessages as message}
                    <p>{message}</p>
                {/each}
            </div>
        </div>
    {/if}

    <div class="field is-grouped">
        <div class="control">
            <button class="button is-link" on:click={onSubmit}>{buttonName}</button>
        </div>
    </div>
</div>

<ImageUpload waterfallid={waterfallid} on:imageUploaded={() => {imageDeletionList.reload()}}/>
<ImageDeletionList bind:this={imageDeletionList} waterfallId={waterfallid}/>