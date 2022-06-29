<script>
    import {getContext} from "svelte";
    import {push} from "svelte-spa-router";

    export let userid = null;
    let user;
    const waterfallService = getContext("WaterfallService");
    getUserAnalytics();

    async function getUserAnalytics() {
        user = await waterfallService.getUserAnalytics(userid);
        user.waterfalls = Array.from(user.waterfalls);
    }

    function clickedWaterfall(waterfallId) {
        console.log(waterfallId);
    }

    function edit(userid){
        push("/users/" + userid);
    }
</script>


<button class="button is-primary is-light" on:click={edit(user._id)}>Edit <i class="fas fa-user-edit ml-1"></i></button>
{#if user}
    <div class="box">
        <h2 class="subtitle is-3">{user.firstName} {user.lastName}
            {#if user.scope === "admin"}
                <span class="tag is-danger is-uppercase m-2">{user.scope}</span>
            {:else }
                <span class="tag is-primary is-uppercase m-2 is-centered">{user.scope}</span>
            {/if}
        </h2>
        <h3 class="subtitle is-5 is-italic">{user.email}</h3>
        <h4 class="subtitle is-6">Uploaded {user.totalNumberOfPictures} pictures</h4>
        <h4 class="subtitle is-6">Added {user.waterfalls.length} waterfalls</h4>
        {#if user.waterfalls.length > 0}
            <div class="columns">
                <div class="box column is-half">
                    <h4 class="subtitle is6">{user.firstName}'s added waterfalls:</h4>
                    <table class="table">
                        <tbody>
                        {#each user.waterfalls as waterfall}
                            <tr on:click={clickedWaterfall(waterfall._id)}>
                                <td class="m-2">
                                    {waterfall.name}
                                </td>
                                <td>
                                    <span class="tag is-primary ml-3">{waterfall.categories.continent}</span>
                                    <span class="tag is-info m-1">{waterfall.categories.size}</span>
                                </td>
                            </tr>
                        {/each}
                        </tbody>
                    </table>
                </div>
            </div>
        {/if}
    </div>
{/if}