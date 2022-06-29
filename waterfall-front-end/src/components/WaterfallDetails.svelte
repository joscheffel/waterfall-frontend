<script>
    import {getContext} from "svelte";
    import {push} from "svelte-spa-router";
    import {isAdmin} from "../services/userUtils.js";

    let waterfall = null;

    const waterfallService = getContext("WaterfallService");

    export async function selectWaterfall(selectedWaterfallId) {
        const selectedWaterfall = await waterfallService.getWaterfallDetails(selectedWaterfallId);
        waterfall = selectedWaterfall.data;
        const user = await waterfallService.getUserDetails(waterfall.userid);
        console.log(user);
        waterfall.user = user.data;
    }

    async function clickedUser(user) {
        if (await isAdmin()) {
            push("/admin/" + user._id);
        }
    }
</script>

{#if waterfall}
    <h1 class="title">{waterfall.name}
        {#if waterfall.user}
                <span on:click={clickedUser(waterfall.user)}
                      class="tag has-text-right is-info is-light">By {waterfall.user.firstName[0]}. {waterfall.user.lastName}</span>
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

    <span class="tag is-light">lat: {waterfall.location.lat}, long: {waterfall.location.long}</span>
{:else }
    <p>Select a waterfall.</p>
{/if}