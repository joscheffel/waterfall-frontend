<script>
    import {createEventDispatcher, getContext, onMount} from "svelte";

    const dispatch = createEventDispatcher();

    let waterfallFilterList = [];
    let waterfallList = [];

    const continents = ["All", "Europe", "North America", "South America", "Africa", "Asia", "Australia"];
    const sizes = ["All", "Small", "Medium", "Large"];
    let continentsSelect;
    let sizeSelect;

    let selectedWaterfallId = null;

    const waterfallService = getContext("WaterfallService");

    onMount(async () => {
            waterfallList = await waterfallService.getWaterfalls();
            filterApplied();
        }
    );

    function clicked(waterfall) {
        selectedWaterfallId = waterfall._id;
        dispatch("selectedWaterfallId", {waterfallId: selectedWaterfallId});
        dispatch("location", {lat: waterfall.location.lat, lng: waterfall.location.long});
    }

    function filterApplied() {
        const continentFilter = continentsSelect.options[continentsSelect.selectedIndex].value;
        const sizeFilter = sizeSelect.options[sizeSelect.selectedIndex].value;

        waterfallFilterList = waterfallList.filter(waterfall => {
            let filterBool = true;
            if (continentFilter !== "All") {
                if (waterfall.categories.continent !== continentFilter) {
                    filterBool = false;
                }
            }
            if (sizeFilter !== "All") {
                if (waterfall.categories.size !== sizeFilter) {
                    filterBool = false;
                }
            }
            return filterBool;
        });
    }
</script>

<div class="box">
    <p class="subtitle is-size-4 is-italic">Filter the Waterfalls</p>

    <div class="columns">
        <div class="column">
            <div class="level-item">
                <p class="subtitle is-5">Continents</p>
            </div>
            <div class="level-item">
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
            <div class="level-item">
                <p class="subtitle is-5">Sizes</p>
            </div>
            <div class="level-item is-offset-5">
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
    </div>
    <button class="button is-primary is-light" on:click={filterApplied}>Apply filters</button>
</div>


{#if Object.keys(waterfallFilterList).length === 0}
    <p><i class="far fa-folder-open"/> <span>No waterfalls found for these filters</span></p>
{:else}
    <div class="table-container tableFixHead">
        <table class="table is-fullwidth is-hoverable">

            <thead>
            <th>Name</th>
            <th>Categories</th>
            </thead>

            <tbody>
                {#each waterfallFilterList as waterfall}
                    <tr on:click={clicked(waterfall)}>
                        <td>
                            {waterfall.name}
                        </td>
                        <td>
                            <span class="tag is-primary">{waterfall.categories.continent}</span>
                            <span class="tag is-info">{waterfall.categories.size}</span>
                        </td>
                    </tr>
                {/each}

            </tbody>
        </table>
    </div>
{/if}


<style>
    .scrollContainer {
        max-height: 13em;
        overflow: auto;
    }

    .tableFixHead          { overflow: auto; height: 20em; }
    .tableFixHead thead th { position: sticky; top: 0; z-index: 1; background: white}

    tr {
        min-width: 100%;
    }
</style>