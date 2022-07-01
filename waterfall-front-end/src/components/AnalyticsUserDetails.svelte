<script>
    import {getContext, onMount} from "svelte";
    import {push} from "svelte-spa-router";
    import Chart from "svelte-frappe-charts";
    import MultipleTypeChart from "./MultipleTypeChart.svelte";

    export let userid = null;
    let user;
    const waterfallService = getContext("WaterfallService");

    let waterfallContinentProportion;
    let waterfallSizeProportion;

    const continents = ["Europe", "North America", "South America", "Africa", "Asia", "Australia"];
    const sizes = ["Small", "Medium", "Large"];

    onMount(async () => {
        await getUserAnalytics();
        analyseUserData();
    })

    async function getUserAnalytics() {
        user = await waterfallService.getUserAnalytics(userid);
        user.waterfalls = Array.from(user.waterfalls);
    }

    function analyseUserData() {
        waterfallContinentProportion = {
            labels: continents,
            datasets: [
                {
                    values: [0, 0, 0, 0, 0, 0],
                }
            ]
        };
        waterfallSizeProportion = {
            labels: sizes,
            datasets: [
                {
                    values: [0, 0, 0],
                }
            ]
        };

        user.waterfalls.forEach(waterfall => {
            const continentIndex = continents.indexOf(waterfall.categories.continent);
            const sizeIndex = sizes.indexOf(waterfall.categories.size);
            waterfallContinentProportion.datasets[0].values[continentIndex] += 1;
            waterfallSizeProportion.datasets[0].values[sizeIndex] += 1;
        });
    }

    function clickedWaterfall(waterfallId) {
        push("/waterfalls/edit/" + waterfallId);
    }

    function edit(userid) {
        push("/users/" + userid);
    }
</script>


<button class="button is-primary is-light" on:click={edit(user._id)}>Edit <i class="fas fa-user-edit ml-1"></i></button>
{#if user}
    <div class="box">

        <div class="columns">
            <div class="column is-half">
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
                    <div class="box">
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
                {/if}
            </div>
            <div class="column is-half">

                <MultipleTypeChart title="Added Waterfall Continent Proportion" data={waterfallContinentProportion} type="bar"/>

                <MultipleTypeChart title="Added Waterfall Size Proportion" data={waterfallSizeProportion} type="pie"/>
            </div>
        </div>
    </div>
{/if}