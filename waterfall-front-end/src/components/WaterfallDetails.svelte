<script>
    import {getContext} from "svelte";
    import {push} from "svelte-spa-router";
    import {isAdmin, isUserItselfOrAdmin} from "../services/userUtils.js";
    import ImageList from "./ImageList.svelte";

    let waterfall = null;

    let waterfallId;

    const waterfallService = getContext("WaterfallService");

    let privileged;

    export async function selectWaterfall(selectedWaterfallId) {
        waterfall = await waterfallService.getWaterfallDetails(selectedWaterfallId);
        const user = await waterfallService.getUserDetails(waterfall.userid);
        await checkPrivileges();
        waterfall.user = user;
        waterfallId = waterfall._id;
    }

    async function checkPrivileges() {
        privileged = await isUserItselfOrAdmin(waterfall.userid);
    }

    async function clickedUser(user) {
        if (await isAdmin()) {
            await push("/admin/" + user._id);
        }
    }

    function edit(waterfallid) {
        push("/waterfalls/edit/" + waterfallid);
    }
</script>

{#if waterfall}
    <div class="level">
        {#if privileged}
            <button class="button is-primary is-light level-left" on:click={edit(waterfall._id)}>EDIT<i
                    class="fas fa-edit ml-1"></i>
            </button>
        {/if}
        <span class="tag is-light level-right">lat: {waterfall.location.lat}, long: {waterfall.location.long}</span>
    </div>
    <h1 class="title">{waterfall.name}
        {#if waterfall.user}
                <span on:click={clickedUser(waterfall.user)}
                      class="tag has-text-right is-info is-light">By {waterfall.user.firstName[0]}
                    . {waterfall.user.lastName}</span>
        {/if}
    </h1>

    <div class="columns">
        <div class="column">
            {#if waterfall.description}
                <p class="has-text-left">{waterfall.description}</p>
            {/if}
        </div>
        <div class="column is-4">
            <span class="tag is-primary">{waterfall.categories.continent}</span>
            <span class="tag is-info">{waterfall.categories.size}</span>
        </div>
    </div>

    <ImageList waterfallId={waterfallId}/>
{:else }
    <p>Select a waterfall.</p>
{/if}